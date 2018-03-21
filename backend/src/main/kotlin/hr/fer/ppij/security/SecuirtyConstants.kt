package hr.fer.ppij.security

object SecurityConstants {
    const val SECRET = "SecretKeyToGenJWTs"
    const val EXPIRATION_TIME: Long = 4 * 60 * 60000 // 4 hours
    const val TOKEN_PREFIX = "Bearer "
    const val HEADER_STRING = "Authorization"
    const val STRENGTH = 10
}

object AuthoritiesConstants {
    const val USER = "USER"
    const val OWNER = "OWNER"
    const val ADMIN = "ADMIN"
}