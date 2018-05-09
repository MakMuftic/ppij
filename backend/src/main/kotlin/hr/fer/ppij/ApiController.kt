package hr.fer.ppij

import hr.fer.ppij.security.AuthoritiesConstants
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Retention(AnnotationRetention.RUNTIME)
@Target(AnnotationTarget.CLASS, AnnotationTarget.FILE)
@RequestMapping(value = ["/api"])
@RestController
@PreAuthorize("hasAuthority('${AuthoritiesConstants.ADMIN}')")
internal annotation class ApiController