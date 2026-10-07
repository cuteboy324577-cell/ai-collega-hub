export interface JavaFileItem {
  path: string;
  name: string;
  language: 'java' | 'xml' | 'sql' | 'properties' | 'markdown';
  description: string;
  content: string;
}

export const JAVA_PROJECT_FILES: JavaFileItem[] = [
  {
    path: 'pom.xml',
    name: 'pom.xml',
    language: 'xml',
    description: 'Maven Project Object Model with Spring Boot 3.3, Spring Data JPA, MySQL Connector, and Spring Security',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.4</version>
        <relativePath/>
    </parent>
    <groupId>com.collegeevents</groupId>
    <artifactId>tamilnadu-college-events-hub</artifactId>
    <version>1.0.0</version>
    <name>tamilnadu-college-events-hub</name>
    <description>Tamil Nadu College Events Hub - Full Stack Java Spring Boot &amp; MySQL Web Application</description>

    <properties>
        <java.version>17</java.version>
        <jjwt.version>0.12.5</jjwt.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Web MVC for REST APIs -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Data JPA & Hibernate ORM -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- MySQL Database Connector -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Spring Security & JWT Token Authentication -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>\${jjwt.version}</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>\${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>\${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>

        <!-- Bean Validation -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- Lombok for Boilerplate Reduction -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Spring Boot DevTools -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <!-- Test Starter -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`
  },
  {
    path: 'src/main/resources/application.properties',
    name: 'application.properties',
    language: 'properties',
    description: 'Spring Boot configuration for MySQL Datasource, Hibernate dialect, and JWT secrets',
    content: `# Tamil Nadu College Events Hub - Application Configuration
server.port=8080
spring.application.name=tamilnadu-college-events-hub

# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/tn_college_events?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root123
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA & Hibernate Settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# CORS & Uploads
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# JWT Authentication Config
jwt.secret=9a4f2c8d3e71b56a89c4d2e1f0a3b7c89d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4
jwt.expiration=86400000`
  },
  {
    path: 'src/main/resources/schema.sql',
    name: 'schema.sql',
    language: 'sql',
    description: 'MySQL relational schema DDL for users, colleges, categories, and events',
    content: `-- =======================================================
-- Tamil Nadu College Events Hub - MySQL Database Schema
-- Database: tn_college_events
-- =======================================================

CREATE DATABASE IF NOT EXISTS tn_college_events;
USE tn_college_events;

-- Drop tables in reverse foreign key order if needed
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS colleges;
DROP TABLE IF EXISTS users;

-- 1. Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('STUDENT', 'COLLEGE_ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'STUDENT',
    college_id BIGINT NULL,
    college_name VARCHAR(255) NULL,
    department VARCHAR(100) NULL,
    student_id VARCHAR(50) NULL,
    phone VARCHAR(20) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Colleges Table
CREATE TABLE colleges (
    college_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    college_name VARCHAR(255) NOT NULL UNIQUE,
    code VARCHAR(50) NOT NULL UNIQUE,
    location VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    website VARCHAR(255) NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(30) NOT NULL,
    logo TEXT NULL,
    accreditation VARCHAR(150) NULL,
    established_year INT NULL,
    description TEXT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Categories Table
CREATE TABLE categories (
    category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    icon_name VARCHAR(50) DEFAULT 'Calendar',
    description TEXT NULL
);

-- 4. Events Table
CREATE TABLE events (
    event_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    college_id BIGINT NOT NULL,
    college_name VARCHAR(255) NOT NULL,
    college_location VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    description LONGTEXT NOT NULL,
    event_date DATE NOT NULL,
    start_time VARCHAR(20) NOT NULL,
    end_time VARCHAR(20) NOT NULL,
    venue VARCHAR(255) NOT NULL,
    eligibility VARCHAR(255) NOT NULL,
    registration_fee VARCHAR(100) NOT NULL DEFAULT 'Free',
    registration_deadline DATE NOT NULL,
    registration_link VARCHAR(500) NOT NULL,
    contact_name VARCHAR(150) NOT NULL,
    contact_number VARCHAR(30) NOT NULL,
    contact_email VARCHAR(150) NOT NULL,
    poster TEXT NULL,
    prizes VARCHAR(255) NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    rejection_reason TEXT NULL,
    views_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_event_college FOREIGN KEY (college_id) REFERENCES colleges(college_id) ON DELETE CASCADE
);

-- Indexes for lightning fast searches across Tamil Nadu districts and categories
CREATE INDEX idx_events_district ON events(district);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);
CREATE FULLTEXT INDEX idx_events_search ON events(event_name, description, college_name);`
  },
  {
    path: 'src/main/resources/data.sql',
    name: 'data.sql',
    language: 'sql',
    description: 'Initial seed data for Tamil Nadu colleges, categories, events, and sample logins',
    content: `-- Seed Categories
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
('State Level Calculus Derby & Math Olympiad', 'Calculus / Mathematics Events', 4, 'Thiagarajar College of Engineering', 'Madurai', 'Madurai', 'Annual Tamil Nadu Inter-College Calculus Derby, Integration Bee, and Applied Math Sprint.', '2026-10-18', '09:30 AM', '03:30 PM', 'Auditorium Hall 2', 'B.Sc Math, B.E / B.Tech (All years)', '₹100 per student', '2026-10-16', 'https://tce.edu/math-derby', 'Dr. G. Swaminathan', '+91 98430 77123', 'math@tce.edu', 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200', 'Ramanujan Trophy + ₹30,000', 'APPROVED');`
  },
  {
    path: 'src/main/java/com/collegeevents/CollegeEventsApplication.java',
    name: 'CollegeEventsApplication.java',
    language: 'java',
    description: 'Main Spring Boot application bootstrap class',
    content: `package com.collegeevents;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Entry Point for Tamil Nadu College Events Hub Spring Boot Application.
 */
@SpringBootApplication
public class CollegeEventsApplication {

    public static void main(String[] args) {
        SpringApplication.run(CollegeEventsApplication.class, args);
        System.out.println("==========================================================");
        System.out.println("Tamil Nadu College Events Hub Spring Boot Server Started!");
        System.out.println("API Base URL: http://localhost:8080/api");
        System.out.println("==========================================================");
    }
}`
  },
  {
    path: 'src/main/java/com/collegeevents/model/Role.java',
    name: 'Role.java',
    language: 'java',
    description: 'Java Enum defining the role hierarchy: STUDENT, COLLEGE_ADMIN, SUPER_ADMIN',
    content: `package com.collegeevents.model;

public enum Role {
    STUDENT,
    COLLEGE_ADMIN,
    SUPER_ADMIN
}`
  },
  {
    path: 'src/main/java/com/collegeevents/model/User.java',
    name: 'User.java',
    language: 'java',
    description: 'JPA Entity representing application users with role-based access',
    content: `package com.collegeevents.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(name = "college_id")
    private Long collegeId;

    @Column(name = "college_name")
    private String collegeName;

    @Column(length = 100)
    private String department;

    @Column(name = "student_id", length = 50)
    private String studentId;

    @Column(length = 20)
    private String phone;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}`
  },
  {
    path: 'src/main/java/com/collegeevents/model/College.java',
    name: 'College.java',
    language: 'java',
    description: 'JPA Entity representing registered colleges across Tamil Nadu districts',
    content: `package com.collegeevents.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "colleges")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class College {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "college_id")
    private Long collegeId;

    @Column(name = "college_name", nullable = false, unique = true)
    private String collegeName;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false, length = 100)
    private String district;

    private String website;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, length = 30)
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String logo;

    private String accreditation;

    @Column(name = "established_year")
    private Integer establishedYear;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "is_verified")
    private Boolean isVerified = true;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}`
  },
  {
    path: 'src/main/java/com/collegeevents/model/Category.java',
    name: 'Category.java',
    language: 'java',
    description: 'JPA Entity representing event categories (Hackathon, Symposium, Technical Fest, etc.)',
    content: `package com.collegeevents.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "category_name", nullable = false, unique = true, length = 100)
    private String categoryName;

    @Column(name = "icon_name", length = 50)
    private String iconName;

    @Column(columnDefinition = "TEXT")
    private String description;
}`
  },
  {
    path: 'src/main/java/com/collegeevents/model/Event.java',
    name: 'Event.java',
    language: 'java',
    description: 'JPA Entity representing college events with full schedule, registration, and status',
    content: `package com.collegeevents.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    public enum Status {
        PENDING, APPROVED, REJECTED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "event_name", nullable = false)
    private String eventName;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(name = "college_id", nullable = false)
    private Long collegeId;

    @Column(name = "college_name", nullable = false)
    private String collegeName;

    @Column(name = "college_location", nullable = false)
    private String collegeLocation;

    @Column(nullable = false, length = 100)
    private String district;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String description;

    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;

    @Column(name = "start_time", nullable = false, length = 20)
    private String startTime;

    @Column(name = "end_time", nullable = false, length = 20)
    private String endTime;

    @Column(nullable = false)
    private String venue;

    @Column(nullable = false)
    private String eligibility;

    @Column(name = "registration_fee", nullable = false, length = 100)
    private String registrationFee = "Free";

    @Column(name = "registration_deadline", nullable = false)
    private LocalDate registrationDeadline;

    @Column(name = "registration_link", nullable = false, length = 500)
    private String registrationLink;

    @Column(name = "contact_name", nullable = false, length = 150)
    private String contactName;

    @Column(name = "contact_number", nullable = false, length = 30)
    private String contactNumber;

    @Column(name = "contact_email", nullable = false, length = 150)
    private String contactEmail;

    @Column(columnDefinition = "TEXT")
    private String poster;

    private String prizes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDING;

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;

    @Column(name = "views_count")
    private Integer viewsCount = 0;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}`
  },
  {
    path: 'src/main/java/com/collegeevents/repository/EventRepository.java',
    name: 'EventRepository.java',
    language: 'java',
    description: 'Spring Data JPA Repository providing query methods for district, category, date, and status',
    content: `package com.collegeevents.repository;

import com.collegeevents.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByStatus(Event.Status status);

    List<Event> findByCollegeId(Long collegeId);

    List<Event> findByDistrictIgnoreCaseAndStatus(String district, Event.Status status);

    List<Event> findByCategoryIgnoreCaseAndStatus(String category, Event.Status status);

    List<Event> findByEventDateGreaterThanEqualAndStatusOrderByEventDateAsc(LocalDate date, Event.Status status);

    @Query("SELECT e FROM Event e WHERE e.status = 'APPROVED' AND (" +
           "LOWER(e.eventName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(e.collegeName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(e.district) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(e.category) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Event> searchEvents(@Param("query") String query);

    @Query("SELECT e FROM Event e WHERE (:district IS NULL OR LOWER(e.district) = LOWER(:district)) " +
           "AND (:category IS NULL OR LOWER(e.category) = LOWER(:category)) " +
           "AND (:fromDate IS NULL OR e.eventDate >= :fromDate) " +
           "AND e.status = 'APPROVED' ORDER BY e.eventDate ASC")
    List<Event> filterEvents(@Param("district") String district,
                            @Param("category") String category,
                            @Param("fromDate") LocalDate fromDate);
}`
  },
  {
    path: 'src/main/java/com/collegeevents/service/EventService.java',
    name: 'EventService.java',
    language: 'java',
    description: 'Business logic layer managing event creation, approval workflows, filtering, and searches',
    content: `package com.collegeevents.service;

import com.collegeevents.model.Event;
import com.collegeevents.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllApprovedEvents() {
        return eventRepository.findByStatus(Event.Status.APPROVED);
    }

    public List<Event> getAllEventsForAdmin() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long eventId) {
        Optional<Event> event = eventRepository.findById(eventId);
        event.ifPresent(e -> {
            e.setViewsCount((e.getViewsCount() == null ? 0 : e.getViewsCount()) + 1);
            eventRepository.save(e);
        });
        return event;
    }

    public List<Event> getEventsByCollege(Long collegeId) {
        return eventRepository.findByCollegeId(collegeId);
    }

    public Event createEvent(Event event) {
        event.setStatus(Event.Status.PENDING); // New submissions require admin approval
        return eventRepository.save(event);
    }

    public Event updateEvent(Long eventId, Event updatedData) {
        return eventRepository.findById(eventId).map(existing -> {
            existing.setEventName(updatedData.getEventName());
            existing.setCategory(updatedData.getCategory());
            existing.setEventDate(updatedData.getEventDate());
            existing.setStartTime(updatedData.getStartTime());
            existing.setEndTime(updatedData.getEndTime());
            existing.setVenue(updatedData.getVenue());
            existing.setDescription(updatedData.getDescription());
            existing.setEligibility(updatedData.getEligibility());
            existing.setRegistrationFee(updatedData.getRegistrationFee());
            existing.setRegistrationDeadline(updatedData.getRegistrationDeadline());
            existing.setRegistrationLink(updatedData.getRegistrationLink());
            existing.setContactName(updatedData.getContactName());
            existing.setContactNumber(updatedData.getContactNumber());
            existing.setContactEmail(updatedData.getContactEmail());
            existing.setPoster(updatedData.getPoster());
            existing.setPrizes(updatedData.getPrizes());
            return eventRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Event not found with ID: " + eventId));
    }

    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }

    public Event updateEventStatus(Long eventId, Event.Status status, String rejectionReason) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        event.setStatus(status);
        if (status == Event.Status.REJECTED) {
            event.setRejectionReason(rejectionReason);
        } else {
            event.setRejectionReason(null);
        }
        return eventRepository.save(event);
    }

    public List<Event> searchEvents(String query) {
        return eventRepository.searchEvents(query);
    }

    public List<Event> filterEvents(String district, String category, LocalDate fromDate) {
        return eventRepository.filterEvents(
                (district != null && !district.equalsIgnoreCase("All Districts")) ? district : null,
                (category != null && !category.equalsIgnoreCase("All Categories")) ? category : null,
                fromDate
        );
    }
}`
  },
  {
    path: 'src/main/java/com/collegeevents/controller/EventController.java',
    name: 'EventController.java',
    language: 'java',
    description: 'REST Controller exposing endpoints for browsing, filtering, searching, and creating events',
    content: `package com.collegeevents.controller;

import com.collegeevents.model.Event;
import com.collegeevents.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService eventService;

    // 1. GET /api/events - Retrieve all approved upcoming college events
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllApprovedEvents());
    }

    // 2. GET /api/events/{id} - Get single event details by Event ID
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        return eventService.getEventById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. GET /api/events/search?q=Hackathon+Chennai
    @GetMapping("/search")
    public ResponseEntity<List<Event>> searchEvents(@RequestParam("q") String query) {
        return ResponseEntity.ok(eventService.searchEvents(query));
    }

    // 4. GET /api/events/filter?district=Chennai&category=Hackathon&date=2026-10-15
    @GetMapping("/filter")
    public ResponseEntity<List<Event>> filterEvents(
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(eventService.filterEvents(district, category, date));
    }

    // 5. GET /api/events/college/{collegeId} - Get events posted by a specific college
    @GetMapping("/college/{collegeId}")
    public ResponseEntity<List<Event>> getEventsByCollege(@PathVariable Long collegeId) {
        return ResponseEntity.ok(eventService.getEventsByCollege(collegeId));
    }

    // 6. POST /api/events - College publishes a new event (Sets status to PENDING)
    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event created = eventService.createEvent(event);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // 7. PUT /api/events/{id} - Update event
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        return ResponseEntity.ok(eventService.updateEvent(id, event));
    }

    // 8. DELETE /api/events/{id} - Delete event
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}`
  },
  {
    path: 'src/main/java/com/collegeevents/controller/AdminController.java',
    name: 'AdminController.java',
    language: 'java',
    description: 'REST Controller for Super Admin approving/rejecting college submissions',
    content: `package com.collegeevents.controller;

import com.collegeevents.model.Event;
import com.collegeevents.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private EventService eventService;

    // GET /api/admin/events - Super Admin gets all events including PENDING & REJECTED
    @GetMapping("/events")
    public ResponseEntity<List<Event>> getAllEventsForAdmin() {
        return ResponseEntity.ok(eventService.getAllEventsForAdmin());
    }

    // PUT /api/admin/events/{id}/approve - Super Admin approves an event
    @PutMapping("/events/{id}/approve")
    public ResponseEntity<Event> approveEvent(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.updateEventStatus(id, Event.Status.APPROVED, null));
    }

    // PUT /api/admin/events/{id}/reject - Super Admin rejects with reason
    @PutMapping("/events/{id}/reject")
    public ResponseEntity<Event> rejectEvent(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> payload) {
        String reason = payload != null ? payload.getOrDefault("reason", "Event guidelines not met.") : "Event guidelines not met.";
        return ResponseEntity.ok(eventService.updateEventStatus(id, Event.Status.REJECTED, reason));
    }
}`
  },
  {
    path: 'src/main/java/com/collegeevents/repository/UserRepository.java',
    name: 'UserRepository.java',
    language: 'java',
    description: 'Spring Data JPA Repository for User lookup, credentials, and college affiliation',
    content: `package com.collegeevents.repository;

import com.collegeevents.model.Role;
import com.collegeevents.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByRole(Role role);

    List<User> findByCollegeId(Long collegeId);
}`
  },
  {
    path: 'src/main/java/com/collegeevents/repository/CollegeRepository.java',
    name: 'CollegeRepository.java',
    language: 'java',
    description: 'Spring Data JPA Repository for Tamil Nadu college queries, district filters, and verification',
    content: `package com.collegeevents.repository;

import com.collegeevents.model.College;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CollegeRepository extends JpaRepository<College, Long> {

    Optional<College> findByCode(String code);

    List<College> findByDistrictIgnoreCase(String district);

    List<College> findByIsVerifiedTrue();

    boolean existsByCode(String code);

    boolean existsByEmail(String email);
}`
  },
  {
    path: 'src/main/java/com/collegeevents/controller/AuthController.java',
    name: 'AuthController.java',
    language: 'java',
    description: 'REST Controller handling Student & College Admin login and registration with JWT tokens',
    content: `package com.collegeevents.controller;

import com.collegeevents.model.Role;
import com.collegeevents.model.User;
import com.collegeevents.repository.UserRepository;
import com.collegeevents.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String rawPassword = credentials.get("password");

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null || !passwordEncoder.matches(rawPassword, user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email is already registered"));
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) {
            user.setRole(Role.STUDENT);
        }

        User savedUser = userRepository.save(user);
        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getRole().name());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", savedUser);
        return ResponseEntity.ok(response);
    }
}`
  },
  {
    path: 'src/main/java/com/collegeevents/security/SecurityConfig.java',
    name: 'SecurityConfig.java',
    language: 'java',
    description: 'Spring Security 6 configuration defining public and protected endpoints and BCrypt encoder',
    content: `package com.collegeevents.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/events/**").permitAll()
                .requestMatchers("/api/colleges/**").permitAll()
                .requestMatchers("/api/categories/**").permitAll()
                .requestMatchers("/api/admin/**").hasAuthority("SUPER_ADMIN")
                .anyRequest().authenticated()
            );

        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}`
  },
  {
    path: 'src/main/java/com/collegeevents/security/JwtUtil.java',
    name: 'JwtUtil.java',
    language: 'java',
    description: 'JWT token generator, claim extractor, and signature validator using JJWT 0.12+',
    content: `package com.collegeevents.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("\${jwt.secret}")
    private String secret;

    @Value("\${jwt.expiration}")
    private long expiration;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String email, String role) {
        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey())
                .compact();
    }

    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    public boolean validateToken(String token, String email) {
        return email.equals(extractEmail(token)) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}`
  },
  {
    path: 'README.md',
    name: 'README.md',
    language: 'markdown',
    description: 'Comprehensive setup guide to run the Spring Boot & MySQL project on IntelliJ / Eclipse',
    content: `# Tamil Nadu College Events Hub - Java Spring Boot & MySQL Web Application

A centralized discovery and management platform for college symposiums, hackathons, workshops, and technical fests across Tamil Nadu.

## 🚀 Technology Stack
- **Backend:** Java 17+, Spring Boot 3.3.4, Spring MVC, Spring Data JPA, Spring Security
- **Database:** MySQL 8.0+
- **Build Tool:** Apache Maven 3.9+
- **Architecture:** Clean Layered MVC (Controller -> Service -> Repository -> Model)

## 📦 How to Run in IntelliJ IDEA / Eclipse

### 1. Prerequisites
1. Install JDK 17 or higher
2. Install MySQL Server (v8.0+)
3. Apache Maven installed or use Maven Wrapper

### 2. Configure Database
1. Open MySQL Workbench or Terminal:
\`\`\`sql
CREATE DATABASE tn_college_events;
\`\`\`
2. Verify credentials in \`src/main/resources/application.properties\`:
\`\`\`properties
spring.datasource.url=jdbc:mysql://localhost:3306/tn_college_events?useSSL=false
spring.datasource.username=root
spring.datasource.password=root123
\`\`\`

### 3. Build & Run
\`\`\`bash
# Run using Maven
mvn clean install
mvn spring-boot:run
\`\`\`

The Spring Boot server will run at: \`http://localhost:8080\`

## 📚 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | \`/api/events\` | Get all approved upcoming college events |
| **GET** | \`/api/events/{id}\` | Get event details by ID |
| **GET** | \`/api/events/search?q={query}\` | Search events across TN (e.g. "AI Hackathon Chennai") |
| **GET** | \`/api/events/filter\` | Filter by district, category, and date |
| **POST** | \`/api/events\` | College creates event (Status: PENDING) |
| **PUT** | \`/api/events/{id}\` | Edit event |
| **DELETE** | \`/api/events/{id}\` | Delete event |
| **GET** | \`/api/admin/events\` | Super admin view all events |
| **PUT** | \`/api/admin/events/{id}/approve\` | Super admin approves event |
| **PUT** | \`/api/admin/events/{id}/reject\` | Super admin rejects event |`
  }
];
