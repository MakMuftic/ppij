package hr.fer.ppij

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration


@SpringBootApplication
@Configuration
@ComponentScan(value = ["hr.fer.ppij"])
class Application

fun main(args: Array<String>) {
    SpringApplication.run(Application::class.java, *args)
}