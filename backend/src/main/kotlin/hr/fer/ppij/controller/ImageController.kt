package hr.fer.ppij.controller

import hr.fer.ppij.ApiController
import hr.fer.ppij.repository.ImageRepository
import hr.fer.ppij.service.ImageService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.multipart.MultipartHttpServletRequest
import java.util.ArrayList

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

    @PostMapping(value = ["/images"], consumes = ["multipart/form-data"])
    fun addImage(request: MultipartHttpServletRequest): ResponseEntity<*> {

        val images = getFiles(request)
        
        if (!images.isEmpty()) {
            return ResponseEntity.ok(imageService.saveImage(images[0]))
        }
        return ResponseEntity.notFound().build()
    }

    private fun getFiles(request: MultipartHttpServletRequest): List<MultipartFile> {
        val files = ArrayList<MultipartFile>()
        val iterator = request.fileNames
        var multipartFile: MultipartFile?
        while (iterator.hasNext()) {
            multipartFile = request.getFile(iterator.next())
            if (multipartFile!!.originalFilename != "blob") {
                files.add(multipartFile)
            }
        }
        return files
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