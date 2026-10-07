import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  Building,
  ArrowRight,
  Sparkles,
  Trophy,
  Users,
  CheckCircle,
  Cpu,
  Code,
  Sigma,
  Layers,
  Terminal,
  FileText,
  FolderGit2,
  Wrench,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Music,
  Shield,
  Bot
} from 'lucide-react';
import { CollegeEvent, College, EventCategory, PageRoute, EventCategoryName } from '../types';
import { EventCard } from '../components/EventCard';
import { TN_DISTRICTS } from '../data/initialData';

interface HomePageProps {
  events: CollegeEvent[];
  colleges: College[];
  categories: EventCategory[];
  onNavigate: (page: PageRoute, data?: any) => void;
  onViewEvent: (event: CollegeEvent) => void;
  onViewCollege: (college: College) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  events,
  colleges,
  categories,
  onNavigate,
  onViewEvent,
  onViewCollege,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('search', { query: searchQuery, district: selectedDistrict });
  };

  const getCategoryIcon = (name: EventCategoryName) => {
    switch (name) {
      case 'Technical Fest': return Cpu;
      case 'Hackathon': return Code;
      case 'Calculus / Mathematics Events': return Sigma;
      case 'Symposium': return Layers;
      case 'Coding Contest': return Terminal;
      case 'Paper Presentation': return FileText;
      case 'Project Expo': return FolderGit2;
      case 'Workshop': return Wrench;
      case 'Seminar': return BookOpen;
      case 'Quiz Competition': return HelpCircle;
      case 'Ideathon': return Lightbulb;
      case 'Cultural Fest': return Music;
      case 'Sports Events': return Trophy;
      case 'AI/ML Events': return Sparkles;
      case 'Robotics Events': return Bot;
      case 'Cybersecurity Events': return Shield;
      default: return Calendar;
    }
  };

  // Featured upcoming events (sorted by date)
  const upcomingEvents = events
    .filter((e) => e.status === 'APPROVED')
    .slice(0, 6);

  // Latest added events
  const latestEvents = [...events]
    .filter((e) => e.status === 'APPROVED')
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 text-white pt-16 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-900/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Discover College Events Across Tamil Nadu</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Tamil Nadu College <br />
            <span className="bg-gradient-to-r from-amber-300 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
              Events Hub
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            The unified discovery platform for technical symposiums, hackathons, math derbies, workshops, and project expos across Tamil Nadu engineering and arts colleges.
          </p>

          {/* Search Box Bar */}
          <form
            onSubmit={handleHeroSearch}
            className="max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-2xl border border-slate-200/80 flex flex-col sm:flex-row items-stretch gap-2 text-slate-900"
          >
            <div className="flex-1 flex items-center gap-2.5 px-3 py-2 bg-slate-50 sm:bg-transparent rounded-xl">
              <Search className="w-5 h-5 text-indigo-600 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search e.g. 'Hackathon Chennai', 'AI Workshop'..."
                className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 sm:bg-transparent rounded-xl border-t sm:border-t-0 sm:border-l border-slate-200">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-transparent text-xs sm:text-sm text-slate-700 outline-none font-medium cursor-pointer"
              >
                {TN_DISTRICTS.slice(0, 16).map((dist) => (
                  <option key={dist} value={dist} className="text-slate-900">
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md hover:shadow-indigo-600/25 transition-all"
            >
              <span>Search Events</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Filter Pill Shortcuts */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-400">
            <span>Popular searches:</span>
            {['Hackathon Chennai', 'Calculus Derby', 'PSG Tech', 'AI Workshop', 'CIT Bytecode'].map((tag) => (
              <button
                key={tag}
                onClick={() => onNavigate('search', { query: tag })}
                className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-slate-800/80 text-left">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-xl sm:text-2xl font-extrabold text-white">500+</div>
              <div className="text-xs text-slate-400">Events Every Year</div>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-xl sm:text-2xl font-extrabold text-indigo-400">38</div>
              <div className="text-xs text-slate-400">Districts Covered</div>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">120+</div>
              <div className="text-xs text-slate-400">Top Colleges</div>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="text-xl sm:text-2xl font-extrabold text-amber-400">100%</div>
              <div className="text-xs text-slate-400">Verified Portals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Explore by Event Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              From coding hackathons to calculus derbies and cultural symposiums
            </p>
          </div>
          <button
            onClick={() => onNavigate('events')}
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.slice(0, 12).map((cat) => {
            const Icon = getCategoryIcon(cat.name);
            return (
              <button
                key={cat.id}
                onClick={() => onNavigate('events', { category: cat.name })}
                className="group p-3.5 bg-white border border-slate-200/90 hover:border-indigo-400 hover:shadow-md rounded-xl text-left transition-all duration-200 flex flex-col justify-between"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center transition-colors mb-2.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {cat.eventCount || 0} events
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Upcoming Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Upcoming College Events
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Verified registrations happening across Tamil Nadu in October – November 2026
            </p>
          </div>
          <button
            onClick={() => onNavigate('events')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors"
          >
            <span>All Events ({events.filter((e) => e.status === 'APPROVED').length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={onViewEvent}
              onRegister={() => window.open(event.registrationLink, '_blank')}
            />
          ))}
        </div>
      </section>

      {/* Host Event Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 max-w-xl relative z-10 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              For College HODs, Faculty Advisors &amp; Student Councils
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Publish Your College Fest or Symposium
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Reach thousands of ambitious engineering, arts, and science students across 38 districts of Tamil Nadu. Instant submission with verified registration tracking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 shrink-0">
            <button
              onClick={() => onNavigate('college-register')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md transition-colors"
            >
              Register College Profile
            </button>
            <button
              onClick={() => onNavigate('add-event')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors"
            >
              Submit Event Details
            </button>
          </div>
        </div>
      </section>

      {/* Popular Colleges Across Tamil Nadu */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Participating Premier Colleges
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Top autonomous and university departments regularly publishing technical conclaves
            </p>
          </div>
          <button
            onClick={() => onNavigate('colleges')}
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
          >
            <span>View All Colleges</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {colleges.slice(0, 4).map((college) => {
            const hostedCount = events.filter((e) => e.collegeId === college.id).length;
            return (
              <div
                key={college.id}
                onClick={() => onViewCollege(college)}
                className="group bg-white border border-slate-200/90 hover:border-indigo-400 hover:shadow-lg rounded-xl p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={college.logo}
                      alt={college.name}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-100 shadow-sm"
                    />
                    <div>
                      <span className="text-[11px] font-bold font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {college.code}
                      </span>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{college.district}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
                    {college.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {college.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    {hostedCount} {hostedCount === 1 ? 'Event' : 'Events'} Hosted
                  </span>
                  <span className="text-indigo-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Java Spring Boot Backend Architecture Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 border border-slate-800 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-indigo-500/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-semibold">
                <Code className="w-3.5 h-3.5" />
                <span>Java Spring Boot 3.3 + JPA + MySQL Architecture</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Full-Stack Enterprise Java Source Code Available
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Discover the complete backend code: Spring MVC Controllers, Spring Data JPA Repositories, Spring Security with JWT tokens, and production MySQL 8 DDL schemas. Ready to clone and run in IntelliJ IDEA or Eclipse.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('java-code')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <Terminal className="w-4 h-4" />
                <span>Explore Java Source Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Events Notice Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">
              Latest Additions &amp; Urgent Deadlines
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {latestEvents.map((e) => (
              <div
                key={e.id}
                onClick={() => onViewEvent(e)}
                className="bg-white p-3.5 rounded-xl border border-slate-200/80 hover:border-indigo-400 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span className="font-semibold text-indigo-600">{e.category}</span>
                  <span>Deadline: {e.registrationDeadline}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1 mb-1">{e.name}</h4>
                <p className="text-[11px] text-slate-500 truncate">{e.collegeName}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
