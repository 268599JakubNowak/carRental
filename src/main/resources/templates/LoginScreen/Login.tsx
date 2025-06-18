import React, { useState, FormEvent } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define the LoginData interface
interface LoginData {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    // State for form data
    const [loginData, setLoginData] = useState<LoginData>({
        username: '',
        password: '',
    });

    // State for validation error
    const [error, setError] = useState<string | null>(null);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError(null); // Clear error when user starts typing
    };

    // Handle form submission
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!loginData.username || !loginData.password) {
            setError('Proszę wypełnić wszystkie pola!');
            return;
        }

        // Simulate API call to /api/login
        console.log('Logging in with:', loginData);
        // Replace with actual fetch or API call
        // fetch('/api/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(loginData),
        // })
        //   .then(response => response.json())
        //   .then(data => console.log(data))
        //   .catch(error => console.error('Error:', error));
    };

    return (
        <Container className="mt-5" style={{ background: '#f8f9fa' }}>
            <Row className="justify-content-center">
                <Col md={6} lg={4}>
                    <div
                        className="login-container text-center p-4"
                        style={{
                            background: 'linear-gradient(to right, #007bff, #00bfff)',
                            color: 'white',
                            borderRadius: '15px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h1 className="display-6 fw-bold">🚗 Zaloguj się</h1>
                        <p className="lead mt-3">Dostęp do panelu CarRental</p>
                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                        <Form onSubmit={handleSubmit} className="mt-4">
                            <Form.Group className="mb-3" controlId="Username">
                                <Form.Label className="text-white">Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={loginData.username}
                                    onChange={handleChange}
                                    placeholder="Nazwa uzytkownika"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label className="text-white">Hasło</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleChange}
                                    placeholder="Wpisz hasło"
                                    required
                                />
                            </Form.Group>

                            <Button type="submit" className="btn-custom w-100" variant="light">
                                Zaloguj się
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

// Inline styles as a separate component for reusability
const styles = `
  .login-container {
    padding: 40px 30px;
  }
  .btn-custom {
    font-size: 1.2rem;
    padding: 12px 30px;
  }
`;

export default Login;