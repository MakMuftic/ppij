package hr.fer.ppij.model

import javax.persistence.*

@Entity
@Table(name = "sports")
data class Sport(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long,
        var name: String
)