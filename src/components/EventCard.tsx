import React from 'react';
import { Calendar, Clock, MapPin, Building2, ExternalLink, ArrowRight, Tag } from 'lucide-react';
import { CollegeEvent } from '../types';

interface EventCardProps {
  event: CollegeEvent;
  onViewDetails: (event: CollegeEvent) => void;
  onRegister?: (event: CollegeEvent) => void;
  showStatus?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onViewDetails,
  onRegister,
  showStatus = false,
}) => {
  // Format date nicely: "15 October 2026"
  const formattedDate = new Date(event.eventDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="group bg-white rounded-xl border border-slate-200/90 hover:border-indigo-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Poster Image / Banner */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-900">
          <img
            src={event.poster || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'}
            alt={event.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent" />

          {/* Category Top Right */}
          <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5 shadow-sm">
            <Tag className="w-3 h-3 text-indigo-400" />
            <span>{event.category}</span>
          </div>

          {/* District Tag */}
          <div className="absolute top-3 right-3 bg-white/95 text-slate-800 text-xs font-medium px-2 py-0.5 rounded shadow-sm">
            {event.district}
          </div>

          {/* Price / Fee Tag */}
          <div className="absolute bottom-2.5 right-3 text-xs font-semibold text-emerald-300 bg-slate-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
            {event.registrationFee}
          </div>

          {/* Status Badge (if enabled) */}
          {showStatus && (
            <div
              className={`absolute bottom-2.5 left-3 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                event.status === 'APPROVED'
                  ? 'bg-emerald-600 text-white'
                  : event.status === 'PENDING'
                  ? 'bg-amber-500 text-white'
                  : 'bg-rose-600 text-white'
              }`}
            >
              {event.status}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          {/* Event Title */}
          <h3
            onClick={() => onViewDetails(event)}
            className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer line-clamp-1 mb-2"
          >
            {event.name}
          </h3>

          {/* College Name & Location */}
          <div className="space-y-1.5 text-xs sm:text-sm text-slate-600 mb-4">
            <div className="flex items-start gap-2">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span className="font-medium text-slate-800 line-clamp-1">{event.collegeName}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{event.collegeLocation}</span>
            </div>
          </div>

          {/* Schedule Strip */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex items-center justify-between text-xs text-slate-600 mb-3">
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {event.startTime} – {event.endTime}
              </span>
            </div>
          </div>

          {/* Prize preview if available */}
          {event.prizes && (
            <p className="text-xs text-indigo-700 font-medium truncate mb-2">
              🏆 {event.prizes}
            </p>
          )}

          {/* Description snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* Card Action Buttons (as specified in brief: [View Details] [Register]) */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 flex items-center gap-2 border-t border-slate-100 mt-2">
        <button
          type="button"
          onClick={() => onViewDetails(event)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
        </button>

        <a
          href={event.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (onRegister) {
              e.preventDefault();
              onRegister(event);
            }
          }}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
        >
          <span>Register</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
