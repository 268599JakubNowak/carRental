import React, { useState, FormEvent } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define interface for the form data
interface FormData {
    customerPesel: string;
    startDate: string;
    endDate: string;
}

const CreateReservation: React.FC = () => {
    // State for form data
    const [formData, setFormData] = useState<FormData>({
        customerPesel: '',
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
        if (!formData.customerPesel || !formData.startDate || !formData.endDate) {
            setError('Please fill in all fields.');
            return;
        }

        // Validate PESEL (basic 11-digit check)
        if (!/^\d{11}$/.test(formData.customerPesel)) {
            setError('PESEL must be an 11-digit number.');
            return;
        }

        // Validate dates
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time for comparison
        if (start < today) {
            setError('Start date cannot be in the past.');
            return;
        }
        if (end <= start) {
            setError('End date must be after start date.');
            return;
        }

        try {
            // Replace with your API endpoint
            const response = await fetch('/reservations/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Search successful');
                // Redirect or update state as needed
                window.location.href = `/reservations/results?start=${formData.startDate}&end=${formData.endDate}&pesel=${formData.customerPesel}`;
            } else {
                const errorText = await response.text();
                setError(errorText || 'Failed to search available cars.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Create New Reservation</h2>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="customerPesel">
                    <Form.Label>Customer PESEL:</Form.Label>
                    <Form.Control
                        type="text"
                        name="customerPesel"
                        value={formData.customerPesel}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="startDate">
                    <Form.Label>Start Date:</Form.Label>
                    <Form.Control
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="endDate">
                    <Form.Label>End Date:</Form.Label>
                    <Form.Control
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Search Available Cars
                </Button>
            </Form>
        </Container>
    );
};

export default CreateReservation;