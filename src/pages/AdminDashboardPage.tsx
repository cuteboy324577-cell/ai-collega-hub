import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  X,
  Building,
  Calendar,
  Layers,
  Trash2,
  Edit,
  Eye,
  Clock,
  AlertTriangle,
  RefreshCw,
  Search,
  ExternalLink
} from 'lucide-react';
import { College, CollegeEvent, EventCategory, PageRoute } from '../types';
import { ApiService } from '../services/apiService';

interface AdminDashboardPageProps {
  events: CollegeEvent[];
  colleges: College[];
  categories: EventCategory[];
  onEventUpdated: () => void;
  onViewEvent: (event: CollegeEvent) => void;
  onEditEvent: (event: CollegeEvent) => void;
  onNavigate: (page: PageRoute) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  events,
  colleges,
  categories,
  onEventUpdated,
  onViewEvent,
  onEditEvent,
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'all-events' | 'colleges' | 'categories'>('pending');
  const [rejectingEventId, setRejectingEventId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [eventSearch, setEventSearch] = useState('');

  const pendingEvents = events.filter((e) => e.status === 'PENDING');
  const approvedEvents = events.filter((e) => e.status === 'APPROVED');

  const handleApprove = async (id: number) => {
    setProcessingId(id);
    try {
      await ApiService.approveEvent(id);
      onEventUpdated();
    } catch (err) {
      alert('Failed to approve event');
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingEventId) return;
    setProcessingId(rejectingEventId);
    try {
      await ApiService.rejectEvent(rejectingEventId, rejectReason || 'Does not comply with state college guidelines');
      setRejectingEventId(null);
      setRejectReason('');
      onEventUpdated();
    } catch (err) {
      alert('Failed to reject event');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (window.confirm('Super Admin: Delete this event permanently?')) {
      try {
        await ApiService.deleteEvent(id);
        onEventUpdated();
      } catch (err) {
        alert('Failed to delete event');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30">
            <ShieldCheck className="w-4 h-4" />
            <span>State Super Admin Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Directorate of Technical Education (DOTE) Event Moderation
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Audit college submissions, verify institutional credentials, and manage Tamil Nadu technical fests
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Pending Submissions:</span>
            <span className="text-2xl font-extrabold text-amber-400">{pendingEvents.length}</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Pending Approvals</span>
          <div className="text-2xl font-extrabold text-amber-500 mt-1">{pendingEvents.length}</div>
          <span className="text-[11px] text-slate-400">Needs review</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Approved Events</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{approvedEvents.length}</div>
          <span className="text-[11px] text-slate-400">Live on website</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Registered Colleges</span>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1">{colleges.length}</div>
          <span className="text-[11px] text-slate-400">Across 38 districts</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Event Categories</span>
          <div className="text-2xl font-extrabold text-slate-800 mt-1">{categories.length}</div>
          <span className="text-[11px] text-slate-400">Standardized tracks</span>
        </div>
      </div>

      {/* Main Admin Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-3 border-b border-slate-200 flex flex-wrap items-center gap-2 bg-slate-50">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'pending'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Submissions ({pendingEvents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('all-events')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'all-events'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>All Published Events ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('colleges')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'colleges'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Manage Colleges ({colleges.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'categories'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Event Categories ({categories.length})</span>
          </button>
        </div>

        {/* Tab 1: Pending Events Approval Queue */}
        {activeTab === 'pending' && (
          <div className="p-6">
            {pendingEvents.length > 0 ? (
              <div className="space-y-4">
                <div className="text-xs text-slate-500 mb-2">
                  Review new event proposals submitted by colleges before publishing to students.
                </div>
                {pendingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-5 border border-amber-200 bg-amber-50/30 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={event.poster || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=160'}
                        alt={event.name}
                        className="w-24 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                            {event.category}
                          </span>
                          <span className="text-[10px] font-bold font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                            PENDING APPROVAL
                          </span>
                          <span className="text-xs text-slate-400 font-mono">ID: #{event.id}</span>
                        </div>

                        <h3 className="font-bold text-sm text-slate-900">{event.name}</h3>

                        <div className="text-xs text-slate-600 font-medium">
                          {event.collegeName} • {event.district} District
                        </div>

                        <div className="text-xs text-slate-500">
                          Date: {event.eventDate} ({event.startTime} - {event.endTime}) | Fee: {event.registrationFee}
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* Approval / Reject CTAs */}
                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      <button
                        onClick={() => onViewEvent(event)}
                        className="p-2 text-slate-600 hover:text-indigo-600 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleApprove(event.id)}
                        disabled={processingId === event.id}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve Event</span>
                      </button>

                      <button
                        onClick={() => setRejectingEventId(event.id)}
                        disabled={processingId === event.id}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold rounded-xl transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500 text-xs space-y-2">
                <Check className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className="font-bold text-slate-700">All submissions are up to date!</p>
                <p>No college events waiting in the moderation queue.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: All Events Database */}
        {activeTab === 'all-events' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={eventSearch}
                  onChange={(e) => setEventSearch(e.target.value)}
                  placeholder="Filter events..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {events
                .filter((e) => !eventSearch || e.name.toLowerCase().includes(eventSearch.toLowerCase()))
                .map((e) => (
                  <div key={e.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{e.name}</span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                            e.status === 'APPROVED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : e.status === 'PENDING'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {e.status}
                        </span>
                      </div>
                      <div className="text-slate-500">
                        {e.collegeName} • {e.category} • {e.eventDate}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onViewEvent(e)}
                        className="p-1.5 text-slate-500 hover:text-indigo-600"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEditEvent(e)}
                        className="p-1.5 text-slate-500 hover:text-amber-600"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(e.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-600"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Tab 3: Registered Colleges */}
        {activeTab === 'colleges' && (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colleges.map((c) => (
              <div key={c.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-2 text-xs">
                <div className="flex items-center gap-3">
                  <img src={c.logo} alt={c.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 line-clamp-1">{c.name}</h4>
                    <span className="text-[11px] font-mono text-indigo-600">{c.code} • {c.district}</span>
                  </div>
                </div>
                <div className="text-slate-500 truncate">{c.email}</div>
                <div className="text-[11px] text-slate-400">{c.accreditation}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Event Categories */}
        {activeTab === 'categories' && (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {categories.map((cat) => (
              <div key={cat.id} className="p-3 border border-slate-200 rounded-xl bg-slate-50 text-xs">
                <strong className="block text-slate-900 font-bold mb-1">{cat.name}</strong>
                <p className="text-slate-500 text-[11px]">{cat.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {rejectingEventId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <form
            onSubmit={handleRejectSubmit}
            className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs"
          >
            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Reject Event Submission</span>
            </div>

            <p className="text-slate-600">
              Provide feedback or specify missing information for the organizing college to revise:
            </p>

            <textarea
              required
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Please provide official registration portal link and college dean contact number..."
              className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:border-rose-500"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRejectingEventId(null)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={processingId === rejectingEventId}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                Confirm Rejection
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
