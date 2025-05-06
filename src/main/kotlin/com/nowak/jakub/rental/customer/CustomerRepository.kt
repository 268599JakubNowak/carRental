package com.nowak.jakub.rental.customer

import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface CustomerRepository : JpaRepository<Customer, UUID> {
    fun findByPesel(pesel: String): Optional<Customer>
}