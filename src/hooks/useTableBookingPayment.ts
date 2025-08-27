import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { supabaseService } from '@/lib/supabase';
import type { TableBooking } from '@/lib/supabase';

// Load Stripe with your actual publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51RgoEG2cvKVqmxJpCUWCSmJXbxAE0DdTdmD3YHIaF9xw9R7mJw8rbGPCSsX2890yjLZ2LkEnI2FmT7Y1LADa421c00iq9QfyrK');

interface TableBookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bookingDate: string;
  bookingTime: string;
  partySize: string;
  packageType: 'preset' | 'custom';
  selectedPackage?: string;
  customSpirits?: string[];
  customChampagne?: string;
  venueArea: string;
  specialRequests: string;
}

interface PaymentResult {
  success: boolean;
  paymentIntentId?: string;
  bookingReference?: string;
  error?: string;
}

export const useTableBookingPayment = () => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock API call to create payment intent (would be actual API endpoint)
  const createPaymentIntent = async (bookingData: TableBookingData) => {
    // In production, this would be an actual API call to your backend
    // which creates a Stripe PaymentIntent with manual capture
    
    const mockResponse = await new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve({
          clientSecret: 'pi_mock_client_secret_demo',
          paymentIntentId: 'pi_mock_' + Date.now(),
          success: true
        });
      }, 1000); // Simulate API delay
    });

    return mockResponse;
  };

  // Mock payment confirmation (would use actual Stripe)
  const confirmPayment = async (clientSecret: string, bookingData: TableBookingData) => {
    // In production, this would use actual Stripe confirmation
    const mockConfirmation = await new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        const success = Math.random() > 0.1; // 90% success rate for demo
        
        if (success) {
          resolve({
            paymentIntent: {
              id: clientSecret.replace('pi_mock_client_secret_', 'pi_confirmed_'),
              status: 'requires_capture', // Pre-authorized but not captured
              amount: 5000, // £50.00 in pence
              metadata: {
                booking_type: 'table_reservation',
                customer_email: bookingData.email,
                booking_date: bookingData.bookingDate,
                party_size: bookingData.partySize
              }
            }
          });
        } else {
          reject(new Error('Your card was declined. Please try another payment method.'));
        }
      }, 2000); // Simulate payment processing delay
    });

    return mockConfirmation;
  };

  // Main payment processing function
  const processTableBookingPayment = async (bookingData: TableBookingData): Promise<PaymentResult> => {
    setProcessing(true);
    setError(null);

    try {
      // Step 1: Create payment intent with manual capture
      console.log('Creating payment intent for table booking...');
      const { clientSecret, paymentIntentId } = await createPaymentIntent(bookingData);

      // Step 2: Confirm payment (authorize funds)
      console.log('Authorizing payment...');
      const result = await confirmPayment(clientSecret, bookingData);

      // Step 3: Save booking to Supabase database
      const bookingReference = `BR${Date.now().toString().slice(-6)}`;
      console.log('Saving booking with reference:', bookingReference);

      try {
        const supabaseBookingData: Omit<TableBooking, 'id' | 'created_at' | 'updated_at'> = {
          payment_intent_id: paymentIntentId,
          booking_reference: bookingReference,
          customer_first_name: bookingData.firstName,
          customer_last_name: bookingData.lastName,
          customer_email: bookingData.email,
          customer_phone: bookingData.phone || undefined,
          booking_date: bookingData.bookingDate,
          booking_time: bookingData.bookingTime,
          party_size: parseInt(bookingData.partySize),
          package_type: bookingData.packageType,
          selected_package: bookingData.selectedPackage || undefined,
          custom_spirits: bookingData.customSpirits || undefined,
          custom_champagne: bookingData.customChampagne || undefined,
          venue_area: bookingData.venueArea || undefined,
          special_requests: bookingData.specialRequests || undefined,
          status: 'pending',
          payment_status: 'authorized'
        };

        const savedBooking = await supabaseService.createTableBooking(supabaseBookingData);
        console.log('Booking saved to database:', savedBooking);
      } catch (dbError) {
        console.error('Failed to save booking to database:', dbError);
        // Continue with the flow even if database save fails
        // In production, you might want to handle this differently
      }

      console.log('Table booking payment authorized successfully:', {
        paymentIntentId,
        bookingReference,
        status: 'payment_authorized_pending_confirmation'
      });

      return {
        success: true,
        paymentIntentId,
        bookingReference
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed. Please try again.';
      setError(errorMessage);
      console.error('Table booking payment failed:', err);
      
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setProcessing(false);
    }
  };

  return {
    processTableBookingPayment,
    processing,
    error,
    clearError: () => setError(null)
  };
};

// Mock admin functions for payment capture/cancel (would be backend endpoints)
export const mockAdminFunctions = {
  // Capture the pre-authorized payment when table is confirmed
  capturePayment: async (paymentIntentId: string) => {
    console.log(`[ADMIN] Capturing payment: ${paymentIntentId}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      status: 'succeeded',
      message: 'Payment captured successfully - table booking confirmed'
    };
  },

  // Cancel the pre-authorization when no tables available
  cancelPayment: async (paymentIntentId: string) => {
    console.log(`[ADMIN] Canceling payment authorization: ${paymentIntentId}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      status: 'canceled',
      message: 'Payment authorization canceled - deposit released'
    };
  }
};