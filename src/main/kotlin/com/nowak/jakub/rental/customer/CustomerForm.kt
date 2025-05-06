package com.nowak.jakub.rental.customer

data class CustomerForm(
    var firstName: String = "",
    var lastName: String = "",
    var pesel: String = "",
    var email: String = "",
    var phoneNumber: String = ""
)
