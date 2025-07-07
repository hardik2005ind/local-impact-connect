
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Users, Star, Calendar, DollarSign, Heart, Sparkles } from 'lucide-react';

const CreatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const mockCampaigns = [
    {
      id: 1,
      brandName: "Fashion Forward",
      title: "Summer Collection Showcase",
      reward: "Cash + Products",
      city: "Mumbai",
      status: "Open",
      description: "Promote our latest summer collection with 3 Instagram posts"
    },
    {
      id: 2,
      brandName: "Tech Innovations",
      title: "Smartphone Review Campaign",
      reward: "Cash",
      city: "Delhi",
      status: "Open",
      description: "Create detailed review content for our new smartphone"
    }
  ];

  const registeredCampaigns = [
    {
      id: 1,
      brandName: "Fitness Pro",
      title: "Workout Gear Promotion",
      status: "Pending",
      appliedDate: "2024-01-15"
    },
    {
      id: 2,
      brandName: "Food Delight",
      title: "Restaurant Review",
      status: "Accepted",
      appliedDate: "2024-01-10"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      <div className="absolute -bottom-8 left-1/2 w-32 h-32 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gradient-pink">
              <Heart className="h-6 w-6 text-pink-500" />
              Lokreach
            </Link>
            
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'profile' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('all-campaigns')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'all-campaigns' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                All Campaigns
              </button>
              <button
                onClick={() => setActiveTab('registered-campaigns')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'registered-campaigns' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                Registered Campaigns
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Creator Profile</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <Card className="lg:col-span-1 bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-pink-200">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl">AB</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Arjun Bharti</h3>
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>Mumbai, Maharashtra</span>
                    </div>
                    <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0">Fashion & Lifestyle</Badge>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-pink-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-pink-600">15.2K</div>
                        <div className="text-sm text-gray-600">Followers</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">4.8%</div>
                        <div className="text-sm text-gray-600">Engagement</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Management */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-pink-500/10 to-purple-500/10">
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-pink-500" />
                      Profile Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <h3 className="text-lg text-gray-600 mb-4">Profile Editor</h3>
                      <p className="text-gray-500 mb-4">Edit your bio, stats, and portfolio details</p>
                      <Button className="gradient-pink-maroon text-white hover:opacity-90 transition-all shadow-lg transform hover:scale-[1.02]">
                        Edit Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-pink-500/10 to-purple-500/10">
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-pink-50 rounded-lg">
                        <Users className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                        <div className="text-lg font-semibold">15.2K</div>
                        <div className="text-sm text-gray-600">Followers</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                        <div className="text-lg font-semibold">4.8%</div>
                        <div className="text-sm text-gray-600">Engagement</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-lg font-semibold">12</div>
                        <div className="text-sm text-gray-600">Campaigns</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-lg font-semibold">₹45K</div>
                        <div className="text-sm text-gray-600">Earned</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* All Campaigns Tab */}
        {activeTab === 'all-campaigns' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">All Campaigns</h1>
            
            <div className="grid gap-6">
              {mockCampaigns.map(campaign => (
                <Card key={campaign.id} className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="text-xl font-semibold text-gray-900">{campaign.title}</h3>
                          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                            {campaign.status}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{campaign.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <span className="font-medium">Brand:</span>
                            <span>{campaign.brandName}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{campaign.city}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{campaign.reward}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">View Details</Button>
                        <Button className="gradient-pink-maroon text-white hover:opacity-90 transition-all shadow-lg transform hover:scale-[1.02]">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Registered Campaigns Tab */}
        {activeTab === 'registered-campaigns' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Registered Campaigns</h1>
            
            <div className="grid gap-6">
              {registeredCampaigns.map(campaign => (
                <Card key={campaign.id} className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{campaign.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span><strong>Brand:</strong> {campaign.brandName}</span>
                          <span><strong>Applied:</strong> {campaign.appliedDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge 
                          variant={campaign.status === 'Accepted' ? 'default' : 'secondary'}
                          className={campaign.status === 'Accepted' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'}
                        >
                          {campaign.status}
                        </Badge>
                        <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">View Campaign</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorDashboard;
