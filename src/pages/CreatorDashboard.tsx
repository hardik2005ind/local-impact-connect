
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Users, Star, Calendar, DollarSign, Heart, Sparkles, Search, Filter, Loader2, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCreatorProfile } from '@/hooks/useCreators';
import { useCampaigns, useMyApplications } from '@/hooks/useCampaigns';
import { useToast } from '@/hooks/use-toast';
import CreatorProfileEdit from '@/components/CreatorProfileEdit';

const CreatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [searchCity, setSearchCity] = useState('');
  const [filterNiche, setFilterNiche] = useState('');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { data: profile, isLoading: profileLoading } = useCreatorProfile(user?.id || '');
  const { data: campaigns, isLoading: campaignsLoading } = useCampaigns({
    city: searchCity || undefined,
    niche: filterNiche || undefined
  });
  const { data: applications, isLoading: applicationsLoading } = useMyApplications();

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

  const statsLoading = profile && (!profile.follower_count && !profile.avg_likes && !profile.avg_comments);

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
                My Applications
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Creator Profile</h1>
            
            {profileLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <Card className="lg:col-span-1 bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-pink-200">
                        <AvatarImage src={profile?.profile_picture_url || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl">
                          {profile?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{profile?.name || 'Your Name'}</h3>
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{profile?.city}, {profile?.state}</span>
                      </div>
                      {profile?.content_niche && (
                        <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0">
                          {profile.content_niche}
                        </Badge>
                      )}
                      
                      {statsLoading ? (
                        <div className="text-center py-4">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Stats loading...</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="bg-pink-50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-pink-600">{profile?.follower_count?.toLocaleString() || '0'}</div>
                            <div className="text-sm text-gray-600">Followers</div>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">{profile?.engagement_rate || '0'}%</div>
                            <div className="text-sm text-gray-600">Engagement</div>
                          </div>
                        </div>
                      )}
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
                    <CardContent className="p-6">
                      <Button 
                        onClick={() => setIsEditProfileOpen(true)}
                        className="gradient-pink-maroon text-white hover:opacity-90 transition-all shadow-lg transform hover:scale-[1.02]"
                      >
                        Edit Profile
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-pink-500/10 to-purple-500/10">
                      <CardTitle>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      {statsLoading ? (
                        <div className="text-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                          <p className="text-gray-600">Admin is updating your statistics...</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 bg-pink-50 rounded-lg">
                            <Users className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                            <div className="text-lg font-semibold">{profile?.follower_count?.toLocaleString() || '0'}</div>
                            <div className="text-sm text-gray-600">Followers</div>
                          </div>
                          <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                            <div className="text-lg font-semibold">{profile?.engagement_rate || '0'}%</div>
                            <div className="text-sm text-gray-600">Engagement</div>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                            <div className="text-lg font-semibold">{profile?.avg_likes?.toLocaleString() || '0'}</div>
                            <div className="text-sm text-gray-600">Avg Likes</div>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <div className="text-lg font-semibold">{profile?.avg_comments?.toLocaleString() || '0'}</div>
                            <div className="text-sm text-gray-600">Avg Comments</div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}

        {/* All Campaigns Tab */}
        {activeTab === 'all-campaigns' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">All Campaigns</h1>
            
            {/* Search and Filter */}
            <Card className="mb-6 bg-white/80 backdrop-blur-sm border-pink-100 shadow-lg">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 h-4 w-4" />
                    <Input
                      placeholder="Search by city..."
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="pl-10 border-pink-200 focus:border-pink-400 focus:ring-pink-200 h-12"
                    />
                  </div>
                  <Select value={filterNiche} onValueChange={setFilterNiche}>
                    <SelectTrigger className="w-48 h-12">
                      <SelectValue placeholder="Filter by niche" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Niches</SelectItem>
                      <SelectItem value="Fashion">Fashion</SelectItem>
                      <SelectItem value="Tech">Tech</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            {campaignsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="grid gap-6">
                {campaigns?.map(campaign => (
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
                              <span>{campaign.brands?.brand_name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{campaign.target_city}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              <span className="capitalize">{campaign.reward_type}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <Link to={`/campaign/${campaign.id}`}>
                            <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* My Applications Tab */}
        {activeTab === 'registered-campaigns' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Applications</h1>
            
            {applicationsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="grid gap-6">
                {applications?.map(application => (
                  <Card key={application.id} className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{application.campaigns?.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span><strong>Brand:</strong> {application.campaigns?.brands?.brand_name}</span>
                            <span><strong>Applied:</strong> {new Date(application.applied_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge 
                            variant={application.status === 'accepted' ? 'default' : 'secondary'}
                            className={
                              application.status === 'accepted' 
                                ? 'bg-green-100 text-green-800 border-green-200' 
                                : application.status === 'rejected'
                                ? 'bg-red-100 text-red-800 border-red-200'
                                : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            }
                          >
                            {application.status}
                          </Badge>
                          <Link to={`/campaign/${application.campaign_id}`}>
                            <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                              View Campaign
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {applications?.length === 0 && (
                  <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-12 text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications Yet</h3>
                      <p className="text-gray-600 mb-4">You haven't applied to any campaigns yet.</p>
                      <Button 
                        onClick={() => setActiveTab('all-campaigns')}
                        className="gradient-pink-maroon text-white hover:opacity-90"
                      >
                        Browse Campaigns
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Your Profile</DialogTitle>
          </DialogHeader>
          <CreatorProfileEdit onClose={() => setIsEditProfileOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatorDashboard;
