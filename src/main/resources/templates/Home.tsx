import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Define interface for the component props (none in this case)
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [successMessages, setSuccessMessages] = useState<{
        carAdded: boolean;
        customerAdded: boolean;
        reservationAdded: boolean;
    }>({
        carAdded: searchParams.get('carAdded') === 'true',
        customerAdded: searchParams.get('customerAdded') === 'true',
        reservationAdded: searchParams.get('reservationAdded') === 'true',
    });

    // Clear success messages after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMessages({ carAdded: false, customerAdded: false, reservationAdded: false });
        }, 5000);
        return () => clearTimeout(timer);
    }, [successMessages]);

    // Handle navigation
    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <Container className="mt-5" style={{ background: '#f8f9fa' }}>
            {successMessages.carAdded && (
                <Alert variant="success" className="text-center" role="alert">
                    ✅ Car has been added successfully!
                </Alert>
            )}
            {successMessages.customerAdded && (
                <Alert variant="success" className="text-center" role="alert">
                    ✅ Customer has been added successfully!
                </Alert>
            )}
            {successMessages.reservationAdded && (
                <Alert variant="success" className="text-center mt-3" role="alert">
                    ✅ Reservation created successfully!
                </Alert>
            )}

            <div
                className="hero text-center p-4 shadow"
                style={{
                    background: 'linear-gradient(to right, #007bff, #00bfff)',
                    color: 'white',
                    borderRadius: '15px',
                }}
            >
                <h1 className="display-4 fw-bold">🚗 Welcome to CarRental</h1>
                <p className="lead mt-3">Manage your fleet, customers, and reservations with ease.</p>
                <button
                    className="btn btn-light btn-custom mt-4"
                    style={{ fontSize: '1.2rem', padding: '12px 30px' }}
                    onClick={() => handleNavigate('/cars/new')}
                >
                    ➕ Add New Car
                </button>
                <button
                    className="btn btn-light btn-custom mt-4"
                    style={{ fontSize: '1.2rem', padding: '12px 30px' }}
                    onClick={() => handleNavigate('/customers/new')}
                >
                    👤 Add New Customer
                </button>
                <button
                    className="btn btn-light btn-custom mt-4"
                    style={{ fontSize: '1.2rem', padding: '12px 30px' }}
                    onClick={() => handleNavigate('/reservations/new')}
                >
                    📅 New Reservation
                </button>
                <button
                    className="btn btn-light btn-custom mt-4"
                    style={{ fontSize: '1.2rem', padding: '12px 30px' }}
                    onClick={() => handleNavigate('/reservations/customer/search')}
                >
                    👁️ View Customer Reservations
                </button>
            </div>

            <div className="text-center mt-5 text-muted">
                <p>© 2025 CarRental Inc. | All rights reserved</p>
            </div>
        </Container>
    );
};

export default Home;