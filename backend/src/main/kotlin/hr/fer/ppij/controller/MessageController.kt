package hr.fer.ppij.controller

import hr.fer.ppij.ApiController
import hr.fer.ppij.repository.UserRepository
import hr.fer.ppij.repository.VenueRepository
import hr.fer.ppij.service.MessageService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import java.security.Principal

@ApiController
class MessageController(
        private val userRepository: UserRepository,
        private val venueRepository: VenueRepository,
        private val messageService: MessageService
) {
    @PostMapping("/message/venue/{venueId}")
    fun postMessageToVenueChannel(@PathVariable venueId: Long, @RequestBody message: String, principal: Principal): ResponseEntity<*> {
        val loggedUser = userRepository.findByUserName(principal.name)
        if (!venueRepository.exists(venueId) || !loggedUser.isPresent) {
            return ResponseEntity.notFound().build()
        }
        return ResponseEntity.ok(messageService.postMessage(loggedUser.get(), venueRepository.findOne(venueId), message))
    }
}