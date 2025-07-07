
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Building2 } from 'lucide-react';

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const defaultType = searchParams.get('type') || 'creator';
  
  const [activeTab, setActiveTab] = useState(defaultType);
  const [creatorData, setCreatorData] = useState({
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

  const handleCreatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creator signup:', creatorData);
    // Handle creator signup
  };

  const handleBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Brand signup:', brandData);
    // Handle brand signup
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Lokreach
          </Link>
          <p className="text-gray-600 mt-2">Join the marketplace where influence meets local impact</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">Create Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="creator" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Creator
                </TabsTrigger>
                <TabsTrigger value="brand" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Brand
                </TabsTrigger>
              </TabsList>

              <TabsContent value="creator">
                <form onSubmit={handleCreatorSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="creator-email">Email Address *</Label>
                      <Input
                        id="creator-email"
                        type="email"
                        value={creatorData.email}
                        onChange={(e) => setCreatorData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-white/70"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creator-mobile">Mobile Number *</Label>
                      <Input
                        id="creator-mobile"
                        type="tel"
                        value={creatorData.mobile}
                        onChange={(e) => setCreatorData(prev => ({ ...prev, mobile: e.target.value }))}
                        className="bg-white/70"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="creator-password">Password *</Label>
                      <Input
                        id="creator-password"
                        type="password"
                        value={creatorData.password}
                        onChange={(e) => setCreatorData(prev => ({ ...prev, password: e.target.value }))}
                        className="bg-white/70"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creator-confirm">Confirm Password *</Label>
                      <Input
                        id="creator-confirm"
                        type="password"
                        value={creatorData.confirmPassword}
                        onChange={(e) => setCreatorData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="bg-white/70"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="creator-instagram">Instagram Handle *</Label>
                      <Input
                        id="creator-instagram"
                        value={creatorData.instagram}
                        onChange={(e) => setCreatorData(prev => ({ ...prev, instagram: e.target.value }))}
                        className="bg-white/70"
                        placeholder="@username"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creator-niche">Content Niche *</Label>
                      <Select onValueChange={(value) => setCreatorData(prev => ({ ...prev, niche: value }))}>
                        <SelectTrigger className="bg-white/70">
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
                      <Label htmlFor="creator-country">Country *</Label>
                      <Input
                        id="creator-country"
                        value={creatorData.country}
                        onChange={(e) => setCreatorData(prev => ({ ...prev, country: e.target.value }))}
                        className="bg-white/70"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creator-state">State/Province *</Label>
                      <Input
                        id="creator-state"
                        value={creatorData.state}
                        onChange={(e) => setCreatorData(prev => ({ ...prev, state: e.target.value }))}
                        className="bg-white/70"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="creator-city">City *</Label>
                      <Input
                        id="creator-city"
                        value={creatorData.city}
                        onChange={(e) => setCreatorData(prev => ({ ...prev, city: e.target.value }))}
                        className="bg-white/70"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="creator-terms"
                      checked={creatorData.agreeTerms}
                      onCheckedChange={(checked) => setCreatorData(prev => ({ ...prev, agreeTerms: checked as boolean }))}
                    />
                    <Label htmlFor="creator-terms" className="text-sm">
                      I agree to the <Link to="/terms" className="text-blue-600 hover:text-blue-700">Terms and Conditions</Link> and{' '}
                      <Link to="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link> *
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    disabled={!creatorData.agreeTerms}
                  >
                    Create Creator Account
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="brand">
                <form onSubmit={handleBrandSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand-email">Email Address *</Label>
                      <Input
                        id="brand-email"
                        type="email"
                        value={brandData.email}
                        onChange={(e) => setBrandData(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-white/70"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand-name">Brand/Business Name *</Label>
                      <Input
                        id="brand-name"
                        value={brandData.brandName}
                        onChange={(e) => setBrandData(prev => ({ ...prev, brandName: e.target.value }))}
                        className="bg-white/70"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand-password">Password *</Label>
                      <Input
                        id="brand-password"
                        type="password"
                        value={brandData.password}
                        onChange={(e) => setBrandData(prev => ({ ...prev, password: e.target.value }))}
                        className="bg-white/70"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand-confirm">Confirm Password *</Label>
                      <Input
                        id="brand-confirm"
                        type="password"
                        value={brandData.confirmPassword}
                        onChange={(e) => setBrandData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="bg-white/70"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand-contact">Business Contact Info *</Label>
                      <Input
                        id="brand-contact"
                        value={brandData.businessContact}
                        onChange={(e) => setBrandData(prev => ({ ...prev, businessContact: e.target.value }))}
                        className="bg-white/70"
                        placeholder="Phone or email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand-niche">Business Niche *</Label>
                      <Select onValueChange={(value) => setBrandData(prev => ({ ...prev, businessNiche: value }))}>
                        <SelectTrigger className="bg-white/70">
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
                      <Label htmlFor="brand-instagram">Instagram Handle</Label>
                      <Input
                        id="brand-instagram"
                        value={brandData.instagram}
                        onChange={(e) => setBrandData(prev => ({ ...prev, instagram: e.target.value }))}
                        className="bg-white/70"
                        placeholder="@brandname (optional)"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand-website">Website</Label>
                      <Input
                        id="brand-website"
                        value={brandData.website}
                        onChange={(e) => setBrandData(prev => ({ ...prev, website: e.target.value }))}
                        className="bg-white/70"
                        placeholder="https://example.com (optional)"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="brand-terms"
                      checked={brandData.agreeTerms}
                      onCheckedChange={(checked) => setBrandData(prev => ({ ...prev, agreeTerms: checked as boolean }))}
                    />
                    <Label htmlFor="brand-terms" className="text-sm">
                      I agree to the <Link to="/terms" className="text-blue-600 hover:text-blue-700">Terms and Conditions</Link> and{' '}
                      <Link to="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link> *
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    disabled={!brandData.agreeTerms}
                  >
                    Create Brand Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/signin" className="text-blue-600 hover:text-blue-700 font-medium">
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
