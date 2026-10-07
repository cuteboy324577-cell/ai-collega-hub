package com.collegeevents.model;

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
}