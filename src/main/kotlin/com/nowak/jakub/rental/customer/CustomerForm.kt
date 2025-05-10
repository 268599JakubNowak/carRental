package com.nowak.jakub.rental.customer

import jakarta.validation.constraints.Size

data class CustomerForm(
    var firstName: String = "",
    var lastName: String = "",
    var pesel: String = "",
    var email: String = "",

    @field:Size(min = 9, max = 9, message = "Field 'x' must be exactly 9 characters long")
    var phoneNumber: String = ""
)
