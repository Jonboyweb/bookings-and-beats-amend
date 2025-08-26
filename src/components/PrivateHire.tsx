import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Music, Utensils, Calendar, Star, Building2 } from "lucide-react";

const PrivateHire = () => {
  const venueFeatures = [
    {
      icon: Building2,
      title: "Full Venue - 500 capacity",
      description: "Complete exclusive use of both floors with multiple bars and dance areas"
    },
    {
      icon: Users,
      title: "Room One - 150 capacity", 
      description: "Upstairs private room with own bar, ample seating, A/C, accessible entrance & toilet"
    },
    {
      icon: Music,
      title: "Room Two - 350 capacity",
      description: "Main bar & dance floor with state-of-art lighting, DJ booth, outdoor access"
    },
    {
      icon: Utensils,
      title: "No Room Hire Fee",
      description: "Thursday-Sunday bookings with no room hire fee (minimum spend may apply Mon-Wed)"
    }
  ];

  const eventTypes = [
    {
      title: "Corporate Events",
      description: "Professional business events with dedicated service and flexible arrangements.",
      features: ["No room hire fee Thu-Sun", "Own bar facilities", "A/C and accessible", "Professional service staff"]
    },
    {
      title: "Christmas Parties", 
      description: "Festive celebrations with Christmas decorations from end of November.",
      features: ["Christmas decorations", "Bronze £30pp - Gold £45pp packages", "Welcome drinks included", "Festive buffet options"]
    },
    {
      title: "Private Parties",
      description: "Birthday celebrations, weddings, graduations and special occasions.",
      features: ["Available 7 days a week", "Welcome signs from £50", "Balloon arches from £150", "4ft letters/numbers £125 for 2"]
    },
    {
      title: "Student & Team Events",
      description: "Perfect for student events, graduations, and corporate team building.",
      features: ["Student-friendly packages", "Team night specials", "Graduation celebrations", "Group bookings welcome"]
    }
  ];

  return (
    <section id="private-hire" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Private Hire
          </h2>
          <div className="w-24 h-px bg-gradient-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Transform The Backroom into your exclusive venue. From intimate corporate gatherings 
            to spectacular celebrations, we provide the perfect backdrop for unforgettable events.
          </p>
        </div>

        {/* Venue Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {venueFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="p-6 text-center gradient-card border border-primary/10 hover:shadow-luxury transition-luxury">
                <IconComponent className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Event Types */}
        <div className="mb-16">
          <h3 className="font-display text-3xl font-semibold text-center mb-12">Perfect For</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventTypes.map((eventType, index) => (
              <Card key={index} className="p-8 gradient-card border border-primary/10 hover:shadow-luxury transition-luxury">
                <div className="flex items-start gap-4 mb-4">
                  <Star className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-display text-xl font-semibold text-foreground mb-2">
                      {eventType.title}
                    </h4>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {eventType.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {eventType.features.map((feature, i) => (
                    <li key={i} className="text-sm text-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Catering & Entertainment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="p-8 gradient-card border border-primary/10">
            <Utensils className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
              Catering Options
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p><strong>Pizza Menu (£13.50 + VAT each)</strong></p>
              <p>• Margherita, Stilton & Potato, Ham & Ricotta</p>
              <p>• Anchovies & Olives, Chorizo, Spicy Salami</p>
              <p>• Vegan and gluten-free options available</p>
              <p><strong>Cold Buffet (£14.50 + VAT pp)</strong></p>
              <p>• Spring rolls, chicken skewers, quiche, cakes</p>
              <p>• Tikka skewers, halloumi, Caesar salad options</p>
            </div>
          </Card>

          <Card className="p-8 gradient-card border border-primary/10">
            <Music className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
              Booking Terms
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p><strong>Friday/Saturday:</strong> Private bookings must finish by midnight</p>
              <p><strong>Sunday-Thursday:</strong> Private bookings can run until 6am</p>
              <p><strong>No room hire fee Thursday-Sunday</strong></p>
              <p><strong>Contact:</strong> 0113 2438666</p>
              <p><strong>Email:</strong> info@backroomleeds.co.uk</p>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-dark p-12 rounded-lg border border-primary/20">
          <Calendar className="w-12 h-12 text-primary mx-auto mb-6" />
          <h3 className="font-display text-3xl font-semibold text-foreground mb-4">
            Ready to Plan Your Event?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact our events team to discuss your requirements and receive a bespoke quote 
            tailored to your celebration or corporate event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Request Quote
            </Button>
            <Button variant="outline" size="lg">
              View Gallery
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivateHire;