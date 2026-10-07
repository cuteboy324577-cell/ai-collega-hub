import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  Building,
  DollarSign,
  User,
  Phone,
  Mail,
  Link,
  Image as ImageIcon,
  Trophy,
  AlertCircle,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { College, EventCategory, EventCategoryName, PageRoute, User as UserModel } from '../types';
import { ApiService } from '../services/apiService';
import { TN_DISTRICTS } from '../data/initialData';

interface AddEventPageProps {
  currentUser: UserModel | null;
  colleges: College[];
  categories: EventCategory[];
  onBack: () => void;
  onEventCreated: () => void;
  onNavigate: (page: PageRoute) => void;
}

export const AddEventPage: React.FC<AddEventPageProps> = ({
  currentUser,
  colleges,
  categories,
  onBack,
  onEventCreated,
  onNavigate,
}) => {
  // If user is college admin, lock to their college
  const defaultCollegeId = currentUser?.collegeId || colleges[0]?.id || 1;
  const initialCollege = colleges.find((c) => c.id === defaultCollegeId) || colleges[0];

  const [name, setName] = useState('');
  const [category, setCategory] = useState<EventCategoryName>('Technical Fest');
  const [collegeId, setCollegeId] = useState<number>(defaultCollegeId);
  const [district, setDistrict] = useState(initialCollege?.district || 'Chennai');
  const [venue, setVenue] = useState('Auditorium & Labs');
  const [eventDate, setEventDate] = useState('2026-11-15');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('04:30 PM');
  const [description, setDescription] = useState('');
  const [eligibility, setEligibility] = useState('All B.E / B.Tech / Arts & Science students');
  const [registrationFee, setRegistrationFee] = useState('Free');
  const [registrationDeadline, setRegistrationDeadline] = useState('2026-11-12');
  const [registrationLink, setRegistrationLink] = useState('https://forms.gle/tn-college-event-sample');
  const [contactName, setContactName] = useState('Student Coordinator Team');
  const [contactNumber, setContactNumber] = useState('+91 98401 23456');
  const [contactEmail, setContactEmail] = useState('events@college.edu');
  const [poster, setPoster] = useState('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200');
  const [prizes, setPrizes] = useState('Cash Prizes & Merit Certificates');
  const [rulesText, setRulesText] = useState('College ID mandatory for physical attendance.\nTeams must register in advance.\nDecisions of the jury will be final.');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCollegeChange = (id: number) => {
    setCollegeId(id);
    const col = colleges.find((c) => c.id === id);
    if (col) {
      setDistrict(col.district);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const selectedCollege = colleges.find((c) => c.id === Number(collegeId));
      if (!selectedCollege) throw new Error('Selected college not found');

      const rules = rulesText
        .split('\n')
        .map((r) => r.trim())
        .filter((r) => r.length > 0);

      const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

      await ApiService.createEvent(
        {
          name,
          category,
          collegeId: selectedCollege.id,
          collegeName: selectedCollege.name,
          collegeLocation: selectedCollege.location,
          district: selectedCollege.district,
          eventDate,
          startTime,
          endTime,
          venue,
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
        },
        isSuperAdmin // auto-approve if created directly by Super Admin
      );

      onEventCreated();
    } catch (err: any) {
      setError(err.message || 'Failed to submit event');
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
        <span>Back</span>
      </button>

      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Publish New College Event
        </h1>
        <p className="text-xs text-slate-500">
          Provide complete event information, timings, guidelines, and registration link for students across Tamil Nadu
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-xs">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Section 1: Event Identity */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            1. Event Identity &amp; Organizing College
          </h2>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Event Name / Conclave Title</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tamil Nadu State AI &amp; Robotics Hackathon 2026"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-indigo-500 focus:bg-white text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Event Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategoryName)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-medium"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Organizing College</label>
              <select
                disabled={currentUser?.role === 'COLLEGE_ADMIN'}
                value={collegeId}
                onChange={(e) => handleCollegeChange(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 disabled:opacity-75 font-medium"
              >
                {colleges.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.district})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Date, Time & Venue */}
        <div className="space-y-4 pt-2">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            2. Schedule &amp; Campus Venue
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Event Date</label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Start Time</label>
              <input
                type="text"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="09:00 AM"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">End Time</label>
              <input
                type="text"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="04:30 PM"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Campus Venue / Hall</label>
              <input
                type="text"
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Dr. APJ Abdul Kalam Auditorium, Block 3"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Tamil Nadu District</label>
              <input
                type="text"
                readOnly
                value={district}
                className="w-full p-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Registration & Eligibility */}
        <div className="space-y-4 pt-2">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            3. Registration Details &amp; Eligibility
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Registration Fee</label>
              <input
                type="text"
                required
                value={registrationFee}
                onChange={(e) => setRegistrationFee(e.target.value)}
                placeholder="Free or ₹150 / Team"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-semibold text-emerald-700"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Registration Deadline</label>
              <input
                type="date"
                required
                value={registrationDeadline}
                onChange={(e) => setRegistrationDeadline(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Prizes / Awards</label>
              <input
                type="text"
                value={prizes}
                onChange={(e) => setPrizes(e.target.value)}
                placeholder="1st: ₹50,000 | 2nd: ₹25,000"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Official Registration Link (Google Forms / Unstop / College URL)</label>
            <input
              type="url"
              required
              value={registrationLink}
              onChange={(e) => setRegistrationLink(e.target.value)}
              placeholder="https://..."
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-mono text-indigo-700"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Eligible Students / Degrees</label>
            <input
              type="text"
              required
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
              placeholder="e.g. All B.E / B.Tech / MCA / B.Sc Computer Science students"
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Section 4: Description, Poster & Rules */}
        <div className="space-y-4 pt-2">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            4. Event Description, Rules &amp; Poster
          </h2>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Comprehensive Description</label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the background, themes, workshop tracks, or hackathon problem statements..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Rules &amp; Guidelines (One per line)</label>
            <textarea
              rows={3}
              value={rulesText}
              onChange={(e) => setRulesText(e.target.value)}
              placeholder="1. Team size: 2 to 4 members&#10;2. College ID mandatory&#10;3. Working prototype demo"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Poster Image URL</label>
            <input
              type="url"
              value={poster}
              onChange={(e) => setPoster(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 font-mono text-slate-600"
            />
            {poster && (
              <div className="mt-2 h-28 w-44 rounded-lg overflow-hidden border border-slate-200">
                <img src={poster} alt="Poster Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Section 5: Coordinator Contacts */}
        <div className="space-y-4 pt-2">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            5. Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Coordinator Name</label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Dr. K. Anand"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                required
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="+91 98401 23456"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Email</label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="events@college.edu"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-colors disabled:opacity-50"
        >
          {loading ? 'Submitting to MySQL Database...' : 'Submit Event for Approval'}
        </button>
      </form>
    </div>
  );
};
