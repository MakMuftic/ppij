package hr.fer.ppij.model

import java.io.Serializable
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.IdClass
import javax.persistence.Table

@Entity
@IdClass(value = FavouritesKey::class)
@Table(name = "favourites")
data class Favourite(
        @Id
        val userId: Long,
        @Id
        val venueId: Long
)

class FavouritesKey(val userId: Long, val venueId: Long) :Serializable {
    constructor() : this(0,0)
}