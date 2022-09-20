import { useEffect, useState } from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <h1>header</h1>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <footer>
          <h1>footer</h1>
        </footer>
      </Router>
    </div>
  );
}

export default App;
