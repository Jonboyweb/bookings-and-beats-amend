-- Create table bookings table
CREATE TABLE IF NOT EXISTS public.table_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Payment information
    payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
    booking_reference VARCHAR(50) NOT NULL,
    
    -- Customer information
    customer_first_name VARCHAR(100) NOT NULL,
    customer_last_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    
    -- Booking details
    booking_date DATE NOT NULL,
    booking_time VARCHAR(50) NOT NULL,
    party_size INTEGER NOT NULL CHECK (party_size >= 2 AND party_size <= 25),
    
    -- Package information
    package_type VARCHAR(20) NOT NULL CHECK (package_type IN ('preset', 'custom')),
    selected_package VARCHAR(50),
    custom_spirits TEXT[], -- Array of selected custom spirits
    custom_champagne VARCHAR(100),
    venue_area VARCHAR(50) CHECK (venue_area IN ('upstairs', 'downstairs') OR venue_area IS NULL),
    special_requests TEXT,
    
    -- Status tracking
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    payment_status VARCHAR(20) DEFAULT 'authorized' CHECK (payment_status IN ('authorized', 'captured', 'cancelled'))
);

-- Create private hire inquiries table
CREATE TABLE IF NOT EXISTS public.private_hire_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Customer information
    customer_first_name VARCHAR(100) NOT NULL,
    customer_last_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    company VARCHAR(200),
    
    -- Event details
    event_date DATE NOT NULL,
    event_start_time TIME NOT NULL,
    event_end_time TIME NOT NULL,
    guest_count VARCHAR(50) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    venue_space VARCHAR(50) NOT NULL CHECK (venue_space IN ('private-room', 'main-room', 'full-venue')),
    requirements TEXT NOT NULL,
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'quoted', 'confirmed', 'cancelled'))
);

-- Create career applications table
CREATE TABLE IF NOT EXISTS public.career_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Applicant information
    applicant_first_name VARCHAR(100) NOT NULL,
    applicant_last_name VARCHAR(100) NOT NULL,
    applicant_email VARCHAR(255) NOT NULL,
    applicant_phone VARCHAR(20),
    
    -- Application details
    job_type VARCHAR(50) NOT NULL,
    experience_level VARCHAR(50) NOT NULL,
    availability VARCHAR(100) NOT NULL,
    cover_letter TEXT NOT NULL,
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'interviewed', 'hired', 'rejected'))
);

-- Create general inquiries table
CREATE TABLE IF NOT EXISTS public.general_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Customer information
    customer_first_name VARCHAR(100) NOT NULL,
    customer_last_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    
    -- Inquiry details
    inquiry_type VARCHAR(20) NOT NULL CHECK (inquiry_type IN ('general', 'feedback')),
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'closed'))
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_table_bookings_payment_intent ON public.table_bookings(payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_table_bookings_email ON public.table_bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_table_bookings_date ON public.table_bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_table_bookings_status ON public.table_bookings(status);

CREATE INDEX IF NOT EXISTS idx_private_hire_email ON public.private_hire_inquiries(customer_email);
CREATE INDEX IF NOT EXISTS idx_private_hire_date ON public.private_hire_inquiries(event_date);
CREATE INDEX IF NOT EXISTS idx_private_hire_status ON public.private_hire_inquiries(status);

CREATE INDEX IF NOT EXISTS idx_career_email ON public.career_applications(applicant_email);
CREATE INDEX IF NOT EXISTS idx_career_job_type ON public.career_applications(job_type);
CREATE INDEX IF NOT EXISTS idx_career_status ON public.career_applications(status);

CREATE INDEX IF NOT EXISTS idx_general_email ON public.general_inquiries(customer_email);
CREATE INDEX IF NOT EXISTS idx_general_type ON public.general_inquiries(inquiry_type);
CREATE INDEX IF NOT EXISTS idx_general_status ON public.general_inquiries(status);

-- Create updated_at trigger for table_bookings
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_table_bookings_updated_at 
    BEFORE UPDATE ON public.table_bookings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.table_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.private_hire_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.general_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is for form submissions)
-- Note: In production, you might want more restrictive policies
CREATE POLICY "Enable insert for all users" ON public.table_bookings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for all users" ON public.private_hire_inquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for all users" ON public.career_applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for all users" ON public.general_inquiries
    FOR INSERT WITH CHECK (true);

-- Admin policies (for future admin dashboard)
CREATE POLICY "Enable read for authenticated users" ON public.table_bookings
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read for authenticated users" ON public.private_hire_inquiries
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read for authenticated users" ON public.career_applications
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read for authenticated users" ON public.general_inquiries
    FOR SELECT USING (auth.role() = 'authenticated');