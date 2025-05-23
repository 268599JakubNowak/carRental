import React, { useState, FormEvent } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define interfaces for the data
interface Car {
    id: number;
    brand: string;
    model: string;
    manufactureYear: number;
    automaticGearbox: boolean;
}

interface FormData {
    customerPesel: string;
    startDate: string;
    endDate: string;
    selectedCarId: number | null;
}

interface SelectCarProps {
    customer: {
        firstName: string;
        lastName: string;
    };
    availableCars: Car[];
    initialFormData: {
        customerPesel: string;
        startDate: string;
        endDate: string;
    };
}

const SelectCar: React.FC<SelectCarProps> = ({ customer, availableCars, initialFormData }) => {
    // State for form data
    const [formData, setFormData] = useState<FormData>({
        ...initialFormData,
        selectedCarId: null,
    });

    // Handle radio button change
    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            selectedCarId: Number(e.target.value),
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (formData.selectedCarId === null) {
            alert('Please select a car.');
            return;
        }

        try {
            // Replace with your API endpoint
            const response = await fetch('/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Reservation confirmed');
                // Redirect or update state as needed
                window.location.href = `/reservations/confirmation?carId=${formData.selectedCarId}&pesel=${formData.customerPesel}&start=${formData.startDate}&end=${formData.endDate}`;
            } else {
                const errorText = await response.text();
                alert(errorText || 'Failed to confirm reservation.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <Container className="mt-5">
            <h2>Available Cars for {customer.firstName} {customer.lastName}</h2>

            <Form onSubmit={handleSubmit}>
                <input type="hidden" name="customerPesel" value={formData.customerPesel} />
                <input type="hidden" name="startDate" value={formData.startDate} />
                <input type="hidden" name="endDate" value={formData.endDate} />

                <Table striped className="mt-4">
                    <thead>
                    <tr>
                        <th>Select</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Gearbox</th>
                    </tr>
                    </thead>
                    <tbody>
                    {availableCars.map((car) => (
                        <tr key={car.id}>
                            <td>
                                <Form.Check
                                    type="radio"
                                    name="selectedCarId"
                                    value={car.id}
                                    checked={formData.selectedCarId === car.id}
                                    onChange={handleRadioChange}
                                    required
                                />
                            </td>
                            <td>{car.brand}</td>
                            <td>{car.model}</td>
                            <td>{car.manufactureYear}</td>
                            <td>{car.automaticGearbox ? 'Automatic' : 'Manual'}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

                <Button type="submit" variant="success">
                    Confirm Reservation
                </Button>
            </Form>
        </Container>
    );
};

export default SelectCar;