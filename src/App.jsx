// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterInstitute from "./components/RegisterInstitute";
import NotFound from "./pages/NotFound";
import Courses from "./components/Courses";
import ChoosePlan from "./components/ChoosePlan";
import useIdleTimer from "./services/useIdleTimer"; // Import your custom hook

const App = () => {
  useIdleTimer(); // Call the hook here to start monitoring user activity

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterInstitute />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/choose-plan" element={<ChoosePlan />} />
    </Routes>
  );
};

export default App;
