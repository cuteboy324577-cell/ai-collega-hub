import React, { useState } from 'react';
import { LogIn, Lock, Mail, Shield, Building2, GraduationCap, AlertCircle, ArrowRight } from 'lucide-react';
import { ApiService } from '../services/apiService';
import { PageRoute, User } from '../types';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onNavigate: (page: PageRoute) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await ApiService.login(email, password);
      onLoginSuccess(user);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
    setLoading(true);
    try {
      const user = await ApiService.login(demoEmail, demoPass);
      onLoginSuccess(user);
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-indigo-200">
          <LogIn className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Sign In to Portal
        </h1>
        <p className="text-xs text-slate-500">
          Access your Student account, College Admin dashboard, or Super Admin control room
        </p>
      </div>

      {/* Demo Credentials Quick-Select Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
          <Shield className="w-4 h-4 text-amber-700" />
          <span>Demo Accounts (1-Click Fill &amp; Login)</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('admin@tnevents.gov.in', 'admin123')}
            className="w-full text-left p-2 rounded-xl bg-white border border-amber-200 hover:border-amber-400 text-xs flex items-center justify-between transition-all"
          >
            <div>
              <strong className="text-slate-900 block font-semibold">Super Admin (DOTE / TN Hub)</strong>
              <span className="text-slate-500 font-mono text-[11px]">admin@tnevents.gov.in</span>
            </div>
            <span className="text-[11px] font-bold text-indigo-600">Login →</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemoLogin('admin@psgtech.ac.in', 'college123')}
            className="w-full text-left p-2 rounded-xl bg-white border border-amber-200 hover:border-amber-400 text-xs flex items-center justify-between transition-all"
          >
            <div>
              <strong className="text-slate-900 block font-semibold">College Admin (PSG Tech)</strong>
              <span className="text-slate-500 font-mono text-[11px]">admin@psgtech.ac.in</span>
            </div>
            <span className="text-[11px] font-bold text-indigo-600">Login →</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickDemoLogin('kavin.selvan@student.annauniv.edu', 'student123')}
            className="w-full text-left p-2 rounded-xl bg-white border border-amber-200 hover:border-amber-400 text-xs flex items-center justify-between transition-all"
          >
            <div>
              <strong className="text-slate-900 block font-semibold">Student (Anna Univ CEG)</strong>
              <span className="text-slate-500 font-mono text-[11px]">kavin.selvan@student.annauniv.edu</span>
            </div>
            <span className="text-[11px] font-bold text-indigo-600">Login →</span>
          </button>
        </div>
      </div>

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@psgtech.ac.in"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-500 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-500 focus:bg-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors disabled:opacity-50"
        >
          {loading ? 'Authenticating with Spring Boot...' : 'Sign In'}
        </button>
      </form>

      {/* Registration Navigation Links */}
      <div className="space-y-2 text-center text-xs text-slate-500">
        <p>
          Don't have an account?{' '}
          <button
            onClick={() => onNavigate('student-register')}
            className="text-indigo-600 font-bold hover:underline"
          >
            Register as a Student
          </button>
        </p>
        <p>
          Are you a college representative?{' '}
          <button
            onClick={() => onNavigate('college-register')}
            className="text-indigo-600 font-bold hover:underline"
          >
            Register College Account
          </button>
        </p>
      </div>
    </div>
  );
};
