package hr.fer.ppij.controller

import hr.fer.ppij.model.User
import hr.fer.ppij.repository.UserRepository
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping(value = ["/register"])
class RegisterController(
        private val userRepository: UserRepository
) {
    @PostMapping
    fun registerUser(@RequestBody user: User): User = userRepository.save(user)
}