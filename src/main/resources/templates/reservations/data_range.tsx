import React, { useState, FormEvent } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define interfaces for the data
interface Customer {
    id: number;
    firstName: string;
    lastName: string;
}

interface FormData {
    startDate: string;
    endDate: string;
}

interface DateRangeProps {
    customer: Customer;
}

const DateRange: React.FC<DateRangeProps> = ({ customer }) => {
    // State for form data
    const [formData, setFormData] = useState<FormData>({
        startDate: '',
        endDate: '',
    });

    // State for error message
    const [error, setError] = useState<string | null>(null);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!formData.startDate || !formData.endDate) {
            setError('Please fill in both start and end dates.');
            return;
        }

        // Validate dates (e.g., end date should be after start date)
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        if (end <= start) {
            setError('End date must be after start date.');
            return;
        }

        try {
            // Replace with your API endpoint
            const response = await fetch(`/reservations/search/${customer.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Search successful');
                // Redirect or update state as needed
                window.location.href = `/reservations/results?start=${formData.startDate}&end=${formData.endDate}&id=${customer.id}`;
            } else {
                const errorText = await response.text();
                setError(errorText || 'Failed to search reservations.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Rental Dates for {customer.firstName} {customer.lastName}</h2>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="startDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="endDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Search Cars
                </Button>
            </Form>
        </Container>
    );
};

export default DateRange;