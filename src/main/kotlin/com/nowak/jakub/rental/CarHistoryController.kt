package com.nowak.jakub.rental

import com.nowak.jakub.rental.reservation.ReservationRepository
import com.nowak.jakub.rental.reservation.Reservation
import com.nowak.jakub.rental.fleet.CarRepository
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import java.util.*

@Controller
class CarHistoryController(
    private val reservationRepository: ReservationRepository,
    private val carRepository: CarRepository
) {

    @GetMapping("/car-history")
    fun showCarHistoryPage(): String {
        return "car_history"
    }

    @GetMapping("/api/cars/history")
    @ResponseBody
    fun getCarHistory(@RequestParam brand: String): List<CarRentalHistoryEntry> {
        val cars = carRepository.findByBrandContainingIgnoreCase(brand)
        return cars.flatMap { car ->
            val reservations = reservationRepository.findByCarId(car.id!!)
            reservations.map { reservation ->
                CarRentalHistoryEntry(
                    carInfo = "${car.brand} ${car.model} (${car.registrationNumber})",
                    customerName = "${reservation.customer.firstName} ${reservation.customer.lastName}",
                    rentedFrom = reservation.startDate.toString(),
                    rentedTo = reservation.endDate.toString()
                )
            }
        }
    }
}

data class CarRentalHistoryEntry(
    val carInfo: String,
    val customerName: String,
    val rentedFrom: String,
    val rentedTo: String
)
