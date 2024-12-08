import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PrivateRoutes from "./common/privateRoutes";
import { authContext } from "./common/context/AuthContext";
import privateInstance from "./common/api/privateApi";
import Loader from "./common/components/Loader";

function App() {
  const { authenticate, logout } = useContext(authContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await privateInstance.get("/refresh");
        const { data } = response;
        if (data.success) {
          authenticate(data.success); // Store the token
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <Loader />; // Loading state while checking auth

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="" element={<Home />} />
          <Route path="/about" element={<h1>About</h1>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;