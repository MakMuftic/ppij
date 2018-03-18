package hr.fer.ppij.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "Image persistence error")
class ImagePersistenceException(throwable: Throwable) : RuntimeException(throwable)