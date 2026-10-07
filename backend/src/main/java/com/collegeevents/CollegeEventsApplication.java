package com.collegeevents;

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
}