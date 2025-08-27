import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTableBookingPayment } from "@/hooks/useTableBookingPayment";
import { supabaseService } from "@/lib/supabase";
import { emailService } from "@/lib/emailService";
import type { PrivateHireInquiry, CareerApplication, GeneralInquiry } from "@/lib/supabase";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Briefcase, 
  Calendar,
  Users,
  HelpCircle,
  CreditCard,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  category: string;
  // Table booking specific fields
  bookingDate: string;
  bookingTime: string;
  partySize: string;
  packageType: 'preset' | 'custom';
  selectedPackage: string;
  customSpirits: string[];
  customChampagne: string;
  venueArea: string;
  specialRequests: string;
  // Private hire specific fields
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  guestCount: string;
  eventType: string;
  venueSpace: string;
  company: string;
  privateHireRequirements: string;
  // Careers specific fields
  jobType: string;
  experience: string;
  availability: string;
  resumeFile: string;
  coverLetter: string;
}

const Contact = () => {
  const [activeTab, setActiveTab] = useState('table-bookings');
  const [paymentStep, setPaymentStep] = useState<'form' | 'payment' | 'success' | 'error'>('form');
  const [bookingResult, setBookingResult] = useState<{paymentIntentId?: string; bookingReference?: string} | null>(null);
  
  const { processTableBookingPayment, processing, error: paymentError, clearError } = useTableBookingPayment();
  
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'table-bookings',
    bookingDate: '',
    bookingTime: '',
    partySize: '',
    packageType: 'preset',
    selectedPackage: '',
    customSpirits: [],
    customChampagne: '',
    venueArea: '',
    specialRequests: '',
    eventDate: '',
    eventStartTime: '',
    eventEndTime: '',
    guestCount: '',
    eventType: '',
    venueSpace: '',
    company: '',
    privateHireRequirements: '',
    jobType: '',
    experience: '',
    availability: '',
    resumeFile: '',
    coverLetter: ''
  });

  const contactTabs = [
    {
      id: 'table-bookings',
      label: 'Table Bookings',
      icon: Calendar,
      description: 'Reserve your table with drink packages'
    },
    {
      id: 'private-hire',
      label: 'Private Hire',
      icon: Briefcase,
      description: 'Corporate and private events'
    },
    {
      id: 'careers',
      label: 'Careers',
      icon: Users,
      description: 'Job opportunities and applications'
    },
    {
      id: 'general',
      label: 'General Enquiry',
      icon: MessageSquare,
      description: 'General questions and information'
    },
    {
      id: 'feedback',
      label: 'Feedback',
      icon: HelpCircle,
      description: 'Compliments and suggestions'
    }
  ];

  const packageOptions = [
    {
      id: 'hush-shush',
      name: 'HUSH & SHUSH',
      price: 170,
      description: 'Bottle of Smirnoff, 2 jugs mixer, Bottle of Prosecco, 8 Tequila Rose shots'
    },
    {
      id: 'speak-whiskey',
      name: 'SPEAK WHISKEY TO ME',
      price: 280,
      description: 'Bottle of Jack Daniels, Bottle of Bacardi Spiced, 4 jugs mixer'
    },
    {
      id: 'after-hours',
      name: 'AFTER HOURS',
      price: 400,
      description: '8 Grey Goose Espresso Martinis, Bottle of Ciroc, Bottle of Ciroc Flavours, 4 jugs mixer'
    },
    {
      id: 'midnight-madness',
      name: 'MIDNIGHT MADNESS',
      price: 580,
      description: 'Premium Spirit, Moet, Don Julio Blanco, Hennessy VS, 6 jugs mixer'
    }
  ];

  const bottleMenu = {
    vodka: [
      { name: 'Smirnoff', price: 120 },
      { name: 'Belvedere', price: 160 },
      { name: 'Ciroc', price: 160 },
      { name: 'Grey Goose', price: 180 }
    ],
    rum: [
      { name: 'Bacardi', price: 140 },
      { name: 'Havana 7', price: 160 }
    ],
    gin: [
      { name: 'Tanqueray', price: 130 },
      { name: 'Hendricks', price: 150 }
    ],
    champagne: [
      { name: 'Perrier Jouet', price: 85 },
      { name: 'Moet', price: 90 },
      { name: 'Dom Perignon', price: 250 }
    ],
    whiskey: [
      { name: 'Jack Daniels', price: 160 },
      { name: 'Johnnie Walker Black', price: 170 }
    ]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCustomSpiritsChange = (spirit: string) => {
    setFormData(prev => ({
      ...prev,
      customSpirits: prev.customSpirits.includes(spirit)
        ? prev.customSpirits.filter(s => s !== spirit)
        : [...prev.customSpirits, spirit]
    }));
  };

  const calculateCustomPackagePrice = () => {
    let total = 0;
    formData.customSpirits.forEach(spirit => {
      const [category, name] = spirit.split(':');
      const item = bottleMenu[category as keyof typeof bottleMenu]?.find(item => item.name === name);
      if (item) total += item.price;
    });
    if (formData.customChampagne) {
      const champagne = bottleMenu.champagne.find(item => item.name === formData.customChampagne);
      if (champagne) total += champagne.price;
    }
    return total;
  };

  const validateForm = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // Common validation
    if (!formData.firstName) errors.push('First name is required');
    if (!formData.lastName) errors.push('Last name is required');
    if (!formData.email) errors.push('Email is required');
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) errors.push('Invalid email format');
    
    // Tab-specific validation
    switch (activeTab) {
      case 'table-bookings':
        if (!formData.bookingDate) errors.push('Booking date is required');
        if (!formData.bookingTime) errors.push('Event night is required');
        if (!formData.partySize) errors.push('Party size is required');
        if (formData.packageType === 'preset' && !formData.selectedPackage) {
          errors.push('Please select a drink package');
        }
        if (formData.packageType === 'custom' && formData.customSpirits.length === 0) {
          errors.push('Please select at least one spirit for custom package');
        }
        break;
        
      case 'private-hire':
        if (!formData.eventDate) errors.push('Event date is required');
        if (!formData.eventStartTime) errors.push('Start time is required');
        if (!formData.eventEndTime) errors.push('End time is required');
        if (!formData.eventType) errors.push('Event type is required');
        if (!formData.guestCount) errors.push('Guest count is required');
        if (!formData.venueSpace) errors.push('Venue space selection is required');
        if (!formData.privateHireRequirements) errors.push('Event requirements are required');
        // Validate time logic
        if (formData.eventStartTime && formData.eventEndTime && formData.eventStartTime >= formData.eventEndTime) {
          errors.push('End time must be after start time');
        }
        break;
        
      case 'careers':
        if (!formData.jobType) errors.push('Please select a job position');
        if (!formData.experience) errors.push('Please select your experience level');
        if (!formData.availability) errors.push('Please select your availability');
        if (!formData.coverLetter) errors.push('Please tell us about yourself');
        break;
        
      case 'general':
      case 'feedback':
        if (!formData.subject) errors.push('Please select a subject');
        if (!formData.message) errors.push('Please enter your message');
        break;
    }
    
    return { isValid: errors.length === 0, errors };
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForm();
    if (!validation.isValid) {
      alert('Please correct the following:\n' + validation.errors.join('\n'));
      return;
    }
    
    if (activeTab === 'table-bookings') {
      setPaymentStep('payment');
      clearError();

      try {
        const result = await processTableBookingPayment({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          bookingDate: formData.bookingDate,
          bookingTime: formData.bookingTime,
          partySize: formData.partySize,
          packageType: formData.packageType,
          selectedPackage: formData.selectedPackage,
          customSpirits: formData.customSpirits,
          customChampagne: formData.customChampagne,
          venueArea: formData.venueArea,
          specialRequests: formData.specialRequests
        });

        if (result.success) {
          setBookingResult({
            paymentIntentId: result.paymentIntentId,
            bookingReference: result.bookingReference
          });
          setPaymentStep('success');
        } else {
          setPaymentStep('error');
        }
      } catch (err) {
        setPaymentStep('error');
      }
    } else {
      // Handle other form types with Supabase integration
      try {
        console.log('Submitting form for:', activeTab);
        
        if (activeTab === 'private-hire') {
          const privateHireData: Omit<PrivateHireInquiry, 'id' | 'created_at'> = {
            customer_first_name: formData.firstName,
            customer_last_name: formData.lastName,
            customer_email: formData.email,
            customer_phone: formData.phone || undefined,
            company: formData.company || undefined,
            event_date: formData.eventDate,
            event_start_time: formData.eventStartTime,
            event_end_time: formData.eventEndTime,
            guest_count: formData.guestCount,
            event_type: formData.eventType,
            venue_space: formData.venueSpace,
            requirements: formData.privateHireRequirements,
            status: 'pending'
          };
          
          const result = await supabaseService.createPrivateHireInquiry(privateHireData);
          console.log('Private hire inquiry created:', result);
          
          // Send confirmation email to customer
          const emailData = emailService.generateEmailContent(formData, 'private-hire');
          await emailService.sendConfirmationEmail(emailData);
          
          // Send admin notification
          await emailService.sendAdminNotification(formData, 'Private Hire');
          
        } else if (activeTab === 'careers') {
          const careerData: Omit<CareerApplication, 'id' | 'created_at'> = {
            applicant_first_name: formData.firstName,
            applicant_last_name: formData.lastName,
            applicant_email: formData.email,
            applicant_phone: formData.phone || undefined,
            job_type: formData.jobType,
            experience_level: formData.experience,
            availability: formData.availability,
            cover_letter: formData.coverLetter,
            status: 'pending'
          };
          
          const result = await supabaseService.createCareerApplication(careerData);
          console.log('Career application created:', result);
          
          // Send confirmation email to applicant
          const emailData = emailService.generateEmailContent(formData, 'careers');
          await emailService.sendConfirmationEmail(emailData);
          
          // Send admin notification
          await emailService.sendAdminNotification(formData, 'Career Application');
          
        } else if (activeTab === 'general' || activeTab === 'feedback') {
          const generalData: Omit<GeneralInquiry, 'id' | 'created_at'> = {
            customer_first_name: formData.firstName,
            customer_last_name: formData.lastName,
            customer_email: formData.email,
            customer_phone: formData.phone || undefined,
            inquiry_type: activeTab as 'general' | 'feedback',
            subject: formData.subject,
            message: formData.message,
            status: 'pending'
          };
          
          const result = await supabaseService.createGeneralInquiry(generalData);
          console.log('General inquiry created:', result);
          
          // Send confirmation email to customer
          const emailData = emailService.generateEmailContent(formData, activeTab as 'general' | 'feedback');
          await emailService.sendConfirmationEmail(emailData);
          
          // Send admin notification
          await emailService.sendAdminNotification(formData, activeTab === 'general' ? 'General Enquiry' : 'Feedback');
        }
        
        // Show success message
        alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} enquiry submitted successfully!\n\nWe'll get back to you within 24 hours.`);
        
        // Reset form after successful submission
        const resetData = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          category: activeTab,
          bookingDate: '',
          bookingTime: '',
          partySize: '',
          packageType: 'preset' as 'preset' | 'custom',
          selectedPackage: '',
          customSpirits: [],
          customChampagne: '',
          venueArea: '',
          specialRequests: '',
          eventDate: '',
          eventStartTime: '',
          eventEndTime: '',
          guestCount: '',
          eventType: '',
          venueSpace: '',
          company: '',
          privateHireRequirements: '',
          jobType: '',
          experience: '',
          availability: '',
          resumeFile: '',
          coverLetter: ''
        };
        setFormData(resetData);
        
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Sorry, there was an error submitting your enquiry. Please try again or contact us directly at info@backroomleeds.co.uk');
      }
    }
  };

  const resetBookingFlow = () => {
    setPaymentStep('form');
    setBookingResult(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      category: activeTab,
      bookingDate: '',
      bookingTime: '',
      partySize: '',
      packageType: 'preset',
      selectedPackage: '',
      customSpirits: [],
      customChampagne: '',
      venueArea: '',
      specialRequests: '',
      eventDate: '',
      eventStartTime: '',
      eventEndTime: '',
      guestCount: '',
      eventType: '',
      venueSpace: '',
      company: '',
      privateHireRequirements: '',
      jobType: '',
      experience: '',
      availability: '',
      resumeFile: '',
      coverLetter: ''
    });
    clearError();
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["50a Call Lane, Leeds LS1 6DT", "Hidden under the railway bridge", "Bottom of Call Lane"]
    },
    {
      icon: Phone,
      title: "Phone", 
      details: ["0113 2438666", "Available during opening hours"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@backroomleeds.co.uk", "Response within 24 hours"]
    },
    {
      icon: Clock,
      title: "Opening Hours",
      details: ["Friday & Saturday: 11pm - 6am", "Sunday: 11pm - 5am", "Private hire: 7 days a week"]
    }
  ];

  const enquiryTypes = [
    {
      icon: MessageSquare,
      title: "Table Bookings",
      description: "Reserve your table for Friday, Saturday or Sunday nights with our drink packages",
      action: "Book Table"
    },
    {
      icon: Briefcase,
      title: "Private Hire",
      description: "Corporate events, birthday parties, Christmas parties - no room hire fee Thu-Sun",
      action: "Get Quote"
    },
    {
      icon: Mail,
      title: "DJ Bookings",
      description: "DJ submissions and bookings for events. DJ hire available from £85/hour",
      action: "Submit Demo"
    },
    {
      icon: MessageSquare,
      title: "General Info",
      description: "Questions about our events, opening times, or venue information",
      action: "Ask Question"
    }
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Contact Us
          </h2>
          <div className="w-24 h-px bg-gradient-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Get in touch with The Backroom Leeds team. For table bookings, private hire, DJ submissions, 
            or general enquiries - we're here to help make your night unforgettable.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <Card key={index} className="p-6 text-center gradient-card border border-primary/10 hover:shadow-luxury transition-luxury">
                <IconComponent className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-sm text-muted-foreground">{detail}</p>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Enquiry Types */}
        <div className="mb-16">
          <h3 className="font-display text-3xl font-semibold text-center mb-12">How Can We Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {enquiryTypes.map((enquiry, index) => {
              const IconComponent = enquiry.icon;
              return (
                <Card key={index} className="p-6 gradient-card border border-primary/10 hover:shadow-luxury transition-luxury">
                  <div className="flex items-start gap-4">
                    <IconComponent className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                        {enquiry.title}
                      </h4>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {enquiry.description}
                      </p>
                      <Button variant="outline" size="sm">
                        {enquiry.action}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mb-16">
          <h3 className="font-display text-3xl font-semibold text-center mb-12">Send Us a Message</h3>
          
          {/* Contact Tabs */}
          <div className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
              {contactTabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setFormData(prev => ({ ...prev, category: tab.id }));
                    }}
                    className={`p-4 rounded-lg border transition-all text-center ${
                      activeTab === tab.id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-primary/30 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                    }`}
                  >
                    <IconComponent className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-xs font-medium">{tab.label}</div>
                  </button>
                );
              })}
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground text-sm text-center">
                {contactTabs.find(tab => tab.id === activeTab)?.description}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 gradient-card border border-primary/10 max-w-4xl mx-auto">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              
              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-medium text-foreground mb-4">Your Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Content Based on Active Tab */}
              <div>
                <h4 className="text-lg font-medium text-foreground mb-4">Your Enquiry</h4>
                
                {activeTab === 'table-bookings' && (
                  <div className="space-y-6">
                    {/* Booking Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          name="bookingDate"
                          value={formData.bookingDate}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Arrival Time *
                        </label>
                        <select
                          name="bookingTime"
                          value={formData.bookingTime}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                          required
                        >
                          <option value="">Select arrival time</option>
                          <option value="23:00">11:00 PM</option>
                          <option value="23:15">11:15 PM</option>
                          <option value="23:30">11:30 PM</option>
                          <option value="23:45">11:45 PM</option>
                          <option value="00:00">12:00 AM</option>
                          <option value="00:15">12:15 AM</option>
                          <option value="00:30">12:30 AM</option>
                          <option value="00:45">12:45 AM</option>
                          <option value="01:00">1:00 AM</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Party Size *
                        </label>
                        <select
                          name="partySize"
                          value={formData.partySize}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                          required
                        >
                          <option value="">Select party size</option>
                          {[...Array(24)].map((_, i) => (
                            <option key={i + 2} value={i + 2}>{i + 2} people</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Venue Area Preference */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Venue Area Preference
                      </label>
                      <select
                        name="venueArea"
                        value={formData.venueArea}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                      >
                        <option value="">Any available table</option>
                        <option value="upstairs">Upstairs - Main bar area</option>
                        <option value="downstairs">Downstairs - Private room</option>
                      </select>
                    </div>

                    {/* Package Selection Type */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-4">
                        Drink Package Selection *
                      </label>
                      
                      <div className="space-y-4">
                        {/* Preset Packages */}
                        <div>
                          <div className="flex items-center mb-3">
                            <input
                              type="radio"
                              id="preset-packages"
                              name="packageType"
                              value="preset"
                              checked={formData.packageType === 'preset'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            <label htmlFor="preset-packages" className="text-sm font-medium text-foreground">
                              Choose from Preset Packages
                            </label>
                          </div>
                          
                          {formData.packageType === 'preset' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {packageOptions.map((pkg) => (
                                <div
                                  key={pkg.id}
                                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                    formData.selectedPackage === pkg.id
                                      ? 'border-primary bg-primary/10'
                                      : 'border-border hover:border-primary/50'
                                  }`}
                                  onClick={() => setFormData(prev => ({ ...prev, selectedPackage: pkg.id }))}
                                >
                                  <div className="flex items-center mb-2">
                                    <input
                                      type="radio"
                                      name="selectedPackage"
                                      value={pkg.id}
                                      checked={formData.selectedPackage === pkg.id}
                                      onChange={handleInputChange}
                                      className="mr-2"
                                    />
                                    <div>
                                      <h5 className="font-semibold text-foreground">{pkg.name}</h5>
                                      <p className="text-primary font-semibold">£{pkg.price}</p>
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Custom Package */}
                        <div>
                          <div className="flex items-center mb-3">
                            <input
                              type="radio"
                              id="custom-package"
                              name="packageType"
                              value="custom"
                              checked={formData.packageType === 'custom'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            <label htmlFor="custom-package" className="text-sm font-medium text-foreground">
                              Build Custom Package
                            </label>
                          </div>
                          
                          {formData.packageType === 'custom' && (
                            <div className="space-y-4 border border-border rounded-lg p-4">
                              {/* Spirits Selection */}
                              <div>
                                <h6 className="font-medium text-foreground mb-3">Select Spirits</h6>
                                <div className="space-y-3">
                                  {Object.entries(bottleMenu).filter(([key]) => key !== 'champagne').map(([category, items]) => (
                                    <div key={category}>
                                      <p className="text-sm font-medium text-foreground mb-2 capitalize">{category}</p>
                                      <div className="grid grid-cols-2 gap-2">
                                        {items.map((item) => (
                                          <label key={item.name} className="flex items-center space-x-2 text-sm">
                                            <input
                                              type="checkbox"
                                              checked={formData.customSpirits.includes(`${category}:${item.name}`)}
                                              onChange={() => handleCustomSpiritsChange(`${category}:${item.name}`)}
                                            />
                                            <span className="text-muted-foreground">{item.name} - £{item.price}</span>
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Champagne Selection */}
                              <div>
                                <h6 className="font-medium text-foreground mb-3">Champagne (Optional)</h6>
                                <select
                                  name="customChampagne"
                                  value={formData.customChampagne}
                                  onChange={handleInputChange}
                                  className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                                >
                                  <option value="">No champagne</option>
                                  {bottleMenu.champagne.map((item) => (
                                    <option key={item.name} value={item.name}>
                                      {item.name} - £{item.price}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {/* Price Display */}
                              <div className="border-t border-border pt-3">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-foreground">Estimated Total:</span>
                                  <span className="text-xl font-bold text-primary">£{calculateCustomPackagePrice()}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Mixers and service included. Final pricing confirmed on booking.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Special Requests or Notes
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury resize-none"
                        placeholder="Any special requirements, dietary restrictions, or celebration details..."
                      />
                    </div>

                    {/* Booking Terms */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h6 className="font-medium text-foreground mb-2">Booking Terms</h6>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• £50 deposit required to secure booking (refundable if cancelled 48+ hours in advance)</li>
                        <li>• Remaining balance paid on the night</li>
                        <li>• Table bookings include priority admission and waitress service</li>
                        <li>• 18+ venue with ID required</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'private-hire' && (
                  <div className="space-y-6">
                    {/* Company Information */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company/Organization (Optional)
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                        placeholder="Company name for corporate events"
                      />
                    </div>

                    {/* Event Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Event Date *
                        </label>
                        <input
                          type="date"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Start Time *
                        </label>
                        <input
                          type="time"
                          name="eventStartTime"
                          value={formData.eventStartTime}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          End Time *
                        </label>
                        <input
                          type="time"
                          name="eventEndTime"
                          value={formData.eventEndTime}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                          required
                        />
                      </div>
                    </div>

                    {/* Event Type and Guest Count */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Event Type *
                        </label>
                        <select
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                          required
                        >
                          <option value="">Select event type</option>
                          <option value="corporate-event">Corporate Event</option>
                          <option value="birthday-party">Birthday Party</option>
                          <option value="christmas-party">Christmas Party</option>
                          <option value="wedding-reception">Wedding Reception</option>
                          <option value="graduation">Graduation Celebration</option>
                          <option value="product-launch">Product Launch</option>
                          <option value="networking">Networking Event</option>
                          <option value="team-building">Team Building</option>
                          <option value="other">Other Private Event</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Expected Guest Count *
                        </label>
                        <select
                          name="guestCount"
                          value={formData.guestCount}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                          required
                        >
                          <option value="">Select guest count</option>
                          <option value="under-50">Under 50 guests</option>
                          <option value="50-100">50-100 guests</option>
                          <option value="100-150">100-150 guests</option>
                          <option value="150-250">150-250 guests</option>
                          <option value="250-350">250-350 guests</option>
                          <option value="350-500">350-500 guests (full venue)</option>
                          <option value="500-plus">500+ guests (need to discuss)</option>
                        </select>
                      </div>
                    </div>

                    {/* Venue Space Selection */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-4">
                        Venue Space Required *
                      </label>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            formData.venueSpace === 'private-room'
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, venueSpace: 'private-room' }))}
                        >
                          <div className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="venueSpace"
                              value="private-room"
                              checked={formData.venueSpace === 'private-room'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            <div>
                              <h5 className="font-semibold text-foreground">Private Room</h5>
                              <p className="text-sm text-primary">150 capacity</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Downstairs private room with own bar, A/C, DJ booth, accessible entrance
                          </p>
                        </div>

                        <div
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            formData.venueSpace === 'main-room'
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, venueSpace: 'main-room' }))}
                        >
                          <div className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="venueSpace"
                              value="main-room"
                              checked={formData.venueSpace === 'main-room'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            <div>
                              <h5 className="font-semibold text-foreground">Main Room</h5>
                              <p className="text-sm text-primary">350 capacity</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Upstairs main bar & large dance floor with state-of-art lighting, outdoor access
                          </p>
                        </div>

                        <div
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            formData.venueSpace === 'full-venue'
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, venueSpace: 'full-venue' }))}
                        >
                          <div className="flex items-center mb-2">
                            <input
                              type="radio"
                              name="venueSpace"
                              value="full-venue"
                              checked={formData.venueSpace === 'full-venue'}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            <div>
                              <h5 className="font-semibold text-foreground">Full Venue</h5>
                              <p className="text-sm text-primary">500 capacity</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Complete exclusive use of both floors with multiple bars and dance areas
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Specific Requirements */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Specific Requirements & Details *
                      </label>
                      <textarea
                        name="privateHireRequirements"
                        value={formData.privateHireRequirements}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury resize-none"
                        placeholder="Please provide details about:
• Catering requirements (pizzas, cold buffet, external caterers)
• Music/DJ preferences (our resident DJs or external)
• Decorations and theming needs
• Any special arrangements or equipment
• Budget considerations
• Any other specific requirements..."
                        required
                      />
                    </div>

                    {/* Private Hire Terms */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h6 className="font-medium text-foreground mb-2">Private Hire Information</h6>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <h6 className="font-medium text-foreground mb-2">No Room Hire Fee:</h6>
                          <ul className="space-y-1">
                            <li>• Thursday - Sunday bookings</li>
                            <li>• Minimum spend may apply Mon-Wed</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-foreground mb-2">Event Times:</h6>
                          <ul className="space-y-1">
                            <li>• Friday/Saturday: End by midnight</li>
                            <li>• Sunday-Thursday: Can run until 6am</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-foreground mb-2">Contact:</h6>
                          <ul className="space-y-1">
                            <li>• Phone: 0113 2438666</li>
                            <li>• Email: info@backroomleeds.co.uk</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-foreground mb-2">Catering Options:</h6>
                          <ul className="space-y-1">
                            <li>• Pizza menu: £13.50 + VAT each</li>
                            <li>• Cold buffet: £14.50 + VAT pp</li>
                            <li>• External caterers welcome</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'careers' && (
                  <div className="space-y-6">
                    {/* Job Position */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-4">
                        Job Position of Interest *
                      </label>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                          { id: 'bar-staff', title: 'Bar Staff', description: 'Bartenders and cocktail makers' },
                          { id: 'table-service', title: 'Table Service Staff', description: 'Table and bottle service' },
                          { id: 'bar-support', title: 'Bar Support', description: 'Glass collectors, runners' },
                          { id: 'management', title: 'Management', description: 'Supervisor and management roles' },
                          { id: 'sales-events', title: 'Sales & Events', description: 'Event coordination and sales' },
                          { id: 'djs', title: 'DJs', description: 'Resident and guest DJ positions' },
                          { id: 'performers', title: 'Performers', description: 'Entertainers and performers' },
                          { id: 'stock-and-deliveries', title: 'Cellar and Maintenance', description: 'Deliveries, stock  and maintenance' },
                          { id: 'other', title: 'Other', description: 'Other positions not listed' }
                        ].map((job) => (
                          <div
                            key={job.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                              formData.jobType === job.id
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50'
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, jobType: job.id }))}
                          >
                            <div className="flex items-center mb-1">
                              <input
                                type="radio"
                                name="jobType"
                                value={job.id}
                                checked={formData.jobType === job.id}
                                onChange={handleInputChange}
                                className="mr-2"
                              />
                              <h5 className="font-medium text-foreground text-sm">{job.title}</h5>
                            </div>
                            <p className="text-xs text-muted-foreground">{job.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Experience Level */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Experience Level *
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                        required
                      >
                        <option value="">Select experience level</option>
                        <option value="no-experience">No Experience - Willing to Learn</option>
                        <option value="some-experience">Some Experience (1-2 years)</option>
                        <option value="experienced">Experienced (3-5 years)</option>
                        <option value="very-experienced">Very Experienced (5+ years)</option>
                        <option value="management-level">Management/Supervisory Level</option>
                      </select>
                    </div>

                    {/* Availability */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Availability *
                      </label>
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                        required
                      >
                        <option value="">Select availability</option>
                        <option value="weekends-only">Weekends Only (Friday-Sunday)</option>
                        <option value="weekdays-only">Weekdays Only</option>
                        <option value="full-time">Full Time (All days available)</option>
                        <option value="part-time-flexible">Part Time (Flexible days)</option>
                        <option value="specific-days">Specific Days (will specify in message)</option>
                      </select>
                    </div>

                    {/* Resume/CV Upload Note */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Resume/CV
                      </label>
                      <div className="border border-dashed border-primary/30 rounded-lg p-6 text-center">
                        <p className="text-muted-foreground mb-2">
                          Please attach your resume/CV to your email when you send this application
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Send to: info@backroomleeds.co.uk with subject "Job Application - [Position]"
                        </p>
                      </div>
                    </div>

                    {/* Cover Letter / Why You Want to Work */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Tell Us About Yourself & Why You Want to Work at The Backroom *
                      </label>
                      <textarea
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury resize-none"
                        placeholder="Please tell us about:
• Your relevant experience and skills
• Why you want to work in hospitality/nightlife
• What attracts you to The Backroom Leeds
• Your career goals and aspirations
• Any special skills or qualifications
• Your availability and work preferences..."
                        required
                      />
                    </div>

                    {/* Employment Information */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h6 className="font-medium text-foreground mb-2">Employment Information</h6>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <h6 className="font-medium text-foreground mb-2">Working Hours:</h6>
                          <ul className="space-y-1">
                            <li>• Friday & Saturday: 11pm - 6am</li>
                            <li>• Sunday: 11pm - 5am</li>
                            <li>• Private events: Varies (7 days)</li>
                            <li>• Some day shifts for events</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-foreground mb-2">Requirements:</h6>
                          <ul className="space-y-1">
                            <li>• Must be 18+ for all positions</li>
                            <li>• Reliable and punctual</li>
                            <li>• Friendly, outgoing personality</li>
                            <li>• Team player attitude</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-foreground mb-2">Benefits:</h6>
                          <ul className="space-y-1">
                            <li>• Competitive hourly rates</li>
                            <li>• Staff discounts</li>
                            <li>• Great team environment</li>
                            <li>• Training provided</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-medium text-foreground mb-2">Application Process:</h6>
                          <ul className="space-y-1">
                            <li>• Submit this form</li>
                            <li>• Email CV to info@backroomleeds.co.uk</li>
                            <li>• Interview if shortlisted</li>
                            <li>• Trial shift if successful</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {(activeTab === 'general' || activeTab === 'feedback') && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                        required
                      >
                        <option value="">Select subject</option>
                        {activeTab === 'general' ? (
                          <>
                            <option value="Event Information">Event Information</option>
                            <option value="Opening Hours">Opening Hours</option>
                            <option value="Venue Information">Venue Information</option>
                            <option value="Lost Property">Lost Property</option>
                            <option value="Other">Other</option>
                          </>
                        ) : (
                          <>
                            <option value="Excellent Service">Excellent Service</option>
                            <option value="Event Feedback">Event Feedback</option>
                            <option value="Service Complaint">Service Complaint</option>
                            <option value="Facility Issue">Facility Issue</option>
                            <option value="Staff Feedback">Staff Feedback</option>
                            <option value="Suggestion">Suggestion</option>
                          </>
                        )}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury resize-none"
                        placeholder={
                          activeTab === 'general' 
                            ? "Please provide details about your enquiry..."
                            : "Please share your feedback about your experience at The Backroom..."
                        }
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Payment Processing States for Table Bookings */}
              {activeTab === 'table-bookings' && paymentStep === 'payment' && (
                <div className="border border-primary/20 rounded-lg p-6 bg-primary/5">
                  <div className="flex items-center justify-center mb-4">
                    <CreditCard className="w-8 h-8 text-primary animate-pulse mr-3" />
                    <h5 className="text-lg font-medium text-foreground">Processing Payment Authorization</h5>
                  </div>
                  <p className="text-center text-muted-foreground mb-4">
                    Authorizing £50 deposit for your table booking...
                  </p>
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                </div>
              )}

              {activeTab === 'table-bookings' && paymentStep === 'success' && (
                <div className="border border-green-500/20 rounded-lg p-6 bg-green-500/5">
                  <div className="flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                    <h5 className="text-lg font-medium text-foreground">Booking Request Submitted!</h5>
                  </div>
                  <div className="space-y-3 text-center">
                    <p className="text-muted-foreground">
                      Your table booking request has been submitted successfully.
                    </p>
                    <div className="bg-muted/30 rounded p-3">
                      <p className="text-sm font-medium text-foreground">
                        Booking Reference: {bookingResult?.bookingReference}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Payment Authorization ID: {bookingResult?.paymentIntentId}
                      </p>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>✅ £50 deposit authorized (not charged yet)</p>
                      <p>✅ Priority admission secured</p>
                      <p>✅ Table booking request sent to venue</p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                      <h6 className="font-medium text-foreground mb-2">What happens next?</h6>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• We'll confirm table availability within 24 hours</li>
                        <li>• If confirmed: £50 deposit will be charged, remaining balance due on arrival</li>
                        <li>• If unavailable: Authorization will be cancelled and no charge made</li>
                        <li>• You'll receive email confirmation either way</li>
                      </ul>
                    </div>
                    <Button variant="outline" onClick={resetBookingFlow} className="mt-4">
                      Make Another Booking
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'table-bookings' && paymentStep === 'error' && (
                <div className="border border-red-500/20 rounded-lg p-6 bg-red-500/5">
                  <div className="flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-red-500 mr-3" />
                    <h5 className="text-lg font-medium text-foreground">Payment Authorization Failed</h5>
                  </div>
                  <div className="space-y-3 text-center">
                    <p className="text-muted-foreground">
                      {paymentError || 'We were unable to authorize your payment. Please try again.'}
                    </p>
                    <div className="space-y-2">
                      <Button variant="primary" onClick={() => setPaymentStep('form')} className="mr-2">
                        Try Again
                      </Button>
                      <Button variant="outline" onClick={resetBookingFlow}>
                        Start Over
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button - Only show for form step or non-table-booking tabs */}
              {(activeTab !== 'table-bookings' || paymentStep === 'form') && (
                <Button 
                  type="submit"
                  variant="primary" 
                  className="w-full" 
                  size="lg"
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {activeTab === 'table-bookings' ? 'Authorizing Deposit...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      {activeTab === 'table-bookings' ? (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Authorize £50 Deposit & Submit Booking
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </>
                  )}
                </Button>
              )}
            </form>
          </Card>
        </div>

        {/* Find Us Section */}
        <Card className="p-8 gradient-card border border-primary/10 max-w-4xl mx-auto">
          <h3 className="font-display text-2xl font-semibold text-foreground mb-6 text-center">Find Us</h3>
          <div className="bg-muted/50 rounded-lg p-12 text-center mb-6">
            <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">
              Located under the railway bridge at the bottom of Call Lane - look for the hidden entrance!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <p className="text-muted-foreground text-center">
              <strong className="text-foreground">Age Restriction:</strong><br />18+ venue with ID required
            </p>
            <p className="text-muted-foreground text-center">
              <strong className="text-foreground">Transport:</strong><br />Central Leeds location, close to train station
            </p>
            <p className="text-muted-foreground text-center">
              <strong className="text-foreground">Social:</strong><br />@backroomleeds (Instagram, Facebook, Twitter)
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Contact;