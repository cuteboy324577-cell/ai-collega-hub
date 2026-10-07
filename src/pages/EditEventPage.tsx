import React, { useState } from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { CollegeEvent, EventCategory, EventCategoryName, PageRoute } from '../types';
import { ApiService } from '../services/apiService';

interface EditEventPageProps {
  event: CollegeEvent;
  categories: EventCategory[];
  onBack: () => void;
  onEventUpdated: () => void;
}

export const EditEventPage: React.FC<EditEventPageProps> = ({
  event,
  categories,
  onBack,
  onEventUpdated,
}) => {
  const [name, setName] = useState(event.name);
  const [category, setCategory] = useState<EventCategoryName>(event.category);
  const [venue, setVenue] = useState(event.venue);
  const [eventDate, setEventDate] = useState(event.eventDate);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);
  const [description, setDescription] = useState(event.description);
  const [eligibility, setEligibility] = useState(event.eligibility);
  const [registrationFee, setRegistrationFee] = useState(event.registrationFee);
  const [registrationDeadline, setRegistrationDeadline] = useState(event.registrationDeadline);
  const [registrationLink, setRegistrationLink] = useState(event.registrationLink);
  const [contactName, setContactName] = useState(event.contactName);
  const [contactNumber, setContactNumber] = useState(event.contactNumber);
  const [contactEmail, setContactEmail] = useState(event.contactEmail);
  const [poster, setPoster] = useState(event.poster);
  const [prizes, setPrizes] = useState(event.prizes || '');
  const [rulesText, setRulesText] = useState((event.rules || []).join('\n'));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const rules = rulesText
        .split('\n')
        .map((r) => r.trim())
        .filter((r) => r.length > 0);

      await ApiService.updateEvent(event.id, {
        name,
        category,
        venue,
        eventDate,
        startTime,
        endTime,
        description,
        eligibility,
        registrationFee,
        registrationDeadline,
        registrationLink,
        contactName,
        contactNumber,
        contactEmail,
        poster,
        prizes,
        rules,
      });

      onEventUpdated();
    } catch (err: any) {
      setError(err.message || 'Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>

      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Edit Event Details (ID #{event.id})
        </h1>
        <p className="text-xs text-slate-500">
          Update timings, venue, registration URL, or poster information for {event.name}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5 text-xs">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className="block font-bold text-slate-700 mb-1">Event Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-indigo-500 focus:bg-white text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as EventCategoryName)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Campus Venue</label>
            <input
              type="text"
              required
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Event Date</label>
            <input
              type="date"
              required
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Start Time</label>
            <input
              type="text"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">End Time</label>
            <input
              type="text"
              required
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Registration Fee</label>
            <input
              type="text"
              required
              value={registrationFee}
              onChange={(e) => setRegistrationFee(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold text-emerald-700"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Registration Deadline</label>
            <input
              type="date"
              required
              value={registrationDeadline}
              onChange={(e) => setRegistrationDeadline(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Prizes</label>
            <input
              type="text"
              value={prizes}
              onChange={(e) => setPrizes(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Registration URL</label>
          <input
            type="url"
            required
            value={registrationLink}
            onChange={(e) => setRegistrationLink(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono text-indigo-700"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Description</label>
          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Poster URL</label>
          <input
            type="url"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving Changes...' : 'Save Updated Event'}
        </button>
      </form>
    </div>
  );
};
