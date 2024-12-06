import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // For navigation after login
import { Toast, ToastContainer } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { authContext } from '../../common/context/AuthContext';
import privateInstance from '../../common/api/privateApi';


const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const { authenticate } = useContext(authContext);
  const location = useLocation();
  const navigate = useNavigate();

  const validateForm = () => {
    const { email, password } = formData;
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await privateInstance.post("/login", formData);
      if (response.data.success) {
        setSuccess(true);
        authenticate(response.data.success);
        const redirectTo = location.state?.from?.pathname || "/";
        setTimeout(() => {
          navigate(redirectTo); // Redirect to the intended route or /
        }, 2000);
      } else {
        setErrors({
          authenticate: "Invalid credentials"
        });
      }
    } catch (err) {
      setErrors({
        authenticate: `Login failed: ${err}`
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleLogin(e);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h4 className="card-title text-center mb-4">Login</h4>
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                {/* Remember Me */}
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>

                {/* Submit Button */}
                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>

                <div className="d-grid mb3">
                  {errors.authenticate && <div className="invalid-feedback">{errors.authenticate}</div>}
                </div>

                {/* Links */}
                <div className="text-center">
                  <p>
                    <a href="/forgot-password" className="text-decoration-none">
                      Forgot Password?
                    </a>
                  </p>
                  <p>
                    Don't have an account?{' '}
                    <a href="/register" className="text-decoration-none">
                      Register
                    </a>
                  </p>
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
          <Toast.Body className="text-white">Login successful! Redirecting to Home...</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default LoginForm;