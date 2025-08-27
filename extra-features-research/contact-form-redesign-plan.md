# Contact Form Redesign Plan

Based on the example ContactPage.tsx and venue requirements, I'll transform the current simple contact form into a comprehensive, detailed form system.

## 1. New Form Structure & Components

### State Management
- Create React state for form data with TypeScript interface
- Add form validation and submission handling
- Include loading states and error handling
- Add success/confirmation screens

### Multi-Tab System
Replace simple form with 5 specialized contact tabs:
- **Table Bookings** (NEW) - Primary focus with date/time selectors and package options
- **Private Hire** - Enhanced with date/time fields for events  
- **Careers** - For job enquiries with selector for job type bar staff, bar support, management, sales & events staff, DJs, performers, Security
- **General Enquiry** - Standard contact form
- **Feedback** - Customer feedback and complaints

## 2. Table Booking Section (New Feature)

### Enhanced Fields
- Date selector for preferred booking date
- Time slot selection (different for Fri/Sat/Sun events)
- Party size selector (2-12 people based on table capacities)
- Preferred table selection or "Any available"

### Package Selection
Two options:
1. **Pre-set Packages** (radio buttons):
   - HUSH & SHUSH - £170 (Smirnoff, Prosecco, mixers, shots)
   - SPEAK WHISKEY TO ME - £280 (Jack Daniels, Bacardi, mixers)
   - AFTER HOURS - £400 (Grey Goose Martinis, Ciroc, mixers)
   - MIDNIGHT MADNESS - £580 (Premium spirits, Moet, Don Julio, Hennessy)

2. **Custom Selection** (checkbox + dropdown):
   - Toggle for "Build custom package"
   - Multi-select dropdowns for spirits, champagne, mixers
   - Live price calculator showing total

### Booking Terms Integration
- £50 deposit requirement notice
- 48-hour cancellation policy
- Priority admission and waitress service benefits

## 3. Private Hire Section Enhancements

### Additional Fields for Private Hire Tab
- Event date picker
- Preferred start/end times
- Expected guest count (with venue capacity options)
- Event type selector (Corporate, Birthday, Christmas, Wedding, etc.)
- Specific requirements textarea

### Venue Space Selection
- Full Venue (500 capacity) - £pricing
- Main Room (350 capacity) - upstairs 
- Private Room (150 capacity) - downstairs
- Multiple spaces option

## 4. Form Enhancements Across All Tabs

### Personal Information Section
- First Name & Last Name (required)
- Email Address (required)
- Phone Number (optional but recommended)
- Company/Organization (for corporate enquiries)

### Smart Field Adaptation
- Dynamic subject dropdowns based on selected tab
- Context-aware placeholder text
- Priority/urgency selector for time-sensitive requests
- Marketing consent checkbox

### UI/UX Improvements
- Tab-based navigation with icons and descriptions
- Progress indicators and validation
- Mobile-responsive design
- Loading spinners and success states
- Error handling with helpful messages

## 5. Technical Implementation

### Required Dependencies
- Add React useState and useEffect hooks
- Date picker component (or HTML5 date input)
- Form validation library integration
- Price calculation utilities

### Form Styling
- Match existing prohibition-era design system
- Use shadcn/ui components consistently
- Gradient cards and luxury transitions
- Primary/secondary button variants

### Data Handling
- Form submission to info@backroomleeds.co.uk
- Structured data format based on enquiry type  
- Include booking reference numbers for table bookings
- Auto-response email templates

## 6. Integration Points

### Existing Components
- Maintain contact information cards (address, phone, hours)
- Keep the "Find Us" map section  
- Preserve current styling and layout structure

### New Features
- Table availability checking (future enhancement)
- Price calculation for custom packages
- Event calendar integration for private hire
- Automated confirmation emails

This plan transforms the simple contact form into a comprehensive booking and enquiry system while maintaining the site's design consistency and adding significant business value through structured data collection and enhanced user experience.

## Implementation Decisions (Confirmed)

1. **Visual Table Selection**: No visual table selection interface - keep it simple with dropdown/text selection
2. **Availability Checking**: Just booking requests - no real-time availability checking needed
3. **Payment Integration**: YES - Implement Stripe payment integration for £50 pre-authorization deposit system:
   - Pre-authorize £50 when booking request is submitted
   - Capture funds when table is confirmed by venue
   - Release authorization if no availability
   - See `stripe-preauth-implementation.md` for technical details
4. **Validation Rules**: Standard form validation (TBD during implementation)
5. **Private Hire Pricing**: Keep as "contact for quote" - no pricing display needed

## Next Steps

1. Implement multi-tab contact form structure
2. Build table booking section with package selection
3. Integrate Stripe payment processing for deposits
4. Add enhanced private hire form fields
5. Implement careers section with job type selectors
6. Set up form validation and submission handling