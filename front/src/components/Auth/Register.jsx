import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        const { name, email, password, confirmPassword } = formData;
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Name is required';
        } else if (name.length < 3 || name.length > 10) {
            newErrors.name = 'Name should be between 3 to 10 characters';
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setSuccess(true);
            setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            setErrors({});
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h4 className="card-title text-center mb-4">Register</h4>
                            <form onSubmit={handleSubmit}>
                                {/* Name */}
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                        {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    {errors.confirmPassword && (
                                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast for Success Message */}
            <ToastContainer className="p-3" position="top-end">
                <Toast bg="success" show={success} onClose={() => setSuccess(false)} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        Registration successful!{' '}
                        <Link to="/login" className="text-white text-decoration-underline">
                            Go To Login
                        </Link>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default RegisterForm;