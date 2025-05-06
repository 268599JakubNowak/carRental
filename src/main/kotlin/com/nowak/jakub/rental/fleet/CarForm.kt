package com.nowak.jakub.rental.fleet

data class CarForm(
    var brand: String = "",
    var model: String = "",
    var manufactureYear: Int = 2020,
    var registrationNumber: String = "",
    var automaticGearbox: Boolean = false
)
