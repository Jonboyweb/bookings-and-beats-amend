import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Music, Utensils, Calendar, Star, Building2 } from "lucide-react";

const PrivateHire = () => {
  const venueFeatures = [
    {
      icon: Building2,
      title: "Flexible Spaces",
      description: "Two distinct floors offering different atmospheres - intimate upstairs or spacious downstairs areas"
    },
    {
      icon: Users,
      title: "Capacity Options",
      description: "Accommodate 50-250 guests with flexible seating and standing arrangements"
    },
    {
      icon: Music,
      title: "Professional Sound",
      description: "State-of-the-art sound system with DJ booth and lighting for any entertainment needs"
    },
    {
      icon: Utensils,
      title: "Full Service Bar",
      description: "Complete bar service with prohibition-era cocktails and premium bottle selection"
    }
  ];

  const eventTypes = [
    {
      title: "Corporate Events",
      description: "Impress clients and colleagues with sophisticated networking events in our unique setting.",
      features: ["Private bar area", "Catering options", "AV equipment", "Professional service"]
    },
    {
      title: "Christmas Parties",
      description: "Celebrate the festive season with style in Leeds' most atmospheric venue.",
      features: ["Festive decorations", "Party packages", "Group menus", "Entertainment options"]
    },
    {
      title: "Private Club Nights",
      description: "Host your own exclusive club night with full venue hire and professional support.",
      features: ["Complete venue hire", "Sound system access", "Door staff", "Bar management"]
    },
    {
      title: "Special Celebrations",
      description: "From birthdays to anniversaries, make your celebration unforgettable.",
      features: ["Customized setup", "Personal service", "Decoration options", "Photography area"]
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
              <p>• Premium canapé selection</p>
              <p>• Prohibition-era cocktail packages</p>
              <p>• Champagne and wine service</p>
              <p>• Late-night snack platters</p>
              <p>• Custom menu creation available</p>
            </div>
          </Card>

          <Card className="p-8 gradient-card border border-primary/10">
            <Music className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
              Entertainment
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• Professional DJ services</p>
              <p>• Live jazz performances</p>
              <p>• Themed entertainment acts</p>
              <p>• Audio-visual equipment</p>
              <p>• Lighting packages available</p>
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