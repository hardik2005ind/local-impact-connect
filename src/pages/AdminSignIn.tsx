
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Lock, Crown } from 'lucide-react';

const AdminSignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    accessCode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Admin sign in:', formData);
    // Handle admin authentication
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      <div className="absolute -bottom-8 left-1/2 w-32 h-32 bg-rose-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="gradient-pink-maroon w-12 h-12 rounded-full flex items-center justify-center">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">Lokreach Admin</span>
          </div>
          <p className="text-gray-300 text-lg">Secure platform administration</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="text-center pb-8 pt-8 bg-gradient-to-r from-pink-500/10 to-purple-500/10">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-white">Admin Access</CardTitle>
            <p className="text-gray-300 mt-2">Authorized personnel only</p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200 font-medium">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:border-pink-400 focus:ring-pink-400/50 rounded-lg h-12"
                  placeholder="admin@lokreach.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200 font-medium">Admin Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:border-pink-400 focus:ring-pink-400/50 rounded-lg h-12"
                  placeholder="Enter secure password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accessCode" className="text-gray-200 font-medium">Access Code (Optional)</Label>
                <Input
                  id="accessCode"
                  value={formData.accessCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, accessCode: e.target.value }))}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:border-pink-400 focus:ring-pink-400/50 rounded-lg h-12"
                  placeholder="Special access code"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white h-12 text-lg font-medium shadow-lg transform hover:scale-[1.02] transition-all"
              >
                <Lock className="mr-2 h-5 w-5" />
                Access Admin Panel
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-300 text-sm">
                🔒 Authorized access only. All activities are logged and monitored.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSignIn;
