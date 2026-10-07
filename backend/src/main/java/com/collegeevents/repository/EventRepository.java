package com.collegeevents.repository;

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
}