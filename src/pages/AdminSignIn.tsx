
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="text-3xl font-bold text-white">Lokreach Admin</span>
          </div>
          <p className="text-gray-300">Secure platform administration</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-0 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accessCode" className="text-gray-200">Access Code (Optional)</Label>
                <Input
                  id="accessCode"
                  value={formData.accessCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, accessCode: e.target.value }))}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  placeholder="Enter access code if required"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Shield className="mr-2 h-4 w-4" />
                Access Admin Panel
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-300 text-sm">
                Authorized access only. All activities are logged.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSignIn;
