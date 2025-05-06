package com.nowak.jakub.rental.reservation

import com.nowak.jakub.rental.customer.CustomerRepository
import com.nowak.jakub.rental.fleet.CarRepository
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.*
import java.util.*

@Controller
@RequestMapping("/reservations")
class ReservationController(
    private val customerRepository: CustomerRepository,
    private val carRepository: CarRepository,
    private val reservationRepository: ReservationRepository
) {

    // Step 1: Show list of customers to choose from
    @GetMapping("/new")
    fun selectCustomer(model: Model): String {
        model.addAttribute("customers", customerRepository.findAll())
        return "reservations/select_customer"
    }

    // Step 2: After selecting customer → show form to pick rental dates
    @GetMapping("/new/{customerId}")
    fun showDateForm(@PathVariable customerId: UUID, model: Model): String {
        val customer = customerRepository.findById(customerId).orElseThrow()
        model.addAttribute("form", ReservationForm())
        model.addAttribute("customer", customer)
        return "reservations/date_range"
    }

    // Step 3: Search for available cars
    @PostMapping("/search/{customerId}")
    fun searchAvailableCars(
        @PathVariable customerId: UUID,
        @ModelAttribute form: ReservationForm,
        model: Model
    ): String {
        val customer = customerRepository.findById(customerId).orElseThrow()

        if (form.startDate == null || form.endDate == null) {
            model.addAttribute("form", form)
            model.addAttribute("customer", customer)
            model.addAttribute("error", "Please select both start and end dates.")
            return "reservations/date_range"
        }

        val availableCars = carRepository.findAll().filter { car ->
            reservationRepository
                .findByCarIdAndEndDateGreaterThanEqualAndStartDateLessThanEqual(
                    car.id!!, form.startDate!!, form.endDate!!
                ).isEmpty()
        }

        form.customerPesel = customer.pesel // for tracking in the final step

        model.addAttribute("form", form)
        model.addAttribute("customer", customer)
        model.addAttribute("availableCars", availableCars)
        return "reservations/select_car"
    }

    // Step 4: Create the reservation
    @PostMapping
    fun confirmReservation(@ModelAttribute form: ReservationForm): String {
        val customer = customerRepository.findByPesel(form.customerPesel).orElseThrow()
        val car = carRepository.findById(form.selectedCarId!!).orElseThrow()

        val reservation = Reservation(
            customer = customer,
            car = car,
            startDate = form.startDate!!,
            endDate = form.endDate!!
        )

        reservationRepository.save(reservation)
        return "redirect:/?reservationAdded"
    }

    @PostMapping("/customer/reservations")
    fun showCustomerReservations(
        @RequestParam pesel: String,
        model: Model
    ): String {
        val customer = customerRepository.findByPesel(pesel)
        if (customer.isEmpty) {
            model.addAttribute("error", "Customer not found.")
            return "customers/search"
        }

        val reservations = reservationRepository.findAll()
            .filter { it.customer.pesel == pesel }

        model.addAttribute("customer", customer.get())
        model.addAttribute("reservations", reservations)
        return "customers/reservations"
    }

    @GetMapping("/customer/search")
    fun searchCustomerPage(model: Model): String {
        model.addAttribute("pesel", "")
        return "customers/search"
    }
}
