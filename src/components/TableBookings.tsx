import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Clock, MapPin, PoundSterling, Users } from "lucide-react";

const TableBookings = () => {
  const packages = [
    {
      name: "Essential Package",
      price: "£150",
      description: "Perfect for intimate gatherings",
      features: [
        "Reserved table for up to 4 guests", 
        "1 bottle of house spirits",
        "Mixers and garnishes included",
        "Duration: Full night",
        "Upstairs or downstairs seating"
      ]
    },
    {
      name: "Premium Package", 
      price: "£300",
      description: "Ideal for celebrations",
      features: [
        "Reserved table for up to 8 guests",
        "2 bottles of premium spirits", 
        "Selection of mixers and garnishes",
        "Complimentary bar snacks",
        "Priority seating location"
      ],
      popular: true
    },
    {
      name: "VIP Package",
      price: "£500", 
      description: "The ultimate luxury experience",
      features: [
        "Reserved table for up to 12 guests",
        "3 bottles of top-shelf spirits",
        "Premium mixers and garnishes", 
        "Dedicated table service",
        "Best location guarantee"
      ]
    }
  ];

  const bottleMenu = [
    { category: "Vodka", items: ["Grey Goose - £120", "Ciroc - £130", "Belvedere - £125"] },
    { category: "Whiskey", items: ["Jameson - £110", "Jack Daniels - £115", "Macallan 12yr - £180"] },
    { category: "Gin", items: ["Hendricks - £105", "Bombay Sapphire - £95", "Tanqueray 10 - £120"] },
    { category: "Champagne", items: ["Moet Chandon - £85", "Dom Perignon - £250", "Cristal - £400"] }
  ];

  return (
    <section id="table-bookings" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Table Bookings
          </h2>
          <div className="w-24 h-px bg-gradient-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Secure your spot in Leeds' most exclusive nightclub. Choose from our curated packages 
            or create a custom selection from our premium bottle menu.
          </p>
        </div>

        {/* Booking Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center gradient-card border border-primary/10">
            <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Arrival Times</h3>
            <p className="text-sm text-muted-foreground">Between 11:00 PM - 1:00 AM</p>
          </Card>
          <Card className="p-6 text-center gradient-card border border-primary/10">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Seating Options</h3>
            <p className="text-sm text-muted-foreground">Upstairs or Downstairs Available</p>
          </Card>
          <Card className="p-6 text-center gradient-card border border-primary/10">
            <PoundSterling className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Booking Deposit</h3>
            <p className="text-sm text-muted-foreground">£50 required, rest paid on arrival</p>
          </Card>
        </div>

        {/* Packages */}
        <div className="mb-16">
          <h3 className="font-display text-3xl font-semibold text-center mb-12">Table Packages</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card 
                key={index} 
                className={`p-8 relative gradient-card border transition-luxury hover:shadow-luxury ${
                  pkg.popular 
                    ? 'border-primary shadow-glow' 
                    : 'border-primary/10'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-primary-foreground px-4 py-1 text-xs font-semibold rounded-full">
                    Most Popular
                  </span>
                )}
                
                <div className="text-center mb-6">
                  <h4 className="font-display text-2xl font-semibold text-foreground mb-2">
                    {pkg.name}
                  </h4>
                  <p className="text-3xl font-bold text-primary mb-2">{pkg.price}</p>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={pkg.popular ? "primary" : "outline"} 
                  className="w-full"
                >
                  Book This Package
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottle Menu */}
        <div className="mb-12">
          <h3 className="font-display text-3xl font-semibold text-center mb-12">Premium Bottle Menu</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bottleMenu.map((category, index) => (
              <Card key={index} className="p-6 gradient-card border border-primary/10">
                <h4 className="font-display text-xl font-semibold text-primary mb-4">
                  {category.category}
                </h4>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="text-sm text-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-dark p-12 rounded-lg border border-primary/20">
          <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
            Ready to Book Your Table?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Secure your reservation with a £50 deposit. Our team will confirm availability within 24 hours 
            and either confirm your booking or refund your deposit if unavailable.
          </p>
          <Button variant="primary" size="lg">
            Make Enquiry
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TableBookings;