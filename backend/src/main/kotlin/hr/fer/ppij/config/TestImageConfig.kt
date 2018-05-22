package hr.fer.ppij.config

import hr.fer.ppij.repository.ImageRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import java.awt.image.BufferedImage
import java.io.File
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Paths
import javax.imageio.ImageIO


@Configuration
class TestImageConfig {
    @Bean
    fun setUp(imageRepository: ImageRepository, applicationConfig: ApplicationConfig): CommandLineRunner {
        return CommandLineRunner {
            // create directory for saving uploads
            val dirPath = Paths.get(applicationConfig.uploadRoute).toAbsolutePath()
            if (!Files.isDirectory(dirPath)) {
                Files.createDirectory(dirPath)
            }

            // create tmp image
            val imgPath = Paths.get("$dirPath/tmp.jpg").toAbsolutePath()
            if (!Files.isReadable(imgPath)) {
                val image = BufferedImage(100, 100, BufferedImage.TYPE_INT_RGB)
                val g = image.graphics
                g.drawString("Hello World!!!", 10, 20)
                try {
                    ImageIO.write(image, "jpg", File(imgPath.toString()))
                } catch (e: IOException) {
                    e.printStackTrace()
                }
            }
        }
    }
}