import React, { useState } from 'react';
import { Building2, MapPin, Globe, Mail, Phone, Lock, User, AlertCircle, Award, CheckCircle } from 'lucide-react';
import { ApiService } from '../services/apiService';
import { PageRoute, User as UserModel } from '../types';
import { TN_DISTRICTS } from '../data/initialData';

interface CollegeRegistrationPageProps {
  onRegisterSuccess: (user: UserModel) => void;
  onNavigate: (page: PageRoute) => void;
}

export const CollegeRegistrationPage: React.FC<CollegeRegistrationPageProps> = ({
  onRegisterSuccess,
  onNavigate,
}) => {
  const [collegeName, setCollegeName] = useState('');
  const [code, setCode] = useState('');
  const [district, setDistrict] = useState('Chennai');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=160');
  const [accreditation, setAccreditation] = useState('Autonomous, NAAC A++');
  const [establishedYear, setEstablishedYear] = useState('1985');
  const [description, setDescription] = useState('');

  // Admin Account Info
  const [adminName, setAdminName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Create College
      const newCollege = await ApiService.createCollege({
        name: collegeName,
        code,
        location,
        district,
        website,
        email,
        phone,
        logo,
        accreditation,
        establishedYear: Number(establishedYear) || undefined,
        description,
      });

      // 2. Create College Admin User
      const newAdmin = await ApiService.registerUser({
        name: adminName,
        email,
        password: adminPassword,
        role: 'COLLEGE_ADMIN',
        collegeId: newCollege.id,
        collegeName: newCollege.name,
        phone,
      });

      onRegisterSuccess(newAdmin);
    } catch (err: any) {
      setError(err.message || 'College registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-indigo-200">
          <Building2 className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          College Onboarding &amp; Registration
        </h1>
        <p className="text-xs text-slate-500">
          Register your college or university in Tamil Nadu to publish technical symposiums, hackathons, and workshops
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-xs">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Section 1: College Institutional Details */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            1. Institutional Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">College / University Name</label>
              <input
                type="text"
                required
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                placeholder="e.g. Sri Krishna College of Engineering & Technology"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">College Code / AISHE</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. SKCET-7181"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tamil Nadu District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
              >
                {TN_DISTRICTS.filter((d) => d !== 'All Districts').map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Campus Location / Town</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Kuniamuthur, Coimbatore"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Website</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://skcet.ac.in"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Accreditation / NIRF Rank</label>
              <input
                type="text"
                value={accreditation}
                onChange={(e) => setAccreditation(e.target.value)}
                placeholder="e.g. NAAC A++, Autonomous"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Brief Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Highlight engineering departments, infrastructure, and technical festival history..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Section 2: College Admin Account */}
        <div className="space-y-4 pt-2">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            2. College Administrator Credentials
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Administrator / Staff Name</label>
              <input
                type="text"
                required
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="e.g. Dr. K. Saravanan (Convenor)"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official College Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="events@college.ac.in"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 422 267 8001"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Admin Password</label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-colors disabled:opacity-50"
        >
          {loading ? 'Registering College & Database...' : 'Register College & Access Dashboard'}
        </button>
      </form>
    </div>
  );
};
