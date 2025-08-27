# Stripe Testing Guide

Your Stripe configuration has been set up with test keys for safe development and testing.

## Environment Setup

The `.env` file has been configured with your Stripe test keys:

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key  
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Test Card Numbers

Use these test card numbers to simulate different payment scenarios:

### Successful Payments
- **Visa**: `4242 4242 4242 4242`
- **Mastercard**: `5555 5555 5555 4444`
- **American Express**: `3782 8224 6310 005`

### Failed Payments (for testing error handling)
- **Declined**: `4000 0000 0000 0002`
- **Insufficient Funds**: `4000 0000 0000 9995`
- **Invalid CVC**: `4000 0000 0000 0127`

### Test Details
- **Expiry**: Any future date (e.g., `12/26`)
- **CVC**: Any 3-4 digit number (e.g., `123`)
- **ZIP**: Any 5-digit number (e.g., `12345`)

## Current Implementation

The table booking form currently uses **mock Stripe integration** that simulates the payment authorization flow:

1. **Payment Intent Creation**: Simulated with demo data
2. **Payment Authorization**: Mock 90% success rate for testing
3. **Database Storage**: Real Supabase integration saves booking details
4. **Payment States**: Proper UI states for processing/success/error

## Testing the Table Booking Flow

1. Navigate to the Contact section
2. Select "Table Bookings" tab
3. Fill in all required fields:
   - Personal information
   - Booking date and event night
   - Party size
   - Select a drink package (preset or custom)
4. Click "Authorize £50 Deposit & Submit Booking"
5. Watch the payment processing simulation
6. See success state with booking reference

## Next Steps for Real Stripe Integration

To integrate with actual Stripe APIs (when ready for production):

1. **Create Backend API**: Set up endpoints for creating/capturing PaymentIntents
2. **Update Frontend**: Replace mock functions with real API calls
3. **Add Webhook Handling**: Process payment status updates
4. **Test with Real Cards**: Use Stripe's test mode with actual API calls

## Security Notes

- ✅ `.env` file is added to `.gitignore` to prevent committing secrets
- ✅ Only publishable key is exposed to frontend (safe)
- ✅ Secret key would be used in backend only (not implemented yet)
- ✅ Test keys are used (safe for development)

## Current Status

- **Frontend Integration**: ✅ Complete with mock Stripe simulation
- **Database Integration**: ✅ Complete with Supabase
- **Payment Authorization**: ✅ Simulated (ready for real Stripe)
- **Error Handling**: ✅ Complete
- **UI/UX Flow**: ✅ Complete with all states