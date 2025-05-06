package com.nowak.jakub.rental.fleet

import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface CarRepository : JpaRepository<Car, UUID>