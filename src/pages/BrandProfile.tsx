
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Building2, Globe, Instagram, Mail, Calendar, MapPin, ArrowLeft, ExternalLink } from 'lucide-react';
import { useBrandProfile } from '@/hooks/useBrands';
import { useBrandCampaigns } from '@/hooks/useCampaigns';
import { Loader2 } from 'lucide-react';

const BrandProfile = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: brand, isLoading: brandLoading } = useBrandProfile(id!);
  const { data: campaigns, isLoading: campaignsLoading } = useBrandCampaigns();

  if (brandLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Brand Not Found</h2>
            <p className="text-gray-600 mb-4">The brand profile you're looking for doesn't exist.</p>
            <Link to="/">
              <Button>Go Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const brandCampaigns = campaigns?.filter(campaign => campaign.brand_id === brand.id) || [];
  const activeCampaigns = brandCampaigns.filter(campaign => campaign.status === 'active');
  const completedCampaigns = brandCampaigns.filter(campaign => campaign.status === 'completed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Brand Header */}
        <Card className="bg-white/90 backdrop-blur-md border-0 shadow-2xl rounded-2xl overflow-hidden mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24 ring-4 ring-pink-200">
                <AvatarImage src={brand.logo_url || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-2xl">
                  {brand.brand_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{brand.brand_name}</h1>
                  <Badge className="bg-green-100 text-green-700 border-green-200">Verified</Badge>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                  {brand.business_niche && (
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      <span>{brand.business_niche}</span>
                    </div>
                  )}
                  
                  {brand.business_contact && (
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>{brand.business_contact}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(brand.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {brand.website && (
                    <a 
                      href={brand.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      Visit Website
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  
                  {brand.instagram_handle && (
                    <a 
                      href={`https://instagram.com/${brand.instagram_handle.replace('@', '')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition-colors"
                    >
                      <Instagram className="h-4 w-4" />
                      {brand.instagram_handle}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="lg:col-span-2 space-y-6">
            {brand.about && (
              <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">About {brand.brand_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{brand.about}</p>
                </CardContent>
              </Card>
            )}

            {/* Active Campaigns */}
            <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Active Campaigns ({activeCampaigns.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {campaignsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : activeCampaigns.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No active campaigns at the moment</p>
                ) : (
                  <div className="space-y-4">
                    {activeCampaigns.map(campaign => (
                      <div key={campaign.id} className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">{campaign.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{campaign.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {campaign.target_city}
                            </span>
                            {campaign.deadline && (
                              <span>Deadline: {new Date(campaign.deadline).toLocaleDateString()}</span>
                            )}
                          </div>
                          <Link to={`/campaign/${campaign.id}`}>
                            <Button size="sm" variant="outline">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Previous Campaigns */}
            {completedCampaigns.length > 0 && (
              <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Previous Campaigns ({completedCampaigns.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {completedCampaigns.map(campaign => (
                      <div key={campaign.id} className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">{campaign.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{campaign.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {campaign.target_city}
                            </span>
                            <Badge variant="outline" className="text-green-600 border-green-200">Completed</Badge>
                          </div>
                          <Link to={`/campaign/${campaign.id}`}>
                            <Button size="sm" variant="outline">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Campaign Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{activeCampaigns.length}</div>
                  <div className="text-sm text-green-700">Active Campaigns</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{completedCampaigns.length}</div>
                  <div className="text-sm text-blue-700">Completed Campaigns</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{brandCampaigns.length}</div>
                  <div className="text-sm text-purple-700">Total Campaigns</div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Interested in collaborating? Check out their active campaigns or reach out directly.
                </p>
                {brand.business_contact && (
                  <Button className="w-full gradient-pink-maroon text-white hover:opacity-90">
                    Contact Brand
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandProfile;
