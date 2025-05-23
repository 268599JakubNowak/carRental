import React from 'react';
import { Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define interfaces for the data
interface Car {
    brand: string;
    model: string;
}

interface Reservation {
    car: Car;
    startDate: string;
    endDate: string;
}

interface Customer {
    firstName: string;
    lastName: string;
}

interface CustomerReservationsProps {
    customer: Customer;
    reservations: Reservation[];
}

const CustomerReservations: React.FC<CustomerReservationsProps> = ({ customer, reservations }) => {
    return (
        <Container className="mt-5">
            <h2>
                📋 Reservations for {customer.firstName} {customer.lastName}
            </h2>

            <Table bordered className="mt-4">
                <thead>
                <tr>
                    <th>Car</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
                </thead>
                <tbody>
                {reservations.map((res, index) => (
                    <tr key={index}>
                        <td>{res.car.brand} {res.car.model}</td>
                        <td>{res.startDate}</td>
                        <td>{res.endDate}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default CustomerReservations;