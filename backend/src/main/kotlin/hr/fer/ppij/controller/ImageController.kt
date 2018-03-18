package hr.fer.ppij.controller

import hr.fer.ppij.ApiController
import hr.fer.ppij.repository.ImageRepository
import hr.fer.ppij.service.ImageService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@ApiController
class ImageController(
        private val imageService: ImageService, private val imageRepository: ImageRepository
) {
    @GetMapping("/images/{imageId}")
    fun getImageById(@PathVariable imageId: Long): ResponseEntity<*> {
        imageRepository.findOne(imageId)?.let {
            return ResponseEntity.ok(it)
        }
        return ResponseEntity.notFound().build()
    }

    @PostMapping("/images")
    fun addImage(@RequestBody multipartFile: MultipartFile): ResponseEntity<*> {
        if (!multipartFile.isEmpty) {
            return ResponseEntity.ok(imageService.saveImage(multipartFile))
        }
        return ResponseEntity.notFound().build()
    }

    @DeleteMapping("/images/{imageId}")
    fun deleteImage(@PathVariable imageId: Long): ResponseEntity<Void> {
        imageRepository.findOne(imageId)?.let {
            imageService.deleteImage(it)
            return ResponseEntity.ok().build()
        }
        return ResponseEntity.notFound().build()
    }
}