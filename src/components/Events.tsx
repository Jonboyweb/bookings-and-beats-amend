import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, ExternalLink } from "lucide-react";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Saturday Night Sessions",
      date: "Every Saturday",
      time: "10:00 PM - 3:00 AM", 
      description: "Join us for our legendary Saturday night sessions with Leeds' hottest DJs spinning the latest tracks.",
      capacity: "200 guests",
      status: "Weekly Event"
    },
    {
      id: 2,
      title: "Friday Night Jazz",
      date: "Every Friday",
      time: "9:00 PM - 2:00 AM",
      description: "Sophisticated jazz nights with live performances and prohibition-era cocktails.",
      capacity: "150 guests", 
      status: "Weekly Event"
    },
    {
      id: 3,
      title: "Prohibition Party",
      date: "Last Saturday of Month",
      time: "8:00 PM - 4:00 AM",
      description: "Our signature monthly event featuring 1920s themed entertainment, dress code encouraged.",
      capacity: "250 guests",
      status: "Monthly Special"
    }
  ];

  return (
    <section id="events" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Upcoming Events
          </h2>
          <div className="w-24 h-px bg-gradient-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the best of Leeds nightlife with our curated weekly events and exclusive monthly celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id}
              className="gradient-card p-8 rounded-lg shadow-card border border-primary/10 hover:shadow-luxury transition-luxury"
            >
              <div className="mb-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-4">
                  {event.status}
                </span>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                  {event.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="space-y-3 mb-8">
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
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => window.open('https://www.fatsoma.com/p/backroomleeds', '_blank')}
                >
                  Get Tickets
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Book Table
                </Button>
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