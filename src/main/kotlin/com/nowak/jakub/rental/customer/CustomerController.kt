package com.nowak.jakub.rental.customer

import jakarta.validation.Valid
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.validation.FieldError

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
        @ModelAttribute("customer") @Valid customerForm: CustomerForm,
        bindingResult: BindingResult
    ): String {
        // Walidacja imienia
        if (!customerForm.firstName.matches(Regex("^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$"))) {
            bindingResult.addError(FieldError("customer", "firstName", "Imię może zawierać tylko litery"))
        }

        // Walidacja nazwiska
        if (!customerForm.lastName.matches(Regex("^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$"))) {
            bindingResult.addError(FieldError("customer", "lastName", "Nazwisko może zawierać tylko litery"))
        }

        // Walidacja PESELu
        if (!customerForm.pesel.matches(Regex("^[0-9]{11}$"))) {
            bindingResult.addError(FieldError("customer", "pesel", "PESEL musi składać się z 11 cyfr"))
        }

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