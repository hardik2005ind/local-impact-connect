
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, Building2, Check, X, Eye, Crown, Heart } from 'lucide-react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('creator-requests');

  const mockCreatorRequests = [
    {
      id: 1,
      name: "Priya Sharma",
      instagram: "@priya_fashion",
      city: "Mumbai",
      niche: "Fashion",
      mobile: "+91 98765 43210",
      status: "pending"
    },
    {
      id: 2,
      name: "Rahul Kumar",
      instagram: "@tech_rahul",
      city: "Delhi",
      niche: "Tech",
      mobile: "+91 98765 43211",
      status: "pending"
    }
  ];

  const mockBrandRequests = [
    {
      id: 1,
      brandName: "Fashion Forward",
      contact: "contact@fashionforward.com",
      niche: "Fashion",
      instagram: "@fashionforward_brand",
      website: "https://fashionforward.com",
      status: "pending"
    },
    {
      id: 2,
      brandName: "Tech Innovations",
      contact: "+91 98765 43212",
      niche: "Technology",
      instagram: "@techinnovations",
      website: "",
      status: "pending"
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
            <div className="flex items-center gap-3">
              <div className="gradient-pink-maroon w-8 h-8 rounded-full flex items-center justify-center">
                <Crown className="h-4 w-4 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient-pink">
                Lokreach Admin
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setActiveSection('creator-requests')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === 'creator-requests' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                Creator Requests
              </button>
              <button
                onClick={() => setActiveSection('brand-requests')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === 'brand-requests' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                Brand Requests
              </button>
              <button
                onClick={() => setActiveSection('all-creators')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === 'all-creators' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                All Creators
              </button>
              <button
                onClick={() => setActiveSection('all-brands')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === 'all-brands' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                All Brands
              </button>
              <Button variant="outline" className="text-red-600 hover:bg-red-50 border-red-200">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Creator Requests */}
        {activeSection === 'creator-requests' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Creator Requests</h1>
            
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-pink-50">
                <TabsTrigger value="pending" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">Pending</TabsTrigger>
                <TabsTrigger value="accepted" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">Accepted</TabsTrigger>
                <TabsTrigger value="rejected" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">Rejected</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending" className="space-y-6 mt-6">
                {mockCreatorRequests.map(creator => (
                  <Card key={creator.id} className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 ring-2 ring-pink-200">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{creator.name}</h3>
                            <p className="text-gray-600">{creator.instagram}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <span>{creator.city}</span>
                              <Badge variant="outline" className="border-pink-200 text-pink-600">{creator.niche}</Badge>
                              <span>{creator.mobile}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="border-green-200 text-green-600 hover:bg-green-50">
                            <Eye className="h-4 w-4 mr-2" />
                            Review & Accept
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 border-red-200">
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Brand Requests */}
        {activeSection === 'brand-requests' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Brand Requests</h1>
            
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-pink-50">
                <TabsTrigger value="pending" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">Pending</TabsTrigger>
                <TabsTrigger value="verified" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">Verified</TabsTrigger>
                <TabsTrigger value="rejected" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">Rejected</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending" className="space-y-6 mt-6">
                {mockBrandRequests.map(brand => (
                  <Card key={brand.id} className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center ring-2 ring-pink-200">
                            <Building2 className="h-6 w-6 text-pink-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{brand.brandName}</h3>
                            <p className="text-gray-600">{brand.contact}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <Badge variant="outline" className="border-pink-200 text-pink-600">{brand.niche}</Badge>
                              {brand.instagram && <span>{brand.instagram}</span>}
                              {brand.website && <span>{brand.website}</span>}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="text-green-600 hover:bg-green-50 border-green-200">
                            <Check className="h-4 w-4 mr-2" />
                            Accept
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 border-red-200">
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* All Creators */}
        {activeSection === 'all-creators' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">All Creators</h1>
            <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="text-center py-12">
                  <div className="gradient-pink-maroon w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl text-gray-600 mb-4">Creator Management</h3>
                  <p className="text-gray-500">View and manage all verified creators</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* All Brands */}
        {activeSection === 'all-brands' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">All Brands</h1>
            <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="text-center py-12">
                  <div className="gradient-pink-maroon w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl text-gray-600 mb-4">Brand Management</h3>
                  <p className="text-gray-500">View and manage all verified brands</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
