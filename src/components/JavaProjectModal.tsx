import React, { useState } from 'react';
import { X, Download, FileCode, Check, Copy, FolderTree, Database, Terminal, Layers } from 'lucide-react';
import { JAVA_PROJECT_FILES, JavaFileItem } from '../data/javaSourceCode';
import { generateJavaSpringBootZip, downloadBlob } from '../utils/zipGenerator';

interface JavaProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JavaProjectModal: React.FC<JavaProjectModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<JavaFileItem>(JAVA_PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Java Spring Boot + MySQL Architecture</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                  Ready for IntelliJ & Eclipse
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Full-stack production architecture with JPA Repositories, REST Controllers, MySQL Schema &amp; JWT Config
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadZip}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? 'Zipping...' : 'Download Maven Project (.zip)'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Area: Sidebar + Code Editor View */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0">
          {/* File Explorer Sidebar */}
          <div className="w-full md:w-72 bg-slate-950/60 border-r border-slate-800 flex flex-col overflow-y-auto">
            <div className="p-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800/60">
              <FolderTree className="w-3.5 h-3.5 text-indigo-400" />
              <span>Project Structure</span>
            </div>
            <div className="p-2 space-y-1">
              {JAVA_PROJECT_FILES.map((file) => {
                const isSelected = selectedFile.path === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-mono flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 font-semibold'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {file.language === 'sql' ? (
                      <Database className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    ) : file.language === 'xml' || file.language === 'properties' ? (
                      <Terminal className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    ) : (
                      <FileCode className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    )}
                    <span className="truncate">{file.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-auto p-3 m-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              <p className="font-semibold text-slate-300 mb-1">To run locally:</p>
              <code className="text-indigo-400 block font-mono">1. mysql -u root -p &lt; schema.sql</code>
              <code className="text-emerald-400 block font-mono mt-1">2. mvn spring-boot:run</code>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="flex-1 flex flex-col min-h-0 bg-slate-900">
            {/* Top Bar for Code */}
            <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-indigo-400">{selectedFile.path}</span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">({selectedFile.description})</span>
              </div>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200 select-text">
              <pre className="whitespace-pre">{selectedFile.content}</pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Built with Spring Boot 3.3.4, Spring Data JPA, Spring Security, Hibernate &amp; MySQL 8
          </div>
          <div className="flex items-center gap-3">
            <span>Package: <code className="text-slate-300">com.collegeevents</code></span>
          </div>
        </div>
      </div>
    </div>
  );
};
