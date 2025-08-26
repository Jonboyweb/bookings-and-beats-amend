import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-backroom.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      {/* Art Deco Overlay Pattern */}
      <div className="absolute inset-0 art-deco-bg"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
          THE BACKROOM
        </h1>
        <div className="w-32 h-px bg-gradient-primary mx-auto mb-6"></div>
        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-4 font-sans">
          Leeds' Premier Prohibition-Themed Nightclub
        </p>
        <p className="text-base sm:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Experience the luxury of the 1920s speakeasy era with weekend DJ events, 
          exclusive table bookings, and unforgettable private hire experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="primary" size="xl" className="min-w-48">
            Book a Table
          </Button>
          <Button variant="outline" size="xl" className="min-w-48">
            View Events
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;