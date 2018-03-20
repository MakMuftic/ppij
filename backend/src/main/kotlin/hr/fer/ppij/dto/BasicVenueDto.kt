package hr.fer.ppij.dto

import hr.fer.ppij.model.Sport
import hr.fer.ppij.model.VenueType

class BasicVenueDto(
        val id: Long,
        val name: String,
        val sports: List<Sport>,
        val type: VenueType
)