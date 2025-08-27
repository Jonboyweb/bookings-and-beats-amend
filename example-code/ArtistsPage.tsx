import React from 'react';
import { FaInstagram, FaSpotify, FaSoundcloud, FaYoutube, FaTwitter } from 'react-icons/fa';

interface Artist {
  id: number;
  name: string;
  type: 'resident' | 'guest';
  genre: string;
  bio: string;
  image: string;
  socialMedia: {
    instagram?: string;
    spotify?: string;
    soundcloud?: string;
    youtube?: string;
    twitter?: string;
  };
  achievements?: string[];
}

// Sample artists data - replace with API call later
const sampleArtists: Artist[] = [
  {
    id: 1,
    name: 'DJ MARCO STEEL',
    type: 'resident',
    genre: 'House & Techno',
    bio: 'Marco Steel has been setting the underground scene ablaze for over a decade. His signature blend of deep house and driving techno creates an atmosphere that perfectly captures the essence of The Backroom.',
    image: '/images/artists/marco-steel.jpg',
    socialMedia: {
      instagram: '@marcosteel_dj',
      spotify: 'marco-steel',
      soundcloud: 'marcosteel'
    },
    achievements: ['Resident DJ since 2019', 'Featured at Underground Leeds Festival', 'Monthly residency at fabric London']
  },
  {
    id: 2,
    name: 'SOPHIA NOIR',
    type: 'resident',
    genre: 'Jazz & Soul Fusion',
    bio: 'Sophia brings the sophisticated sounds of jazz-infused electronic music to The Backroom. Her sets transport guests back to the golden age of speakeasies with a modern twist.',
    image: '/images/artists/sophia-noir.jpg',
    socialMedia: {
      instagram: '@sophianoir_music',
      spotify: 'sophia-noir',
      youtube: 'sophianoir'
    },
    achievements: ['Jazz FM Artist of the Year 2024', 'Glastonbury Jazz Stage headliner', 'Released on Ninja Tune Records']
  },
  {
    id: 3,
    name: 'THE GOLD RUSH DUO',
    type: 'guest',
    genre: 'Electro Swing',
    bio: 'This dynamic duo specializes in electro swing that perfectly captures the prohibition era spirit. Their high-energy performances have made them sought-after acts across the UK club scene.',
    image: '/images/artists/gold-rush-duo.jpg',
    socialMedia: {
      instagram: '@goldrush_duo',
      spotify: 'gold-rush-duo',
      soundcloud: 'goldrushduo',
      twitter: '@goldrushduo'
    },
    achievements: ['UK Electro Swing Champions 2023', 'Swing Republic Records artists', 'International festival circuit']
  },
  {
    id: 4,
    name: 'VINCENT UNDERGROUND',
    type: 'guest',
    genre: 'Deep House & Minimal',
    bio: 'Vincent brings the underground sound that made Leeds famous. His minimal approach and deep basslines create the perfect soundtrack for late-night sessions at The Backroom.',
    image: '/images/artists/vincent-underground.jpg',
    socialMedia: {
      instagram: '@vincent_underground',
      spotify: 'vincent-underground',
      soundcloud: 'vincentunderground'
    },
    achievements: ['BBC Radio 1 Essential Mix', 'Ibiza residency at Amnesia', 'Hotflush Recordings artist']
  },
  {
    id: 5,
    name: 'RUBY CHARLESTON',
    type: 'guest',
    genre: 'Vintage House & Disco',
    bio: 'Ruby Charleston brings the glamour and sophistication of vintage disco to modern dancefloors. Her carefully curated sets blend classic soul with contemporary house music.',
    image: '/images/artists/ruby-charleston.jpg',
    socialMedia: {
      instagram: '@rubycharleston',
      spotify: 'ruby-charleston',
      youtube: 'rubycharleston',
      twitter: '@rubycharleston'
    },
    achievements: ['Disco Hall of Fame inductee', 'Defected Records featured artist', 'International disco revival pioneer']
  },
  {
    id: 6,
    name: 'BLACK DIAMOND COLLECTIVE',
    type: 'resident',
    genre: 'Hip-Hop & R&B',
    bio: 'The Black Diamond Collective brings the energy of contemporary hip-hop and R&B to The Backroom. Their sets seamlessly blend classic tracks with the latest hits.',
    image: '/images/artists/black-diamond.jpg',
    socialMedia: {
      instagram: '@blackdiamond_collective',
      spotify: 'black-diamond-collective',
      soundcloud: 'blackdiamondcollective',
      twitter: '@blackdiamond_c'
    },
    achievements: ['Leeds Hip-Hop Awards winners', 'BBC 1Xtra featured artists', 'Monthly residency since 2022']
  }
];

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'instagram':
      return <FaInstagram />;
    case 'spotify':
      return <FaSpotify />;
    case 'soundcloud':
      return <FaSoundcloud />;
    case 'youtube':
      return <FaYoutube />;
    case 'twitter':
      return <FaTwitter />;
    default:
      return null;
  }
};

const ArtistCard: React.FC<{ artist: Artist }> = ({ artist }) => {
  return (
    <div className="bg-black border border-gold rounded-lg overflow-hidden shadow-2xl hover:shadow-gold/20 transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-64 object-cover"
          onError={(e) => {
            // Fallback to a placeholder if image doesn't exist
            e.currentTarget.src = `https://via.placeholder.com/400x300/000000/FFD700?text=${encodeURIComponent(artist.name)}`;
          }}
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            artist.type === 'resident' 
              ? 'bg-gold text-black' 
              : 'bg-black text-gold border border-gold'
          }`}>
            {artist.type}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gold mb-2 tracking-wider">
          {artist.name}
        </h3>
        
        <p className="text-gold/80 text-sm uppercase tracking-widest mb-3 font-semibold">
          {artist.genre}
        </p>
        
        <p className="text-champagne/90 text-sm leading-relaxed mb-4">
          {artist.bio}
        </p>
        
        {artist.achievements && (
          <div className="mb-4">
            <h4 className="text-gold font-semibold mb-2">Achievements:</h4>
            <ul className="text-champagne/80 text-xs space-y-1">
              {artist.achievements.map((achievement, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1 h-1 bg-gold rounded-full mr-2"></span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex space-x-3 pt-4 border-t border-gold/20">
          {Object.entries(artist.socialMedia).map(([platform, handle]) => (
            <a
              key={platform}
              href={`#${handle}`} // Replace with actual URLs
              className="text-gold hover:text-champagne transition-colors duration-200 text-lg"
              title={`${artist.name} on ${platform}`}
            >
              {getSocialIcon(platform)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const ArtistsPage: React.FC = () => {
  const residentArtists = sampleArtists.filter(artist => artist.type === 'resident');
  const guestArtists = sampleArtists.filter(artist => artist.type === 'guest');

  return (
    <div className="min-h-screen bg-black text-champagne pt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black via-black to-gold/20 py-20">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-gold mb-6 tracking-wider">
            ARTISTS & DJs
          </h1>
          <div className="w-32 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-champagne/90 max-w-3xl mx-auto leading-relaxed">
            Meet the masterful artists who bring The Backroom to life. From our resident DJs who know every corner of our underground sanctuary, to our carefully curated guest performers who push musical boundaries.
          </p>
        </div>
      </div>

      {/* Resident DJs Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gold mb-4 tracking-wider">
              RESIDENT DJs
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-lg text-champagne/80 max-w-2xl mx-auto">
              Our resident artists are the heartbeat of The Backroom. They understand our unique atmosphere and consistently deliver unforgettable nights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {residentArtists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>

      {/* Guest Artists Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-black to-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gold mb-4 tracking-wider">
              GUEST ARTISTS
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-lg text-champagne/80 max-w-2xl mx-auto">
              International and national talent that grace our stage. Each guest artist is carefully selected to enhance The Backroom experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guestArtists.map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gold mb-6 tracking-wider">
            BOOK AN ARTIST
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-lg text-champagne/80 mb-8 leading-relaxed">
            Interested in booking one of our talented artists for your private event or venue? 
            Contact our artist management team to discuss availability and pricing.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gold/5 border border-gold/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gold mb-3">Private Events</h3>
              <p className="text-champagne/80 text-sm">
                Perfect for corporate events, private parties, and special celebrations. Our artists adapt their sets to match your event's atmosphere.
              </p>
            </div>
            
            <div className="bg-gold/5 border border-gold/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gold mb-3">Venue Bookings</h3>
              <p className="text-champagne/80 text-sm">
                Looking to book our artists for your venue? We work with clubs, festivals, and events across the UK and internationally.
              </p>
            </div>
          </div>
          
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
            <a
              href="/contact"
              className="inline-block bg-gold text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gold/90 transition-colors duration-200 tracking-wider"
            >
              CONTACT MANAGEMENT
            </a>
            <a
              href="/private-hire"
              className="inline-block bg-transparent border-2 border-gold text-gold px-8 py-4 rounded-lg font-bold text-lg hover:bg-gold hover:text-black transition-colors duration-200 tracking-wider"
            >
              PRIVATE HIRE INFO
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 px-4 border-t border-gold/20">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gold mb-4 tracking-wider">
            STAY UPDATED
          </h3>
          <p className="text-champagne/80 mb-6">
            Subscribe to our newsletter to be the first to know about new resident DJs, guest artist announcements, and exclusive events.
          </p>
          
          <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-champagne/10 border border-gold/30 text-champagne placeholder-champagne/50 focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="bg-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-gold/90 transition-colors duration-200 tracking-wider"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ArtistsPage;