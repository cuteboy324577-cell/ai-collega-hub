-- =======================================================
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
CREATE FULLTEXT INDEX idx_events_search ON events(event_name, description, college_name);