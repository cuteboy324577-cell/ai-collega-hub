import React from 'react';
import {
  GraduationCap,
  Layers,
  Database,
  Server,
  Code2,
  CheckCircle,
  FolderTree,
  Download,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import { PageRoute } from '../types';

interface AboutPageProps {
  onOpenJavaModal: () => void;
  onOpenApiModal: () => void;
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenJavaModal,
  onOpenApiModal,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
          <GraduationCap className="w-4 h-4" />
          <span>Full Stack Academic Project Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Tamil Nadu College Events Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
          Centralized discovery and management platform for collegiate symposiums, hackathons, math derbies, workshops, and project expos across Tamil Nadu.
        </p>
      </div>

      {/* Project Objective & Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Centralized Discovery</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Eliminates fragmented WhatsApp posters by creating a single state-wide portal covering 38 districts of Tamil Nadu.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Role-Based Access Control</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Three distinct user roles: Students (discovery &amp; registration), College Admins (event publishing &amp; management), and Super Admins (state moderation).
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Java Spring Boot + MySQL</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Engineered using clean MVC architecture with Spring Data JPA, Hibernate, MySQL relational database tables, and REST APIs.
          </p>
        </div>
      </div>

      {/* Spring Boot Architectural Layer Flow */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>Layered Enterprise Architecture (Spring Boot &amp; MySQL)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Data flow from client requests through Spring Boot layers to the MySQL relational database
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-mono font-bold text-[10px] text-indigo-600 uppercase">Layer 1</span>
            <h4 className="font-bold text-slate-900">Controllers</h4>
            <p className="text-slate-500 text-[11px]">
              REST API mappings: EventController, CollegeController, AdminController, AuthController
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-mono font-bold text-[10px] text-indigo-600 uppercase">Layer 2</span>
            <h4 className="font-bold text-slate-900">Service Layer</h4>
            <p className="text-slate-500 text-[11px]">
              Business logic: EventService, CollegeService, UserService, moderation workflows &amp; validation
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-mono font-bold text-[10px] text-indigo-600 uppercase">Layer 3</span>
            <h4 className="font-bold text-slate-900">JPA Repositories</h4>
            <p className="text-slate-500 text-[11px]">
              Spring Data JPA query methods: EventRepository, CollegeRepository, UserRepository
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-mono font-bold text-[10px] text-indigo-600 uppercase">Layer 4</span>
            <h4 className="font-bold text-slate-900">MySQL Database</h4>
            <p className="text-slate-500 text-[11px]">
              Tables: users, colleges, categories, events with foreign keys and FULLTEXT indices
            </p>
          </div>
        </div>

        {/* Action Buttons to View Code */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenJavaModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-sm"
          >
            <Code2 className="w-4 h-4 text-orange-400" />
            <span>Open Java Spring Boot Project &amp; POM</span>
          </button>

          <button
            onClick={onOpenApiModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-bold transition-colors border border-indigo-200"
          >
            <Terminal className="w-4 h-4 text-indigo-600" />
            <span>Test REST Endpoints in Swagger View</span>
          </button>
        </div>
      </div>

      {/* Viva / Project Presentation Quick Notes */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-amber-950 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-700" />
          <span>College Evaluation &amp; Viva Voce Checklist</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-amber-900">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>Full CRUD operations on events, colleges, and categories</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>Spring Security with JWT role-based authorization</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>Relational foreign key constraints between colleges and events</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>Multi-token search matching "Hackathon Chennai", "AI events", etc.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
