# Stripe Pre-Authorization Implementation for Table Booking Deposits

## Overview
Implementation guide for £50 table booking deposits using Stripe's manual capture (pre-authorization) feature. The system will place a hold on the customer's payment method, then either capture the funds when a table is confirmed or release the hold if no availability.

## Technical Architecture

### Flow Overview
1. Customer submits table booking request with payment details
2. Create Stripe PaymentIntent with manual capture for £50
3. Authorize (hold) the funds without charging
4. Check table availability (manual process)
5. Either capture the £50 or cancel the authorization

### Authorization Windows
- **Card payments**: 7 days for online payments
- **Authorization must be captured or canceled within this window**
- **Automatic cancellation** occurs if no action is taken

## Implementation Code

### 1. Create PaymentIntent with Manual Capture

```typescript
// Frontend - Create payment intent for table booking
const createTableBookingPayment = async (bookingData: TableBookingData) => {
  const response = await fetch('/api/create-booking-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: 5000, // £50.00 in pence
      currency: 'gbp',
      booking_details: bookingData,
      capture_method: 'manual'
    })
  });
  
  const { client_secret, payment_intent_id } = await response.json();
  return { client_secret, payment_intent_id };
};
```

```typescript
// Backend API - Create PaymentIntent with manual capture
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { amount, currency, booking_details } = req.body;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // £50 = 5000 pence
        currency: currency,
        capture_method: 'manual', // This creates the pre-auth hold
        payment_method_types: ['card'],
        metadata: {
          booking_type: 'table_reservation',
          customer_email: booking_details.email,
          booking_date: booking_details.date,
          party_size: booking_details.party_size.toString(),
          package_selection: booking_details.package || 'custom'
        },
        description: `Table booking deposit - ${booking_details.date}`
      });

      res.status(200).json({
        client_secret: paymentIntent.client_secret,
        payment_intent_id: paymentIntent.id
      });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

### 2. Confirm Payment (Authorize Funds)

```typescript
// Frontend - Confirm payment to authorize funds
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const confirmTableBookingPayment = async (
  client_secret: string, 
  payment_method_data: any
) => {
  const stripe = await stripePromise;
  
  const result = await stripe.confirmCardPayment(client_secret, {
    payment_method: payment_method_data
  });

  if (result.error) {
    throw new Error(result.error.message);
  }
  
  // Payment is now authorized (held) but not captured
  return result.paymentIntent;
};
```

### 3. Capture Funds (When Table Confirmed)

```typescript
// Backend API - Capture the authorized amount
export async function captureTableBookingDeposit(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId, {
      amount_to_capture: 5000 // Capture full £50 deposit
    });
    
    // Update booking status in database
    await updateBookingStatus(paymentIntentId, 'confirmed', 'deposit_captured');
    
    // Send confirmation email to customer
    await sendBookingConfirmationEmail(paymentIntent.metadata.customer_email);
    
    return {
      success: true,
      payment_intent: paymentIntent,
      status: 'captured'
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
```

### 4. Cancel Authorization (When No Availability)

```typescript
// Backend API - Cancel the authorization and release funds
export async function cancelTableBookingDeposit(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);
    
    // Update booking status in database
    await updateBookingStatus(paymentIntentId, 'cancelled', 'funds_released');
    
    // Send cancellation email to customer
    await sendBookingCancellationEmail(paymentIntent.metadata.customer_email);
    
    return {
      success: true,
      payment_intent: paymentIntent,
      status: 'cancelled'
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
```

## Database Schema

### Table Bookings Table
```sql
CREATE TABLE table_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  party_size INTEGER NOT NULL,
  package_selection VARCHAR(100),
  custom_package_details JSONB,
  venue_area VARCHAR(50), -- 'upstairs' or 'downstairs'
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
  payment_status VARCHAR(50) DEFAULT 'authorized', -- 'authorized', 'captured', 'cancelled'
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Frontend Form Integration

### React Hook for Payment Processing
```typescript
import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

export const useTableBookingPayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processBookingPayment = async (bookingData: TableBookingData) => {
    if (!stripe || !elements) return;
    
    setProcessing(true);
    setError(null);

    try {
      // 1. Create payment intent
      const { client_secret, payment_intent_id } = await createTableBookingPayment(bookingData);
      
      // 2. Confirm payment (authorize funds)
      const cardElement = elements.getElement(CardElement);
      
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${bookingData.firstName} ${bookingData.lastName}`,
            email: bookingData.email,
            phone: bookingData.phone
          }
        }
      });

      if (result.error) {
        setError(result.error.message);
        return { success: false };
      }

      // 3. Save booking to database with payment_intent_id
      await saveBookingRequest({
        ...bookingData,
        payment_intent_id: payment_intent_id,
        status: 'pending_confirmation'
      });

      return { 
        success: true, 
        payment_intent_id: payment_intent_id,
        booking_reference: generateBookingReference()
      };

    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setProcessing(false);
    }
  };

  return { processBookingPayment, processing, error };
};
```

## Webhook Implementation

### Handle Payment Status Updates
```typescript
// API route: /api/webhooks/stripe
import { buffer } from 'micro';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    try {
      const event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);

      switch (event.type) {
        case 'payment_intent.payment_failed':
          // Handle failed authorization
          await handlePaymentFailed(event.data.object);
          break;
          
        case 'payment_intent.canceled':
          // Handle cancelled authorization
          await handlePaymentCancelled(event.data.object);
          break;
          
        case 'payment_intent.succeeded':
          // Handle successful capture
          await handlePaymentCaptured(event.data.object);
          break;
      }

      res.json({ received: true });
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
```

## Admin Dashboard Integration

### Manual Booking Management
```typescript
// Admin component for managing table bookings
const TableBookingManager = () => {
  const [pendingBookings, setPendingBookings] = useState([]);

  const confirmBooking = async (paymentIntentId: string) => {
    const result = await fetch('/api/admin/capture-booking-deposit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payment_intent_id: paymentIntentId })
    });
    
    if (result.ok) {
      // Refresh bookings list
      fetchPendingBookings();
      toast.success('Booking confirmed and deposit captured');
    }
  };

  const cancelBooking = async (paymentIntentId: string, reason: string) => {
    const result = await fetch('/api/admin/cancel-booking-deposit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        payment_intent_id: paymentIntentId,
        cancellation_reason: reason
      })
    });
    
    if (result.ok) {
      fetchPendingBookings();
      toast.success('Booking cancelled and funds released');
    }
  };

  return (
    <div className="booking-manager">
      {pendingBookings.map(booking => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onConfirm={() => confirmBooking(booking.payment_intent_id)}
          onCancel={(reason) => cancelBooking(booking.payment_intent_id, reason)}
        />
      ))}
    </div>
  );
};
```

## Environment Variables

```env
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Database
DATABASE_URL=postgresql://...

# Email Service
SENDGRID_API_KEY=...
```

## Error Handling & Edge Cases

### Common Scenarios
1. **Authorization Expires**: Automatically cancelled after 7 days
2. **Partial Capture**: Not applicable for fixed £50 deposit
3. **Multiple Attempts**: Prevent duplicate payment intents for same booking
4. **Failed Authorization**: Handle declined cards gracefully
5. **Network Issues**: Implement retry logic with exponential backoff

### Monitoring & Logging
- Log all payment events with booking reference
- Monitor authorization expiry dates
- Alert on failed captures or cancellations
- Track conversion rates from authorization to capture

This implementation provides a complete pre-authorization system for table booking deposits, ensuring customers are only charged when their booking is confirmed while protecting the business from no-shows.