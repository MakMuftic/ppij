package hr.fer.ppij.service

import hr.fer.ppij.repository.UserRepository
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Component

@Component
class AppUserDetailsService(
        private val userRepository: UserRepository
) : UserDetailsService {
    override fun loadUserByUsername(s: String): UserDetails {
        val user = userRepository.findByUserName(s).
                orElseThrow { UsernameNotFoundException("The username $s doesn't exist") }

        val authorities = ArrayList<GrantedAuthority>()
        authorities.add(SimpleGrantedAuthority(user.role.name))

        return User(
                user.userName,
                user.password,
                authorities
        )
    }
}