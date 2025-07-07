
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, MapPin, Users, Heart, MessageCircle, Star } from 'lucide-react';

const BrandDashboard = () => {
  const [activeTab, setActiveTab] = useState('find-creators');
  const [searchCity, setSearchCity] = useState('');

  const mockCreators = [
    {
      id: 1,
      name: "Priya Sharma",
      city: "Mumbai",
      followers: "15.2K",
      niche: "Fashion",
      avatar: "/placeholder.svg",
      engagement: "4.8%",
      avgLikes: "720",
      avgComments: "45"
    },
    {
      id: 2,
      name: "Rahul Kumar",
      city: "Delhi",
      followers: "28.5K",
      niche: "Tech",
      avatar: "/placeholder.svg",
      engagement: "5.2%",
      avgLikes: "1.2K",
      avgComments: "85"
    },
    {
      id: 3,
      name: "Sneha Patel",
      city: "Bangalore",
      followers: "8.9K",
      niche: "Food",
      avatar: "/placeholder.svg",
      engagement: "6.1%",
      avgLikes: "540",
      avgComments: "32"
    }
  ];

  const mockCampaigns = [
    {
      id: 1,
      title: "Summer Fashion Launch",
      status: "Active",
      applicants: 24,
      type: "active"
    },
    {
      id: 2,
      title: "Tech Product Review",
      status: "Closed",
      applicants: 12,
      type: "closed"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Lokreach
            </Link>
            
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setActiveTab('find-creators')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'find-creators' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Find Creators
              </button>
              <button
                onClick={() => setActiveTab('create-campaign')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'create-campaign' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Create Campaign
              </button>
              <button
                onClick={() => setActiveTab('my-campaigns')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'my-campaigns' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                My Campaigns
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'profile' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Find Creators Tab */}
        {activeTab === 'find-creators' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Creators</h1>
            
            {/* Search Bar */}
            <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search by city..."
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="pl-10 bg-white/70"
                    />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Creators Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCreators.map(creator => (
                <Card key={creator.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={creator.avatar} />
                        <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{creator.name}</h3>
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="h-3 w-3" />
                          <span className="text-sm">{creator.city}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="secondary">{creator.niche}</Badge>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="h-3 w-3" />
                        <span className="text-sm">{creator.followers}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center mb-4">
                      <div>
                        <div className="flex items-center justify-center gap-1">
                          <Heart className="h-3 w-3 text-red-500" />
                          <span className="text-xs text-gray-600">{creator.avgLikes}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-1">
                          <MessageCircle className="h-3 w-3 text-blue-500" />
                          <span className="text-xs text-gray-600">{creator.avgComments}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs text-gray-600">{creator.engagement}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* My Campaigns Tab */}
        {activeTab === 'my-campaigns' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Campaigns</h1>
            
            <div className="grid gap-6">
              {mockCampaigns.map(campaign => (
                <Card key={campaign.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{campaign.title}</h3>
                        <div className="flex items-center gap-4">
                          <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                            {campaign.status}
                          </Badge>
                          <span className="text-gray-600">{campaign.applicants} applicants</span>
                        </div>
                      </div>
                      <Button variant="outline">View Applications</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Create Campaign Tab */}
        {activeTab === 'create-campaign' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Campaign</h1>
            
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center py-12">
                  <h3 className="text-xl text-gray-600 mb-4">Campaign Creation Form</h3>
                  <p className="text-gray-500">This feature will be implemented in the next iteration</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Brand Profile</h1>
            
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center py-12">
                  <h3 className="text-xl text-gray-600 mb-4">Profile Management</h3>
                  <p className="text-gray-500">This feature will be implemented in the next iteration</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandDashboard;
