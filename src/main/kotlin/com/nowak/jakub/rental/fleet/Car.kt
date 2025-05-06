package com.nowak.jakub.rental.fleet

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "cars")
data class Car(
    @Id
    @GeneratedValue
    @Column(columnDefinition = "UUID")
    val id: UUID? = null,

    @Column(nullable = false)
    val brand: String,

    @Column(nullable = false)
    val model: String,

    @Column(nullable = false)
    val manufactureYear: Int,

    @Column(nullable = false)
    val registrationNumber: String,

    @Column(nullable = false)
    val automaticGearbox: Boolean,
    )
