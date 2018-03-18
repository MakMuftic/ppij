package hr.fer.ppij.model

import javax.persistence.*

@Entity
@Table(name = "images")
data class Image(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long,
        var imageName: String,
        var alternate: String
)