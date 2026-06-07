"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BrainCircuit, Eye, EyeOff, Lock, Mail, Github } from 'lucide-react';
import { saveAuthSession } from '@/lib/session';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const body = await response.json();
      if (!response.ok || !body.success) {
        throw new Error(body?.error?.message ?? 'Invalid email or password.');
      }

      saveAuthSession(body.data);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.message ?? 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (name: string, address: string) => {
    saveAuthSession({
      access_token: 'social_demo_token',
      refresh_token: 'social_demo_refresh',
      token_type: 'Bearer',
      expires_in: 3600,
      user: {
        id: `usr_${Date.now()}`,
        email: address,
        name,
        role: 'member',
        org_id: 'org_acme_001',
        avatar_url: null,
      },
      orgName: 'Acme Corp',
    });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0D0F14] text-[#F0F2FF] flex items-center justify-center p-6 relative overflow-hidden select-none">
      {/* Glow circles */}
      <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-[#4F7FFF]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] bg-[#A78BFA]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#13161E] border border-[#2A2F45] rounded-2xl p-8 shadow-2xl z-10 space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="w-10 h-10 bg-gradient-to-br from-[#4F7FFF] to-[#A78BFA] rounded-xl flex items-center justify-center shadow-lg shadow-[#4F7FFF]/25 mb-2">
            <BrainCircuit className="text-[#0D0F14] w-6 h-6 stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-xs text-[#8B91B5]">Access your PipelineIQ deployment command center</p>
        </div>

        {error && (
          <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] text-xs px-4 py-2.5 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#8B91B5]">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B91B5]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-[#1C2030] border border-[#2A2F45] rounded-xl pl-10 pr-4 py-3 text-xs text-[#F0F2FF] placeholder-[#4A5070] focus:outline-none focus:border-[#4F7FFF] focus:ring-1 focus:ring-[#4F7FFF] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-[#8B91B5]">Password</label>
              <Link href="#" className="text-[10px] text-[#4F7FFF] hover:underline font-semibold">Forgot password?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B91B5]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#1C2030] border border-[#2A2F45] rounded-xl pl-10 pr-10 py-3 text-xs text-[#F0F2FF] placeholder-[#4A5070] focus:outline-none focus:border-[#4F7FFF] focus:ring-1 focus:ring-[#4F7FFF] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B91B5] hover:text-[#F0F2FF]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4F7FFF] hover:bg-[#4F7FFF]/90 disabled:opacity-50 text-white py-3 rounded-xl text-xs font-semibold transition-all shadow-lg shadow-[#4F7FFF]/10 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-[#2A2F45]/50"></div>
          <span className="flex-shrink mx-4 text-[10px] text-[#4A5070] font-bold uppercase tracking-wider">Or continue with</span>
          <div className="flex-grow border-t border-[#2A2F45]/50"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => handleSocialLogin('GitHub User', 'github@acme.com')}
            className="flex items-center justify-center gap-2 bg-[#1C2030] hover:bg-[#1C2030]/80 border border-[#2A2F45] text-xs font-semibold py-2.5 rounded-xl transition-colors"
          >
            <Github size={14} /> GitHub
          </button>
          <button 
            onClick={() => handleSocialLogin('Google User', 'google@acme.com')}
            className="flex items-center justify-center gap-2 bg-[#1C2030] hover:bg-[#1C2030]/80 border border-[#2A2F45] text-xs font-semibold py-2.5 rounded-xl transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Google
          </button>
        </div>

        <p className="text-center text-[10px] text-[#8B91B5]">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-[#4F7FFF] hover:underline font-semibold">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
