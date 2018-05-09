package hr.fer.ppij.controller

import hr.fer.ppij.ApiController
import hr.fer.ppij.model.Event
import hr.fer.ppij.repository.EventRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@ApiController
class EventController(
        private val eventRepository: EventRepository
) {

    @GetMapping("/events/{eventId}")
    fun getAllEvents(@PathVariable eventId: Long): ResponseEntity<*> {
        eventRepository.findOne(eventId)?.let {
            return ResponseEntity.ok(it)
        }
        return ResponseEntity.notFound().build()
    }

    @PostMapping("/events")
    fun addEvent(@RequestBody event: Event) {
        eventRepository.save(event)
    }

    @PutMapping("/events/{eventId}")
    fun updateEvent(@RequestBody event: Event, @PathVariable eventId: Long): ResponseEntity<*> {
        eventRepository.findOne(eventId)?.let {
            val updatedEvent = it.copy(
                    name = event.name,
                    description = event.description,
                    venue = event.venue,
                    sport = event.sport,
                    image = event.image
            )
            return ResponseEntity.ok(eventRepository.save(updatedEvent))
        }
        return ResponseEntity.notFound().build()
    }

    @DeleteMapping("/events/[eventId]")
    fun deleteEvent(@PathVariable eventId: Long): ResponseEntity<*> {
        eventRepository.findOne(eventId)?.let {
            eventRepository.delete(eventId)
            return ResponseEntity.ok().build()
        }
        return ResponseEntity.notFound().build()
    }
}