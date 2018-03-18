package hr.fer.ppij.repository

import hr.fer.ppij.model.Picture
import hr.fer.ppij.model.Role
import hr.fer.ppij.model.Sport
import hr.fer.ppij.model.User
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : PagingAndSortingRepository<User, Long>
@Repository
interface RoleRepository : PagingAndSortingRepository<Role, Long>

@Repository
interface SportRepository : PagingAndSortingRepository<Sport, Long>

@Repository
interface PictureRepository : PagingAndSortingRepository<Picture, Long>