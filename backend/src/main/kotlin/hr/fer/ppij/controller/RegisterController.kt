package hr.fer.ppij.controller

import hr.fer.ppij.model.Image
import hr.fer.ppij.model.Sport
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
    fun registerUser(@RequestBody registerWrapper: RegisterWrapper): User = userRepository.save(
            User(
                    0,
                    registerWrapper.user.userName,
                    registerWrapper.user.firstName,
                    registerWrapper.user.lastName,
                    registerWrapper.user.email,
                    registerWrapper.password,
                    registerWrapper.user.phoneNumber,
                    registerWrapper.user.aboutMeDescription,
                    registerWrapper.user.sports,
                    registerWrapper.user.image,
                    registerWrapper.user.admin
            )
    )
}

data class UserWrapper(
        var id: Long,
        var userName: String,
        var firstName: String?,
        var lastName: String?,
        var email: String,
        var phoneNumber: String?,
        var aboutMeDescription: String?,
        var sports: List<Sport>?,
        var image: Image?,
        var admin: Boolean
)

data class RegisterWrapper(
        val user:UserWrapper,
        val password: String
)

