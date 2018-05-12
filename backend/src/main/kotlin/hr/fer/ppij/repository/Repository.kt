package hr.fer.ppij.repository

import hr.fer.ppij.model.*
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface UserRepository : PagingAndSortingRepository<User, Long> {
    fun findByUserName(userName:String): Optional<User>
}

@Repository
interface SportRepository : PagingAndSortingRepository<Sport, Long> {
    fun findByName(name:String) : List<Sport>
}

@Repository
interface ImageRepository : PagingAndSortingRepository<Image, Long>

@Repository
interface VenueRepository : PagingAndSortingRepository<Venue, Long>

@Repository
interface FavouriteRepository : PagingAndSortingRepository<Favourite, Long> {
    fun findByUserId(userId:Long): List<Favourite>
    fun findByVenueId(venueId:Long): List<Favourite>
}

@Repository
interface EventRepository : PagingAndSortingRepository<Event, Long>