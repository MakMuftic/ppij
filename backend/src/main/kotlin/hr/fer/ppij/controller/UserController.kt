package hr.fer.ppij.controller

import hr.fer.ppij.ApiController
import hr.fer.ppij.model.Favourite
import hr.fer.ppij.model.User
import hr.fer.ppij.repository.FavouriteRepository
import hr.fer.ppij.repository.UserRepository
import hr.fer.ppij.repository.VenueRepository
import hr.fer.ppij.security.AuthoritiesConstants
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@ApiController
class UserController(
        private val userRepository: UserRepository,
        private val favouriteRepository: FavouriteRepository,
        private val venueRepository: VenueRepository
) {
    /* BasicUserDto endpoints */

    @GetMapping("/users/basic")
    fun getAllUsersBasicInfo() = userRepository.findAll().map { it.toDto() }

    @GetMapping("/users/basic/{userId}")
    fun getUserBasicInfoById(@PathVariable userId: Long): ResponseEntity<*> {
        userRepository.findOne(userId)?.let {
            return ResponseEntity.ok(it.toDto())
        }
        return ResponseEntity.notFound().build()
    }
    /* User endpoints */

    @GetMapping("/users")
    fun getAllUsersInfo(): MutableIterable<User> = userRepository.findAll()

    @GetMapping("/users/{userId}")
    fun getFullUserById(@PathVariable userId: Long): ResponseEntity<*> {
        userRepository.findOne(userId)?.let {
            return ResponseEntity.ok(it)
        }
        return ResponseEntity.notFound().build()
    }

    @PostMapping("/users")
    fun saveUser(@RequestBody user: User): User = userRepository.save(user)

    @PutMapping("/users/{userId}")
    fun updateUser(@PathVariable userId: Long, @RequestBody user: User): ResponseEntity<*> {
        userRepository.findOne(userId)?.let {
            val updatedUser = it.copy(
                    id = userId,
                    userName = user.userName,
                    firstName = user.firstName,
                    lastName = user.lastName,
                    email = user.email,
                    aboutMeDescription = user.aboutMeDescription,
                    phoneNumber = user.phoneNumber,
                    image = user.image,
                    sports = user.sports
            )
            return ResponseEntity.ok(userRepository.save(updatedUser))
        }
        return ResponseEntity.notFound().build()
    }

    @DeleteMapping("/users/{userId}")
    fun deleteUser(@PathVariable userId: Long): ResponseEntity<Void> {
        userRepository.findOne(userId)?.let {
            userRepository.delete(userId)
            return ResponseEntity.ok().build()
        }
        return ResponseEntity.notFound().build()
    }

    /* Favourite endpoints */
    @GetMapping("/users/{userId}/favourites")
    fun getUserFavouritesVenues(@PathVariable userId: Long): ResponseEntity<*> {
        // check if user exists
        if (!userRepository.exists(userId)) return ResponseEntity.notFound().build()
        // fetch favourite venues
        return ResponseEntity.ok(favouriteRepository
                .findByUserId(userId)
                .map { venueRepository.findOne(it.venueId).toDto() }
        )
    }

    @PostMapping("/users/{userId}/favourites/{venueId}")
    fun addUserNewFavouriteVenue(@PathVariable userId: Long, @PathVariable venueId: Long): ResponseEntity<*> {
        // check if user or venue exists
        if (!userRepository.exists(userId) || !venueRepository.exists(venueId))
            return ResponseEntity.notFound().build()
        // save new favourite venue for user
        return ResponseEntity.ok(favouriteRepository.save(Favourite(userId, venueId)))
    }

    @DeleteMapping("/users/{userId}/favourites/{venueId}")
    fun deleteUserNewFavouriteVenue(@PathVariable userId: Long, @PathVariable venueId: Long): ResponseEntity<*> {
        // check if user or venue exists
        if (!userRepository.exists(userId) || !venueRepository.exists(venueId))
            return ResponseEntity.notFound().build()
        // save new favourite venue for user
        return ResponseEntity.ok(favouriteRepository.delete(Favourite(userId, venueId)))
    }

}