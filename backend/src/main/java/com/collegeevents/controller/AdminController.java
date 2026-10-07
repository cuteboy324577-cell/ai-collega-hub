package com.collegeevents.controller;

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
}