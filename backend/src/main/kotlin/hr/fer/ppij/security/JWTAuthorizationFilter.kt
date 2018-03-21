package hr.fer.ppij.security

import hr.fer.ppij.security.SecurityConstants.HEADER_STRING
import hr.fer.ppij.security.SecurityConstants.SECRET
import hr.fer.ppij.security.SecurityConstants.TOKEN_PREFIX
import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.Jwts
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import java.io.IOException
import java.util.ArrayList
import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JWTAuthorizationFilter(authManager: AuthenticationManager) : BasicAuthenticationFilter(authManager) {
    @Throws(IOException::class, ServletException::class)
    override fun doFilterInternal(
            req: HttpServletRequest,
            res: HttpServletResponse,
            chain: FilterChain
    ) {
        val header = req.getHeader(HEADER_STRING)
        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(req, res)
            return
        }
        try {
            val authentication = getAuthentication(req)
            SecurityContextHolder.getContext().authentication = authentication
            chain.doFilter(req, res)
        } catch (e: ExpiredJwtException) {
            res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "The token is not valid.")
        }
    }

    private fun getAuthentication(request: HttpServletRequest): UsernamePasswordAuthenticationToken? {
        val token = request.getHeader(HEADER_STRING)
        if (token != null) {
            // parse the token.
            val claims = Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
                    .body

            val userName = claims["sub"]
            val authority = claims["auth"]

            val authorities = ArrayList<GrantedAuthority>()
            (authority as List<*>).forEach { role -> authorities.add(SimpleGrantedAuthority(role.toString())) }
            return if (userName != null) {
                UsernamePasswordAuthenticationToken(userName, null, authorities)
            } else null
        }
        return null
    }
}