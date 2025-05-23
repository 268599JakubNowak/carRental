import React, { useState, FormEvent } from 'react';
import { Container, Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define the Customer interface
interface Customer {
    firstName: string;
    lastName: string;
    pesel: string;
    email: string;
    phoneNumber: string;
}

// Define the Errors interface for validation feedback
interface Errors {
    firstName?: string;
    lastName?: string;
    pesel?: string;
    email?: string;
    phoneNumber?: string;
}

const AddCustomer: React.FC = () => {
    // State for form data
    const [customer, setCustomer] = useState<Customer>({
        firstName: '',
        lastName: '',
        pesel: '',
        email: '',
        phoneNumber: '',
    });

    // State for validation errors
    const [errors, setErrors] = useState<Errors>({});

    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setCustomer((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error for the field being edited
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    // Basic validation
    const validateForm = (): Errors => {
        const newErrors: Errors = {};
        const letterPattern = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/;
        const peselPattern = /^\d{11}$/;
        const phonePattern = /^\d{9}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!customer.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        } else if (!letterPattern.test(customer.firstName)) {
            newErrors.firstName = 'First name must contain only letters';
        }

        if (!customer.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        } else if (!letterPattern.test(customer.lastName)) {
            newErrors.lastName = 'Last name must contain only letters';
        }

        if (!customer.pesel.trim()) {
            newErrors.pesel = 'PESEL is required';
        } else if (!peselPattern.test(customer.pesel)) {
            newErrors.pesel = 'PESEL must be an 11-digit number';
        }

        if (!customer.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailPattern.test(customer.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!customer.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!phonePattern.test(customer.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be a 9-digit number';
        }

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            // Replace with your API endpoint
            const response = await fetch('/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer),
            });

            if (response.ok) {
                console.log('Customer added successfully');
                // Reset form
                setCustomer({
                    firstName: '',
                    lastName: '',
                    pesel: '',
                    email: '',
                    phoneNumber: '',
                });
                setErrors({});
            } else {
                console.error('Failed to add customer');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">👤 Add New Customer</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <FormControl
                        type="text"
                        name="firstName"
                        value={customer.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name (only letters)"
                        isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <FormControl
                        type="text"
                        name="lastName"
                        value={customer.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name (only letters)"
                        isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="pesel">
                    <Form.Label>PESEL</Form.Label>
                    <FormControl
                        type="text"
                        name="pesel"
                        value={customer.pesel}
                        onChange={handleChange}
                        placeholder="Enter 11-digit PESEL number"
                        maxLength={11}
                        isInvalid={!!errors.pesel}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.pesel}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <FormControl
                        type="email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <FormControl
                        type="text"
                        name="phoneNumber"
                        value={customer.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter 9-digit phone number"
                        maxLength={9}
                        isInvalid={!!errors.phoneNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.phoneNumber}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Add Customer
                </Button>
            </Form>
        </Container>
    );
};

export default AddCustomer;