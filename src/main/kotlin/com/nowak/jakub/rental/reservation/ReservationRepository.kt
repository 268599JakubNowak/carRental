package com.nowak.jakub.rental.reservation

import org.springframework.data.jpa.repository.JpaRepository
import java.time.LocalDate
import java.util.*

interface ReservationRepository : JpaRepository<Reservation, UUID> {

    fun findByCarIdAndEndDateGreaterThanEqualAndStartDateLessThanEqual(
        carId: UUID,
        start: LocalDate,
        end: LocalDate
    ): List<Reservation>
}