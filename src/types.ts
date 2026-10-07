export type UserRole = 'STUDENT' | 'COLLEGE_ADMIN' | 'SUPER_ADMIN';

export type EventStatus = 'APPROVED' | 'PENDING' | 'REJECTED';

export type EventCategoryName =
  | 'Technical Fest'
  | 'Hackathon'
  | 'Calculus / Mathematics Events'
  | 'Symposium'
  | 'Coding Contest'
  | 'Paper Presentation'
  | 'Project Expo'
  | 'Workshop'
  | 'Seminar'
  | 'Quiz Competition'
  | 'Ideathon'
  | 'Cultural Fest'
  | 'Sports Events'
  | 'AI/ML Events'
  | 'Robotics Events'
  | 'Cybersecurity Events'
  | 'Other College Events';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  collegeId?: number;
  collegeName?: string;
  department?: string;
  studentId?: string;
  phone?: string;
  createdAt: string;
}

export interface College {
  id: number;
  name: string;
  code: string; // e.g. "CEG-3101"
  location: string; // e.g. "Guindy, Chennai"
  district: string; // e.g. "Chennai"
  website: string;
  email: string;
  phone: string;
  logo: string;
  bannerImage?: string;
  accreditation?: string;
  establishedYear?: number;
  description: string;
  isVerified?: boolean;
}

export interface CollegeEvent {
  id: number;
  name: string;
  category: EventCategoryName;
  collegeId: number;
  collegeName: string;
  collegeLocation: string;
  district: string;
  eventDate: string; // YYYY-MM-DD
  startTime: string; // e.g. "09:00 AM"
  endTime: string;   // e.g. "04:30 PM"
  venue: string;
  description: string;
  eligibility: string;
  registrationFee: string; // e.g. "Free" or "₹150 / Team"
  registrationDeadline: string; // YYYY-MM-DD
  registrationLink: string;
  contactName: string;
  contactNumber: string;
  contactEmail: string;
  poster: string;
  status: EventStatus;
  rejectionReason?: string;
  rules?: string[];
  rounds?: string[];
  prizes?: string;
  viewsCount?: number;
  createdAt: string;
}

export interface EventCategory {
  id: number;
  name: EventCategoryName;
  iconName: string;
  description: string;
  eventCount?: number;
}

export type PageRoute =
  | 'home'
  | 'events'
  | 'event-details'
  | 'colleges'
  | 'college-details'
  | 'search'
  | 'java-code'
  | 'login'
  | 'student-register'
  | 'college-register'
  | 'college-dashboard'
  | 'add-event'
  | 'edit-event'
  | 'admin-dashboard'
  | 'about'
  | 'contact';
