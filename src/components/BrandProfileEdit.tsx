
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUpdateBrandProfile } from '@/hooks/useBrands';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface BrandProfileEditProps {
  brand: any;
  onClose: () => void;
}

const BrandProfileEdit = ({ brand, onClose }: BrandProfileEditProps) => {
  const [formData, setFormData] = useState({
    brand_name: brand?.brand_name || '',
    business_contact: brand?.business_contact || '',
    business_niche: brand?.business_niche || '',
    instagram_handle: brand?.instagram_handle || '',
    website: brand?.website || '',
    about: brand?.about || ''
  });

  const { user } = useAuth();
  const { mutate: updateProfile, isPending } = useUpdateBrandProfile();
  const { toast } = useToast();

  useEffect(() => {
    if (brand) {
      setFormData({
        brand_name: brand.brand_name || '',
        business_contact: brand.business_contact || '',
        business_niche: brand.business_niche || '',
        instagram_handle: brand.instagram_handle || '',
        website: brand.website || '',
        about: brand.about || ''
      });
    }
  }, [brand]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateProfile({
      ...formData,
      id: user?.id
    }, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Profile updated successfully"
        });
        onClose();
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Failed to update profile",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Brand Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand_name">Brand Name *</Label>
              <Input
                id="brand_name"
                value={formData.brand_name}
                onChange={(e) => setFormData(prev => ({ ...prev, brand_name: e.target.value }))}
                placeholder="Enter brand name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="business_contact">Business Contact *</Label>
              <Input
                id="business_contact"
                value={formData.business_contact}
                onChange={(e) => setFormData(prev => ({ ...prev, business_contact: e.target.value }))}
                placeholder="Phone or email"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business_niche">Business Niche</Label>
              <Input
                id="business_niche"
                value={formData.business_niche}
                onChange={(e) => setFormData(prev => ({ ...prev, business_niche: e.target.value }))}
                placeholder="e.g., Fashion, Tech, Food"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram_handle">Instagram Handle</Label>
              <Input
                id="instagram_handle"
                value={formData.instagram_handle}
                onChange={(e) => setFormData(prev => ({ ...prev, instagram_handle: e.target.value }))}
                placeholder="@brandname"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              placeholder="https://www.example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about">About Your Brand</Label>
            <Textarea
              id="about"
              value={formData.about}
              onChange={(e) => setFormData(prev => ({ ...prev, about: e.target.value }))}
              placeholder="Tell creators about your brand, values, and what makes you unique..."
              className="min-h-[120px]"
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 gradient-pink-maroon text-white hover:opacity-90"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Updating..." : "Update Profile"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BrandProfileEdit;
