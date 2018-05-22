package hr.fer.ppij.controller

import hr.fer.ppij.model.Favourite
import hr.fer.ppij.model.User
import hr.fer.ppij.repository.FavouriteRepository
import hr.fer.ppij.repository.UserRepository
import hr.fer.ppij.repository.VenueRepository
import hr.fer.ppij.security.AuthoritiesConstants
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RequestMapping(value = ["/api"])
@RestController
class UserController(
        private val userRepository: UserRepository,
        private val favouriteRepository: FavouriteRepository,
        private val venueRepository: VenueRepository
) {
    /* BasicUserDto endpoints */

    @GetMapping("/users/basic")
    @PreAuthorize("hasAuthority('${AuthoritiesConstants.ADMIN}')")
    fun getAllUsersBasicInfo() = userRepository.findAll().map { it.toDto() }


    @GetMapping("/users/basic/{userId}")
    @PreAuthorize("hasAuthority('${AuthoritiesConstants.ADMIN}')")
    fun getUserBasicInfoById(@PathVariable userId: Long): ResponseEntity<*> {
        userRepository.findOne(userId)?.let {
            return ResponseEntity.ok(it.toDto())
        }
        return ResponseEntity.notFound().build()
    }
    /* User endpoints */


    @GetMapping("/users")
    @PreAuthorize("hasAuthority('${AuthoritiesConstants.ADMIN}')")
    fun getAllUsersInfo(): MutableIterable<User> = userRepository.findAll()


    @GetMapping("/users/{userId}")
    @PreAuthorize("hasAuthority('${AuthoritiesConstants.ADMIN}')")
    fun getFullUserById(@PathVariable userId: Long): ResponseEntity<*> {
        userRepository.findOne(userId)?.let {
            return ResponseEntity.ok(it)
        }
        return ResponseEntity.notFound().build()
    }

    data class UserPasswordDto(
            val user: User,
            val password: String
    )


    @PutMapping("/users/{userId}")
    @PreAuthorize("hasAuthority('${AuthoritiesConstants.ADMIN}')")
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
                    sports = user.sports,
                    admin = user.admin
            )
            return ResponseEntity.ok(userRepository.save(updatedUser))
        }
        return ResponseEntity.notFound().build()
    }


    @DeleteMapping("/users/{userId}")
    @PreAuthorize("hasAuthority('${AuthoritiesConstants.ADMIN}')")
    fun deleteUser(@PathVariable userId: Long): ResponseEntity<Void> {
        userRepository.findOne(userId)?.let {
            userRepository.delete(userId)
            return ResponseEntity.ok().build()
        }
        return ResponseEntity.notFound().build()
    }

    /* Favourite endpoints */

    @GetMapping("/users/{userId}/favourites")
    @PreAuthorize("hasAuthority('${AuthoritiesConstants.ADMIN}')")
    fun getUserFavouritesVenues(@PathVariable userId: Long): ResponseEntity<*> {
        // check if user exists
        if (!userRepository.exists(userId)) return ResponseEntity.notFound().build()
        // fetch favourite venues
        return ResponseEntity.ok(favouriteRepository
                .findByUserId(userId)
                .map { venueRepository.findOne(it.venueId).toDto() }
        )
    }


    @DeleteMapping("/users/{userId}/favourites/{venueId}")
    @PreAuthorize("hasAuthority('${AuthoritiesConstants.ADMIN}')")
    fun deleteUserNewFavouriteVenue(@PathVariable userId: Long, @PathVariable venueId: Long): ResponseEntity<*> {
        // check if user or venue exists
        if (!userRepository.exists(userId) || !venueRepository.exists(venueId))
            return ResponseEntity.notFound().build()
        // save new favourite venue for user
        return ResponseEntity.ok(favouriteRepository.delete(Favourite(userId, venueId)))
    }

    @PreAuthorize("hasAuthority('${AuthoritiesConstants.ADMIN}')")
    @GetMapping("/users/")
    fun doesUsernameExists(@RequestParam("username") username: String) =
            userRepository.findByUserName(username).isPresent
}