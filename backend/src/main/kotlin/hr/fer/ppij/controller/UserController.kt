package hr.fer.ppij.controller

import hr.fer.ppij.ApiController
import hr.fer.ppij.model.User
import hr.fer.ppij.repository.UserRepository
import org.springframework.web.bind.annotation.GetMapping

@ApiController
class UserController(
        private val userRepository: UserRepository
) {
    @GetMapping("/users")
    fun getAllUsers(): MutableIterable<User> = userRepository.findAll()
}