import { useContext, useEffect } from "react";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PrivateRoutes from "./common/privateRoutes";
import { authContext } from "./common/context/AuthContext";
import privateInstance from "./common/api/privateApi";

function App() {
  const { authenticate, logout } = useContext(authContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await privateInstance.get("/refresh");
        const { data } = response;
        if (data.success) {
          authenticate(data.token);
        } else {
          logout();
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="" element={<Home />} />
          <Route path="/about" element={<h1>About</h1>} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
