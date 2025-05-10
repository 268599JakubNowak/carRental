package com.nowak.jakub.rental.customer

import jakarta.persistence.*
import jakarta.validation.constraints.Size
import java.util.*

@Entity
@Table(name = "customers")
data class Customer(
    @Id
    @GeneratedValue
    @Column(columnDefinition = "UUID")
    val id: UUID? = null,

    @Column(nullable = false)
    val firstName: String,

    @Column(nullable = false)
    val lastName: String,

    @Column(nullable = false, unique = true, length = 11)
    val pesel: String,

    @Column(nullable = false, unique = true)
    val email: String,

    @Column(nullable = false, length = 9)
    val phoneNumber: String
)
 {
}
