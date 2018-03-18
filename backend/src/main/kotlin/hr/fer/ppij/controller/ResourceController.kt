package hr.fer.ppij.controller

import hr.fer.ppij.ApiController
import hr.fer.ppij.service.ImageService
import org.springframework.core.io.Resource
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable


@ApiController
class ResourceController(private val imageService: ImageService) {
    @GetMapping("/images/show/{filename:.+}")
    fun serveFile(@PathVariable filename: String): Resource = imageService.loadImage(filename)
}