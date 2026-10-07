# Tamil Nadu College Events Hub - Java Spring Boot & MySQL Web Application

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
```sql
CREATE DATABASE tn_college_events;
```
2. Verify credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/tn_college_events?useSSL=false
spring.datasource.username=root
spring.datasource.password=root123
```

### 3. Build & Run
```bash
# Run using Maven
mvn clean install
mvn spring-boot:run
```

The Spring Boot server will run at: `http://localhost:8080`

## 📚 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/events` | Get all approved upcoming college events |
| **GET** | `/api/events/{id}` | Get event details by ID |
| **GET** | `/api/events/search?q={query}` | Search events across TN (e.g. "AI Hackathon Chennai") |
| **GET** | `/api/events/filter` | Filter by district, category, and date |
| **POST** | `/api/events` | College creates event (Status: PENDING) |
| **PUT** | `/api/events/{id}` | Edit event |
| **DELETE** | `/api/events/{id}` | Delete event |
| **GET** | `/api/admin/events` | Super admin view all events |
| **PUT** | `/api/admin/events/{id}/approve` | Super admin approves event |
| **PUT** | `/api/admin/events/{id}/reject` | Super admin rejects event |