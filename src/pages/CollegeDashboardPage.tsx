import React, { useState } from 'react';
import {
  Building2,
  PlusCircle,
  Calendar,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  ExternalLink,
  MapPin,
  Share2
} from 'lucide-react';
import { College, CollegeEvent, PageRoute, User } from '../types';
import { ApiService } from '../services/apiService';

interface CollegeDashboardPageProps {
  currentUser: User;
  college?: College | null;
  events: CollegeEvent[];
  onNavigate: (page: PageRoute, data?: any) => void;
  onEditEvent: (event: CollegeEvent) => void;
  onViewEvent: (event: CollegeEvent) => void;
  onEventDeleted: () => void;
}

export const CollegeDashboardPage: React.FC<CollegeDashboardPageProps> = ({
  currentUser,
  college,
  events,
  onNavigate,
  onEditEvent,
  onViewEvent,
  onEventDeleted,
}) => {
  const [filterTab, setFilterTab] = useState<'ALL' | 'APPROVED' | 'PENDING' | 'REJECTED'>('ALL');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Events belonging to this college
  const myEvents = events.filter((e) => {
    if (currentUser.collegeId) {
      return e.collegeId === currentUser.collegeId;
    }
    return true;
  });

  const displayedEvents = myEvents.filter((e) => {
    if (filterTab === 'ALL') return true;
    return e.status === filterTab;
  });

  const approvedCount = myEvents.filter((e) => e.status === 'APPROVED').length;
  const pendingCount = myEvents.filter((e) => e.status === 'PENDING').length;
  const totalViews = myEvents.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to permanently delete this event?')) {
      setDeletingId(id);
      try {
        await ApiService.deleteEvent(id);
        onEventDeleted();
      } catch (err) {
        alert('Failed to delete event');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>College Administration Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {currentUser.collegeName || college?.name || 'College Dashboard'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Manage upcoming symposiums, view student engagement, and submit new technical conclaves
          </p>
        </div>

        <button
          onClick={() => onNavigate('add-event')}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish New Event</span>
        </button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Published &amp; Approved</span>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1">{approvedCount}</div>
            <span className="text-[11px] text-slate-400">Live on Tamil Nadu portal</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Pending DOTE Review</span>
            <div className="text-2xl font-extrabold text-amber-500 mt-1">{pendingCount}</div>
            <span className="text-[11px] text-slate-400">Awaiting Super Admin approval</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium">Total Student Views</span>
            <div className="text-2xl font-extrabold text-indigo-600 mt-1">{totalViews}</div>
            <span className="text-[11px] text-slate-400">Impressions across all events</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Events Management Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filter Tabs */}
        <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
          <h2 className="text-base font-bold text-slate-900">
            College Events Management ({myEvents.length})
          </h2>

          <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs font-semibold">
            <button
              onClick={() => setFilterTab('ALL')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterTab === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({myEvents.length})
            </button>
            <button
              onClick={() => setFilterTab('APPROVED')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterTab === 'APPROVED' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Approved ({approvedCount})
            </button>
            <button
              onClick={() => setFilterTab('PENDING')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterTab === 'PENDING' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending ({pendingCount})
            </button>
          </div>
        </div>

        {/* List of events */}
        {displayedEvents.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {displayedEvents.map((event) => (
              <div
                key={event.id}
                className="p-5 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={event.poster || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=160'}
                    alt={event.name}
                    className="w-20 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {event.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          event.status === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : event.status === 'PENDING'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {event.status}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">ID: #{event.id}</span>
                    </div>

                    <h3
                      onClick={() => onViewEvent(event)}
                      className="font-bold text-sm text-slate-900 hover:text-indigo-600 cursor-pointer"
                    >
                      {event.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span>Date: {event.eventDate} ({event.startTime})</span>
                      <span>•</span>
                      <span>Venue: {event.venue}</span>
                      <span>•</span>
                      <span>Fee: {event.registrationFee}</span>
                      <span>•</span>
                      <span>Views: {event.viewsCount || 0}</span>
                    </div>

                    {event.status === 'REJECTED' && event.rejectionReason && (
                      <div className="text-xs text-rose-700 bg-rose-50 p-2 rounded-lg border border-rose-200 mt-1">
                        <strong>Rejection Reason:</strong> {event.rejectionReason}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => onViewEvent(event)}
                    className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1"
                    title="View Event Details"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">View</span>
                  </button>

                  <button
                    onClick={() => onEditEvent(event)}
                    className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1"
                    title="Edit Event"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(event.id)}
                    disabled={deletingId === event.id}
                    className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1"
                    title="Delete Event"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 text-xs">
            No events match the selected status filter.
          </div>
        )}
      </div>
    </div>
  );
};
