
import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Building2, Heart, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const defaultType = searchParams.get('type') || 'creator';
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState(defaultType);
  const [isLoading, setIsLoading] = useState(false);
  
  const [creatorData, setCreatorData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    instagram: '',
    niche: '',
    country: 'India',
    state: '',
    city: '',
    agreeTerms: false
  });

  const [brandData, setBrandData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    brandName: '',
    businessContact: '',
    businessNiche: '',
    instagram: '',
    website: '',
    agreeTerms: false
  });

  const niches = [
    'Fashion', 'Food', 'Fitness', 'Tech', 'Education', 
    'Lifestyle', 'Art', 'Finance', 'Travel', 'Beauty'
  ];

  const handleCreatorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (creatorData.password !== creatorData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Use the auth-signup edge function
      const { data, error } = await supabase.functions.invoke('auth-signup', {
        body: {
          email: creatorData.email,
          password: creatorData.password,
          role: 'creator',
          userData: {
            name: creatorData.name,
            instagram_handle: creatorData.instagram.startsWith('@') ? creatorData.instagram : `@${creatorData.instagram}`,
            mobile_number: creatorData.mobile,
            content_niche: creatorData.niche,
            city: creatorData.city,
            state: creatorData.state
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Registration successful. Please wait for admin approval.",
      });
      
      navigate('/signin');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBrandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (brandData.password !== brandData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Use the auth-signup edge function
      const { data, error } = await supabase.functions.invoke('auth-signup', {
        body: {
          email: brandData.email,
          password: brandData.password,
          role: 'brand',
          userData: {
            brand_name: brandData.brandName,
            business_contact: brandData.businessContact,
            business_niche: brandData.businessNiche,
            instagram_handle: brandData.instagram.startsWith('@') ? brandData.instagram : `@${brandData.instagram}`,
            website: brandData.website
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Registration successful. Please wait for admin approval.",
      });
      
      navigate('/signin');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 py-12 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      <div className="absolute -bottom-8 left-1/2 w-32 h-32 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-3xl font-bold text-gradient-pink mb-4">
            <Heart className="h-8 w-8 text-pink-500" />
            Lokreach
          </Link>
          <p className="text-gray-600 text-lg">Join the marketplace where influence meets local impact</p>
        </div>

        <Card className="bg-white/90 backdrop-blur-md border-0 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="text-center pb-8 pt-8 bg-gradient-to-r from-pink-500/10 to-purple-500/10">
            <div className="flex justify-center mb-4">
              <div className="gradient-pink-maroon w-16 h-16 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-gray-900">Create Your Account</CardTitle>
            <p className="text-gray-600 mt-2">Choose your path and start your journey</p>
          </CardHeader>
          <CardContent className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-pink-50">
                <TabsTrigger value="creator" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  <Users className="h-4 w-4" />
                  Creator
                </TabsTrigger>
                <TabsTrigger value="brand" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
                  <Building2 className="h-4 w-4" />
                  Brand
                </TabsTrigger>
              </TabsList>

              <TabsContent value="creator">
                <form onSubmit={handleCreatorSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="creator-name" className="text-gray-700 font-medium">Full Name *</Label>
                    <Input
                      id="creator-name"
                      value={creatorData.name}
                      onChange={(e) => setCreatorData(prev => ({ ...prev, name: e.target.value }))}
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="creator-email" className="text-gray-700 font-medium">Email Address *</Label>
                      <Input
                        id="creator-email"
                        type="email"
                        value={creatorData.email}
                        onChange={(e) => setCreatorData(prev => ({ ...prev, email: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creator-mobile" className="text-gray-700 font-medium">Mobile Number *</Label>
                      <Input
                        id="creator-mobile"
                        type="tel"
                        value={creatorData.mobile}
                        onChange={(e) => setCreatorData(prev => ({ ...prev, mobile: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="creator-password" className="text-gray-700 font-medium">Password *</Label>
                      <Input
                        id="creator-password"
                        type="password"
                        value={creatorData.password}
                        onChange={(e) => setCreatorData(prev => ({ ...prev, password: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creator-confirm" className="text-gray-700 font-medium">Confirm Password *</Label>
                      <Input
                        id="creator-confirm"
                        type="password"
                        value={creatorData.confirmPassword}
                        onChange={(e) => setCreatorData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="creator-instagram" className="text-gray-700 font-medium">Instagram Handle *</Label>
                      <Input
                        id="creator-instagram"
                        value={creatorData.instagram}
                        onChange={(e) => setCreatorData(prev => ({ ...prev, instagram: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                        placeholder="@username"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creator-niche" className="text-gray-700 font-medium">Content Niche *</Label>
                      <Select value={creatorData.niche} onValueChange={(value) => setCreatorData(prev => ({ ...prev, niche: value }))}>
                        <SelectTrigger className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12">
                          <SelectValue placeholder="Select your niche" />
                        </SelectTrigger>
                        <SelectContent>
                          {niches.map(niche => (
                            <SelectItem key={niche} value={niche.toLowerCase()}>{niche}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="creator-state" className="text-gray-700 font-medium">State/Province *</Label>
                      <Input
                        id="creator-state"
                        value={creatorData.state}
                        onChange={(e) => setCreatorData(prev => ({ ...prev, state: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creator-city" className="text-gray-700 font-medium">City *</Label>
                      <Input
                        id="creator-city"
                        value={creatorData.city}
                        onChange={(e) => setCreatorData(prev => ({ ...prev, city: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creator-country" className="text-gray-700 font-medium">Country *</Label>
                      <Input
                        id="creator-country"
                        value={creatorData.country}
                        onChange={(e) => setCreatorData(prev => ({ ...prev, country: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="creator-terms"
                      checked={creatorData.agreeTerms}
                      onCheckedChange={(checked) => setCreatorData(prev => ({ ...prev, agreeTerms: checked as boolean }))}
                      disabled={isLoading}
                    />
                    <Label htmlFor="creator-terms" className="text-sm text-gray-600">
                      I agree to the <Link to="/terms" className="text-pink-600 hover:text-pink-700 font-medium">Terms and Conditions</Link> and{' '}
                      <Link to="/privacy" className="text-pink-600 hover:text-pink-700 font-medium">Privacy Policy</Link> *
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-pink-maroon text-white hover:opacity-90 transition-all h-12 text-lg font-medium shadow-lg transform hover:scale-[1.02]"
                    disabled={!creatorData.agreeTerms || isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Creator Account"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="brand">
                <form onSubmit={handleBrandSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand-email" className="text-gray-700 font-medium">Email Address *</Label>
                      <Input
                        id="brand-email"
                        type="email"
                        value={brandData.email}
                        onChange={(e) => setBrandData(prev => ({ ...prev, email: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand-name" className="text-gray-700 font-medium">Brand/Business Name *</Label>
                      <Input
                        id="brand-name"
                        value={brandData.brandName}
                        onChange={(e) => setBrandData(prev => ({ ...prev, brandName: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand-password" className="text-gray-700 font-medium">Password *</Label>
                      <Input
                        id="brand-password"
                        type="password"
                        value={brandData.password}
                        onChange={(e) => setBrandData(prev => ({ ...prev, password: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand-confirm" className="text-gray-700 font-medium">Confirm Password *</Label>
                      <Input
                        id="brand-confirm"
                        type="password"
                        value={brandData.confirmPassword}
                        onChange={(e) => setBrandData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand-contact" className="text-gray-700 font-medium">Business Contact Info *</Label>
                      <Input
                        id="brand-contact"
                        value={brandData.businessContact}
                        onChange={(e) => setBrandData(prev => ({ ...prev, businessContact: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                        placeholder="Phone or email"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand-niche" className="text-gray-700 font-medium">Business Niche *</Label>
                      <Select value={brandData.businessNiche} onValueChange={(value) => setBrandData(prev => ({ ...prev, businessNiche: value }))}>
                        <SelectTrigger className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12">
                          <SelectValue placeholder="Select business niche" />
                        </SelectTrigger>
                        <SelectContent>
                          {niches.map(niche => (
                            <SelectItem key={niche} value={niche.toLowerCase()}>{niche}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand-instagram" className="text-gray-700 font-medium">Instagram Handle</Label>
                      <Input
                        id="brand-instagram"
                        value={brandData.instagram}
                        onChange={(e) => setBrandData(prev => ({ ...prev, instagram: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                        placeholder="@brandname (optional)"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand-website" className="text-gray-700 font-medium">Website</Label>
                      <Input
                        id="brand-website"
                        value={brandData.website}
                        onChange={(e) => setBrandData(prev => ({ ...prev, website: e.target.value }))}
                        className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                        placeholder="https://example.com (optional)"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="brand-terms"
                      checked={brandData.agreeTerms}
                      onCheckedChange={(checked) => setBrandData(prev => ({ ...prev, agreeTerms: checked as boolean }))}
                      disabled={isLoading}
                    />
                    <Label htmlFor="brand-terms" className="text-sm text-gray-600">
                      I agree to the <Link to="/terms" className="text-pink-600 hover:text-pink-700 font-medium">Terms and Conditions</Link> and{' '}
                      <Link to="/privacy" className="text-pink-600 hover:text-pink-700 font-medium">Privacy Policy</Link> *
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-pink-maroon text-white hover:opacity-90 transition-all h-12 text-lg font-medium shadow-lg transform hover:scale-[1.02]"
                    disabled={!brandData.agreeTerms || isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Brand Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/signin" className="text-pink-600 hover:text-pink-700 font-medium transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
