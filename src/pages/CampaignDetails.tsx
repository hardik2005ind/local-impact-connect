
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useCampaignDetails, useApplyCampaign } from '@/hooks/useCampaigns';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, MapPin, Calendar, DollarSign, Target, Hash, FileText, Loader2 } from 'lucide-react';

const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: campaign, isLoading, error } = useCampaignDetails(id || '');
  const applyCampaign = useApplyCampaign();
  const { toast } = useToast();
  
  const [applicationMessage, setApplicationMessage] = useState('');
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);

  const handleApply = async () => {
    if (!campaign) return;

    try {
      await applyCampaign.mutateAsync({
        campaignId: campaign.id,
        applicationMessage
      });

      toast({
        title: "Success!",
        description: "Your application has been submitted successfully.",
      });
      
      setIsApplyDialogOpen(false);
      setApplicationMessage('');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Campaign Not Found</h2>
            <p className="text-gray-600 mb-4">This campaign is not available.</p>
            <Link to="/creator-dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/creator-dashboard">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Campaigns
            </Button>
          </Link>
        </div>

        <Card className="bg-white/90 backdrop-blur-md border-0 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl mb-2">{campaign.title}</CardTitle>
                <p className="text-gray-600">by {campaign.brands?.brand_name}</p>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-700">
                {campaign.status}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Campaign Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 p-3 bg-pink-50 rounded-lg">
                <MapPin className="h-5 w-5 text-pink-600" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">{campaign.target_city}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Reward Type</p>
                  <p className="font-medium capitalize">{campaign.reward_type}</p>
                </div>
              </div>
              
              {campaign.target_niche && (
                <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                  <Target className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Niche</p>
                    <p className="font-medium">{campaign.target_niche}</p>
                  </div>
                </div>
              )}
              
              {campaign.deadline && (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="font-medium">{new Date(campaign.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{campaign.description}</p>
            </div>

            {/* Reward Details */}
            {campaign.reward_details && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Reward Details</h3>
                <p className="text-gray-700 leading-relaxed">{campaign.reward_details}</p>
              </div>
            )}

            {/* Deliverables */}
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Deliverables
              </h3>
              <p className="text-gray-700 leading-relaxed">{campaign.deliverables}</p>
            </div>

            {/* Hashtags */}
            {campaign.hashtags && campaign.hashtags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  Required Hashtags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {campaign.hashtags.map((hashtag, index) => (
                    <Badge key={index} variant="outline" className="text-blue-600 border-blue-200">
                      {hashtag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Brand Contact Info */}
            {campaign.brands && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Brand Information</h3>
                <div className="space-y-2">
                  {campaign.brands.business_contact && (
                    <p className="text-gray-700">
                      <span className="font-medium">Contact:</span> {campaign.brands.business_contact}
                    </p>
                  )}
                  {campaign.brands.instagram_handle && (
                    <p className="text-gray-700">
                      <span className="font-medium">Instagram:</span> {campaign.brands.instagram_handle}
                    </p>
                  )}
                  {campaign.brands.website && (
                    <p className="text-gray-700">
                      <span className="font-medium">Website:</span>{' '}
                      <a href={campaign.brands.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {campaign.brands.website}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Apply Button */}
            <div className="pt-4 border-t">
              <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90">
                    Apply for This Campaign
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Apply for Campaign</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Application Message (Optional)
                      </label>
                      <Textarea
                        value={applicationMessage}
                        onChange={(e) => setApplicationMessage(e.target.value)}
                        placeholder="Tell the brand why you're perfect for this campaign..."
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleApply} 
                        disabled={applyCampaign.isPending}
                        className="flex-1"
                      >
                        {applyCampaign.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Applying...
                          </>
                        ) : (
                          'Submit Application'
                        )}
                      </Button>
                      <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignDetails;
