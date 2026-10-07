import React from 'react';
import {
  ArrowLeft,
  MapPin,
  Globe,
  Phone,
  Mail,
  Award,
  Calendar,
  ExternalLink,
  PlusCircle,
  Building2
} from 'lucide-react';
import { College, CollegeEvent, PageRoute, User } from '../types';
import { EventCard } from '../components/EventCard';

interface CollegeDetailsPageProps {
  college: College;
  events: CollegeEvent[];
  currentUser: User | null;
  onBack: () => void;
  onViewEvent: (event: CollegeEvent) => void;
  onNavigate: (page: PageRoute, data?: any) => void;
}

export const CollegeDetailsPage: React.FC<CollegeDetailsPageProps> = ({
  college,
  events,
  currentUser,
  onBack,
  onViewEvent,
  onNavigate,
}) => {
  const collegeEvents = events.filter((e) => e.collegeId === college.id && e.status === 'APPROVED');
  const isCurrentCollegeAdmin = currentUser?.collegeId === college.id;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Colleges Directory</span>
      </button>

      {/* College Profile Banner Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="h-36 sm:h-48 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 relative p-6">
          <div className="absolute right-6 top-6">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-white/10 text-white border border-white/20">
              Code: {college.code}
            </span>
          </div>
        </div>

        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 mb-4">
            <div className="flex items-end gap-4">
              <img
                src={college.logo}
                alt={college.name}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md bg-white shrink-0"
              />
              <div className="pb-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {college.name}
                </h1>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{college.location}, {college.district} District</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {college.website && (
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Globe className="w-4 h-4 text-indigo-600" />
                  <span>Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              )}

              {isCurrentCollegeAdmin && (
                <button
                  onClick={() => onNavigate('add-event')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add New Event</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-3 border-y border-slate-100 text-xs text-slate-600">
            {college.accreditation && (
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{college.accreditation}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <a href={`mailto:${college.email}`} className="hover:underline truncate">
                {college.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{college.phone}</span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
              About the Institution
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {college.description}
            </p>
          </div>
        </div>
      </div>

      {/* Events Published by This College */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <span>Events Hosted by {college.name}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {collegeEvents.length} verified events currently open for registration
            </p>
          </div>
        </div>

        {collegeEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collegeEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onViewDetails={onViewEvent}
                onRegister={() => window.open(event.registrationLink, '_blank')}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500 text-xs">
            No active upcoming events published by this college right now.
          </div>
        )}
      </div>
    </div>
  );
};
