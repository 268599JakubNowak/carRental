package com.nowak.jakub.rental.reservation

import java.time.LocalDate
import java.util.*

data class ReservationForm(
    var customerPesel: String = "",
    var startDate: LocalDate? = null,
    var endDate: LocalDate? = null,
    var selectedCarId: UUID? = null
)
