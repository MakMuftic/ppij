package hr.fer.ppij.model

import hr.fer.ppij.dto.BasicVenueDto
import javax.persistence.*

@Entity
@Table(name = "venues")
data class Venue(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = null,
        var name: String,
        var description: String,
        @ManyToMany(fetch = FetchType.LAZY, cascade = [(CascadeType.MERGE)])
        @JoinTable(name = "venue_sports",
                joinColumns = [(JoinColumn(name = "venue_id", referencedColumnName = "id"))],
                inverseJoinColumns = [(JoinColumn(name = "sport_id", referencedColumnName = "id"))])
        var sports: List<Sport> = mutableListOf(),
        @Enumerated(EnumType.STRING)
        var type: VenueType,
        var location: String,
        @ManyToMany(fetch = FetchType.LAZY, cascade = [(CascadeType.MERGE)])
        @JoinTable(name = "venue_images",
                joinColumns = [(JoinColumn(name = "venue_id", referencedColumnName = "id"))],
                inverseJoinColumns = [(JoinColumn(name = "image_id", referencedColumnName = "id"))])
        var images: List<Image> = mutableListOf()
) {
    fun toDto(): BasicVenueDto = BasicVenueDto(
            id!!,
            name,
            sports,
            type
    )
}

enum class VenueType {
    // TODO
    outdoor_public,
    indor_public, indor_private
}
