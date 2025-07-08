
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCreatorProfile } from '@/hooks/useCreators';
import { MapPin, Users, Heart, MessageCircle, TrendingUp, Instagram, Phone, ArrowLeft, Loader2, ExternalLink } from 'lucide-react';

const CreatorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { data: creator, isLoading, error } = useCreatorProfile(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !creator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Creator Not Found</h2>
            <p className="text-gray-600 mb-4">This creator profile is not available.</p>
            <Link to="/brand-dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statsLoading = !creator.follower_count && !creator.avg_likes && !creator.avg_comments;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/brand-dashboard">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="lg:col-span-1 bg-white/90 backdrop-blur-md border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="text-center">
                <Avatar className="h-32 w-32 mx-auto mb-4 ring-4 ring-pink-200">
                  <AvatarImage src={creator.profile_picture_url || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-2xl">
                    {creator.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{creator.name}</h1>
                
                <div className="flex items-center justify-center gap-1 text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{creator.city}, {creator.state}</span>
                </div>

                {creator.content_niche && (
                  <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0">
                    {creator.content_niche}
                  </Badge>
                )}

                {creator.bio && (
                  <p className="text-gray-600 text-sm mb-4">{creator.bio}</p>
                )}

                <div className="space-y-2">
                  {creator.instagram_handle && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Instagram className="h-4 w-4 text-pink-500" />
                      <span>{creator.instagram_handle}</span>
                    </div>
                  )}
                  
                  {creator.mobile_number && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4 text-pink-500" />
                      <span>{creator.mobile_number}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Card */}
            <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                {statsLoading ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                    <p className="text-gray-600">Statistics being updated by admin...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-pink-50 rounded-lg">
                      <Users className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-pink-600">{creator.follower_count?.toLocaleString() || '0'}</div>
                      <div className="text-sm text-gray-600">Followers</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-red-600">{creator.avg_likes?.toLocaleString() || '0'}</div>
                      <div className="text-sm text-gray-600">Avg Likes</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">{creator.avg_comments?.toLocaleString() || '0'}</div>
                      <div className="text-sm text-gray-600">Avg Comments</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600">{creator.engagement_rate || '0'}%</div>
                      <div className="text-sm text-gray-600">Engagement</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* About Section */}
            {creator.about && (
              <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{creator.about}</p>
                </CardContent>
              </Card>
            )}

            {/* Latest Posts */}
            {creator.latest_posts_links && creator.latest_posts_links.length > 0 && (
              <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Latest Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {creator.latest_posts_links.map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 text-pink-600" />
                        <span className="text-sm text-gray-700 truncate">Post {index + 1}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Portfolio Links */}
            {creator.portfolio_links && creator.portfolio_links.length > 0 && (
              <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {creator.portfolio_links.map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 text-pink-600 hover:text-pink-700 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="text-sm">{link}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
