
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Filter, MapPin, Users, Heart, MessageCircle, Star, Crown, TrendingUp, Loader2, LogOut, Building2, Globe, Instagram, Mail } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCreators } from '@/hooks/useCreators';
import { useBrandCampaigns } from '@/hooks/useCampaigns';
import { useBrandProfile } from '@/hooks/useBrands';
import { useToast } from '@/hooks/use-toast';
import CampaignCreateForm from '@/components/CampaignCreateForm';
import BrandProfileEdit from '@/components/BrandProfileEdit';

const BrandDashboard = () => {
  const [activeTab, setActiveTab] = useState('find-creators');
  const [searchCity, setSearchCity] = useState('');
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { toast } = useToast();
  
  const { data: creators, isLoading: creatorsLoading } = useCreators({
    city: searchCity || undefined
  });
  const { data: myCampaigns, isLoading: campaignsLoading } = useBrandCampaigns();
  const { data: brandProfile, isLoading: profileLoading } = useBrandProfile(user?.id || '');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gradient-pink">
              <Crown className="h-6 w-6 text-pink-500" />
              Lokreach
            </Link>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setActiveTab('find-creators')}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  activeTab === 'find-creators' 
                    ? 'bg-pink-100 text-pink-700 shadow-sm' 
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                Find Creators
              </button>
              <button
                onClick={() => setActiveTab('create-campaign')}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  activeTab === 'create-campaign' 
                    ? 'bg-pink-100 text-pink-700 shadow-sm' 
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                Create Campaign
              </button>
              <button
                onClick={() => setActiveTab('my-campaigns')}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  activeTab === 'my-campaigns' 
                    ? 'bg-pink-100 text-pink-700 shadow-sm' 
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                My Campaigns
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  activeTab === 'profile' 
                    ? 'bg-pink-100 text-pink-700 shadow-sm' 
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                Profile
              </button>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Find Creators Tab */}
        {activeTab === 'find-creators' && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="gradient-pink-maroon w-10 h-10 rounded-full flex items-center justify-center">
                <Search className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Find Perfect Creators</h1>
            </div>
            
            {/* Search Bar */}
            <Card className="mb-8 bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 h-4 w-4" />
                    <Input
                      placeholder="Search creators by city..."
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="pl-10 border-pink-200 focus:border-pink-400 focus:ring-pink-200 h-12"
                    />
                  </div>
                  <Button variant="outline" className="gap-2 border-pink-300 text-pink-700 hover:bg-pink-50 h-12">
                    <Filter className="h-4 w-4" />
                    Advanced Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Creators Grid */}
            {creatorsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creators?.map(creator => (
                  <Card key={creator.id} className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-12 w-12 ring-2 ring-pink-200">
                          <AvatarImage src={creator.profile_picture_url || "/placeholder.svg"} />
                          <AvatarFallback className="bg-pink-100 text-pink-700">
                            {creator.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{creator.name}</h3>
                          <div className="flex items-center gap-1 text-gray-600">
                            <MapPin className="h-3 w-3 text-pink-500" />
                            <span className="text-sm">{creator.city}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mb-4">
                        {creator.content_niche && (
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 border-pink-200">
                            {creator.content_niche}
                          </Badge>
                        )}
                        <div className="flex items-center gap-1 text-gray-600">
                          <Users className="h-3 w-3 text-pink-500" />
                          <span className="text-sm font-medium">{creator.follower_count?.toLocaleString() || '0'}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center mb-6 p-3 bg-pink-50/50 rounded-lg">
                        <div>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Heart className="h-3 w-3 text-red-500" />
                          </div>
                          <span className="text-xs text-gray-600 font-medium">{creator.avg_likes?.toLocaleString() || '0'}</span>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <MessageCircle className="h-3 w-3 text-blue-500" />
                          </div>
                          <span className="text-xs text-gray-600 font-medium">{creator.avg_comments?.toLocaleString() || '0'}</span>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                          </div>
                          <span className="text-xs text-gray-600 font-medium">{creator.engagement_rate || '0'}%</span>
                        </div>
                      </div>

                      <Link to={`/creator/${creator.id}`}>
                        <Button className="w-full gradient-pink-maroon text-white hover:opacity-90 transition-all group-hover:scale-[1.02]">
                          View Full Profile
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
                {creators?.length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-600">No creators found. Try adjusting your search.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Create Campaign Tab */}
        {activeTab === 'create-campaign' && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-10 h-10 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Campaign</h1>
            </div>
            
            <CampaignCreateForm onClose={() => {}} />
          </div>
        )}

        {/* My Campaigns Tab */}
        {activeTab === 'my-campaigns' && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="gradient-rose-burgundy w-10 h-10 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">My Campaigns</h1>
            </div>
            
            {campaignsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="grid gap-6">
                {myCampaigns?.map(campaign => (
                  <Card key={campaign.id} className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{campaign.title}</h3>
                          <p className="text-gray-600 mb-3">{campaign.description}</p>
                          <div className="flex items-center gap-4">
                            <Badge 
                              variant={campaign.status === 'active' ? 'default' : 'secondary'} 
                              className={
                                campaign.status === 'active' 
                                  ? 'bg-green-100 text-green-700 border-green-200' 
                                  : 'bg-gray-100 text-gray-700'
                              }
                            >
                              {campaign.status}
                            </Badge>
                            <span className="text-gray-600 flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-pink-500" />
                              {campaign.target_city}
                            </span>
                          </div>
                        </div>
                        <Link to={`/campaign/${campaign.id}`}>
                          <Button variant="outline" className="border-pink-300 text-pink-700 hover:bg-pink-50">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {myCampaigns?.length === 0 && (
                  <Card className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg">
                    <CardContent className="p-12 text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Campaigns Yet</h3>
                      <p className="text-gray-600 mb-4">Create your first campaign to start connecting with creators.</p>
                      <Button 
                        onClick={() => setActiveTab('create-campaign')}
                        className="gradient-pink-maroon text-white hover:opacity-90"
                      >
                        Create Campaign
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-r from-pink-400 to-rose-500 w-10 h-10 rounded-full flex items-center justify-center">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Brand Profile</h1>
            </div>
            
            {profileLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-2">
                  <Card className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg mb-6">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6 mb-6">
                        <Avatar className="h-20 w-20 ring-4 ring-pink-200">
                          <AvatarImage src={brandProfile?.logo_url || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl">
                            {brandProfile?.brand_name?.charAt(0) || 'B'}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold text-gray-900">{brandProfile?.brand_name || 'Your Brand'}</h2>
                            {brandProfile?.is_verified && (
                              <Badge className="bg-green-100 text-green-700 border-green-200">Verified</Badge>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                            {brandProfile?.business_niche && (
                              <div className="flex items-center gap-1">
                                <Building2 className="h-4 w-4" />
                                <span>{brandProfile.business_niche}</span>
                              </div>
                            )}
                            
                            {brandProfile?.business_contact && (
                              <div className="flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                <span>{brandProfile.business_contact}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-3 mb-4">
                            {brandProfile?.website && (
                              <a 
                                href={brandProfile.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                              >
                                <Globe className="h-3 w-3" />
                                Website
                              </a>
                            )}
                            
                            {brandProfile?.instagram_handle && (
                              <a 
                                href={`https://instagram.com/${brandProfile.instagram_handle.replace('@', '')}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition-colors text-sm"
                              >
                                <Instagram className="h-3 w-3" />
                                {brandProfile.instagram_handle}
                              </a>
                            )}
                          </div>

                          <Button 
                            onClick={() => setIsEditProfileOpen(true)}
                            className="gradient-pink-maroon text-white hover:opacity-90"
                          >
                            Update Profile
                          </Button>
                        </div>
                      </div>

                      {brandProfile?.about && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">About</h3>
                          <p className="text-gray-700 leading-relaxed">{brandProfile.about}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Stats Sidebar */}
                <div>
                  <Card className="bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Campaign Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {myCampaigns?.filter(c => c.status === 'active').length || 0}
                        </div>
                        <div className="text-sm text-green-700">Active Campaigns</div>
                      </div>
                      
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {myCampaigns?.filter(c => c.status === 'completed').length || 0}
                        </div>
                        <div className="text-sm text-blue-700">Completed</div>
                      </div>
                      
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{myCampaigns?.length || 0}</div>
                        <div className="text-sm text-purple-700">Total Campaigns</div>
                      </div>

                      <div className="pt-4">
                        <Link to={`/brand/${user?.id}`}>
                          <Button variant="outline" className="w-full">
                            View Public Profile
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Campaign Dialog */}
      <Dialog open={isCreateCampaignOpen} onOpenChange={setIsCreateCampaignOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
          </DialogHeader>
          <CampaignCreateForm onClose={() => setIsCreateCampaignOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Brand Profile</DialogTitle>
          </DialogHeader>
          <BrandProfileEdit 
            brand={brandProfile} 
            onClose={() => setIsEditProfileOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BrandDashboard;
