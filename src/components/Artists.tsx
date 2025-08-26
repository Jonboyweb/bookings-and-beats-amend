import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music, Headphones, Calendar, Users } from "lucide-react";

const Artists = () => {
  const featuredArtists = [
    {
      name: "DJ Marcus Steel",
      genre: "House & Tech House",
      description: "Leeds-based house music specialist with residencies across the North. Known for his deep, driving sets that keep the dance floor moving all night.",
      achievements: ["Resident DJ at The Backroom", "10+ years experience", "Played at Leeds Festival"]
    },
    {
      name: "Sarah Valentine",
      genre: "Jazz & Swing",
      description: "Bringing authentic 1920s jazz to modern audiences. Her live performances perfectly complement The Backroom's prohibition-era atmosphere.",
      achievements: ["Live jazz vocalist", "Period-authentic performances", "Regular Friday night performer"]
    },
    {
      name: "The Prohibition Collective",
      genre: "Electronic & Vintage Fusion",
      description: "A rotating collective of DJs and musicians who blend contemporary beats with vintage samples, creating a unique soundscape.",
      achievements: ["Exclusive to The Backroom", "Monthly showcase events", "Original productions"]
    }
  ];

  const musicStyles = [
    {
      icon: Music,
      title: "House & Electronic",
      description: "High-energy sets featuring the latest house, techno, and electronic tracks",
      nights: "Saturday Sessions"
    },
    {
      icon: Headphones,
      title: "Jazz & Swing", 
      description: "Live performances and DJ sets celebrating the golden age of jazz",
      nights: "Friday Jazz Nights"
    },
    {
      icon: Users,
      title: "Mixed Genre",
      description: "Eclectic mixes spanning decades, from prohibition classics to modern hits",
      nights: "Special Events"
    }
  ];

  return (
    <section id="artists" className="py-20 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Artists & DJs
          </h2>
          <div className="w-24 h-px bg-gradient-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Meet the talented artists who bring The Backroom to life. From resident DJs to special guests, 
            our lineup spans genres while maintaining the sophisticated atmosphere you expect.
          </p>
        </div>

        {/* Music Styles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {musicStyles.map((style, index) => {
            const IconComponent = style.icon;
            return (
              <Card key={index} className="p-6 text-center gradient-card border border-primary/10 hover:shadow-luxury transition-luxury">
                <IconComponent className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{style.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{style.description}</p>
                <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                  {style.nights}
                </span>
              </Card>
            );
          })}
        </div>

        {/* Featured Artists */}
        <div className="mb-16">
          <h3 className="font-display text-3xl font-semibold text-center mb-12">Featured Artists</h3>
          <div className="space-y-8">
            {featuredArtists.map((artist, index) => (
              <Card key={index} className="p-8 gradient-card border border-primary/10 hover:shadow-luxury transition-luxury">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                      <h4 className="font-display text-2xl font-semibold text-foreground">
                        {artist.name}
                      </h4>
                      <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
                        {artist.genre}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {artist.description}
                    </p>
                    <div className="space-y-2">
                      {artist.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-sm text-foreground">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Artist Application CTA */}
        <div className="text-center bg-gradient-dark p-12 rounded-lg border border-primary/20">
          <Calendar className="w-12 h-12 text-primary mx-auto mb-6" />
          <h3 className="font-display text-3xl font-semibold text-foreground mb-4">
            Join Our Artist Roster
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Are you a talented DJ or musician who shares our passion for quality entertainment? 
            We're always looking for exceptional artists to join The Backroom family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Apply to Perform
            </Button>
            <Button variant="outline" size="lg">
              Submit Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Artists;