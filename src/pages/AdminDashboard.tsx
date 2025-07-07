
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, Building2, Check, X, Eye } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Lokreach Admin
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setActiveSection('creator-requests')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === 'creator-requests' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Creator Requests
              </button>
              <button
                onClick={() => setActiveSection('brand-requests')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === 'brand-requests' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Brand Requests
              </button>
              <button
                onClick={() => setActiveSection('all-creators')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === 'all-creators' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                All Creators
              </button>
              <button
                onClick={() => setActiveSection('all-brands')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === 'all-brands' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                All Brands
              </button>
              <Button variant="outline" className="text-red-600 hover:bg-red-50">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Creator Requests */}
        {activeSection === 'creator-requests' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Creator Requests</h1>
            
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending" className="space-y-6 mt-6">
                {mockCreatorRequests.map(creator => (
                  <Card key={creator.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>{creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{creator.name}</h3>
                            <p className="text-gray-600">{creator.instagram}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <span>{creator.city}</span>
                              <Badge variant="outline">{creator.niche}</Badge>
                              <span>{creator.mobile}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Review & Accept
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="verified">Verified</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending" className="space-y-6 mt-6">
                {mockBrandRequests.map(brand => (
                  <Card key={brand.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{brand.brandName}</h3>
                            <p className="text-gray-600">{brand.contact}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <Badge variant="outline">{brand.niche}</Badge>
                              {brand.instagram && <span>{brand.instagram}</span>}
                              {brand.website && <span>{brand.website}</span>}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="text-green-600 hover:bg-green-50">
                            <Check className="h-4 w-4 mr-2" />
                            Accept
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
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
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
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
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center py-12">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
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
