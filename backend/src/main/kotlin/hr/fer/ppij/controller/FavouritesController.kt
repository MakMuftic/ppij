package hr.fer.ppij.controller

import hr.fer.ppij.model.Favourite
import hr.fer.ppij.repository.FavouriteRepository
import hr.fer.ppij.repository.UserRepository
import hr.fer.ppij.repository.VenueRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(value = ["/add"])
class FavouritesController(
        private val userRepository: UserRepository,
        private val venueRepository: VenueRepository,
        private val favouriteRepository: FavouriteRepository
) {
    @PostMapping("/users/{userId}/favourites/{venueId}")
    fun addUserNewFavouriteVenue(@PathVariable userId: Long, @PathVariable venueId: Long): ResponseEntity<*> {
        // check if user or venue exists
        if (!userRepository.exists(userId) || !venueRepository.exists(venueId))
            return ResponseEntity.notFound().build()
        // save new favourite venue for user
        return ResponseEntity.ok(favouriteRepository.save(Favourite(userId, venueId)))
    }
}