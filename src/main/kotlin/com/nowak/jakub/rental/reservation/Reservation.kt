package com.nowak.jakub.rental.reservation

import com.nowak.jakub.rental.customer.Customer
import com.nowak.jakub.rental.fleet.Car
import jakarta.persistence.*
import java.time.LocalDate
import java.util.*

@Entity
@Table(name = "reservations")
data class Reservation(
    @Id
    @GeneratedValue
    @Column(columnDefinition = "UUID")
    val id: UUID? = null,

    @ManyToOne(optional = false)
    val customer: Customer,

    @ManyToOne(optional = false)
    val car: Car,

    @Column(nullable = false)
    val startDate: LocalDate,

    @Column(nullable = false)
    val endDate: LocalDate
)

