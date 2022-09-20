import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({});
  const [loggedIn, setLoggedIn] = useState(() =>
    localStorage.getItem("user") ? true : false
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const result = await response.json();
      setLoggedIn(result.success);
      localStorage.setItem("user", result.accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loggedIn) return <Navigate to="/" />;

  return (
    <div className="login_card">
      <form onSubmit={handleFormSubmit} onChange={handleInputChange}>
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />

        <input type="submit" value="Login" />
      </form>

      <h2 style={{ margin: 0 }}>{loggedIn ? "Logged In" : "Please Login"}</h2>
    </div>
  );
}

export default Login;
