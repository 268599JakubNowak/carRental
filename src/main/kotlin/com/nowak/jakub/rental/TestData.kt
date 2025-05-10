package com.nowak.jakub.rental

import com.nowak.jakub.rental.customer.Customer
import com.nowak.jakub.rental.customer.CustomerRepository
import com.nowak.jakub.rental.fleet.Car
import com.nowak.jakub.rental.fleet.CarRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration //mówi Springowi, że ta klasa zawiera definicje beanów (komponentów).
class TestData {

    @Bean //Spring zarejestruje to jako komponent.
    fun loadTestCustomers(customerRepository: CustomerRepository) = CommandLineRunner {
        if (customerRepository.count() == 0L) {
            val customers = listOf(
                Customer(
                    firstName = "Anna",
                    lastName = "Nowak",
                    pesel = "92030512345",
                    email = "anna.nowak@example.com",
                    phoneNumber = "123-456-789"
                ),
                Customer(
                    firstName = "Marek",
                    lastName = "Kowalski",
                    pesel = "85061754321",
                    email = "marek.kowalski@example.com",
                    phoneNumber = "987-654-321"
                )
            )

            customerRepository.saveAll(customers)
            println("Inserted ${customers.size} test customers.")
        } else {
            println("Customer test data already in DB")
        }
    }

    @Bean
    fun loadTestCars(carRepository: CarRepository) = CommandLineRunner {
        if (carRepository.count().toInt() == 0) {
            val cars = listOf(
                Car(
                    brand = "Toyota",
                    model = "Corolla",
                    manufactureYear = 2020,
                    registrationNumber = "ABC123",
                    automaticGearbox = true
                ),
                Car(
                    brand = "Honda",
                    model = "Civic",
                    manufactureYear = 2019,
                    registrationNumber = "XYZ456",
                    automaticGearbox = false
                ),
                Car(
                    brand = "Ford",
                    model = "Focus",
                    manufactureYear = 2021,
                    registrationNumber = "FOC789",
                    automaticGearbox = true
                ),
                Car(
                    brand = "BMW",
                    model = "3 Series",
                    manufactureYear = 2018,
                    registrationNumber = "BMW321",
                    automaticGearbox = false
                ),
                Car(
                    brand = "Audi",
                    model = "A4",
                    manufactureYear = 2022,
                    registrationNumber = "AUD654",
                    automaticGearbox = true
                )
            )

            carRepository.saveAll(cars)
            println("Inserted ${cars.size} test cars.")
        } else {
            println("Car test data already in DB")
        }
    }
}