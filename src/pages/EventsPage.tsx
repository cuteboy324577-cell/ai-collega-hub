import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, MapPin, Tag, X, SlidersHorizontal, RefreshCcw } from 'lucide-react';
import { CollegeEvent, EventCategory, PageRoute } from '../types';
import { EventCard } from '../components/EventCard';
import { TN_DISTRICTS } from '../data/initialData';

interface EventsPageProps {
  events: CollegeEvent[];
  categories: EventCategory[];
  initialCategory?: string;
  initialDistrict?: string;
  onViewEvent: (event: CollegeEvent) => void;
  onNavigate: (page: PageRoute, data?: any) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({
  events,
  categories,
  initialCategory,
  initialDistrict,
  onViewEvent,
}) => {
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict || 'All Districts');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All Categories');
  const [dateFilter, setDateFilter] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'views'>('date');

  // Filtered & sorted events
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      // Must be approved for public catalog
      if (e.status !== 'APPROVED') return false;

      // District
      if (selectedDistrict !== 'All Districts' && e.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
        return false;
      }

      // Category
      if (selectedCategory !== 'All Categories' && e.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Date
      if (dateFilter && e.eventDate < dateFilter) {
        return false;
      }

      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const text = `${e.name} ${e.collegeName} ${e.category} ${e.district} ${e.description} ${e.venue}`.toLowerCase();
        return text.includes(q);
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'date') return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'views') return (b.viewsCount || 0) - (a.viewsCount || 0);
      return 0;
    });
  }, [events, selectedDistrict, selectedCategory, dateFilter, search, sortBy]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedDistrict('All Districts');
    setSelectedCategory('All Categories');
    setDateFilter('');
    setSortBy('date');
  };

  const hasActiveFilters =
    search || selectedDistrict !== 'All Districts' || selectedCategory !== 'All Categories' || dateFilter;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Title Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          College Events Directory
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore upcoming technical fests, hackathons, calculus competitions, and symposiums across Tamil Nadu
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        {/* Top Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search event by name, college, district, or keywords..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:bg-white transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* District Selector */}
          <div>
            <label className="block font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span>District / City</span>
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium outline-none focus:border-indigo-500"
            >
              {TN_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-indigo-500" />
              <span>Event Category</span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium outline-none focus:border-indigo-500"
            >
              <option value="All Categories">All Categories ({categories.length})</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name} ({cat.eventCount || 0})
                </option>
              ))}
            </select>
          </div>

          {/* From Date Filter */}
          <div>
            <label className="block font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span>Events On or After</span>
            </label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium outline-none focus:border-indigo-500"
            />
          </div>

          {/* Sort By */}
          <div>
            <label className="block font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
              <span>Sort Events By</span>
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium outline-none focus:border-indigo-500"
            >
              <option value="date">Earliest Event Date</option>
              <option value="name">Event Name (A to Z)</option>
              <option value="views">Most Popular / Viewed</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="text-slate-500">
            Showing <strong className="text-slate-900">{filteredEvents.length}</strong> verified events across Tamil Nadu
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-700 font-semibold"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Clear all filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={onViewEvent}
              onRegister={() => window.open(event.registrationLink, '_blank')}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No matching events found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search keywords, choosing "All Districts", or picking a broader category.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
