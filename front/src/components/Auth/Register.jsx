import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import privateInstance from '../../common/api/privateApi';
import { useNavigate } from 'react-router-dom'; // For navigation after login
import { FaLock, FaMailBulk, FaUser } from 'react-icons/fa';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [response, setResponse] = useState({});
    const navigate = useNavigate();

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
            (async () => {
                try {
                    const response = await privateInstance.post("/register", formData);
                    if (response.data.success && response.status === 200) {
                        setShowToast(true);
                        setResponse({
                            type: 'sucess',
                            heading: 'Success',
                            message: 'Registration Successful..!'
                        })
                        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                        setErrors({});
                        const redirectTo = "/login";
                        setTimeout(() => {
                            navigate(redirectTo); // Redirect to the intended route or /
                        }, 2000);

                    } else {
                        setShowToast(true);
                        setResponse({
                            type: 'danger',
                            heading: 'Error',
                            message: 'Opps..! Something went wrong'
                        })
                    }
                } catch (err) {
                    setShowToast(true);
                    setResponse({
                        type: 'danger',
                        heading: 'Error',
                        message: 'Opps..! Something went wrong'
                    })
                }
            })()
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
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaUser />
                                        </span>

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
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>

                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaMailBulk />
                                        </span>
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
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>

                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaLock />
                                        </span>
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
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaLock />
                                        </span>
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
                                </div>

                                {/* Submit Button */}
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Register
                                    </button>
                                </div>

                                <div className="text-center mt-3">
                                    <p>
                                        Already have an account?{' '}
                                        <Link to="/login" className="text-decoration-none">
                                            Login
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >

            {/* Toast for Success Message */}
            < ToastContainer className="p-3" position="top-end" >
                <Toast bg={response?.type} show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">{response?.heading}</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        {response?.message}
                    </Toast.Body>
                </Toast>
            </ToastContainer >
        </div >
    );
};

export default RegisterForm;