import { College, CollegeEvent, EventCategory, User, EventStatus, UserRole } from '../types';
import { INITIAL_COLLEGES, INITIAL_EVENTS, INITIAL_USERS, INITIAL_CATEGORIES } from '../data/initialData';

const STORAGE_KEYS = {
  EVENTS: 'tn_events_db_events',
  COLLEGES: 'tn_events_db_colleges',
  USERS: 'tn_events_db_users',
  CATEGORIES: 'tn_events_db_categories',
  CURRENT_USER: 'tn_events_db_current_user',
};

// Initialize localStorage if empty
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.COLLEGES)) {
    localStorage.setItem(STORAGE_KEYS.COLLEGES, JSON.stringify(INITIAL_COLLEGES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  }
}

initializeStorage();

export class ApiService {
  // Helper getters
  private static getStored<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private static setStored<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // --- EVENTS ---
  static async getEvents(params?: {
    district?: string;
    category?: string;
    date?: string;
    query?: string;
    status?: EventStatus | 'ALL';
    collegeId?: number;
  }): Promise<CollegeEvent[]> {
    // Simulated Spring Boot network latency
    await new Promise((res) => setTimeout(res, 60));
    let events = this.getStored<CollegeEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);

    // Filter by status (Default to APPROVED for public view, unless ALL or specified)
    if (params?.status && params.status !== 'ALL') {
      events = events.filter((e) => e.status === params.status);
    } else if (!params?.status) {
      events = events.filter((e) => e.status === 'APPROVED');
    }

    if (params?.collegeId) {
      events = events.filter((e) => e.collegeId === params.collegeId);
    }

    if (params?.district && params.district !== 'All Districts') {
      const distLower = params.district.toLowerCase();
      events = events.filter((e) => e.district.toLowerCase() === distLower);
    }

    if (params?.category && params.category !== 'All Categories') {
      const catLower = params.category.toLowerCase();
      events = events.filter((e) => e.category.toLowerCase() === catLower);
    }

    if (params?.date) {
      events = events.filter((e) => e.eventDate >= params.date!);
    }

    if (params?.query && params.query.trim().length > 0) {
      const q = params.query.toLowerCase().trim();
      const tokens = q.split(/\s+/);
      events = events.filter((e) => {
        const fullString = `${e.name} ${e.category} ${e.collegeName} ${e.district} ${e.collegeLocation} ${e.description} ${e.venue}`.toLowerCase();
        return tokens.every((token) => fullString.includes(token));
      });
    }

    // Sort by event date ascending
    return events.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
  }

  static async getEventById(id: number): Promise<CollegeEvent | null> {
    const events = this.getStored<CollegeEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    const event = events.find((e) => e.id === id);
    if (event) {
      // Increment views count
      event.viewsCount = (event.viewsCount || 0) + 1;
      this.setStored(STORAGE_KEYS.EVENTS, events);
      return event;
    }
    return null;
  }

  static async createEvent(data: Omit<CollegeEvent, 'id' | 'createdAt' | 'status' | 'viewsCount'>, autoApprove = false): Promise<CollegeEvent> {
    const events = this.getStored<CollegeEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    const newId = Math.max(...events.map((e) => e.id), 100) + 1;
    const newEvent: CollegeEvent = {
      ...data,
      id: newId,
      status: autoApprove ? 'APPROVED' : 'PENDING',
      viewsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    events.unshift(newEvent);
    this.setStored(STORAGE_KEYS.EVENTS, events);
    return newEvent;
  }

  static async updateEvent(id: number, data: Partial<CollegeEvent>): Promise<CollegeEvent> {
    const events = this.getStored<CollegeEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    const index = events.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Event not found with ID: ' + id);

    events[index] = {
      ...events[index],
      ...data,
    };
    this.setStored(STORAGE_KEYS.EVENTS, events);
    return events[index];
  }

  static async deleteEvent(id: number): Promise<void> {
    const events = this.getStored<CollegeEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    const filtered = events.filter((e) => e.id !== id);
    this.setStored(STORAGE_KEYS.EVENTS, filtered);
  }

  static async approveEvent(id: number): Promise<CollegeEvent> {
    return this.updateEvent(id, { status: 'APPROVED', rejectionReason: undefined });
  }

  static async rejectEvent(id: number, reason: string): Promise<CollegeEvent> {
    return this.updateEvent(id, { status: 'REJECTED', rejectionReason: reason });
  }

  // --- COLLEGES ---
  static async getColleges(params?: { district?: string; query?: string }): Promise<College[]> {
    let colleges = this.getStored<College[]>(STORAGE_KEYS.COLLEGES, INITIAL_COLLEGES);

    if (params?.district && params.district !== 'All Districts') {
      colleges = colleges.filter((c) => c.district.toLowerCase() === params.district!.toLowerCase());
    }

    if (params?.query && params.query.trim().length > 0) {
      const q = params.query.toLowerCase().trim();
      colleges = colleges.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.district.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q)
      );
    }

    return colleges;
  }

  static async getCollegeById(id: number): Promise<College | null> {
    const colleges = this.getStored<College[]>(STORAGE_KEYS.COLLEGES, INITIAL_COLLEGES);
    return colleges.find((c) => c.id === id) || null;
  }

  static async createCollege(data: Omit<College, 'id'>): Promise<College> {
    const colleges = this.getStored<College[]>(STORAGE_KEYS.COLLEGES, INITIAL_COLLEGES);
    const newId = Math.max(...colleges.map((c) => c.id), 0) + 1;
    const newCollege: College = {
      ...data,
      id: newId,
      isVerified: true,
    };
    colleges.push(newCollege);
    this.setStored(STORAGE_KEYS.COLLEGES, colleges);
    return newCollege;
  }

  static async updateCollege(id: number, data: Partial<College>): Promise<College> {
    const colleges = this.getStored<College[]>(STORAGE_KEYS.COLLEGES, INITIAL_COLLEGES);
    const idx = colleges.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error('College not found');
    colleges[idx] = { ...colleges[idx], ...data };
    this.setStored(STORAGE_KEYS.COLLEGES, colleges);
    return colleges[idx];
  }

  // --- CATEGORIES ---
  static async getCategories(): Promise<EventCategory[]> {
    const categories = this.getStored<EventCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    const events = this.getStored<CollegeEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);

    // Add live event counts
    return categories.map((cat) => ({
      ...cat,
      eventCount: events.filter((e) => e.category === cat.name && e.status === 'APPROVED').length,
    }));
  }

  // --- AUTH & USERS ---
  static getCurrentUser(): User | null {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return raw ? JSON.parse(raw) : null;
  }

  static setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }

  static async login(email: string, password?: string): Promise<User> {
    const users = this.getStored<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error('No user found with email: ' + email);
    }
    // In our prototype, password check or demo direct login
    if (password && user.password && user.password !== password) {
      throw new Error('Invalid credentials. Please verify your password.');
    }
    this.setCurrentUser(user);
    return user;
  }

  static async registerUser(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const users = this.getStored<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }
    const newId = Math.max(...users.map((u) => u.id), 0) + 1;
    const newUser: User = {
      ...data,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
    };
    users.push(newUser);
    this.setStored(STORAGE_KEYS.USERS, users);
    this.setCurrentUser(newUser);
    return newUser;
  }

  static async switchDemoRole(role: UserRole): Promise<User> {
    const users = this.getStored<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    const user = users.find((u) => u.role === role);
    if (!user) {
      throw new Error('Demo user not found for role: ' + role);
    }
    this.setCurrentUser(user);
    return user;
  }

  static resetDatabase(): void {
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.COLLEGES);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    initializeStorage();
  }
}
