import React, { useState, FormEvent } from 'react';
import { Container, Form, Button, FormControl, FormCheck } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define the Car interface
interface Car {
    brand: string;
    model: string;
    manufactureYear: number;
    registrationNumber: string;
    automaticGearbox: boolean;
}

// Define the Errors interface for validation feedback
interface Errors {
    brand?: string;
    model?: string;
    manufactureYear?: string;
    registrationNumber?: string;
}

const AddCar: React.FC = () => {
    // State for form data
    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        manufactureYear: 1950,
        registrationNumber: '',
        automaticGearbox: false,
    });

    // State for validation errors
    const [errors, setErrors] = useState<Errors>({});

    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setCar((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Clear error for the field being edited
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    // Basic validation
    const validateForm = (): Errors => {
        const newErrors: Errors = {};
        if (!car.brand.trim()) newErrors.brand = 'Brand is required';
        if (!car.model.trim()) newErrors.model = 'Model is required';
        if (
            car.manufactureYear < 1950 ||
            car.manufactureYear > 2025 ||
            isNaN(car.manufactureYear)
        ) {
            newErrors.manufactureYear = 'Year must be between 1950 and 2025';
        }
        if (!car.registrationNumber.trim())
            newErrors.registrationNumber = 'Registration number is required';
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
            const response = await fetch('/cars', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(car),
            });

            if (response.ok) {
                console.log('Car added successfully');
                // Reset form
                setCar({
                    brand: '',
                    model: '',
                    manufactureYear: 1950,
                    registrationNumber: '',
                    automaticGearbox: false,
                });
                setErrors({});
            } else {
                console.error('Failed to add car');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">🚗 Add New Car</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <FormControl
                        type="text"
                        name="brand"
                        value={car.brand}
                        onChange={handleChange}
                        placeholder="Enter car brand"
                        isInvalid={!!errors.brand}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.brand}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="model">
                    <Form.Label>Model</Form.Label>
                    <FormControl
                        type="text"
                        name="model"
                        value={car.model}
                        onChange={handleChange}
                        placeholder="Enter car model"
                        isInvalid={!!errors.model}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.model}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="manufactureYear">
                    <Form.Label>Manufacture Year</Form.Label>
                    <FormControl
                        type="number"
                        name="manufactureYear"
                        value={car.manufactureYear}
                        onChange={handleChange}
                        placeholder="Enter manufacture year (1950-2025)"
                        min={1950}
                        max={2025}
                        isInvalid={!!errors.manufactureYear}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.manufactureYear}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="registrationNumber">
                    <Form.Label>Registration Number</Form.Label>
                    <FormControl
                        type="text"
                        name="registrationNumber"
                        value={car.registrationNumber}
                        onChange={handleChange}
                        placeholder="Enter registration number"
                        isInvalid={!!errors.registrationNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.registrationNumber}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <FormCheck
                        type="checkbox"
                        id="automaticGearbox"
                        name="automaticGearbox"
                        label="Automatic Gearbox"
                        checked={car.automaticGearbox}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Add Car
                </Button>
            </Form>
        </Container>
    );
};

export default AddCar;