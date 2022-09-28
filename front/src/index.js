import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContext from "./common/context/AuthContext";
import WithInterceptor from "./common/hoc/WithInterceptor";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthContext>
      <WithInterceptor>
        <App />
      </WithInterceptor>
    </AuthContext>
  </Router>
);
