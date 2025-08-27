# Admin Dashboard Implementation Plan - The Backroom Leeds

## Current Status Assessment

### ✅ What's Already Available
- **Database Structure**: Complete Supabase schema with 4 main tables:
  - `table_bookings` - Table reservation management with payment tracking
  - `private_hire_inquiries` - Event booking inquiries 
  - `career_applications` - Job applications
  - `general_inquiries` - Contact form submissions and feedback
- **Database Interfaces**: TypeScript interfaces already defined in `src/lib/supabase.ts`
- **Admin Database Functions**: Basic admin functions like `getTableBookings()` and `getPendingInquiries()`
- **Row Level Security**: Properly configured with admin access policies
- **Authentication Infrastructure**: Supabase auth setup with service role access
- **Email System**: Working SendGrid integration for notifications

### ❌ What's Missing
- **Admin Dashboard UI**: No frontend dashboard exists
- **Authentication Flow**: No admin login/logout system
- **Data Management Interface**: No way to view/manage inquiries through UI
- **Status Management**: No interface to update inquiry statuses
- **Analytics/Reporting**: No overview or metrics dashboard

## Implementation Plan

### Phase 1: Core Infrastructure (2-3 hours)
1. **Authentication System**
   - Create admin login page (`/admin/login`)
   - Implement Supabase auth with email/password
   - Add admin role checking middleware
   - Create protected route wrapper

2. **Basic Layout & Navigation**
   - Admin dashboard layout with sidebar navigation
   - Header with user info and logout
   - Responsive design matching existing prohibition theme
   - Route structure: `/admin/*`

3. **Dashboard Overview**
   - Statistics cards (pending enquiries, recent bookings, etc.)
   - Quick action buttons
   - Recent activity feed

### Phase 2: Data Management (3-4 hours)
1. **Table Bookings Management**
   - List view with filtering and sorting
   - Detail view with customer info and booking details
   - **Stripe Payment Integration**:
     - **Confirm Booking Button**: Capture authorized £50 deposit via Stripe API
     - **Cancel Booking Button**: Release authorized payment (customer not charged)
     - Real-time payment status updates (authorized → captured/cancelled)
     - Payment history and transaction details
   - Status update functionality (pending → confirmed/cancelled)
   - Payment status tracking with visual indicators
   - Export capabilities

2. **Private Hire Inquiries**
   - Inquiry list with company/event details
   - Status management (enquiry → provisional → confirmed)
   - Quote generation interface
   - Event details management

3. **Career Applications**
   - Application list with filtering by job type
   - CV attachment handling
   - Status workflow (pending → reviewing → interviewed → hired/rejected)
   - Applicant communication tracking

4. **General Inquiries & Feedback**
   - Unified inbox for contact forms
   - Response tracking
   - Category filtering
   - Priority marking

### Phase 3: Advanced Features (2-3 hours)
1. **Communication Integration**
   - Direct email sending from admin panel
   - Email template management
   - Communication history tracking
   - Bulk email capabilities

2. **Analytics & Reporting**
   - Booking trends and statistics
   - Revenue tracking (for confirmed bookings)
   - Popular events/packages analysis
   - Customer acquisition metrics

3. **Settings & Configuration**
   - Email template management
   - System configuration
   - User management (if multiple admins needed)

## Stripe Payment Integration

### Current Payment Flow (Already Implemented)
1. **Customer Booking**: Customer fills table booking form
2. **Payment Authorization**: Stripe pre-authorizes £50 deposit (not charged)
3. **Database Storage**: Booking saved with `payment_status: 'authorized'`
4. **Email Notifications**: Customer and admin receive notifications

### Admin Dashboard Payment Actions
**For Each Table Booking with `payment_status: 'authorized'`:**

#### 1. Confirm Booking Action
```typescript
// When admin confirms table availability
const confirmBooking = async (paymentIntentId: string, bookingId: string) => {
  // 1. Capture the authorized payment via Stripe API
  const captureResult = await stripe.paymentIntents.capture(paymentIntentId);
  
  // 2. Update booking status in database
  await supabase
    .from('table_bookings')
    .update({ 
      status: 'confirmed', 
      payment_status: 'captured' 
    })
    .eq('id', bookingId);
    
  // 3. Send confirmation email to customer
  // 4. Update admin dashboard in real-time
}
```

#### 2. Cancel Booking Action
```typescript
// When no table availability
const cancelBooking = async (paymentIntentId: string, bookingId: string) => {
  // 1. Cancel the payment authorization via Stripe API
  const cancelResult = await stripe.paymentIntents.cancel(paymentIntentId);
  
  // 2. Update booking status in database
  await supabase
    .from('table_bookings')
    .update({ 
      status: 'cancelled', 
      payment_status: 'cancelled' 
    })
    .eq('id', bookingId);
    
  // 3. Send cancellation email explaining no availability
  // 4. Customer is never charged - authorization is released
}
```

### Backend API Endpoints Needed
```javascript
// POST /api/admin/bookings/:id/confirm
app.post('/api/admin/bookings/:id/confirm', async (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const { paymentIntentId } = req.body;
  
  try {
    // Capture the authorized payment
    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);
    
    // Update database, send emails, etc.
    res.json({ success: true, paymentIntent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /api/admin/bookings/:id/cancel
app.post('/api/admin/bookings/:id/cancel', async (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const { paymentIntentId } = req.body;
  
  try {
    // Cancel the payment authorization
    const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);
    
    // Update database, send emails, etc.
    res.json({ success: true, paymentIntent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### Admin UI Components

#### Payment Status Badges
- 🟡 **Authorized**: £50 pre-authorized, awaiting confirmation
- 🟢 **Captured**: Payment captured, booking confirmed  
- 🔴 **Cancelled**: Authorization released, customer not charged
- ⚪ **Pending**: No payment authorization yet

#### Booking Detail Actions
```jsx
<div className="payment-actions">
  {paymentStatus === 'authorized' && (
    <>
      <Button onClick={handleConfirmBooking} variant="default">
        ✅ Confirm Booking & Capture £50
      </Button>
      <Button onClick={handleCancelBooking} variant="destructive">
        ❌ Cancel - No Tables Available
      </Button>
    </>
  )}
  
  <PaymentHistory paymentIntentId={paymentIntentId} />
</div>
```

### Business Benefits
- **Instant Revenue**: Capture deposits immediately when confirming bookings
- **Customer Protection**: Only charge when service can be provided
- **Reduced Admin Work**: Single-click booking confirmation/cancellation
- **Professional Service**: Immediate email confirmations with payment status
- **Cash Flow**: Predictable revenue from confirmed bookings

## Technical Implementation Details

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite (existing stack)
- **UI Framework**: shadcn/ui (already integrated)
- **Styling**: Tailwind CSS with existing prohibition theme
- **Authentication**: Supabase Auth
- **Database**: Supabase (existing)
- **Icons**: Lucide React (existing)
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Query for data fetching
- **Tables**: @tanstack/react-table for advanced features

### Route Structure
```
/admin
├── /login                    # Admin authentication
├── /dashboard               # Overview & statistics
├── /bookings               # Table bookings management
│   ├── /                   # List view
│   └── /:id                # Detail view
├── /private-hire           # Private hire inquiries
│   ├── /                   # List view
│   └── /:id                # Detail view
├── /applications           # Career applications
│   ├── /                   # List view
│   └── /:id                # Detail view
├── /inquiries              # General inquiries & feedback
│   ├── /                   # List view
│   └── /:id                # Detail view
├── /analytics              # Reports & analytics
└── /settings               # Configuration
```

### Database Extensions Needed
```sql
-- Add admin users table if multiple admin accounts needed
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,
    role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin'))
);

-- Add communication log table
CREATE TABLE IF NOT EXISTS public.communications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    admin_user_id UUID REFERENCES public.admin_users(id),
    inquiry_type VARCHAR(20) NOT NULL, -- 'table_booking', 'private_hire', etc.
    inquiry_id UUID NOT NULL,
    communication_type VARCHAR(20) NOT NULL CHECK (communication_type IN ('email', 'phone', 'note')),
    subject VARCHAR(200),
    content TEXT,
    sent_at TIMESTAMP WITH TIME ZONE
);
```

### Component Architecture
```
src/
├── pages/
│   └── admin/              # Admin-specific pages
│       ├── AdminLogin.tsx
│       ├── AdminDashboard.tsx
│       ├── BookingsPage.tsx
│       ├── PrivateHirePage.tsx
│       ├── ApplicationsPage.tsx
│       └── InquiriesPage.tsx
├── components/
│   ├── admin/              # Admin-specific components
│   │   ├── Layout/
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AdminSidebar.tsx
│   │   │   └── AdminHeader.tsx
│   │   ├── Tables/
│   │   │   ├── BookingsTable.tsx
│   │   │   ├── InquiriesTable.tsx
│   │   │   └── ApplicationsTable.tsx
│   │   ├── Forms/
│   │   │   ├── StatusUpdateForm.tsx
│   │   │   └── EmailForm.tsx
│   │   ├── Stripe/
│   │   │   ├── PaymentActions.tsx
│   │   │   ├── PaymentStatusBadge.tsx
│   │   │   └── PaymentHistory.tsx
│   │   └── Dashboard/
│   │       ├── StatsCards.tsx
│   │       ├── RecentActivity.tsx
│   │       └── QuickActions.tsx
│   └── ui/                 # Existing shadcn/ui components
├── hooks/
│   └── admin/              # Admin-specific hooks
│       ├── useAdminAuth.ts
│       ├── useBookings.ts
│       ├── useInquiries.ts
│       └── useStats.ts
└── lib/
    ├── admin-auth.ts       # Admin authentication utilities
    └── admin-api.ts        # Admin API functions
```

### Security Considerations
1. **Authentication**: Supabase RLS policies ensure only authenticated admin users can access data
2. **Route Protection**: All admin routes wrapped with authentication checks
3. **Role-Based Access**: Different permission levels if multiple admin types needed
4. **API Security**: Service role key only used server-side, never exposed to client
5. **Data Validation**: All forms use Zod schemas for type-safe validation

### Integration Points
1. **Existing Email Service**: Reuse SendGrid integration for admin communications
2. **Database Schema**: Build on existing tables and interfaces
3. **Design System**: Maintain prohibition-era theme with gold/charcoal colors
4. **Component Library**: Use existing shadcn/ui components for consistency

## Development Timeline

### Estimated Total Time: 7-10 hours
- **Phase 1** (Core): 2-3 hours
- **Phase 2** (Data Management): 3-4 hours  
- **Phase 3** (Advanced Features): 2-3 hours

### Priorities
1. **Must Have**: Authentication, basic data viewing, status updates
2. **Should Have**: Email integration, filtering, analytics
3. **Nice to Have**: Advanced reporting, bulk operations, multi-admin support

## Benefits & Business Value

### Operational Efficiency
- **Centralized Management**: All inquiries in one place instead of email inbox
- **Status Tracking**: Clear workflow for each inquiry type
- **Response Time**: Faster response to customer inquiries
- **Data Organization**: Structured data instead of scattered emails

### Business Intelligence
- **Booking Patterns**: Understand peak times and popular packages
- **Conversion Tracking**: Monitor inquiry-to-booking conversion rates
- **Customer Insights**: Analyze customer preferences and feedback
- **Revenue Analytics**: Track booking values and trends

### Customer Experience
- **Professional Response**: Structured follow-up process
- **Faster Processing**: Streamlined workflow reduces response time
- **Consistent Communication**: Template-based professional responses
- **Better Service**: Complete customer history at fingertips

## Next Steps

1. **Review & Approve**: Review this plan and provide feedback/changes
2. **Design Mockups**: Create wireframes for key screens (optional)
3. **Implementation**: Begin with Phase 1 (Core Infrastructure)
4. **Testing**: Verify each phase before moving to next
5. **Training**: Brief admin users on new dashboard functionality
6. **Monitoring**: Track usage and gather feedback for improvements

## Future Enhancements (Post-Launch)

1. **Mobile App**: React Native admin app for mobile management
2. **Advanced Analytics**: More detailed reporting and business intelligence
3. **Integration**: Connect with POS systems, booking platforms
4. **Automation**: Auto-responses, status change triggers
5. **CRM Features**: Customer relationship management capabilities
6. **API Access**: External integrations and third-party tools

---

**Total Estimated Development Time: 7-10 hours**
**Recommended Implementation: Phased approach over 2-3 development sessions**
**Priority: High - Will significantly improve operational efficiency**