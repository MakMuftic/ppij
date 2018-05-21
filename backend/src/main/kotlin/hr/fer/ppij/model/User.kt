package hr.fer.ppij.model

import com.fasterxml.jackson.annotation.JsonIgnore
import hr.fer.ppij.dto.BasicUserDto
import javax.persistence.*
import javax.persistence.GenerationType.IDENTITY

@Entity
@Table(name = "users")
data class User(
        @Id @GeneratedValue(strategy = IDENTITY)
        var id: Long? = null,
        var userName: String,
        var firstName: String? = null,
        var lastName: String? = null,
        var email: String,
        @JsonIgnore
        var password:String? = null,
        var phoneNumber: String? = null,
        var aboutMeDescription: String,
        @ManyToMany(fetch = FetchType.LAZY, cascade = [(CascadeType.MERGE)])
        @JoinTable(name = "user_sports",
                joinColumns = [(JoinColumn(name = "user_id", referencedColumnName = "id"))],
                inverseJoinColumns = [(JoinColumn(name = "sport_id", referencedColumnName = "id"))])
        var sports: List<Sport> = mutableListOf(),
        @ManyToOne
        @JoinColumn(name = "image_id")
        var image: Image? = null,
        var admin: Boolean? = false
) {
    fun toDto(): BasicUserDto = BasicUserDto(
            id!!,
            userName,
            firstName ?: "",
            lastName ?: "",
            email
    )
}
