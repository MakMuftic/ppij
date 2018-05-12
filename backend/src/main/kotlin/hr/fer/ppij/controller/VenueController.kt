package hr.fer.ppij.controller

import hr.fer.ppij.ApiController
import hr.fer.ppij.model.Venue
import hr.fer.ppij.repository.FavouriteRepository
import hr.fer.ppij.repository.UserRepository
import hr.fer.ppij.repository.VenueRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@ApiController
class VenueController(
        private val venueRepository: VenueRepository,
        private val favouriteRepository: FavouriteRepository,
        private val userRepository: UserRepository
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
                    location = venue.location,
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

    /* Favourite endpoints */
    
    @GetMapping("/venues/{venueId}/favourites")
    fun getAllUsersHavingInFavouriteThisVenue(@PathVariable venueId: Long): ResponseEntity<*> {
        // check if venue exists
        if (!venueRepository.exists(venueId))
            return ResponseEntity.notFound().build()
        // fetch all users having venue in favourites
        return ResponseEntity.ok(favouriteRepository
                .findByVenueId(venueId)
                .map { userRepository.findOne(it.userId).toDto() }
        )
    }
}