import React, { useState, useMemo } from 'react';
import { Search, MapPin, Building2, Globe, Phone, Mail, Award, ArrowRight, ExternalLink } from 'lucide-react';
import { College, CollegeEvent, PageRoute } from '../types';
import { TN_DISTRICTS } from '../data/initialData';

interface CollegesPageProps {
  colleges: College[];
  events: CollegeEvent[];
  onViewCollege: (college: College) => void;
  onNavigate: (page: PageRoute, data?: any) => void;
}

export const CollegesPage: React.FC<CollegesPageProps> = ({
  colleges,
  events,
  onViewCollege,
  onNavigate,
}) => {
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');

  const filteredColleges = useMemo(() => {
    return colleges.filter((c) => {
      if (selectedDistrict !== 'All Districts' && c.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.district.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [colleges, selectedDistrict, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title & Register Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Colleges &amp; Universities in Tamil Nadu
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Discover premier engineering, technology, and science institutions organizing technical and cultural fests
          </p>
        </div>
        <button
          onClick={() => onNavigate('college-register')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-colors shrink-0"
        >
          + Register Your College
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search colleges by name, code (e.g. CEG-3101), or location..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 focus:bg-white transition-all"
          />
        </div>

        <div className="w-full sm:w-64 flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full bg-transparent text-slate-800 font-medium outline-none cursor-pointer"
          >
            {TN_DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Colleges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((college) => {
          const collegeEvents = events.filter((e) => e.collegeId === college.id && e.status === 'APPROVED');
          return (
            <div
              key={college.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* College Card Top */}
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={college.logo}
                    alt={college.name}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-100 shadow-sm shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {college.code}
                      </span>
                      {college.establishedYear && (
                        <span className="text-[10px] text-slate-400">Estd. {college.establishedYear}</span>
                      )}
                    </div>
                    <h3
                      onClick={() => onViewCollege(college)}
                      className="font-bold text-sm text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2 cursor-pointer"
                    >
                      {college.name}
                    </h3>
                  </div>
                </div>

                {/* Badges / Accreditation */}
                {college.accreditation && (
                  <div className="mb-3 flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60 font-medium">
                    <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{college.accreditation}</span>
                  </div>
                )}

                {/* Location & Contact Info */}
                <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{college.location}, {college.district}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{college.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{college.phone}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {college.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {collegeEvents.length} Active {collegeEvents.length === 1 ? 'Event' : 'Events'}
                </span>

                <button
                  onClick={() => onViewCollege(college)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
