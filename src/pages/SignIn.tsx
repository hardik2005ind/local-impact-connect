
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(formData.email, formData.password);
      toast({
        title: "Success!",
        description: "You have been signed in successfully.",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      <div className="absolute -bottom-8 left-1/2 w-32 h-32 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-3xl font-bold text-gradient-pink mb-4">
            <Heart className="h-8 w-8 text-pink-500" />
            Lokreach
          </Link>
          <p className="text-gray-600 text-lg">Welcome back to your creative journey</p>
        </div>

        <Card className="bg-white/90 backdrop-blur-md border-0 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="text-center pb-8 pt-8 bg-gradient-to-r from-pink-500/10 to-purple-500/10">
            <div className="flex justify-center mb-4">
              <div className="gradient-pink-maroon w-16 h-16 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-gray-900">Welcome Back!</CardTitle>
            <p className="text-gray-600 mt-2">Sign in to continue your journey</p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="border-pink-200 focus:border-pink-400 focus:ring-pink-200 rounded-lg h-12"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between">
                <Link to="/forgot-password" className="text-sm text-pink-600 hover:text-pink-700 transition-colors">
                  Forgot Password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-pink-maroon text-white hover:opacity-90 transition-all h-12 text-lg font-medium shadow-lg transform hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In to Lokreach"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-pink-600 hover:text-pink-700 font-medium transition-colors">
                  Join Lokreach today
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
