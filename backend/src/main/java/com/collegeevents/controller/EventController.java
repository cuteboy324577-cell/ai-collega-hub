package com.collegeevents.controller;

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
}