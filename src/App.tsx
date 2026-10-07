/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageRoute, CollegeEvent, College, EventCategory, User, UserRole } from './types';
import { ApiService } from './services/apiService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { JavaProjectModal } from './components/JavaProjectModal';
import { RestApiTesterModal } from './components/RestApiTesterModal';

// Pages
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { CollegesPage } from './pages/CollegesPage';
import { CollegeDetailsPage } from './pages/CollegeDetailsPage';
import { SearchPage } from './pages/SearchPage';
import { LoginPage } from './pages/LoginPage';
import { StudentRegistrationPage } from './pages/StudentRegistrationPage';
import { CollegeRegistrationPage } from './pages/CollegeRegistrationPage';
import { CollegeDashboardPage } from './pages/CollegeDashboardPage';
import { AddEventPage } from './pages/AddEventPage';
import { EditEventPage } from './pages/EditEventPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { JavaCodePage } from './pages/JavaCodePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [events, setEvents] = useState<CollegeEvent[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Selected item contexts
  const [selectedEvent, setSelectedEvent] = useState<CollegeEvent | null>(null);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [searchParamQuery, setSearchParamQuery] = useState('');
  const [searchParamDistrict, setSearchParamDistrict] = useState('All Districts');
  const [eventsFilterCategory, setEventsFilterCategory] = useState<string | undefined>();
  const [eventsFilterDistrict, setEventsFilterDistrict] = useState<string | undefined>();

  // Modals
  const [isJavaModalOpen, setIsJavaModalOpen] = useState(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  // Load initial data
  const loadData = async () => {
    try {
      const [allEvents, allColleges, allCats] = await Promise.all([
        ApiService.getEvents({ status: 'ALL' }),
        ApiService.getColleges(),
        ApiService.getCategories(),
      ]);
      setEvents(allEvents);
      setColleges(allColleges);
      setCategories(allCats);
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  useEffect(() => {
    loadData();
    const user = ApiService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      // Default to guest / or pick student
      const initialUser = ApiService.getCurrentUser();
      setCurrentUser(initialUser);
    }
  }, []);

  const handleNavigate = (page: PageRoute, data?: any) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'search' && data) {
      if (data.query !== undefined) setSearchParamQuery(data.query);
      if (data.district !== undefined) setSearchParamDistrict(data.district);
    }

    if (page === 'events' && data) {
      if (data.category !== undefined) setEventsFilterCategory(data.category);
      if (data.district !== undefined) setEventsFilterDistrict(data.district);
    }

    if (page === 'event-details' && data?.event) {
      setSelectedEvent(data.event);
    }

    if (page === 'college-details' && data?.college) {
      setSelectedCollege(data.college);
    }
  };

  const handleViewEvent = (event: CollegeEvent) => {
    setSelectedEvent(event);
    setCurrentPage('event-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCollege = (collegeOrId: College | number) => {
    if (typeof collegeOrId === 'number') {
      const col = colleges.find((c) => c.id === collegeOrId);
      if (col) {
        setSelectedCollege(col);
        setCurrentPage('college-details');
      }
    } else {
      setSelectedCollege(collegeOrId);
      setCurrentPage('college-details');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditEvent = (event: CollegeEvent) => {
    setSelectedEvent(event);
    setCurrentPage('edit-event');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleSwitch = async (role: UserRole) => {
    try {
      const user = await ApiService.switchDemoRole(role);
      setCurrentUser(user);
      if (role === 'COLLEGE_ADMIN') {
        setCurrentPage('college-dashboard');
      } else if (role === 'SUPER_ADMIN') {
        setCurrentPage('admin-dashboard');
      } else {
        setCurrentPage('home');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    ApiService.setCurrentUser(null);
    setCurrentUser(null);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header / Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onRoleSwitch={handleRoleSwitch}
        onLogout={handleLogout}
        onOpenJavaModal={() => setIsJavaModalOpen(true)}
        onOpenApiModal={() => setIsApiModalOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            events={events}
            colleges={colleges}
            categories={categories}
            onNavigate={handleNavigate}
            onViewEvent={handleViewEvent}
            onViewCollege={handleViewCollege}
          />
        )}

        {currentPage === 'events' && (
          <EventsPage
            events={events}
            categories={categories}
            initialCategory={eventsFilterCategory}
            initialDistrict={eventsFilterDistrict}
            onViewEvent={handleViewEvent}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'event-details' && selectedEvent && (
          <EventDetailsPage
            event={selectedEvent}
            college={colleges.find((c) => c.id === selectedEvent.collegeId)}
            onBack={() => setCurrentPage('events')}
            onViewCollege={handleViewCollege}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'colleges' && (
          <CollegesPage
            colleges={colleges}
            events={events}
            onViewCollege={handleViewCollege}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'college-details' && selectedCollege && (
          <CollegeDetailsPage
            college={selectedCollege}
            events={events}
            currentUser={currentUser}
            onBack={() => setCurrentPage('colleges')}
            onViewEvent={handleViewEvent}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'search' && (
          <SearchPage
            events={events}
            categories={categories}
            initialQuery={searchParamQuery}
            initialDistrict={searchParamDistrict}
            onViewEvent={handleViewEvent}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'login' && (
          <LoginPage
            onLoginSuccess={(user) => {
              setCurrentUser(user);
              if (user.role === 'COLLEGE_ADMIN') {
                setCurrentPage('college-dashboard');
              } else if (user.role === 'SUPER_ADMIN') {
                setCurrentPage('admin-dashboard');
              } else {
                setCurrentPage('home');
              }
            }}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'student-register' && (
          <StudentRegistrationPage
            colleges={colleges}
            onRegisterSuccess={(user) => {
              setCurrentUser(user);
              setCurrentPage('home');
            }}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'college-register' && (
          <CollegeRegistrationPage
            onRegisterSuccess={(user) => {
              setCurrentUser(user);
              loadData();
              setCurrentPage('college-dashboard');
            }}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'college-dashboard' && currentUser && (
          <CollegeDashboardPage
            currentUser={currentUser}
            college={colleges.find((c) => c.id === currentUser.collegeId)}
            events={events}
            onNavigate={handleNavigate}
            onEditEvent={handleEditEvent}
            onViewEvent={handleViewEvent}
            onEventDeleted={loadData}
          />
        )}

        {currentPage === 'add-event' && (
          <AddEventPage
            currentUser={currentUser}
            colleges={colleges}
            categories={categories}
            onBack={() => setCurrentPage(currentUser?.role === 'COLLEGE_ADMIN' ? 'college-dashboard' : 'events')}
            onEventCreated={() => {
              loadData();
              setCurrentPage(currentUser?.role === 'COLLEGE_ADMIN' ? 'college-dashboard' : 'events');
            }}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'edit-event' && selectedEvent && (
          <EditEventPage
            event={selectedEvent}
            categories={categories}
            onBack={() => setCurrentPage(currentUser?.role === 'COLLEGE_ADMIN' ? 'college-dashboard' : 'events')}
            onEventUpdated={() => {
              loadData();
              setCurrentPage(currentUser?.role === 'COLLEGE_ADMIN' ? 'college-dashboard' : 'events');
            }}
          />
        )}

        {currentPage === 'admin-dashboard' && (
          <AdminDashboardPage
            events={events}
            colleges={colleges}
            categories={categories}
            onEventUpdated={loadData}
            onViewEvent={handleViewEvent}
            onEditEvent={handleEditEvent}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onOpenJavaModal={() => setIsJavaModalOpen(true)}
            onOpenApiModal={() => setIsApiModalOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'java-code' && <JavaCodePage />}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenJavaModal={() => setIsJavaModalOpen(true)}
        onOpenApiModal={() => setIsApiModalOpen(true)}
      />

      {/* Java Architecture Inspector Modal */}
      <JavaProjectModal
        isOpen={isJavaModalOpen}
        onClose={() => setIsJavaModalOpen(false)}
      />

      {/* REST API Tester Console Modal */}
      <RestApiTesterModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
      />
    </div>
  );
}
