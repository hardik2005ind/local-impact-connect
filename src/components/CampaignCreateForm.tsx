
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useCreateCampaign } from '@/hooks/useCampaigns';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, X } from 'lucide-react';

const CampaignCreateForm = ({ onClose }: { onClose: () => void }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const createCampaign = useCreateCampaign();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reward_type: 'cash' as 'cash' | 'barter' | 'both',
    reward_details: '',
    target_city: '',
    target_niche: '',
    deliverables: '',
    hashtags: [''],
    deadline: '',
    max_applicants: ''
  });

  const handleHashtagChange = (index: number, value: string) => {
    const newHashtags = [...formData.hashtags];
    newHashtags[index] = value;
    setFormData({ ...formData, hashtags: newHashtags });
  };

  const addHashtag = () => {
    setFormData({
      ...formData,
      hashtags: [...formData.hashtags, '']
    });
  };

  const removeHashtag = (index: number) => {
    const newHashtags = formData.hashtags.filter((_, i) => i !== index);
    setFormData({ ...formData, hashtags: newHashtags });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const filteredHashtags = formData.hashtags.filter(tag => tag.trim() !== '');
      
      await createCampaign.mutateAsync({
        brand_id: user?.id,
        title: formData.title,
        description: formData.description,
        reward_type: formData.reward_type,
        reward_details: formData.reward_details,
        target_city: formData.target_city,
        target_niche: formData.target_niche || null,
        deliverables: formData.deliverables,
        hashtags: filteredHashtags,
        deadline: formData.deadline || null,
        max_applicants: formData.max_applicants ? parseInt(formData.max_applicants) : null,
        status: 'active'
      });

      toast({
        title: "Success!",
        description: "Your campaign has been created successfully.",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create campaign.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Campaign</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Campaign Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target_city">Target City</Label>
              <Input
                id="target_city"
                value={formData.target_city}
                onChange={(e) => setFormData({ ...formData, target_city: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="reward_type">Reward Type</Label>
              <Select value={formData.reward_type} onValueChange={(value: any) => setFormData({ ...formData, reward_type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="barter">Barter</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target_niche">Target Niche (Optional)</Label>
              <Input
                id="target_niche"
                value={formData.target_niche}
                onChange={(e) => setFormData({ ...formData, target_niche: e.target.value })}
                placeholder="e.g., Fashion, Tech, Food"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reward_details">Reward Details</Label>
            <Textarea
              id="reward_details"
              value={formData.reward_details}
              onChange={(e) => setFormData({ ...formData, reward_details: e.target.value })}
              placeholder="Specify the reward amount, products, or benefits..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliverables">Deliverables</Label>
            <Textarea
              id="deliverables"
              value={formData.deliverables}
              onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
              placeholder="What do you expect from creators? (e.g., 2 Instagram posts, 1 story, etc.)"
              rows={3}
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Hashtags</Label>
            {formData.hashtags.map((hashtag, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={hashtag}
                  onChange={(e) => handleHashtagChange(index, e.target.value)}
                  placeholder="#yourbrandhashtag"
                  className="flex-1"
                />
                {formData.hashtags.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeHashtag(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addHashtag}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Hashtag
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline (Optional)</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max_applicants">Max Applicants (Optional)</Label>
              <Input
                id="max_applicants"
                type="number"
                value={formData.max_applicants}
                onChange={(e) => setFormData({ ...formData, max_applicants: e.target.value })}
                placeholder="e.g., 10"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={createCampaign.isPending} className="flex-1">
              {createCampaign.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Campaign'
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CampaignCreateForm;
