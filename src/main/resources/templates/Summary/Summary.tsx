import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface SummaryStats {
    mostPopularCar: { model: string; registrationNumber: string } | null;
    longestRental: { car: { model: string }; client: { firstName: string; lastName: string } } | null;
    shortestRental: { car: { model: string }; client: { firstName: string; lastName: string } } | null;
}

const Summary: React.FC = () => {
    const [stats, setStats] = useState<SummaryStats>({
        mostPopularCar: null,
        longestRental: null,
        shortestRental: null,
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/summary', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
            .then((res) => {
                if (!res.ok) throw new Error('Błąd podczas pobierania danych');
                return res.json();
            })
            .then((data) => setStats(data))
            .catch((err) => setError(err.message));
    }, []);

    return (
        <Container className="mt-5" style={{ background: '#f8f9fa' }}>
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <div
                        className="summary-container text-center p-4"
                        style={{
                            background: 'linear-gradient(to right, #007bff, #00bfff)',
                            color: 'white',
                            borderRadius: '15px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h1 className="display-6 fw-bold">📊 Podsumowanie</h1>
                        <p className="lead mt-3">Statystyki wypożyczalni</p>
                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                        <div className="mt-4">
                            <h3 className="fw-bold">Najczęściej wypożyczany samochód</h3>
                            {stats.mostPopularCar ? (
                                <p>{`${stats.mostPopularCar.model} (${stats.mostPopularCar.registrationNumber})`}</p>
                            ) : (
                                <p>Brak danych</p>
                            )}
                            <h3 className="fw-bold mt-3">Najdłuższe wypożyczenie</h3>
                            {stats.longestRental ? (
                                <p>{`${stats.longestRental.car.model} przez ${stats.longestRental.client.firstName} ${stats.longestRental.client.lastName}`}</p>
                            ) : (
                                <p>Brak danych</p>
                            )}
                            <h3 className="fw-bold mt-3">Najkrótsze wypożyczenie</h3>
                            {stats.shortestRental ? (
                                <p>{`${stats.shortestRental.car.model} przez ${stats.shortestRental.client.firstName} ${stats.shortestRental.client.lastName}`}</p>
                            ) : (
                                <p>Brak danych</p>
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

// Inline styles as a separate component for reusability
const styles = `
  .summary-container {
    padding: 40px 30px;
  }
`;

export default Summary;