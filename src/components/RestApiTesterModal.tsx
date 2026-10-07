import React, { useState } from 'react';
import { X, Play, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { ApiService } from '../services/apiService';

interface RestApiTesterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EndpointPreset {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  defaultPayload?: string;
}

const ENDPOINTS: EndpointPreset[] = [
  {
    name: 'Get All Approved Events',
    method: 'GET',
    path: '/api/events',
    description: 'Retrieves all verified upcoming events across Tamil Nadu colleges.',
  },
  {
    name: 'Search Events (Query)',
    method: 'GET',
    path: '/api/events/search?q=Hackathon+Chennai',
    description: 'Searches events matching keyword "Hackathon Chennai" in event title, college, district.',
  },
  {
    name: 'Filter Events (District & Category)',
    method: 'GET',
    path: '/api/events/filter?district=Coimbatore&category=AI/ML+Events',
    description: 'Filters events in Coimbatore for AI/ML Events.',
  },
  {
    name: 'Get Single Event by ID',
    method: 'GET',
    path: '/api/events/101',
    description: 'Fetches full event payload for AI Hackathon 2026 (PSG College of Tech).',
  },
  {
    name: 'Get All Tamil Nadu Colleges',
    method: 'GET',
    path: '/api/colleges',
    description: 'Lists all registered and accredited institutions in Tamil Nadu.',
  },
  {
    name: 'Create Event (College Submission)',
    method: 'POST',
    path: '/api/events',
    description: 'College Admin submits new event payload (Status initialized to PENDING).',
    defaultPayload: JSON.stringify(
      {
        name: 'Tamil Nadu Web3 & Smart Contracts Summit 2026',
        category: 'Technical Fest',
        collegeId: 1,
        collegeName: 'College of Engineering, Guindy (Anna University)',
        collegeLocation: 'Guindy, Chennai',
        district: 'Chennai',
        eventDate: '2026-11-28',
        startTime: '09:00 AM',
        endTime: '05:00 PM',
        venue: 'Ada Lovelace Auditorium, Department of IST',
        description: 'Explore Ethereum, Solana, and zero knowledge rollups with hands-on labs.',
        eligibility: 'All Engineering & Technology Students',
        registrationFee: '₹150',
        registrationDeadline: '2026-11-25',
        registrationLink: 'https://ceg.annauniv.edu/web3',
        contactName: 'Prof. Anitha Selvan',
        contactNumber: '+91 94441 22334',
        contactEmail: 'web3@annauniv.edu',
        poster: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200',
        prizes: '₹50,000 in Grants + Developer Goodies',
      },
      null,
      2
    ),
  },
  {
    name: 'Super Admin Event Approval',
    method: 'PUT',
    path: '/api/admin/events/113/approve',
    description: 'Super Admin updates event status from PENDING to APPROVED.',
  },
];

export const RestApiTesterModal: React.FC<RestApiTesterModalProps> = ({ isOpen, onClose }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointPreset>(ENDPOINTS[0]);
  const [requestPath, setRequestPath] = useState(ENDPOINTS[0].path);
  const [requestBody, setRequestBody] = useState(ENDPOINTS[0].defaultPayload || '');
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
  const [responseData, setResponseData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSelectPreset = (ep: EndpointPreset) => {
    setSelectedEndpoint(ep);
    setRequestPath(ep.path);
    setRequestBody(ep.defaultPayload || '');
    setResponseStatus(null);
    setResponseData(null);
  };

  const handleExecute = async () => {
    setLoading(true);
    const start = performance.now();
    try {
      let resultData: any = null;
      let status = 200;

      if (requestPath.startsWith('/api/events/search')) {
        const url = new URL(`http://localhost${requestPath}`);
        const q = url.searchParams.get('q') || '';
        resultData = await ApiService.getEvents({ query: q });
      } else if (requestPath.startsWith('/api/events/filter')) {
        const url = new URL(`http://localhost${requestPath}`);
        const district = url.searchParams.get('district') || undefined;
        const category = url.searchParams.get('category') || undefined;
        resultData = await ApiService.getEvents({ district, category });
      } else if (requestPath === '/api/events' && selectedEndpoint.method === 'GET') {
        resultData = await ApiService.getEvents();
      } else if (requestPath.match(/^\/api\/events\/\d+$/) && selectedEndpoint.method === 'GET') {
        const id = parseInt(requestPath.split('/').pop() || '101', 10);
        resultData = await ApiService.getEventById(id);
        if (!resultData) status = 404;
      } else if (requestPath === '/api/colleges') {
        resultData = await ApiService.getColleges();
      } else if (requestPath === '/api/events' && selectedEndpoint.method === 'POST') {
        const parsed = JSON.parse(requestBody);
        resultData = await ApiService.createEvent(parsed);
        status = 201;
      } else if (requestPath.includes('/approve') && selectedEndpoint.method === 'PUT') {
        const id = parseInt(requestPath.split('/')[4] || '113', 10);
        resultData = await ApiService.approveEvent(id);
      } else {
        resultData = await ApiService.getEvents();
      }

      const elapsed = Math.round(performance.now() - start);
      setResponseStatus(status);
      setResponseHeaders({
        'content-type': 'application/json;charset=UTF-8',
        'x-powered-by': 'Spring Boot 3.3.4 (Tomcat/10.1)',
        'x-response-time-ms': `${elapsed}ms`,
        'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
      });
      setResponseData(resultData);
    } catch (err: any) {
      setResponseStatus(500);
      setResponseData({ error: 'Internal Server Error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Play className="w-4 h-4 fill-indigo-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Spring Boot REST API Live Console</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                  Swagger / Postman Spec
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Execute live requests against Spring Boot REST Controller endpoints
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Endpoint list + Request/Response view */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0">
          {/* Presets List */}
          <div className="w-full md:w-80 bg-slate-950/60 border-r border-slate-800 flex flex-col overflow-y-auto p-2 space-y-1.5">
            <div className="p-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Available REST Endpoints
            </div>
            {ENDPOINTS.map((ep, idx) => {
              const isSelected = selectedEndpoint.name === ep.name;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(ep)}
                  className={`w-full text-left p-2.5 rounded-lg transition-all border ${
                    isSelected
                      ? 'bg-slate-800 border-indigo-500 text-white'
                      : 'border-transparent text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                        ep.method === 'GET'
                          ? 'bg-sky-500/20 text-sky-400'
                          : ep.method === 'POST'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="text-xs font-semibold truncate">{ep.name}</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 truncate">{ep.path}</div>
                </button>
              );
            })}
          </div>

          {/* Execution Panel */}
          <div className="flex-1 flex flex-col min-h-0 p-4 space-y-4 overflow-y-auto">
            {/* Request Bar */}
            <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
              <span
                className={`text-xs font-bold font-mono px-2.5 py-1 rounded ${
                  selectedEndpoint.method === 'GET'
                    ? 'bg-sky-500/20 text-sky-400'
                    : selectedEndpoint.method === 'POST'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-amber-500/20 text-amber-400'
                }`}
              >
                {selectedEndpoint.method}
              </span>
              <input
                type="text"
                value={requestPath}
                onChange={(e) => setRequestPath(e.target.value)}
                className="flex-1 bg-transparent text-xs sm:text-sm font-mono text-slate-200 outline-none px-2"
              />
              <button
                onClick={handleExecute}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Send Request</span>
              </button>
            </div>

            {/* Description */}
            <div className="text-xs text-slate-400 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
              {selectedEndpoint.description}
            </div>

            {/* Request Payload (if POST / PUT) */}
            {selectedEndpoint.defaultPayload && (
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Request Body (JSON)</label>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  rows={5}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {/* Response Section */}
            <div className="flex-1 flex flex-col min-h-[220px] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Spring Boot Response</span>
                {responseStatus && (
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                        responseStatus >= 200 && responseStatus < 300
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                          : 'bg-rose-950 text-rose-400 border border-rose-800/40'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{responseStatus} OK</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {responseHeaders['x-response-time-ms']}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1 p-3 overflow-auto font-mono text-xs text-slate-200">
                {responseData ? (
                  <pre className="whitespace-pre">{JSON.stringify(responseData, null, 2)}</pre>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                    Click "Send Request" to test this Spring Boot REST endpoint.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
