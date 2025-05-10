package com.nowak.jakub.rental.fleet

import jakarta.validation.constraints.Min
import jakarta.validation.constraints.Max

data class CarForm(
    var brand: String = "",
    var model: String = "",
    @field:Min(1950, message = "Rok produkcji musi być nie wcześniejszy niż 1950")
    @field:Max(2025, message = "Rok produkcji musi być nie późniejszy niż 2025")
    var manufactureYear: Int = 2020,
    var registrationNumber: String = "",
    var automaticGearbox: Boolean = false
)