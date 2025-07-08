
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { useCreatorProfile, useUpdateCreatorProfile } from '@/hooks/useCreators';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, X } from 'lucide-react';

const CreatorProfileEdit = ({ onClose }: { onClose: () => void }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: profile, isLoading } = useCreatorProfile(user?.id || '');
  const updateProfile = useUpdateCreatorProfile();

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    about: '',
    instagram_handle: '',
    mobile_number: '',
    latest_posts_links: ['']
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        bio: profile.bio || '',
        about: profile.about || '',
        instagram_handle: profile.instagram_handle || '',
        mobile_number: profile.mobile_number || '',
        latest_posts_links: profile.latest_posts_links || ['']
      });
    }
  }, [profile]);

  const handlePostLinkChange = (index: number, value: string) => {
    const newLinks = [...formData.latest_posts_links];
    newLinks[index] = value;
    setFormData({ ...formData, latest_posts_links: newLinks });
  };

  const addPostLink = () => {
    setFormData({
      ...formData,
      latest_posts_links: [...formData.latest_posts_links, '']
    });
  };

  const removePostLink = (index: number) => {
    const newLinks = formData.latest_posts_links.filter((_, i) => i !== index);
    setFormData({ ...formData, latest_posts_links: newLinks });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const filteredLinks = formData.latest_posts_links.filter(link => link.trim() !== '');
      
      await updateProfile.mutateAsync({
        id: user?.id,
        ...formData,
        latest_posts_links: filteredLinks
      });

      toast({
        title: "Success!",
        description: "Your profile has been updated successfully.",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram_handle">Instagram Handle</Label>
            <Input
              id="instagram_handle"
              value={formData.instagram_handle}
              onChange={(e) => setFormData({ ...formData, instagram_handle: e.target.value })}
              placeholder="@yourusername"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile_number">Mobile Number</Label>
            <Input
              id="mobile_number"
              value={formData.mobile_number}
              onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
              placeholder="+91 9876543210"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="A short bio about yourself..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about">About</Label>
            <Textarea
              id="about"
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              placeholder="Tell us more about yourself, your content style, and experience..."
              rows={4}
            />
          </div>

          <div className="space-y-4">
            <Label>Latest Posts Links</Label>
            {formData.latest_posts_links.map((link, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={link}
                  onChange={(e) => handlePostLinkChange(index, e.target.value)}
                  placeholder="https://instagram.com/p/..."
                  className="flex-1"
                />
                {formData.latest_posts_links.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removePostLink(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addPostLink}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Post Link
            </Button>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={updateProfile.isPending} className="flex-1">
              {updateProfile.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Profile'
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

export default CreatorProfileEdit;
