import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, ExternalLink, Music } from "lucide-react";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Shhh!",
      date: "Every Saturday", 
      time: "11:00 PM - 6:00 AM",
      description: "Est. 2012. Leeds' longest running weekly RnB party! Two floors of music with RnB, Hip Hop, House & Garage upstairs and eclectic sounds downstairs.",
      capacity: "350 guests",
      status: "Est. 2012",
      image: "/venue-assets/event-artwork/shhh-saturday-event-art.jpg",
      djs: "@djcp01, @danhillsonline, @djindyuk02, @vybzindahouse",
      floors: "Upstairs: RnB, Hip Hop, House, Garage | Downstairs: Eclectic"
    },
    {
      id: 2,
      title: "La Fiesta | Bella Gente", 
      date: "Every Friday",
      time: "11:00 PM - 6:00 AM",
      description: "The city's best International Fiesta! Two floors of music with 4 DJs and live dancers. RnB/Hip Hop upstairs, Reggaeton/Latin downstairs.",
      capacity: "350 guests",
      status: "Weekly Fiesta",
      image: "/venue-assets/event-artwork/bella-gente-friday-event-art.jpeg",
      djs: "@djdyl, @djdiogovaz, @djborris_paulo, @onlydjflex",
      floors: "Upstairs: RnB/Hip Hop | Downstairs: Reggaeton/Latin"
    },
    {
      id: 3,
      title: "Nostalgia",
      date: "Every Sunday", 
      time: "11:00 PM - 5:00 AM",
      description: "Sunday night mash up of music with discounted drinks & late-night license. Throwbacks, Disco, RnB, Hip Hop and party classics all night long.",
      capacity: "350 guests",
      status: "Sunday Sessions",
      image: "/venue-assets/event-artwork/nostalgia-sunday-event-art.jpg",
      djs: "@djindyuk02 & guests",
      floors: "Throwbacks, Disco, RnB, Hip Hop, Party Classics"
    }
  ];

  return (
    <section id="events" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Regular Events
          </h2>
          <div className="w-24 h-px bg-gradient-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join us every week for Leeds' best underground club nights. Two floors of music, top DJs, and unforgettable nights until 6am.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id}
              className="gradient-card rounded-lg shadow-card border border-primary/10 hover:shadow-luxury transition-luxury overflow-hidden"
            >
              {/* Event Image */}
              <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-primary rounded-full">
                    {event.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                  {event.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {event.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{event.capacity}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Music className="w-4 h-4 text-primary mt-0.5" />
                    <span className="text-foreground">{event.floors}</span>
                  </div>
                </div>

                <div className="mb-4 p-3 bg-primary/5 rounded-lg">
                  <p className="text-xs font-semibold text-primary mb-1">DJs:</p>
                  <p className="text-sm text-foreground">{event.djs}</p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="flex-1"
                  >
                    Get Tickets
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Book Table
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.open('https://www.fatsoma.com/p/backroomleeds', '_blank')}
          >
            View All Events on Fatsoma
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Events;