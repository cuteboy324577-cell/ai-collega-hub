import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Tag, Calendar, Sparkles, Filter, X, ArrowRight } from 'lucide-react';
import { CollegeEvent, EventCategory, PageRoute } from '../types';
import { EventCard } from '../components/EventCard';
import { TN_DISTRICTS } from '../data/initialData';

interface SearchPageProps {
  events: CollegeEvent[];
  categories: EventCategory[];
  initialQuery?: string;
  initialDistrict?: string;
  onViewEvent: (event: CollegeEvent) => void;
  onNavigate: (page: PageRoute, data?: any) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  events,
  categories,
  initialQuery = '',
  initialDistrict = 'All Districts',
  onViewEvent,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [district, setDistrict] = useState(initialDistrict);
  const [category, setCategory] = useState('All Categories');
  const [feeType, setFeeType] = useState<'all' | 'free' | 'paid'>('all');

  useEffect(() => {
    if (initialQuery) setQuery(initialQuery);
    if (initialDistrict) setDistrict(initialDistrict);
  }, [initialQuery, initialDistrict]);

  // Execute multi-token search simulating MySQL FULLTEXT / LIKE query
  const searchResults = useMemo(() => {
    return events.filter((e) => {
      // Must be approved
      if (e.status !== 'APPROVED') return false;

      // District filter
      if (district !== 'All Districts' && e.district.toLowerCase() !== district.toLowerCase()) {
        return false;
      }

      // Category filter
      if (category !== 'All Categories' && e.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }

      // Fee filter
      if (feeType === 'free' && !e.registrationFee.toLowerCase().includes('free')) {
        return false;
      }
      if (feeType === 'paid' && e.registrationFee.toLowerCase().includes('free')) {
        return false;
      }

      // Query multi-token search
      if (query.trim()) {
        const tokens = query.toLowerCase().trim().split(/\s+/);
        const corpus = `${e.name} ${e.category} ${e.collegeName} ${e.district} ${e.collegeLocation} ${e.description} ${e.venue}`.toLowerCase();
        return tokens.every((t) => corpus.includes(t));
      }

      return true;
    });
  }, [events, query, district, category, feeType]);

  const presetSearches = [
    'Hackathon Chennai',
    'AI events Chennai',
    'AI Workshop',
    'Calculus Derby',
    'PSG Tech Coimbatore',
    'Robotics Vellore',
    'Cybersecurity CTF',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Tamil Nadu College Event Search Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Query events across Tamil Nadu by topic, college, and city (e.g., "Hackathon Chennai", "AI Workshop", "Calculus Derby").
        </p>
      </div>

      {/* Main Search Box with District & Category in one unified toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-indigo-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your search query (e.g. 'Hackathon Chennai', 'AI Workshop')..."
            className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm sm:text-base text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-inner"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick query buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Try searching:</span>
          {presetSearches.map((p) => (
            <button
              key={p}
              onClick={() => setQuery(p)}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Secondary filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div>
            <label className="block text-slate-600 font-medium mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span>Filter by District</span>
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 outline-none font-medium"
            >
              {TN_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-indigo-500" />
              <span>Event Category</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 outline-none font-medium"
            >
              <option value="All Categories">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Registration Pricing</label>
            <div className="flex rounded-lg border border-slate-200 overflow-hidden p-0.5 bg-slate-50">
              <button
                type="button"
                onClick={() => setFeeType('all')}
                className={`flex-1 py-1.5 rounded-md font-semibold text-center transition-colors ${
                  feeType === 'all' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFeeType('free')}
                className={`flex-1 py-1.5 rounded-md font-semibold text-center transition-colors ${
                  feeType === 'free' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
                }`}
              >
                Free
              </button>
              <button
                type="button"
                onClick={() => setFeeType('paid')}
                className={`flex-1 py-1.5 rounded-md font-semibold text-center transition-colors ${
                  feeType === 'paid' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
                }`}
              >
                Paid
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Found <strong className="text-slate-900">{searchResults.length}</strong> matching college events
          {query && (
            <span>
              {' '}for <span className="text-indigo-600 font-bold">"{query}"</span>
            </span>
          )}
        </div>

        {(query || district !== 'All Districts' || category !== 'All Categories' || feeType !== 'all') && (
          <button
            onClick={() => {
              setQuery('');
              setDistrict('All Districts');
              setCategory('All Categories');
              setFeeType('all');
            }}
            className="text-xs text-rose-600 hover:underline font-semibold"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Results Grid */}
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={onViewEvent}
              onRegister={() => window.open(event.registrationLink, '_blank')}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-3">
          <Search className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No events matched your search</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try searching for broader keywords like "Hackathon", "AI", "Workshop", or remove district filters.
          </p>
        </div>
      )}
    </div>
  );
};
