package hr.fer.ppij.model

import javax.persistence.*

@Entity
@Table(name = "events")
data class Event (
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = null,
        var name: String,
        var description: String,
        @ManyToOne
        @JoinColumn(name = "venue_id")
        var venue: Venue,
        @ManyToOne
        @JoinColumn(name = "sport_id")
        var sport: Sport,
        @ManyToOne
        @JoinColumn(name = "image_id")
        var image: Image? = null
)