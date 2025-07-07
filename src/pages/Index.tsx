
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { 
  Users, 
  Building2, 
  MapPin, 
  Search, 
  Zap, 
  Shield, 
  MessageSquare,
  Mail,
  Phone,
  Star,
  Heart,
  TrendingUp
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-gradient-pink">
              Lokreach
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-pink-600 transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-pink-600 transition-colors">About Us</a>
              <a href="#contact" className="text-gray-700 hover:text-pink-600 transition-colors">Contact Us</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/signup">
                <Button className="gradient-pink-maroon text-white hover:opacity-90 transition-opacity shadow-lg">
                  Sign Up
                </Button>
              </Link>
              <Link to="/signin">
                <Button variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-50">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-purple-100/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              The Marketplace Where <span className="text-gradient-pink">Influence</span> Meets <span className="text-gradient-pink">Local Impact</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Whether you're a brand looking to promote or someone ready to earn — you're in the right place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link to="/signup?type=creator">
                <Button size="lg" className="gradient-pink-maroon text-white hover:opacity-90 transition-all transform hover:scale-105 shadow-xl px-8 py-4 text-lg">
                  <Users className="mr-2 h-5 w-5" />
                  I am a Creator
                </Button>
              </Link>
              <Link to="/signup?type=brand">
                <Button size="lg" variant="outline" className="border-2 border-pink-300 text-pink-700 hover:bg-pink-50 transition-all transform hover:scale-105 px-8 py-4 text-lg">
                  <Building2 className="mr-2 h-5 w-5" />
                  We are a Brand
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="gradient-pink-maroon w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
                  <div className="text-gray-600">Active Creators</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="gradient-rose-burgundy w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
                  <div className="text-gray-600">Brand Partners</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                  <div className="text-gray-600">Cities Covered</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose <span className="text-gradient-pink">LocoLab</span>?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover the features that make us the perfect platform for local influencer marketing</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="gradient-pink-maroon w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Local Discovery</h3>
                <p className="text-gray-600">Find creators in your specific city or region for targeted local campaigns</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="gradient-rose-burgundy w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Campaigns</h3>
                <p className="text-gray-600">Launch campaigns quickly and get applications from relevant creators</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure Platform</h3>
                <p className="text-gray-600">Safe and secure environment for all transactions and communications</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-r from-pink-400 to-rose-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Collaboration</h3>
                <p className="text-gray-600">Built-in messaging and collaboration tools for seamless communication</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About <span className="text-gradient-pink">LocoLab</span></h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                LocoLab revolutionizes how brands connect with local content creators across India. We help creators monetize their influence while enabling brands to reach targeted audiences with authentic, location-specific content.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="gradient-pink-maroon w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
                    <p className="text-gray-600">To democratize influencer marketing through authentic local connections, data-driven partnerships, and transparent collaboration.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="gradient-rose-burgundy w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Our Vision</h3>
                    <p className="text-gray-600">To become India's leading local influencer marketing platform with a nationwide creator network and AI-powered matching.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 gradient-pink-soft rounded-3xl transform rotate-6"></div>
              <Card className="relative bg-white/90 backdrop-blur-sm border-pink-100 shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <Star className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                      <div className="text-sm text-gray-600">Platform Rating</div>
                    </div>
                    <div className="text-center">
                      <Heart className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">98%</div>
                      <div className="text-sm text-gray-600">Satisfaction Rate</div>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">5M+</div>
                      <div className="text-sm text-gray-600">Reach Generated</div>
                    </div>
                    <div className="text-center">
                      <Zap className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">2.5K+</div>
                      <div className="text-sm text-gray-600">Campaigns Run</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in <span className="text-gradient-pink">Touch</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Ready to start your journey? We'd love to hear from you</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <Card className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="gradient-pink-maroon w-12 h-12 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-600">123 Business District, Mumbai, Maharashtra 400001</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="gradient-rose-burgundy w-12 h-12 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">hello@locolab.com</p>
                      <p className="text-gray-600">support@locolab.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">+91 98765 43210</p>
                      <p className="text-gray-600">+91 98765 43211</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" className="border-pink-200 focus:border-pink-400" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" className="border-pink-200 focus:border-pink-400" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" className="border-pink-200 focus:border-pink-400" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" rows={4} className="border-pink-200 focus:border-pink-400" />
                  </div>
                  
                  <Button className="w-full gradient-pink-maroon text-white hover:opacity-90 transition-opacity">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="text-2xl font-bold text-gradient-pink mb-4">Lokreach</div>
              <p className="text-gray-400 mb-6">The marketplace where influence meets local impact.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-pink-300">Platform</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-pink-300 transition-colors">For Creators</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-300 transition-colors">For Brands</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-300 transition-colors">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-pink-300">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-pink-300 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-300 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-300 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-pink-300">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-pink-300 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-300 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-300 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              LocoLab — The marketplace where influence meets local impact. © 2024 LocoLab. All rights reserved. Made in India ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
