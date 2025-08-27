import React, { useState } from 'react'
import { Calendar, Users, Mail, Phone, Star, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { formatCurrency } from '../lib/utils'

export function PrivateHirePage() {
  const [formData, setFormData] = useState({
    eventType: '',
    preferredArea: '',
    eventDate: '',
    guestCount: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    eventDetails: '',
    cateringRequired: false,
    entertainmentRequired: false
  })

  const packages = [
    {
      id: 'downstairs',
      name: 'Downstairs Private Hire',
      capacity: '150 guests',
      description: 'Perfect for intimate celebrations, corporate events, and special occasions',
      features: [
        'Exclusive venue access',
        'Private bar with dedicated staff',
        'DJ booth and sound system included',
        'Professional lighting control',
        'Flexible layout options',
        'Climate controlled environment'
      ],
      images: ['/assets/images/prohibition-bar.png'],
      deposit: 250,
      hireFee: 0
    },
    {
      id: 'upstairs',
      name: 'Upstairs Private Hire',
      capacity: '350 guests',
      description: 'Full venue experience for larger events, weddings, and major celebrations',
      features: [
        'Entire upstairs venue exclusive use',
        'Multiple bar areas with full service',
        'Professional DJ setup and booth',
        'VIP seating areas included',
        'Dance floor and entertainment space',
        'Event coordination support'
      ],
      images: ['/assets/images/nightclub-dancing.jpeg'],
      deposit: 250,
      hireFee: 0
    }
  ]

  const additionalServices = [
    { name: 'Professional DJ', price: 85, unit: 'per hour', description: 'Experienced DJ with full setup' },
    { name: 'Live Entertainment', price: 400, unit: 'per act', description: 'Magicians, performers, live music' },
    { name: 'Photo Booth', price: 475, unit: 'per event', description: 'Professional photo booth with props' },
    { name: 'Enhanced Photo Booth', price: 600, unit: 'per event', description: 'Premium booth with instant printing' },
    { name: 'Pizza Catering', price: 13.50, unit: 'per person (+VAT)', description: 'Fresh stone-baked pizzas' },
    { name: 'Cold Buffet', price: 14.50, unit: 'per person (+VAT)', description: 'Gourmet cold food selection' }
  ]

  const eventTypes = [
    'Birthday Party',
    'Corporate Event',
    'Wedding Reception',
    'Anniversary Celebration',
    'Product Launch',
    'Team Building',
    'Graduation Party',
    'Charity Event',
    'Other'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here would integrate with backend
    console.log('Form submitted:', formData)
    alert('Thank you for your enquiry! We will contact you within 24 hours.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-black/80 to-zinc-900/80">
        <div className="absolute inset-0">
          <img 
            src="/assets/images/speakeasy-interior.jpg" 
            alt="Private Hire" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-amber-400 mb-6">
            Private Hire
          </h1>
          <p className="text-xl text-amber-200 max-w-3xl mx-auto mb-8">
            Create unforgettable memories in Leeds' most exclusive venue. No hire fees, just exceptional experiences.
          </p>
          
          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-amber-300">
              <Star className="w-6 h-6 text-amber-400" />
              <span className="font-semibold text-lg">Zero Hire Fees</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-amber-300">
              <Users className="w-6 h-6 text-amber-400" />
              <span className="font-semibold text-lg">Up to 350 Guests</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-amber-300">
              <Check className="w-6 h-6 text-amber-400" />
              <span className="font-semibold text-lg">Full Event Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-amber-400 mb-4">
              Choose Your Space
            </h2>
            <p className="text-xl text-amber-200 max-w-2xl mx-auto">
              Two distinct venues to suit every occasion, from intimate gatherings to grand celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-prohibition-lg transition-all duration-300">
                {/* Package Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={pkg.images[0]} 
                    alt={pkg.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Capacity Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-1 bg-amber-400 text-black px-3 py-1 rounded-full">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-semibold">{pkg.capacity}</span>
                    </div>
                  </div>

                  {/* No Hire Fee Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      No Hire Fee
                    </span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <p className="text-amber-200">{pkg.description}</p>
                </CardHeader>

                <CardContent>
                  {/* Features List */}
                  <div className="mb-6">
                    <h4 className="text-amber-400 font-semibold mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-amber-200 text-sm">
                          <Check className="w-4 h-4 text-amber-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Pricing */}
                  <div className="bg-amber-400/10 border border-amber-400/20 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-amber-200">Hire Fee:</span>
                      <span className="text-2xl font-bold text-green-400">FREE</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-200">Refundable Deposit:</span>
                      <span className="text-xl font-semibold text-amber-400">{formatCurrency(pkg.deposit)}</span>
                    </div>
                    <p className="text-xs text-amber-300 mt-2">
                      Deposit returned in full after event (subject to no damages)
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => setFormData(prev => ({ ...prev, preferredArea: pkg.id }))}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Select This Space
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-amber-400 mb-4">
              Additional Services
            </h2>
            <p className="text-lg text-amber-200">
              Enhance your event with our professional services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-prohibition transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-amber-400 font-semibold">{service.name}</h3>
                    <span className="text-amber-300 font-bold">
                      {formatCurrency(service.price)}
                    </span>
                  </div>
                  <p className="text-amber-200 text-sm mb-2">{service.description}</p>
                  <p className="text-amber-300 text-xs">{service.unit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center">
                Request Your Quote
              </CardTitle>
              <p className="text-amber-200 text-center">
                Tell us about your event and we'll create a tailored proposal
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Event Type */}
                  <div>
                    <label className="block text-amber-300 mb-2">Event Type *</label>
                    <select
                      required
                      value={formData.eventType}
                      onChange={(e) => setFormData(prev => ({ ...prev, eventType: e.target.value }))}
                      className="w-full px-4 py-2 bg-zinc-800 border border-amber-400/20 rounded-md text-amber-100"
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Area */}
                  <div>
                    <label className="block text-amber-300 mb-2">Preferred Area *</label>
                    <select
                      required
                      value={formData.preferredArea}
                      onChange={(e) => setFormData(prev => ({ ...prev, preferredArea: e.target.value }))}
                      className="w-full px-4 py-2 bg-zinc-800 border border-amber-400/20 rounded-md text-amber-100"
                    >
                      <option value="">Select area</option>
                      <option value="downstairs">Downstairs (150 guests)</option>
                      <option value="upstairs">Upstairs (350 guests)</option>
                      <option value="both">Both areas (500 guests)</option>
                    </select>
                  </div>

                  {/* Event Date */}
                  <div>
                    <label className="block text-amber-300 mb-2">Event Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, eventDate: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 bg-zinc-800 border border-amber-400/20 rounded-md text-amber-100"
                    />
                  </div>

                  {/* Guest Count */}
                  <div>
                    <label className="block text-amber-300 mb-2">Expected Guest Count *</label>
                    <input
                      type="number"
                      required
                      min="10"
                      max="500"
                      value={formData.guestCount}
                      onChange={(e) => setFormData(prev => ({ ...prev, guestCount: e.target.value }))}
                      className="w-full px-4 py-2 bg-zinc-800 border border-amber-400/20 rounded-md text-amber-100"
                      placeholder="Number of guests"
                    />
                  </div>

                  {/* Contact Name */}
                  <div>
                    <label className="block text-amber-300 mb-2">Contact Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                      className="w-full px-4 py-2 bg-zinc-800 border border-amber-400/20 rounded-md text-amber-100"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Contact Email */}
                  <div>
                    <label className="block text-amber-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                      className="w-full px-4 py-2 bg-zinc-800 border border-amber-400/20 rounded-md text-amber-100"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="block text-amber-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.contactPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                    className="w-full px-4 py-2 bg-zinc-800 border border-amber-400/20 rounded-md text-amber-100"
                    placeholder="Your phone number"
                  />
                </div>

                {/* Event Details */}
                <div>
                  <label className="block text-amber-300 mb-2">Event Details</label>
                  <textarea
                    rows={4}
                    value={formData.eventDetails}
                    onChange={(e) => setFormData(prev => ({ ...prev, eventDetails: e.target.value }))}
                    className="w-full px-4 py-2 bg-zinc-800 border border-amber-400/20 rounded-md text-amber-100"
                    placeholder="Tell us more about your event, special requirements, theme, etc."
                  />
                </div>

                {/* Additional Services */}
                <div className="space-y-3">
                  <label className="block text-amber-300">Additional Services Interest</label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.cateringRequired}
                        onChange={(e) => setFormData(prev => ({ ...prev, cateringRequired: e.target.checked }))}
                        className="w-4 h-4 text-amber-400 bg-zinc-800 border-amber-400/20 rounded"
                      />
                      <span className="text-amber-200">Catering Services</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.entertainmentRequired}
                        onChange={(e) => setFormData(prev => ({ ...prev, entertainmentRequired: e.target.checked }))}
                        className="w-4 h-4 text-amber-400 bg-zinc-800 border-amber-400/20 rounded"
                      />
                      <span className="text-amber-200">Entertainment Services</span>
                    </label>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Request Quote
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-amber-400 mb-8">
            Need to Speak with Someone?
          </h2>
          <p className="text-amber-200 mb-8">
            Our events team is available to discuss your requirements and help plan the perfect celebration.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="tel:01132438666" 
              className="flex items-center space-x-3 bg-amber-400/10 border border-amber-400/20 rounded-lg px-6 py-4 hover:bg-amber-400/20 transition-colors"
            >
              <Phone className="w-6 h-6 text-amber-400" />
              <div className="text-left">
                <p className="text-amber-400 font-semibold">Call Us</p>
                <p className="text-amber-200">0113 2438666</p>
              </div>
            </a>
            
            <a 
              href="mailto:info@backroomleeds.co.uk" 
              className="flex items-center space-x-3 bg-amber-400/10 border border-amber-400/20 rounded-lg px-6 py-4 hover:bg-amber-400/20 transition-colors"
            >
              <Mail className="w-6 h-6 text-amber-400" />
              <div className="text-left">
                <p className="text-amber-400 font-semibold">Email Us</p>
                <p className="text-amber-200">info@backroomleeds.co.uk</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}