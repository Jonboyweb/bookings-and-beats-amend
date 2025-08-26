import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-dark border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-3xl font-bold text-primary mb-4">
              THE BACKROOM
            </h3>
            <p className="text-xs text-muted-foreground font-sans tracking-widest mb-4">
              LEEDS
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Leeds' premier prohibition-themed nightclub offering an authentic 1920s speakeasy experience with modern luxury.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-luxury">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-luxury">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-luxury">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#events" className="text-muted-foreground hover:text-primary transition-luxury">Events</a></li>
              <li><a href="#table-bookings" className="text-muted-foreground hover:text-primary transition-luxury">Table Bookings</a></li>
              <li><a href="#private-hire" className="text-muted-foreground hover:text-primary transition-luxury">Private Hire</a></li>
              <li><a href="#artists" className="text-muted-foreground hover:text-primary transition-luxury">Artists</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-luxury">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-muted-foreground">Corporate Events</span></li>
              <li><span className="text-muted-foreground">Private Parties</span></li>
              <li><span className="text-muted-foreground">Table Service</span></li>
              <li><span className="text-muted-foreground">DJ Bookings</span></li>
              <li><span className="text-muted-foreground">Christmas Parties</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground text-sm">The Backroom</p>
                  <p className="text-muted-foreground text-sm">Leeds City Centre</p>
                  <p className="text-muted-foreground text-sm">West Yorkshire</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-muted-foreground text-sm">+44 113 XXX XXXX</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-muted-foreground text-sm">info@thebackroomleeds.co.uk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="border-t border-primary/20 pt-8 mb-8">
          <div className="text-center">
            <h4 className="font-semibold text-foreground mb-4">Opening Hours</h4>
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <div className="text-center">
                <p className="text-primary font-medium">Friday</p>
                <p className="text-muted-foreground text-sm">9:00 PM - 2:00 AM</p>
              </div>
              <div className="text-center">
                <p className="text-primary font-medium">Saturday</p>
                <p className="text-muted-foreground text-sm">10:00 PM - 3:00 AM</p>
              </div>
              <div className="text-center">
                <p className="text-primary font-medium">Private Events</p>
                <p className="text-muted-foreground text-sm">By Arrangement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2024 The Backroom Leeds. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-luxury">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-luxury">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-luxury">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;