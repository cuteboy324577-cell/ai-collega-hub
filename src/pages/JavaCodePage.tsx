import React, { useState, useMemo } from 'react';
import {
  FileCode,
  Download,
  Copy,
  Check,
  FolderTree,
  Terminal,
  Database,
  Layers,
  Shield,
  Search,
  BookOpen,
  Server,
  ArrowRight,
  ExternalLink,
  Code2,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { JAVA_PROJECT_FILES, JavaFileItem } from '../data/javaSourceCode';
import { generateJavaSpringBootZip, downloadBlob } from '../utils/zipGenerator';

export const JavaCodePage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<JavaFileItem>(
    JAVA_PROJECT_FILES.find((f) => f.name === 'EventController.java') || JAVA_PROJECT_FILES[0]
  );
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'controllers' | 'models' | 'repos' | 'security' | 'sql'>('all');

  const filteredFiles = useMemo(() => {
    return JAVA_PROJECT_FILES.filter((file) => {
      const matchesSearch =
        file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeTab === 'controllers') return file.path.includes('controller');
      if (activeTab === 'models') return file.path.includes('model');
      if (activeTab === 'repos') return file.path.includes('repository') || file.path.includes('service');
      if (activeTab === 'security') return file.path.includes('security');
      if (activeTab === 'sql') return file.language === 'sql' || file.name.includes('properties');
      return true;
    });
  }, [searchQuery, activeTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      const blob = await generateJavaSpringBootZip();
      downloadBlob(blob, 'tamil-nadu-college-events-hub-springboot.zip');
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const lines = useMemo(() => selectedFile.content.split('\n'), [selectedFile]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>Full Production Java Spring Boot 3.3.4 + MySQL 8 Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Backend Java Source Code &amp; API Engine
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Complete, production-ready enterprise Java application code for the Tamil Nadu College Events Hub. Includes JPA Entities, Repositories, REST Controllers, Spring Security 6 with JWT, and MySQL relational DDL schemas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadZip}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? 'Building Zip...' : 'Download Maven Project (.zip)'}</span>
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied File!' : 'Copy Current File'}</span>
            </button>
          </div>
        </div>

        {/* Quick architecture metrics */}
        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3">
            <div className="text-slate-400">Framework</div>
            <div className="text-white font-bold text-sm mt-0.5">Spring Boot 3.3.4</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3">
            <div className="text-slate-400">Database &amp; ORM</div>
            <div className="text-white font-bold text-sm mt-0.5">MySQL 8 + Hibernate 6 JPA</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3">
            <div className="text-slate-400">Security</div>
            <div className="text-white font-bold text-sm mt-0.5">Spring Security 6 + JJWT</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3">
            <div className="text-slate-400">Java Version</div>
            <div className="text-white font-bold text-sm mt-0.5">Java 17 LTS / 21</div>
          </div>
        </div>
      </div>

      {/* Main Code Studio View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row h-[750px]">
          
          {/* File Explorer Sidebar */}
          <div className="w-full lg:w-80 bg-slate-950/80 border-r border-slate-800 flex flex-col h-full">
            {/* Search & Filter Header */}
            <div className="p-3.5 border-b border-slate-800/80 space-y-2.5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter Java files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'controllers', label: 'Controllers' },
                  { id: 'models', label: 'Entities' },
                  { id: 'repos', label: 'Repos/Services' },
                  { id: 'security', label: 'Security' },
                  { id: 'sql', label: 'SQL/Config' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* File List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-slate-800/30">
              {filteredFiles.map((file) => {
                const isSelected = selectedFile.path === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left p-2 rounded-lg text-xs font-mono flex items-start gap-2.5 transition-all ${
                      isSelected
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 font-semibold shadow-sm'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {file.language === 'sql' ? (
                        <Database className="w-4 h-4 text-sky-400" />
                      ) : file.language === 'xml' || file.language === 'properties' ? (
                        <Terminal className="w-4 h-4 text-amber-400" />
                      ) : file.path.includes('security') ? (
                        <Shield className="w-4 h-4 text-rose-400" />
                      ) : (
                        <FileCode className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                    <div className="truncate flex-1">
                      <div className="truncate text-slate-200">{file.name}</div>
                      <div className="text-[10px] text-slate-500 truncate font-sans">{file.path}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick terminal instructions */}
            <div className="p-3 bg-slate-900/90 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-semibold text-slate-300 block">Run Command in Terminal:</span>
              <code className="text-emerald-400 block font-mono bg-slate-950 p-1.5 rounded border border-slate-800 text-[10px]">
                mvn clean spring-boot:run
              </code>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col h-full bg-slate-900 min-w-0">
            {/* File Path & Action Header */}
            <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3 truncate">
                <span className="text-xs sm:text-sm font-mono font-bold text-indigo-400 truncate">
                  {selectedFile.path}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">
                  {selectedFile.language.toUpperCase()}
                </span>
                <span className="hidden md:inline text-xs text-slate-400 truncate">
                  — {selectedFile.description}
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* File Description Alert */}
            <div className="bg-indigo-950/30 border-b border-indigo-900/30 px-5 py-2 text-xs text-indigo-300 flex items-center justify-between">
              <span>{selectedFile.description}</span>
              <span className="text-slate-400 text-[11px] font-mono">{lines.length} lines</span>
            </div>

            {/* Code Body with Line Numbers */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200 select-text flex">
              {/* Line numbers column */}
              <div className="select-none pr-4 text-right text-slate-600 border-r border-slate-800/80 font-mono text-xs">
                {lines.map((_, index) => (
                  <div key={index} className="leading-relaxed">
                    {index + 1}
                  </div>
                ))}
              </div>

              {/* Code text */}
              <div className="pl-4 flex-1 overflow-x-auto whitespace-pre">
                <code>{selectedFile.content}</code>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Spring Boot 3.3 REST API Layer</span>
              </div>
              <div className="font-mono text-[11px] text-slate-400">
                Package: com.collegeevents
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Deep Dive Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Layer 1 */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">1. REST Controller Layer</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Exposes high-performance endpoints for discovering events, district-wise filtering, multi-keyword search, and college event proposal approval workflows.
          </p>
          <div className="mt-3 font-mono text-[11px] text-indigo-400 space-y-1">
            <div>• EventController.java</div>
            <div>• AdminController.java</div>
            <div>• AuthController.java</div>
          </div>
        </div>

        {/* Layer 2 */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">2. Service &amp; JPA Repository</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Encapsulates business rules for event review, view incrementing, role-based checks, and dynamic queries across 38 Tamil Nadu districts.
          </p>
          <div className="mt-3 font-mono text-[11px] text-emerald-400 space-y-1">
            <div>• EventService.java</div>
            <div>• EventRepository.java</div>
            <div>• CollegeRepository.java</div>
          </div>
        </div>

        {/* Layer 3 */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
          <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center mb-3">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">3. MySQL Schema &amp; Entities</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Relational tables with foreign key constraints, composite full-text indexes, and automatic audit timestamps for high-traffic student queries.
          </p>
          <div className="mt-3 font-mono text-[11px] text-sky-400 space-y-1">
            <div>• schema.sql &amp; data.sql</div>
            <div>• Event.java &amp; College.java</div>
            <div>• User.java &amp; Role.java</div>
          </div>
        </div>
      </div>
    </div>
  );
};
