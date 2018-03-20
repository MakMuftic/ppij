package hr.fer.ppij.controller

import hr.fer.ppij.ApiController
import hr.fer.ppij.model.Venue
import hr.fer.ppij.repository.VenueRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@ApiController
class VenueController(
        private val venueRepository: VenueRepository
) {
    @GetMapping("/venues")
    fun getAllVenues(): Iterable<Venue> = venueRepository.findAll()

    @GetMapping("/venues/{venueId}")
    fun getOneVenue(@PathVariable venueId: Long): ResponseEntity<*> {
        venueRepository.findOne(venueId)?.let {
            return ResponseEntity.ok(it)
        }
        return ResponseEntity.notFound().build()
    }

    @PostMapping("/venues")
    fun saveVenue(@RequestBody venue: Venue): Venue = venueRepository.save(venue)

    @PutMapping("/venues/{venueId}")
    fun editVenue(@RequestBody venue: Venue, @PathVariable venueId: Long): ResponseEntity<*> {
        venueRepository.findOne(venueId)?.let {
            val updatedVenue = it.copy(
                    name = venue.name,
                    description = venue.description,
                    sports = venue.sports,
                    type = venue.type,
                    owner = venue.owner,
                    images = venue.images
            )
            return ResponseEntity.ok(venueRepository.save(updatedVenue))
        }
        return ResponseEntity.notFound().build()
    }

    @DeleteMapping("/venues/{venueId}")
    fun deleteVenue(@PathVariable venueId: Long): ResponseEntity<Void> {
        venueRepository.findOne(venueId)?.let {
            venueRepository.delete(venueId)
            return ResponseEntity.ok().build()
        }
        return ResponseEntity.notFound().build()
    }
}