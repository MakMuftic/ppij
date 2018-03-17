package hr.fer.ppij.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "User already exists in database.")
class DuplicateUserException : RuntimeException()

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "Selected user not found")
class UserNotFoundException : RuntimeException()

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "Role already exists in database.")
class DuplicateRoleException : RuntimeException()

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "Selected role not found")
class RoleNotFoundException : RuntimeException()