package hr.fer.ppij.controller

import hr.fer.ppij.ApiController
import hr.fer.ppij.model.Sport
import hr.fer.ppij.repository.SportRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@ApiController
class SportController(private val sportRepository: SportRepository) {

    @GetMapping("/sports")
    fun getAllSports(): Iterable<Sport> = sportRepository.findAll()

    @GetMapping("/sports/{sportId}")
    fun getSportById(@PathVariable sportId: Long): ResponseEntity<*> {
        sportRepository.findOne(sportId)?.let {
            return ResponseEntity.ok(it)
        }
        return ResponseEntity.notFound().build()
    }

    @PostMapping("/sports")
    fun addSport(@RequestBody sport: Sport) = sportRepository.save(sport)

    @DeleteMapping("/sports/{sportId}")
    fun deleteSport(@PathVariable sportId: Long): ResponseEntity<Void> {
        sportRepository.findOne(sportId)?.let {
            sportRepository.delete(sportId)
            return ResponseEntity.ok().build()
        }
        return ResponseEntity.notFound().build()
    }

}