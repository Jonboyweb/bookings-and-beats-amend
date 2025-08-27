import React from 'react'
import { MapPin, Phone, Mail, Clock, Users, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { venueInfo } from '../data/mockData'

export function AboutPage() {
  const stats = [
    { label: 'Total Capacity', value: '500', icon: Users },
    { label: 'Years Operating', value: '8+', icon: Star },
    { label: 'Events per Month', value: '50+', icon: Clock },
    { label: 'Happy Customers', value: '10K+', icon: Star }
  ]

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'General Manager',
      bio: 'With over 10 years in hospitality, Sarah ensures every event exceeds expectations.',
      image: '/assets/images/team-placeholder.jpg'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Events',
      bio: 'Marcus specializes in creating unforgettable private events and celebrations.',
      image: '/assets/images/team-placeholder.jpg'
    },
    {
      name: 'Emma Thompson',
      role: 'Customer Experience Manager',
      bio: 'Emma leads our customer service team to deliver exceptional experiences.',
      image: '/assets/images/team-placeholder.jpg'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-black/80 to-zinc-900/80">
        <div className="absolute inset-0">
          <img 
            src="/assets/images/speakeasy-interior.jpg" 
            alt="About The Backroom" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-amber-400 mb-6">
            About The Backroom
          </h1>
          <p className="text-xl text-amber-200 max-w-3xl mx-auto">
            Leeds' premier speakeasy experience, where prohibition-era elegance meets modern nightlife.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-amber-400 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-amber-200">
                <p>
                  Hidden away on Call Lane, The Backroom Leeds has been the city's best-kept secret since 2016. 
                  Inspired by the speakeasies of the 1920s, we've created an atmosphere where sophistication 
                  meets revelry, and every night tells a story.
                </p>
                <p>
                  Our two distinct spaces offer flexibility for every occasion. The intimate downstairs area 
                  provides a sophisticated setting for those seeking a more exclusive experience, while our 
                  upstairs venue delivers high-energy entertainment for larger celebrations.
                </p>
                <p>
                  With a commitment to exceptional service, premium drinks, and unforgettable experiences, 
                  The Backroom has become synonymous with the finest nightlife Leeds has to offer.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/assets/images/prohibition-bar.png" 
                alt="Prohibition Bar" 
                className="rounded-lg shadow-prohibition"
              />
              <img 
                src="/assets/images/nightclub-dancing.jpeg" 
                alt="Dancing" 
                className="rounded-lg shadow-prohibition mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <Icon className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-amber-400 mb-1">{stat.value}</div>
                  <div className="text-amber-200 text-sm">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-amber-400 mb-4">
              What Makes Us Special
            </h2>
            <p className="text-xl text-amber-200 max-w-2xl mx-auto">
              Every detail is crafted to deliver an exceptional experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venueInfo.features.map((feature, index) => (
              <Card key={index} className="hover:shadow-prohibition transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                  <p className="text-amber-200">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-amber-400 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-amber-200 max-w-2xl mx-auto">
              The passionate professionals behind your unforgettable experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-prohibition transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-amber-400/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-amber-400 mb-1">{member.name}</h3>
                  <p className="text-amber-300 mb-3">{member.role}</p>
                  <p className="text-amber-200 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1">Address</h4>
                    <p className="text-amber-200">{venueInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1">Phone</h4>
                    <a href={`tel:${venueInfo.phone}`} className="text-amber-200 hover:text-amber-400 transition-colors">
                      {venueInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1">Email</h4>
                    <a href={`mailto:${venueInfo.email}`} className="text-amber-200 hover:text-amber-400 transition-colors">
                      {venueInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1">Opening Hours</h4>
                    <div className="space-y-1 text-amber-200 text-sm">
                      <div className="flex justify-between">
                        <span>Friday:</span>
                        <span>{venueInfo.opening_hours.friday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span>{venueInfo.opening_hours.saturday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span>{venueInfo.opening_hours.sunday}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Find Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-zinc-800 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-amber-300">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-semibold">Interactive Map</p>
                    <p className="text-sm">Located in the heart of Leeds city centre</p>
                    <p className="text-xs mt-2">Easy access via public transport</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Button className="w-full" asChild>
                    <a href={`https://maps.google.com/?q=${encodeURIComponent(venueInfo.address)}`} target="_blank" rel="noopener noreferrer">
                      <MapPin className="w-4 h-4 mr-2" />
                      View on Google Maps
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}