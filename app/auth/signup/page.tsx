"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BrainCircuit, Eye, EyeOff, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import { saveAuthSession } from '@/lib/session';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName) {
      setError('Please enter your organization name.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      saveAuthSession({
        access_token: 'signup_demo_token',
        refresh_token: 'signup_demo_refresh',
        token_type: 'Bearer',
        expires_in: 3600,
        user: {
          id: `usr_${Date.now()}`,
          email,
          name,
          role: 'owner',
          org_id: 'org_acme_001',
          avatar_url: null,
        },
        orgName: orgName || 'Acme Corp',
      });
      router.push('/dashboard');
    } catch (err) {
      setError('Unable to complete signup. Please try again.');
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-xl font-bold tracking-tight">Create your account</h2>
          <p className="text-xs text-[#8B91B5]">
            {step === 1 ? 'Step 1 of 2: Personal Details' : 'Step 2 of 2: Organization Setup'}
          </p>
        </div>

        {error && (
          <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] text-xs px-4 py-2.5 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleNextStep} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#8B91B5]">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B91B5]" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Arjun Mehta"
                  className="w-full bg-[#1C2030] border border-[#2A2F45] rounded-xl pl-10 pr-4 py-3 text-xs text-[#F0F2FF] placeholder-[#4A5070] focus:outline-none focus:border-[#4F7FFF] focus:ring-1 focus:ring-[#4F7FFF] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#8B91B5]">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B91B5]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arjun@company.com"
                  className="w-full bg-[#1C2030] border border-[#2A2F45] rounded-xl pl-10 pr-4 py-3 text-xs text-[#F0F2FF] placeholder-[#4A5070] focus:outline-none focus:border-[#4F7FFF] focus:ring-1 focus:ring-[#4F7FFF] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#8B91B5]">Password</label>
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
              className="w-full bg-[#4F7FFF] hover:bg-[#4F7FFF]/90 text-white py-3 rounded-xl text-xs font-semibold transition-all shadow-lg shadow-[#4F7FFF]/10 mt-2"
            >
              Continue to Organization Setup
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#8B91B5]">Organization Name</label>
              <div className="relative">
                <BrainCircuit className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B91B5]" />
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Acme Corp"
                  className="w-full bg-[#1C2030] border border-[#2A2F45] rounded-xl pl-10 pr-4 py-3 text-xs text-[#F0F2FF] placeholder-[#4A5070] focus:outline-none focus:border-[#4F7FFF] focus:ring-1 focus:ring-[#4F7FFF] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#8B91B5]">Primary CI/CD Tool</label>
              <select className="w-full bg-[#1C2030] border border-[#2A2F45] rounded-xl px-3.5 py-3 text-xs text-[#F0F2FF] focus:outline-none focus:border-[#4F7FFF] transition-all">
                <option>GitHub Actions</option>
                <option>GitLab CI</option>
                <option>Jenkins</option>
                <option>CircleCI</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#8B91B5]">Team Size</label>
              <select className="w-full bg-[#1C2030] border border-[#2A2F45] rounded-xl px-3.5 py-3 text-xs text-[#F0F2FF] focus:outline-none focus:border-[#4F7FFF] transition-all">
                <option>1 - 10 developers</option>
                <option>11 - 50 developers</option>
                <option>51 - 250 developers</option>
                <option>250+ developers</option>
              </select>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 bg-[#1C2030] hover:bg-[#1C2030]/80 border border-[#2A2F45] text-xs font-semibold py-3 rounded-xl transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#4F7FFF] hover:bg-[#4F7FFF]/90 disabled:opacity-50 text-white py-3 rounded-xl text-xs font-semibold transition-all shadow-lg shadow-[#4F7FFF]/10 flex items-center justify-center gap-2"
              >
                {loading ? 'Setting up pipeline...' : 'Set Up My Pipeline'}
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-[10px] text-[#8B91B5]">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#4F7FFF] hover:underline font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
