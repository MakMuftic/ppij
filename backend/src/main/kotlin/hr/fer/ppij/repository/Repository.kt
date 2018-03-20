package hr.fer.ppij.repository

import hr.fer.ppij.model.*
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : PagingAndSortingRepository<User, Long>

@Repository
interface RoleRepository : PagingAndSortingRepository<Role, Long>

@Repository
interface SportRepository : PagingAndSortingRepository<Sport, Long>

@Repository
interface ImageRepository : PagingAndSortingRepository<Image, Long>

@Repository
interface VenueRepository : PagingAndSortingRepository<Venue, Long>

@Repository
interface FavouriteRepository : PagingAndSortingRepository<Favourite, Long> {
    fun findByUserId(userId:Long): List<Favourite>
    fun findByVenueId(venueId:Long): List<Favourite>
}