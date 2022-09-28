import { useContext, useEffect, useState } from "react";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import PrivateRoutes from "./components/common/privateRoutes";
import { authContext } from "./components/common/context/AuthContext";

function App() {
  const { authenticate, logout } = useContext(authContext);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:8081/refresh", {
          credentials: "include",
        });
        const result = await response.json();
        if (result.success) {
          authenticate(result.token);
        } else {
          logout();
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="" element={<Home />} />
            <Route path="/about" element={<h1>About</h1>} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
