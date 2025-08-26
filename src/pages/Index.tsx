import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Events from "@/components/Events";
import TableBookings from "@/components/TableBookings";
import PrivateHire from "@/components/PrivateHire";
import Artists from "@/components/Artists";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background art-deco-bg">
      <Navigation />
      <Hero />
      <Events />
      <TableBookings />
      <PrivateHire />
      <Artists />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;