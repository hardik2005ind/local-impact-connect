
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, Building2, Crown, Heart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCreatorRequests, useBrandRequests } from '@/hooks/useAdmin';
import { useCreators } from '@/hooks/useCreators';
import { useBrands } from '@/hooks/useBrands';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import CreatorReviewDialog from '@/components/CreatorReviewDialog';
import BrandReviewDialog from '@/components/BrandReviewDialog';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('creator-requests');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [brandDialogOpen, setBrandDialogOpen] = useState(false);
  
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: creatorRequests, isLoading: loadingCreatorRequests } = useCreatorRequests();
  const { data: brandRequests, isLoading: loadingBrandRequests } = useBrandRequests();
  const { data: allCreators, isLoading: loadingCreators } = useCreators();
  const { data: allBrands, isLoading: loadingBrands } = useBrands();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out.",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out.",
        variant: "destructive",
      });
    }
  };

  const handleCreatorReview = (request: any) => {
    setSelectedRequest(request);
    setReviewDialogOpen(true);
  };

  const handleBrandReview = (request: any) => {
    setSelectedRequest(request);
    setBrandDialogOpen(true);
  };

  const pendingCreatorRequests = creatorRequests?.filter(req => req.status === 'pending') || [];
  const acceptedCreatorRequests = creatorRequests?.filter(req => req.status === 'accepted') || [];
  const rejectedCreatorRequests = creatorRequests?.filter(req => req.status === 'rejected') || [];

  const pendingBrandRequests = brandRequests?.filter(req => req.status === 'pending') || [];
  const acceptedBrandRequests = brandRequests?.filter(req => req.status === 'accepted') || [];
  const rejectedBrandRequests = brandRequests?.filter(req => req.status === 'rejected') || [];

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
              <Button onClick={handleSignOut} variant="outline" className="text-red-600 hover:bg-red-50 border-red-200">
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
                <TabsTrigger value="pending" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  Pending ({pendingCreatorRequests.length})
                </TabsTrigger>
                <TabsTrigger value="accepted" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  Accepted ({acceptedCreatorRequests.length})
                </TabsTrigger>
                <TabsTrigger value="rejected" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  Rejected ({rejectedCreatorRequests.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending" className="space-y-6 mt-6">
                {loadingCreatorRequests ? (
                  <div>Loading...</div>
                ) : pendingCreatorRequests.length === 0 ? (
                  <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-500">No pending creator requests</p>
                    </CardContent>
                  </Card>
                ) : (
                  pendingCreatorRequests.map(creator => (
                    <Card key={creator.id} className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 ring-2 ring-pink-200">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                                {creator.name.split(' ').map((n: string) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{creator.name}</h3>
                              <p className="text-gray-600">{creator.instagram_handle}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                <span>{creator.city}</span>
                                <Badge variant="outline" className="border-pink-200 text-pink-600">{creator.content_niche}</Badge>
                                <span>{creator.mobile_number}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button 
                              onClick={() => handleCreatorReview(creator)}
                              variant="outline" 
                              size="sm" 
                              className="border-green-200 text-green-600 hover:bg-green-50"
                            >
                              Review & Accept
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="accepted" className="space-y-6 mt-6">
                {acceptedCreatorRequests.map(creator => (
                  <Card key={creator.id} className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 ring-2 ring-green-200">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                              {creator.name.split(' ').map((n: string) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{creator.name}</h3>
                            <p className="text-gray-600">{creator.instagram_handle}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <span>{creator.city}</span>
                              <Badge className="bg-green-100 text-green-700 border-green-200">Accepted</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      {creator.admin_notes && (
                        <div className="mt-4 p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-700"><strong>Admin Notes:</strong> {creator.admin_notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="rejected" className="space-y-6 mt-6">
                {rejectedCreatorRequests.map(creator => (
                  <Card key={creator.id} className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 ring-2 ring-red-200">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                              {creator.name.split(' ').map((n: string) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{creator.name}</h3>
                            <p className="text-gray-600">{creator.instagram_handle}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <span>{creator.city}</span>
                              <Badge className="bg-red-100 text-red-700 border-red-200">Rejected</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      {creator.admin_notes && (
                        <div className="mt-4 p-3 bg-red-50 rounded-lg">
                          <p className="text-sm text-red-700"><strong>Rejection Reason:</strong> {creator.admin_notes}</p>
                        </div>
                      )}
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
                <TabsTrigger value="pending" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  Pending ({pendingBrandRequests.length})
                </TabsTrigger>
                <TabsTrigger value="verified" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  Verified ({acceptedBrandRequests.length})
                </TabsTrigger>
                <TabsTrigger value="rejected" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  Rejected ({rejectedBrandRequests.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending" className="space-y-6 mt-6">
                {loadingBrandRequests ? (
                  <div>Loading...</div>
                ) : pendingBrandRequests.length === 0 ? (
                  <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-500">No pending brand requests</p>
                    </CardContent>
                  </Card>
                ) : (
                  pendingBrandRequests.map(brand => (
                    <Card key={brand.id} className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center ring-2 ring-pink-200">
                              <Building2 className="h-6 w-6 text-pink-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{brand.brand_name}</h3>
                              <p className="text-gray-600">{brand.business_contact}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                <Badge variant="outline" className="border-pink-200 text-pink-600">{brand.business_niche}</Badge>
                                {brand.instagram_handle && <span>{brand.instagram_handle}</span>}
                                {brand.website && <span>{brand.website}</span>}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button 
                              onClick={() => handleBrandReview(brand)}
                              variant="outline" 
                              size="sm" 
                              className="text-green-600 hover:bg-green-50 border-green-200"
                            >
                              Review & Accept
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="verified" className="space-y-6 mt-6">
                {acceptedBrandRequests.map(brand => (
                  <Card key={brand.id} className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center ring-2 ring-green-300">
                            <Building2 className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{brand.brand_name}</h3>
                            <p className="text-gray-600">{brand.business_contact}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <Badge className="bg-green-100 text-green-700 border-green-200">Verified</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      {brand.admin_notes && (
                        <div className="mt-4 p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-700"><strong>Admin Notes:</strong> {brand.admin_notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="rejected" className="space-y-6 mt-6">
                {rejectedBrandRequests.map(brand => (
                  <Card key={brand.id} className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center ring-2 ring-red-300">
                            <Building2 className="h-6 w-6 text-red-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{brand.brand_name}</h3>
                            <p className="text-gray-600">{brand.business_contact}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <Badge className="bg-red-100 text-red-700 border-red-200">Rejected</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      {brand.admin_notes && (
                        <div className="mt-4 p-3 bg-red-50 rounded-lg">
                          <p className="text-sm text-red-700"><strong>Rejection Reason:</strong> {brand.admin_notes}</p>
                        </div>
                      )}
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
            <h1 className="text-3xl font-bold text-gray-900 mb-8">All Verified Creators</h1>
            
            {loadingCreators ? (
              <div>Loading...</div>
            ) : !allCreators || allCreators.length === 0 ? (
              <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="gradient-pink-maroon w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl text-gray-600 mb-4">No Verified Creators</h3>
                  <p className="text-gray-500">No verified creators found in the system</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {allCreators.map(creator => (
                  <Card key={creator.id} className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 ring-2 ring-pink-200">
                            <AvatarImage src={creator.profile_picture_url || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                              {creator.name.split(' ').map((n: string) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{creator.name}</h3>
                            <p className="text-gray-600">{creator.instagram_handle}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <span>{creator.city}</span>
                              <Badge variant="outline" className="border-pink-200 text-pink-600">{creator.content_niche}</Badge>
                              <span>{creator.follower_count?.toLocaleString()} followers</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700 border-green-200">Verified</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* All Brands */}
        {activeSection === 'all-brands' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">All Verified Brands</h1>
            
            {loadingBrands ? (
              <div>Loading...</div>
            ) : !allBrands || allBrands.length === 0 ? (
              <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="gradient-pink-maroon w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl text-gray-600 mb-4">No Verified Brands</h3>
                  <p className="text-gray-500">No verified brands found in the system</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {allBrands.map(brand => (
                  <Card key={brand.id} className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center ring-2 ring-pink-200">
                            <Building2 className="h-6 w-6 text-pink-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{brand.brand_name}</h3>
                            <p className="text-gray-600">{brand.business_contact}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <Badge variant="outline" className="border-pink-200 text-pink-600">{brand.business_niche}</Badge>
                              {brand.website && <span>{brand.website}</span>}
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700 border-green-200">Verified</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Review Dialogs */}
      <CreatorReviewDialog
        open={reviewDialogOpen}
        onOpenChange={setReviewDialogOpen}
        request={selectedRequest}
      />

      <BrandReviewDialog
        open={brandDialogOpen}
        onOpenChange={setBrandDialogOpen}
        request={selectedRequest}
      />
    </div>
  );
};

export default AdminDashboard;
