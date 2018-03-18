package hr.fer.ppij.controller

import hr.fer.ppij.ApiController
import hr.fer.ppij.model.User
import hr.fer.ppij.repository.UserRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@ApiController
class UserController(
        private val userRepository: UserRepository
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
                    userName = user.userName,
                    firstName = user.firstName,
                    lastName = user.lastName,
                    email = user.email,
                    aboutMeDescription = user.aboutMeDescription,
                    phoneNumber = user.phoneNumber,
                    picture = user.picture,
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
}