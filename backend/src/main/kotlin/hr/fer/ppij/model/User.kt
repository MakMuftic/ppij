package hr.fer.ppij.model

import org.hibernate.annotations.Type
import javax.persistence.*
import javax.persistence.GenerationType.IDENTITY

@Entity
@Table(name = "users")
data class User(
        @Id @GeneratedValue(strategy = IDENTITY)
        var id: Long,
        var userName: String,
        var firstName: String? = null,
        var lastName: String? = null,
        var email: String,
        var phoneNumber: String,
        var aboutMeDescription: String,

        @ManyToMany(fetch = FetchType.LAZY, cascade = [(CascadeType.PERSIST), (CascadeType.MERGE)])
        @JoinTable(name = "user_sports",
                joinColumns = [(JoinColumn(name = "user_id", referencedColumnName = "id"))],
                inverseJoinColumns = [(JoinColumn(name = "sport_id", referencedColumnName = "id"))])
        var sports: List<Sport> = mutableListOf(),

        @ManyToOne
        @JoinColumn(name = "picture_id")
        var picture: Picture? = null
)
