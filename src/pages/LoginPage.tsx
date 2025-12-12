import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const LoginPage: React.FC = () => {
  const { language } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error(language === 'en' ? 'Please fill all fields' : 'தயவுசெய்து அனைத்து புலங்களையும் நிரப்பவும்');
      return;
    }
    
    setIsLoading(true);
    // Simulate login - this will be connected to Supabase later
    setTimeout(() => {
      toast.info(language === 'en' 
        ? 'Login functionality requires backend setup' 
        : 'உள்நுழைவு செயல்பாட்டிற்கு பின்தள அமைப்பு தேவை');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-muted py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-4"
      >
        <div className="bg-card rounded-2xl p-8 shadow-xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
              <span className="text-2xl font-serif font-bold text-primary-foreground">A</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-foreground">
              {language === 'en' ? 'Member Login' : 'உறுப்பினர் உள்நுழைவு'}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {language === 'en' 
                ? 'Sign in to access the admin portal' 
                : 'நிர்வாக போர்டலை அணுக உள்நுழையவும்'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {language === 'en' ? 'Email' : 'மின்னஞ்சல்'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="pl-10"
                  placeholder="member@ausdav.org"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {language === 'en' ? 'Password' : 'கடவுச்சொல்'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="donate" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  {language === 'en' ? 'Signing in...' : 'உள்நுழைகிறது...'}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  {language === 'en' ? 'Sign In' : 'உள்நுழை'}
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {language === 'en' 
              ? 'Only registered members can access the admin portal.' 
              : 'பதிவு செய்யப்பட்ட உறுப்பினர்கள் மட்டுமே நிர்வாக போர்டலை அணுக முடியும்.'}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
