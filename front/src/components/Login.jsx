import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authContext } from "../common/context/AuthContext";
import privateInstance from "../common/api/privateApi";
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const { authenticate } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await privateInstance.post("/login", credentials);
      if (response.data.success) {
        authenticate(response.data.success);
        const redirectTo = location.state?.from?.pathname || "/";
        navigate(redirectTo); // Redirect to the intended route or home
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="login_card">
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="username"
          placeholder="Email"
          value={credentials.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleInputChange}
          required
        />
        <input type="submit" value={"Login"} />
      </form>
    </div>
  );
};

export default Login;