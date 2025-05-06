package com.nowak.jakub.rental.customer

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping

@Controller
@RequestMapping("/customers")
class CustomerController(private val customerRepository: CustomerRepository) {

    @GetMapping("/new")
    fun showAddCustomerForm(model: Model): String {
        model.addAttribute("customer", CustomerForm())
        return "customers/add"
    }

    @PostMapping
    fun addCustomer(
        @ModelAttribute("customer") customerForm: CustomerForm,
        bindingResult: BindingResult
    ): String {
        if (bindingResult.hasErrors()) {
            return "customers/add"
        }

        val customer = Customer(
            firstName = customerForm.firstName,
            lastName = customerForm.lastName,
            pesel = customerForm.pesel,
            email = customerForm.email,
            phoneNumber = customerForm.phoneNumber
        )

        customerRepository.save(customer)
        return "redirect:/?customerAdded"
    }
}
