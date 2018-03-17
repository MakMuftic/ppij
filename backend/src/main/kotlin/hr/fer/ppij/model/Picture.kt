package hr.fer.ppij.model

import javax.persistence.*

@Entity
@Table(name = "pictures")
data class Picture(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long,
        var picturePath: String,
        var alternate: String
)