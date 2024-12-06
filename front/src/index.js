import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthContext from "./common/context/AuthContext";
import WithInterceptor from "./common/hoc/WithInterceptor";
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./index.css";

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
