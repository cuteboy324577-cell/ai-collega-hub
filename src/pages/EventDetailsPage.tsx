import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Building2,
  ExternalLink,
  ArrowLeft,
  Mail,
  Phone,
  User,
  Share2,
  Trophy,
  CheckCircle,
  AlertCircle,
  FileCheck,
  Tag,
  Download
} from 'lucide-react';
import { CollegeEvent, College, PageRoute } from '../types';

interface EventDetailsPageProps {
  event: CollegeEvent;
  college?: College | null;
  onBack: () => void;
  onViewCollege: (collegeId: number) => void;
  onNavigate: (page: PageRoute, data?: any) => void;
}

export const EventDetailsPage: React.FC<EventDetailsPageProps> = ({
  event,
  college,
  onBack,
  onViewCollege,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const formattedDate = new Date(event.eventDate).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedDeadline = new Date(event.registrationDeadline).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events Catalog</span>
      </button>

      {/* Main Header Card with Poster */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Banner Poster */}
        <div className="relative h-64 sm:h-80 w-full bg-slate-950">
          <img
            src={event.poster || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200'}
            alt={event.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            <span className="bg-indigo-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-md shadow flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              <span>{event.category}</span>
            </span>
            <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-semibold px-2.5 py-1 rounded-md border border-white/10">
              Event ID: #{event.id}
            </span>
          </div>

          <div className="absolute top-4 right-4">
            <button
              onClick={handleShare}
              className="bg-slate-900/80 hover:bg-slate-900 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-lg border border-white/15 flex items-center gap-1.5 transition-colors shadow"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Event'}</span>
            </button>
          </div>

          {/* Title & College on Image */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {event.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
              <button
                onClick={() => onViewCollege(event.collegeId)}
                className="hover:underline flex items-center gap-1.5 font-medium text-amber-300"
              >
                <Building2 className="w-4 h-4" />
                <span>{event.collegeName}</span>
              </button>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{event.collegeLocation}, {event.district}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-slate-50 border-b border-slate-200 text-xs">
          <div className="p-4 space-y-1">
            <span className="text-slate-400 font-medium">Event Date</span>
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="p-4 space-y-1">
            <span className="text-slate-400 font-medium">Timings</span>
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>{event.startTime} – {event.endTime}</span>
            </div>
          </div>

          <div className="p-4 space-y-1">
            <span className="text-slate-400 font-medium">Registration Fee</span>
            <div className="font-bold text-emerald-600 text-sm">
              {event.registrationFee}
            </div>
          </div>

          <div className="p-4 space-y-1">
            <span className="text-slate-400 font-medium">Registration Closes</span>
            <div className="font-bold text-rose-600">
              {formattedDeadline}
            </div>
          </div>
        </div>

        {/* Body Layout: Description + Sticky CTA Sidebar */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-indigo-600" />
                <span>About the Event</span>
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Venue & Location */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <span>Event Venue &amp; Campus Location</span>
              </h3>
              <p className="text-sm font-semibold text-slate-800">{event.venue}</p>
              <p className="text-xs text-slate-500 mt-1">{event.collegeLocation}, {event.district} District, Tamil Nadu</p>
            </div>

            {/* Eligibility */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">Participant Eligibility</h3>
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs sm:text-sm text-indigo-950 font-medium flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>{event.eligibility}</span>
              </div>
            </div>

            {/* Prizes if any */}
            {event.prizes && (
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Awards &amp; Prize Pool</span>
                </h3>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-900 font-semibold">
                  🏆 {event.prizes}
                </div>
              </div>
            )}

            {/* Rules and Guidelines */}
            {event.rules && event.rules.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3">Event Guidelines &amp; Rules</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {event.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact Persons */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Staff / Student Coordinators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>{event.contactName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <a href={`tel:${event.contactNumber}`} className="hover:underline">
                      {event.contactNumber}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <a href={`mailto:${event.contactEmail}`} className="hover:underline truncate">
                      {event.contactEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar CTA */}
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Official Registration
                </span>
                <div className="text-2xl font-extrabold text-slate-900">
                  {event.registrationFee}
                </div>
                <div className="text-xs text-rose-600 font-medium">
                  Registration Deadline: {formattedDeadline}
                </div>
              </div>

              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all"
              >
                <span>Register on College Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                You will be redirected to the college or platform registration link to submit team details and documents.
              </p>
            </div>

            {/* Hosting College Profile Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Organizing College
              </span>
              <div className="flex items-center gap-3">
                <img
                  src={college?.logo || 'https://images.unsplash.com/photo-1562774053-701939374585?w=160'}
                  alt={event.collegeName}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-100 shadow-sm"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{event.collegeName}</h4>
                  <p className="text-[11px] text-slate-500">{event.collegeLocation}</p>
                </div>
              </div>
              <button
                onClick={() => onViewCollege(event.collegeId)}
                className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors text-center"
              >
                View College Profile &amp; Other Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
