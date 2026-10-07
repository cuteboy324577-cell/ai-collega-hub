import React from 'react';
import { GraduationCap, Database, Code2, Shield, RefreshCw } from 'lucide-react';
import { PageRoute } from '../types';
import { ApiService } from '../services/apiService';

interface FooterProps {
  onNavigate: (page: PageRoute, data?: any) => void;
  onOpenJavaModal: () => void;
  onOpenApiModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenJavaModal, onOpenApiModal }) => {
  const handleResetData = () => {
    if (window.confirm('Reset all demo events, colleges, and users back to initial state?')) {
      ApiService.resetDatabase();
      window.location.reload();
    }
  };

  const topDistricts = [
    'Chennai',
    'Coimbatore',
    'Madurai',
    'Tiruchirappalli',
    'Salem',
    'Tirunelveli',
    'Thanjavur',
    'Vellore',
    'Chengalpattu',
    'Erode',
  ];

  const popularCategories = [
    'Technical Fest',
    'Hackathon',
    'Calculus / Mathematics Events',
    'Symposium',
    'Coding Contest',
    'Paper Presentation',
    'Project Expo',
    'Workshop',
    'Cybersecurity Events',
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Top Architecture Highlight Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Full-Stack Architecture:</span>
            </span>
            <span>Java 17 • Spring Boot 3.3.4 • Spring Data JPA • MySQL 8 • REST API</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenJavaModal}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-orange-300 text-xs transition-colors border border-slate-700"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>View Java Source Code</span>
            </button>
            <button
              onClick={onOpenApiModal}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs transition-colors border border-slate-700"
            >
              <span>Explore REST Endpoints</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand & About */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-base font-bold tracking-tight">Tamil Nadu College Events Hub</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            The unified discovery and management platform for collegiate hackathons, symposiums, math derbies, workshops, and project expos across Tamil Nadu higher education institutions.
          </p>
          <div className="pt-2 flex items-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-500" /> DOTE Recognized
            </span>
            <span>•</span>
            <span>Anna University Affiliated Hub</span>
            <span>•</span>
            <span>Open Access</span>
          </div>
        </div>

        {/* Major Districts */}
        <div>
          <h4 className="text-slate-200 font-bold mb-3 uppercase tracking-wider text-[11px]">
            Tamil Nadu Districts
          </h4>
          <ul className="space-y-1.5">
            {topDistricts.map((district) => (
              <li key={district}>
                <button
                  onClick={() => onNavigate('events', { district })}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  Events in {district}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-slate-200 font-bold mb-3 uppercase tracking-wider text-[11px]">
            Event Types
          </h4>
          <ul className="space-y-1.5">
            {popularCategories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => onNavigate('events', { category: cat })}
                  className="hover:text-indigo-400 transition-colors text-left"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links & Portal Portals */}
        <div className="space-y-3">
          <h4 className="text-slate-200 font-bold mb-3 uppercase tracking-wider text-[11px]">
            Portals &amp; Tools
          </h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-white">
                Home Page
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('events')} className="hover:text-white">
                All Upcoming Events
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('colleges')} className="hover:text-white">
                Participating Colleges
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('search')} className="hover:text-white">
                Advanced Event Search
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('college-register')} className="hover:text-white">
                College Registration
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-white">
                About Architecture
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-white">
                Support &amp; Feedback
              </button>
            </li>
          </ul>

          <div className="pt-2">
            <button
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-rose-400 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Demo Database</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px]">
        <div>
          © 2026 Tamil Nadu College Events Hub. Developed for College Mini &amp; Final-Year Project Demonstration.
        </div>
        <div>
          Spring Boot MVC • Spring Data JPA • MySQL Relational Database
        </div>
      </div>
    </footer>
  );
};
