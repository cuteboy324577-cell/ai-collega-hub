-- Seed Categories
INSERT INTO categories (category_name, icon_name, description) VALUES
('Technical Fest', 'Cpu', 'Flagship engineering and technical festivals'),
('Hackathon', 'Code', 'Software, hardware and problem-solving hackathons'),
('Calculus / Mathematics Events', 'Sigma', 'Calculus derbies, math Olympiads, integration bees'),
('Symposium', 'Layers', 'Departmental national and state level technical symposiums'),
('Coding Contest', 'Terminal', 'Competitive programming battles and algorithm challenges'),
('Paper Presentation', 'FileText', 'Research paper presentations and technical conferences'),
('Project Expo', 'FolderGit2', 'Hardware prototypes, capstone projects, innovation showcases'),
('Workshop', 'Wrench', 'Skill-building hands-on bootcamps with industry experts'),
('Seminar', 'BookOpen', 'Keynote lectures, technical webinars, panel discussions'),
('Quiz Competition', 'HelpCircle', 'Tech, general, science, and business quiz bowls'),
('Ideathon', 'Lightbulb', 'Pitching startup ideas, social innovations, venture pitches'),
('Cultural Fest', 'Music', 'Dance, music, theater, variety shows, fine arts'),
('Sports Events', 'Trophy', 'Inter-college cricket, football, basketball, athletics'),
('AI/ML Events', 'Sparkles', 'Machine learning summits, computer vision hack nights'),
('Robotics Events', 'Bot', 'RoboWars, maze solvers, drone racing, automated bots'),
('Cybersecurity Events', 'Shield', 'Capture the Flag (CTF), ethical hacking, malware analysis'),
('Other College Events', 'Calendar', 'Alumni meets, job fairs, literary events, leadership summits');

-- Seed Colleges
INSERT INTO colleges (college_name, code, location, district, website, email, phone, logo, accreditation, established_year, description) VALUES
('College of Engineering, Guindy (Anna University)', 'CEG-3101', 'Guindy, Chennai', 'Chennai', 'https://ceg.annauniv.edu', 'events@ceg.annauniv.edu', '+91 44 2235 7004', 'https://images.unsplash.com/photo-1562774053-701939374585?w=160', 'NAAC A++, NIRF #12 Engineering', 1794, 'CEG is one of India oldest and premier engineering institutions offering world-class engineering.'),
('PSG College of Technology', 'PSG-7105', 'Peelamedu, Coimbatore', 'Coimbatore', 'https://www.psgtech.edu', 'kriya@psgtech.ac.in', '+91 422 257 2177', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=160', 'Autonomous, NAAC A+, NIRF #63', 1951, 'Premier autonomous engineering institution renowned for industry collaboration.'),
('SSN College of Engineering', 'SSN-1315', 'OMR, Kalavakkam', 'Chengalpattu', 'https://www.ssn.edu.in', 'invente@ssn.edu.in', '+91 44 2746 9700', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=160', 'Autonomous, NAAC A++, NIRF #45', 1996, 'Autonomous institution known for excellence in academic research and symposiums.'),
('Thiagarajar College of Engineering', 'TCE-5008', 'Thiruparankundram', 'Madurai', 'https://www.tce.edu', 'events@tce.edu', '+91 452 248 2240', 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=160', 'Autonomous, NAAC A+', 1957, 'Legacy government-aided autonomous institution in Madurai.');

-- Seed Events
INSERT INTO events (event_name, category, college_id, college_name, college_location, district, description, event_date, start_time, end_time, venue, eligibility, registration_fee, registration_deadline, registration_link, contact_name, contact_number, contact_email, poster, prizes, status) VALUES
('AI Hackathon 2026', 'Hackathon', 2, 'PSG College of Technology', 'Peelamedu, Coimbatore', 'Coimbatore', 'A 24-hour intense AI Hackathon focusing on real-world problems in Healthcare and Smart Cities.', '2026-10-15', '09:00 AM', '04:00 PM', 'K-Block Computing Labs & Convention Center', 'All Engineering and MCA students', 'Free', '2026-10-12', 'https://unstop.com/hackathons/psg-ai-hackathon-2026', 'Dr. R. Karthikeyan', '+91 98421 55670', 'aihackathon@psgtech.ac.in', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200', '1st: ₹75,000 | 2nd: ₹40,000', 'APPROVED'),
('Kurukshetra 2026 – Battle of Brains', 'Technical Fest', 1, 'College of Engineering, Guindy (Anna University)', 'Guindy, Chennai', 'Chennai', 'Under the patronage of UNESCO, Kurukshetra is the premier international techno-management fest.', '2026-10-22', '08:30 AM', '06:00 PM', 'Vivekananda Auditorium & Department of CSE', 'All UG/PG students', '₹200 per participant', '2026-10-20', 'https://kurukshetra.org.in/register', 'Prof. M. Senthil Kumar', '+91 94440 12398', 'contact@kurukshetra.org.in', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200', 'Total prize pool exceeding ₹5,00,000', 'APPROVED'),
('State Level Calculus Derby & Math Olympiad', 'Calculus / Mathematics Events', 4, 'Thiagarajar College of Engineering', 'Madurai', 'Madurai', 'Annual Tamil Nadu Inter-College Calculus Derby, Integration Bee, and Applied Math Sprint.', '2026-10-18', '09:30 AM', '03:30 PM', 'Auditorium Hall 2', 'B.Sc Math, B.E / B.Tech (All years)', '₹100 per student', '2026-10-16', 'https://tce.edu/math-derby', 'Dr. G. Swaminathan', '+91 98430 77123', 'math@tce.edu', 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200', 'Ramanujan Trophy + ₹30,000', 'APPROVED');