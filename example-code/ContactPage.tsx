import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Briefcase, 
  HelpCircle, 
  Search,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  category: string;
  message: string;
  urgency: string;
  marketingConsent: boolean;
}

function ContactPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: '',
    urgency: 'normal',
    marketingConsent: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      // In a real app, this would send to a contact/enquiries API endpoint
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      setSubmitted(true);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      category: activeTab,
      message: '',
      urgency: 'normal',
      marketingConsent: false
    });
    setSubmitted(false);
    setError(null);
  };

  const contactInfo = {
    address: {
      line1: 'The Backroom',
      line2: 'Hidden Location',
      city: 'Leeds',
      postcode: 'LS1 2AB',
      country: 'United Kingdom'
    },
    phone: '+44 113 234 5678',
    email: 'hello@backroomleeds.co.uk',
    hours: {
      weekdays: 'Monday - Thursday: 6:00 PM - 2:00 AM',
      weekend: 'Friday - Saturday: 6:00 PM - 3:00 AM',
      sunday: 'Sunday: Closed'
    }
  };

  const contactTabs = [
    {
      id: 'general',
      label: 'General Enquiry',
      icon: MessageSquare,
      description: 'General questions and information'
    },
    {
      id: 'events',
      label: 'Private Events',
      icon: Briefcase,
      description: 'Corporate and private hire enquiries'
    },
    {
      id: 'lost-property',
      label: 'Lost Property',
      icon: Search,
      description: 'Items left at the venue'
    },
    {
      id: 'careers',
      label: 'Careers',
      icon: HelpCircle,
      description: 'Job opportunities and applications'
    },
    {
      id: 'feedback',
      label: 'Feedback',
      icon: MessageSquare,
      description: 'Compliments, complaints, and suggestions'
    }
  ];

  const getFormFields = () => {
    switch (activeTab) {
      case 'events':
        return {
          subjects: [
            'Corporate Event Enquiry',
            'Wedding Reception',
            'Birthday Party',
            'Product Launch',
            'Networking Event',
            'Other Private Event'
          ],
          placeholder: 'Please provide details about your event including date, guest count, budget, and any specific requirements...'
        };
      case 'lost-property':
        return {
          subjects: [
            'Lost Phone/Device',
            'Lost Clothing/Accessories',
            'Lost Bag/Wallet',
            'Lost Jewelry',
            'Other Item'
          ],
          placeholder: 'Please describe the item(s) you lost, when you visited, and any other details that might help us locate it...'
        };
      case 'careers':
        return {
          subjects: [
            'Bartender Position',
            'Security Role',
            'Event Staff',
            'Management Position',
            'DJ/Entertainment',
            'Kitchen Staff',
            'General Application'
          ],
          placeholder: 'Please tell us about your experience, availability, and why you want to work at The Backroom...'
        };
      case 'feedback':
        return {
          subjects: [
            'Excellent Service',
            'Event Feedback',
            'Service Complaint',
            'Facility Issue',
            'Staff Feedback',
            'Suggestion'
          ],
          placeholder: 'Please share your feedback about your experience at The Backroom. Your input helps us improve...'
        };
      default:
        return {
          subjects: [
            'Booking Information',
            'Event Details',
            'Membership Enquiry',
            'Accessibility Information',
            'General Question',
            'Other'
          ],
          placeholder: 'Please provide details about your enquiry and we will get back to you as soon as possible...'
        };
    }
  };

  const formFields = getFormFields();

  if (submitted) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="card-speakeasy p-8">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-display text-gold mb-4">
              Message Sent
            </h2>
            <p className="text-champagne-antique mb-6">
              Thank you for contacting The Backroom. We've received your message and 
              will respond within 24 hours.
            </p>
            <div className="space-y-4">
              <button 
                onClick={resetForm}
                className="btn-primary w-full"
              >
                Send Another Message
              </button>
              <a href="/" className="btn-secondary w-full text-center block">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      
      {/* Hero Section */}
      <section className="relative py-20 bg-black-charcoal">
        <div className="absolute inset-0 bg-art-deco-pattern opacity-10"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-display text-gradient-gold mb-6">
            Get in Touch
          </h1>
          <div className="chevron-divider mb-6"></div>
          <p className="text-xl text-champagne-antique max-w-3xl mx-auto">
            We're here to help with any questions about The Backroom experience
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            {/* Address */}
            <div className="card-speakeasy p-6 text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-display text-champagne mb-4">
                Visit Us
              </h3>
              <div className="text-champagne-antique space-y-1">
                <p>{contactInfo.address.line1}</p>
                <p>{contactInfo.address.line2}</p>
                <p>{contactInfo.address.city}</p>
                <p>{contactInfo.address.postcode}</p>
                <p>{contactInfo.address.country}</p>
              </div>
            </div>
            
            {/* Contact Details */}
            <div className="card-speakeasy p-6 text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-display text-champagne mb-4">
                Contact
              </h3>
              <div className="space-y-3">
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="block text-champagne hover:text-gold transition-colors"
                >
                  {contactInfo.phone}
                </a>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="block text-champagne hover:text-gold transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
            
            {/* Opening Hours */}
            <div className="card-speakeasy p-6 text-center">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-xl font-display text-champagne mb-4">
                Opening Hours
              </h3>
              <div className="text-champagne-antique space-y-2 text-sm">
                <p>{contactInfo.hours.weekdays}</p>
                <p>{contactInfo.hours.weekend}</p>
                <p>{contactInfo.hours.sunday}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-black-charcoal">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display text-gold mb-6">
                Send Us a Message
              </h2>
              <p className="text-champagne-antique max-w-2xl mx-auto">
                Choose the category that best describes your enquiry for the fastest response
              </p>
            </div>
            
            {/* Contact Tabs */}
            <div className="mb-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {contactTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setFormData(prev => ({ ...prev, category: tab.id }));
                      }}
                      className={`p-4 rounded-lg border transition-all text-center ${
                        activeTab === tab.id
                          ? 'border-gold bg-gold/10 text-gold'
                          : 'border-gold/30 text-champagne-antique hover:border-gold/50 hover:text-champagne'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-xs font-medium">{tab.label}</div>
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-4 p-4 bg-black/50 rounded-lg">
                <p className="text-champagne-antique text-sm text-center">
                  {contactTabs.find(tab => tab.id === activeTab)?.description}
                </p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="card-speakeasy p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-medium text-champagne mb-4">
                    Your Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-champagne mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="form-input w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-champagne mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="form-input w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-champagne mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-champagne mb-2">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input w-full"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Enquiry Details */}
                <div>
                  <h3 className="text-lg font-medium text-champagne mb-4">
                    Your Enquiry
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-champagne mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="form-input w-full"
                        required
                      >
                        <option value="">Select subject</option>
                        {formFields.subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-champagne mb-2">
                        Priority
                      </label>
                      <select
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="form-input w-full"
                      >
                        <option value="low">Low - General enquiry</option>
                        <option value="normal">Normal - Standard response</option>
                        <option value="high">High - Time sensitive</option>
                        <option value="urgent">Urgent - Same day response needed</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-champagne mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="form-input w-full"
                      placeholder={formFields.placeholder}
                      required
                    />
                  </div>
                </div>
                
                {/* Marketing Consent */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <label className="text-sm text-champagne-antique">
                    I would like to receive updates about events and special offers from The Backroom
                  </label>
                </div>
                
                {/* Error Display */}
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  </div>
                )}
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full flex items-center justify-center disabled:opacity-50"
                >
                  {submitting ? (
                    <LoadingSpinner size="small" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display text-gold mb-6">
            Need Immediate Assistance?
          </h2>
          <p className="text-champagne-antique mb-8 max-w-2xl mx-auto">
            For urgent matters or if you prefer to speak with someone directly
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a 
              href={`tel:${contactInfo.phone}`}
              className="btn-primary flex items-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
            <a 
              href={`mailto:${contactInfo.email}`}
              className="btn-secondary flex items-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Send Email
            </a>
          </div>
          
          <div className="mt-8 text-sm text-champagne-antique">
            <p>Our team typically responds to enquiries within 24 hours</p>
            <p>For urgent matters during opening hours, please call directly</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;