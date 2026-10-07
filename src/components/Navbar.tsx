import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  Calendar,
  Building,
  Info,
  PhoneCall,
  Menu,
  X,
  Code2,
  Terminal,
  PlusCircle,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { PageRoute, User, UserRole } from '../types';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, data?: any) => void;
  currentUser: User | null;
  onRoleSwitch: (role: UserRole) => void;
  onLogout: () => void;
  onOpenJavaModal: () => void;
  onOpenApiModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  currentUser,
  onRoleSwitch,
  onLogout,
  onOpenJavaModal,
  onOpenApiModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navLinks = [
    { page: 'home' as PageRoute, label: 'Home', icon: GraduationCap },
    { page: 'events' as PageRoute, label: 'Events', icon: Calendar },
    { page: 'colleges' as PageRoute, label: 'Colleges', icon: Building },
    { page: 'search' as PageRoute, label: 'Search', icon: Search },
    { page: 'java-code' as PageRoute, label: 'Java Backend', icon: Code2 },
    { page: 'about' as PageRoute, label: 'About', icon: Info },
    { page: 'contact' as PageRoute, label: 'Contact', icon: PhoneCall },
  ];

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Banner Notice: Tamil Nadu Higher Education Hub */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-white">Government of Tamil Nadu Higher Education Discovery Portal</span>
            <span className="hidden md:inline text-slate-400">| Anna University, Autonomous &amp; Deemed Institutions</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Demo Role Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-medium border border-slate-700 transition-colors"
              >
                <span>Role: <strong>{currentUser ? currentUser.role : 'GUEST'}</strong></span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-52 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 text-xs"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400">Switch Demo Role</div>
                  <button
                    onClick={() => onRoleSwitch('STUDENT')}
                    className="w-full text-left px-3 py-1.5 hover:bg-indigo-50 flex items-center justify-between"
                  >
                    <span>🎓 Student (CEG Anna Univ)</span>
                    {currentUser?.role === 'STUDENT' && <span className="text-indigo-600 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => onRoleSwitch('COLLEGE_ADMIN')}
                    className="w-full text-left px-3 py-1.5 hover:bg-indigo-50 flex items-center justify-between"
                  >
                    <span>🏛️ College Admin (PSG Tech)</span>
                    {currentUser?.role === 'COLLEGE_ADMIN' && <span className="text-indigo-600 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => onRoleSwitch('SUPER_ADMIN')}
                    className="w-full text-left px-3 py-1.5 hover:bg-indigo-50 flex items-center justify-between"
                  >
                    <span>🛡️ Super Admin (DOTE)</span>
                    {currentUser?.role === 'SUPER_ADMIN' && <span className="text-indigo-600 font-bold">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Java Code & API Explorer Buttons */}
            <button
              onClick={onOpenJavaModal}
              className="inline-flex items-center gap-1 text-[11px] text-orange-400 hover:text-orange-300 font-medium"
            >
              <Code2 className="w-3 h-3" />
              <span className="hidden sm:inline">Java Code &amp; POM</span>
            </button>
            <button
              onClick={onOpenApiModal}
              className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 font-medium"
            >
              <Terminal className="w-3 h-3" />
              <span className="hidden sm:inline">REST API</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                  TN College Events Hub
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                  Java Spring Boot
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium -mt-0.5">
                Tamil Nadu Technical &amp; Cultural Fest Portal
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Host Event Button (Leads to College Dashboard or Add Event) */}
            <button
              onClick={() => {
                if (currentUser?.role === 'COLLEGE_ADMIN') {
                  onNavigate('add-event');
                } else if (currentUser?.role === 'SUPER_ADMIN') {
                  onNavigate('add-event');
                } else {
                  onNavigate('college-register');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Host College Event</span>
            </button>

            {/* Role-Specific Portal Button */}
            {currentUser?.role === 'COLLEGE_ADMIN' && (
              <button
                onClick={() => onNavigate('college-dashboard')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  currentPage === 'college-dashboard'
                    ? 'bg-indigo-700 text-white'
                    : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-900'
                }`}
              >
                <Building className="w-3.5 h-3.5 text-indigo-700" />
                <span>College Portal</span>
              </button>
            )}

            {currentUser?.role === 'SUPER_ADMIN' && (
              <button
                onClick={() => onNavigate('admin-dashboard')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  currentPage === 'admin-dashboard'
                    ? 'bg-rose-700 text-white'
                    : 'bg-rose-100 hover:bg-rose-200 text-rose-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-rose-700" />
                <span>Admin Portal</span>
              </button>
            )}

            {/* Auth Button */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800 truncate max-w-[120px]">{currentUser.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{currentUser.role}</div>
                </div>
                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('login')}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => onNavigate('student-register')}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-colors"
                >
                  <span>Student Register</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold ${
                    currentPage === link.page
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-indigo-600" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {currentUser?.role === 'COLLEGE_ADMIN' && (
              <button
                onClick={() => handleNavClick('college-dashboard')}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-indigo-100 text-indigo-900 text-center"
              >
                Go to College Dashboard
              </button>
            )}
            {currentUser?.role === 'SUPER_ADMIN' && (
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-rose-100 text-rose-900 text-center"
              >
                Go to Super Admin Dashboard
              </button>
            )}
            <button
              onClick={() => handleNavClick('add-event')}
              className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-emerald-600 text-white text-center"
            >
              + Host College Event
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  onOpenJavaModal();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 px-2 text-xs font-semibold bg-slate-900 text-orange-400 rounded-lg text-center"
              >
                Java Spring Boot Code
              </button>
              <button
                onClick={() => {
                  onOpenApiModal();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 px-2 text-xs font-semibold bg-slate-900 text-sky-400 rounded-lg text-center"
              >
                REST API Console
              </button>
            </div>

            {currentUser ? (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-xs font-semibold text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-50"
              >
                Logout ({currentUser.name})
              </button>
            ) : (
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="flex-1 py-2 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick('student-register')}
                  className="flex-1 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
