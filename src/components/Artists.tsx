import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Music, Headphones, Calendar, Users } from "lucide-react";

const Artists = () => {
  const featuredArtists = [
    {
      name: "Dan Hills (@danhillsonline)",
      genre: "RnB, Hip Hop, House, Garage", 
      description: "Shhh! Saturday night resident DJ with years of experience crafting the perfect party atmosphere. Master of crowd control and peak-time energy.",
      achievements: ["Shhh! resident DJ", "Saturday night specialist", "Experienced crowd reader"]
    },
    {
      name: "DJ Flex (@onlydjflex)",
      genre: "RnB, Hip Hop, House, Garage",
      description: "La Fiesta resident DJ bringing energy and versatility to Friday nights. Known for seamless mixing and keeping the crowd engaged all night long.",
      achievements: ["La Fiesta resident DJ", "Friday night regular", "Versatile mixing specialist"]
    },
    {
      name: "Vybz In Da House (@vybzindahouse)",
      genre: "RnB, Hip Hop, House, Garage",
      description: "Dynamic Shhh! Saturday resident bringing high-energy sets and infectious vibes. Known for creating unforgettable moments on the dancefloor.",
      achievements: ["Shhh! resident DJ", "High-energy specialist", "Saturday night favorite"]
    },
    {
      name: "DJ CP (@djcp01)",
      genre: "RnB, Hip Hop, House, Garage",
      description: "Resident DJ for Shhh! Saturday nights since 2012. One of Leeds' most established names in RnB and Hip Hop, bringing energy to packed dancefloors every week.",
      achievements: ["Shhh! resident DJ", "10+ years at The Backroom", "Saturday night regular"]
    },
    {
      name: "DJ Indy (@djindyuk02)",
      genre: "Throwbacks, Disco, Party Classics",
      description: "Multi-night resident spinning at both Shhh! Saturdays and Nostalgia Sundays. Master of reading the crowd and delivering the perfect soundtrack.",
      achievements: ["Multi-night resident", "Sunday Nostalgia host", "Crowd favorite"]
    },
    {
      name: "DJ Dyl (@djdyl)",
      genre: "RnB, Hip Hop, International",
      description: "Friday night resident for La Fiesta | Bella Gente. Specialist in international sounds and party vibes, guaranteed to get the crowd moving.",
      achievements: ["La Fiesta resident DJ", "International music specialist", "Friday night favorite"]
    },
  ];

  const musicStyles = [
    {
      icon: Music,
      title: "Friday - La Fiesta",
      description: "International Fiesta with RnB/Hip Hop upstairs and Reggaeton/Latin downstairs",
      nights: "11pm - 6am"
    },
    {
      icon: Headphones,
      title: "Saturday - Shhh!", 
      description: "Leeds' longest running RnB party est. 2012 with House, Garage and eclectic sounds",
      nights: "11pm - 6am"
    },
    {
      icon: Users,
      title: "Sunday - Nostalgia",
      description: "Throwbacks, Disco, RnB, Hip Hop and party classics with discounted drinks",
      nights: "11pm - 5am"
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

        {/* DJ Booking CTA */}
        <div className="text-center bg-gradient-dark p-12 rounded-lg border border-primary/20">
          <Calendar className="w-12 h-12 text-primary mx-auto mb-6" />
          <h3 className="font-display text-3xl font-semibold text-foreground mb-4">
            DJ Bookings & Submissions
          </h3>
          <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
            DJ hire available for private events from £85/hour. Open format available for private hire events.
          </p>
          <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
            For DJ bookings and submissions contact: info@backroomleeds.co.uk
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Submit Demo
            </Button>
            <Button variant="outline" size="lg">
              Book DJ for Event
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Artists;