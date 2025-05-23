import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define interface for the customer data
interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    pesel: string;
    email: string;
    phoneNumber: string;
}

const SelectCustomer: React.FC = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Fetch customers on component mount
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('/api/customers'); // Adjust endpoint as needed
                setCustomers(response.data);
            } catch (err) {
                setError('Failed to load customers. Please try again.');
                console.error('Error fetching customers:', err);
            }
        };
        fetchCustomers();
    }, []);

    // Handle selecting a customer
    const handleSelect = (customerId: number) => {
        navigate(`/reservations/new/${customerId}`);
    };

    return (
        <Container className="mt-5">
            <h2>Select a Customer</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Table hover className="mt-4">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>PESEL</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.firstName} {customer.lastName}</td>
                        <td>{customer.pesel}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phoneNumber}</td>
                        <td>
                            <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleSelect(customer.id)}
                            >
                                Select
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default SelectCustomer;