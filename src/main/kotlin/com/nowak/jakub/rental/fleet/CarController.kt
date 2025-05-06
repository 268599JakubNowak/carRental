package com.nowak.jakub.rental.fleet

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping


@Controller
@RequestMapping("/cars")
class CarController(private val carRepository: CarRepository) {

    @GetMapping("/new")
    fun showAddCarForm(model: Model): String {
        model.addAttribute("car", CarForm())
        return "cars/add"
    }

    @PostMapping
    fun addCar(
        @ModelAttribute("car") carForm: CarForm,
        bindingResult: BindingResult
    ): String {
        if (bindingResult.hasErrors()) {
            return "cars/add"
        }

        val car = Car(
            brand = carForm.brand,
            model = carForm.model,
            manufactureYear = carForm.manufactureYear,
            registrationNumber = carForm.registrationNumber,
            automaticGearbox = carForm.automaticGearbox
        )
        carRepository.save(car)
        println("New car saved: $car")
        return "redirect:/?carAdded"
    }
}