package hr.fer.ppij.security

import com.fasterxml.jackson.databind.ObjectMapper
import hr.fer.ppij.model.LoginDetails
import hr.fer.ppij.security.SecurityConstants.ACEH
import hr.fer.ppij.security.SecurityConstants.EXPIRATION_TIME
import hr.fer.ppij.security.SecurityConstants.HEADER_STRING
import hr.fer.ppij.security.SecurityConstants.SECRET
import hr.fer.ppij.security.SecurityConstants.TOKEN_PREFIX
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import java.io.IOException
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JWTAuthenticationFilter(
        private val authenticateManager: AuthenticationManager
) : UsernamePasswordAuthenticationFilter() {


    @Throws(AuthenticationException::class)
    override fun attemptAuthentication(request: HttpServletRequest?, response: HttpServletResponse?): Authentication {
        try {
            val credentials = ObjectMapper().readValue(request!!.inputStream, LoginDetails::class.java)
            return authenticateManager.authenticate(
                    UsernamePasswordAuthenticationToken(
                            credentials.username,
                            credentials.password,
                            ArrayList<GrantedAuthority>()
                    )
            )
        } catch (e: IOException) {
            throw RuntimeException(e)
        }
    }

    @Throws(IOException::class, ServletException::class)
    override fun successfulAuthentication(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain?, auth: Authentication) {
        val claims: MutableList<String> = mutableListOf()
        auth.authorities!!.forEach { a -> claims.add(a.toString()) }

        val token = Jwts.builder()
                .setSubject((auth.principal as User).username)
                .claim("auth", claims)
                .setExpiration(Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact()
        //response.outputStream.print((auth.principal as User).toString())
        response.addHeader(HEADER_STRING, TOKEN_PREFIX + token)
        response.addHeader(ACEH, HEADER_STRING)
    }
}