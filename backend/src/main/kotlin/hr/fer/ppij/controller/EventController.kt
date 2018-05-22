package hr.fer.ppij.controller

import hr.fer.ppij.ApiController
import hr.fer.ppij.model.Event
import hr.fer.ppij.model.Image
import hr.fer.ppij.repository.EventRepository
import hr.fer.ppij.repository.SportRepository
import hr.fer.ppij.repository.VenueRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@ApiController
class EventController(
        private val eventRepository: EventRepository,
        private val venueRepository: VenueRepository,
        private val sportRepository: SportRepository
) {

    @GetMapping("/events")
    fun getAllEvents() = eventRepository.findAll()

    @GetMapping("/events/{eventId}")
    fun getEvent(@PathVariable eventId: Long): ResponseEntity<*> {
        eventRepository.findOne(eventId)?.let {
            return ResponseEntity.ok(it)
        }
        return ResponseEntity.notFound().build()
    }

    @PostMapping("/events")
    fun addEvent(@RequestBody event: Event) {
        eventRepository.save(Event(
                name = event.name,
                description = event.description,
                venue = event.venue,
                sport = event.sport,
                image = event.image,
                date = event.date
        ))
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

    @DeleteMapping("/events/{eventId}")
    fun deleteEvent(@PathVariable eventId: Long): ResponseEntity<*> {
        return if (eventRepository.findOne(eventId) != null) {
            eventRepository.delete(eventId)
            ResponseEntity.ok().build()
        } else ResponseEntity.notFound().build()
    }
}

data class EventDto(
        var name: String,
        var description: String,
        var venueId: Long,
        var sportId: Long,
        var image: Image? = null,
        var date: Date
)