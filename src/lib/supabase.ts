import { createClient } from '@supabase/supabase-js';

// Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://127.0.0.1:54321';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database interfaces for type safety
export interface TableBooking {
  id?: string;
  created_at?: string;
  updated_at?: string;
  payment_intent_id: string;
  booking_reference: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone?: string;
  booking_date: string;
  booking_time: string;
  party_size: number;
  package_type: 'preset' | 'custom';
  selected_package?: string;
  custom_spirits?: string[];
  custom_champagne?: string;
  venue_area?: string;
  special_requests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_status: 'authorized' | 'captured' | 'cancelled';
}

export interface PrivateHireInquiry {
  id?: string;
  created_at?: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone?: string;
  company?: string;
  event_date: string;
  event_start_time: string;
  event_end_time: string;
  guest_count: string;
  event_type: string;
  venue_space: string;
  requirements: string;
  status: 'pending' | 'quoted' | 'confirmed' | 'cancelled';
}

export interface CareerApplication {
  id?: string;
  created_at?: string;
  applicant_first_name: string;
  applicant_last_name: string;
  applicant_email: string;
  applicant_phone?: string;
  job_type: string;
  experience_level: string;
  availability: string;
  cover_letter: string;
  status: 'pending' | 'reviewing' | 'interviewed' | 'hired' | 'rejected';
}

export interface GeneralInquiry {
  id?: string;
  created_at?: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone?: string;
  inquiry_type: 'general' | 'feedback';
  subject: string;
  message: string;
  status: 'pending' | 'responded' | 'closed';
}

// Database service functions
export const supabaseService = {
  // Table bookings
  async createTableBooking(booking: Omit<TableBooking, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('table_bookings')
      .insert([booking])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateTableBookingStatus(paymentIntentId: string, status: string, paymentStatus: string) {
    const { data, error } = await supabase
      .from('table_bookings')
      .update({ status, payment_status: paymentStatus, updated_at: new Date().toISOString() })
      .eq('payment_intent_id', paymentIntentId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Private hire inquiries
  async createPrivateHireInquiry(inquiry: Omit<PrivateHireInquiry, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('private_hire_inquiries')
      .insert([inquiry])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Career applications
  async createCareerApplication(application: Omit<CareerApplication, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('career_applications')
      .insert([application])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // General inquiries
  async createGeneralInquiry(inquiry: Omit<GeneralInquiry, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('general_inquiries')
      .insert([inquiry])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Admin functions
  async getTableBookings(limit = 50) {
    const { data, error } = await supabase
      .from('table_bookings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async getPendingInquiries() {
    const { data, error } = await supabase
      .from('general_inquiries')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};