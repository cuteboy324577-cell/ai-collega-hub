package com.collegeevents.service;

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
}