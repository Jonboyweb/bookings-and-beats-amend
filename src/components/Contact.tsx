import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageSquare, Briefcase } from "lucide-react";

const Contact = () => {
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

        {/* Map Placeholder and Contact Form CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Section */}
          <Card className="p-8 gradient-card border border-primary/10">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">Find Us</h3>
            <div className="bg-muted/50 rounded-lg p-12 text-center mb-6">
              <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">
                Located under the railway bridge at the bottom of Call Lane - look for the hidden entrance!
              </p>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Age Restriction:</strong> 18+ venue with ID required
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Transport:</strong> Central Leeds location, close to train station
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Social:</strong> @backroomleeds (Instagram, Facebook, Twitter)
              </p>
            </div>
          </Card>

          {/* Quick Contact */}
          <Card className="p-8 gradient-card border border-primary/10">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">Quick Contact</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Your Email</label>
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                <select className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury">
                  <option>Table Booking Enquiry</option>
                  <option>Private Hire Quote</option>
                  <option>DJ Submission</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                <textarea 
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-luxury resize-none"
                ></textarea>
              </div>
            </div>
            <Button variant="primary" className="w-full">
              Send Message
            </Button>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              We'll get back to you within 24 hours
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;