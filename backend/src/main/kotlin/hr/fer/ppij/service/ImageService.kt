package hr.fer.ppij.service

import hr.fer.ppij.config.ApplicationConfig
import hr.fer.ppij.exception.ImagePersistenceException
import hr.fer.ppij.model.Image
import hr.fer.ppij.repository.ImageRepository
import org.apache.commons.io.FilenameUtils
import org.springframework.core.io.Resource

import org.springframework.core.io.ResourceLoader
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Paths
import java.util.*

@Service
class ImageService(
        private val imageRepository: ImageRepository,
        private val resourceLoader: ResourceLoader,
        private val applicationConfig: ApplicationConfig
) {

    private fun getImagePath(imageName: String) =
            Paths.get("${applicationConfig.uploadRoute}/$imageName").toAbsolutePath()

    fun loadImage(imageName: String): Resource =
            resourceLoader.getResource("file:${getImagePath(imageName)}")

    fun saveImage(file: MultipartFile): Image {
        val uuid = UUID.randomUUID().toString()
        val imageName = "$uuid.${FilenameUtils.getExtension(file.originalFilename)}"
        try {
            val path = getImagePath(imageName)
            //Files.createFile(path)
            Files.copy(file.inputStream, getImagePath(imageName))
        } catch (e: IOException) {
            throw ImagePersistenceException(e)
        }
        val savedImage = Image(imageName = imageName, id = 0)
        return imageRepository.save(savedImage)
    }

    fun deleteImage(image: Image) {
        try {
            Files.delete(getImagePath(image.imageName))
        } catch (e: IOException) {
            throw ImagePersistenceException(e)
        }
        imageRepository.delete(image.id)
    }
}