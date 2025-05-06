import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Make sure this exists
import Login from "./pages/Login"; // Make sure this exists
import RegisterInstitute from "./components/RegisterInstitute"; // Ensure it's correctly imported
import NotFound from "./pages/NotFound"; // Ensure it's correctly imported for 404 pages
import Courses from "./components/Courses"; // Ensure it's correctly imported
import ChoosePlan from "./components/ChoosePlan"; // Ensure it's correctly imported
import useIdleTimer from "./services/useIdleTimer"; // Ensure it's correctly implemented
import Dashboard from "./pages/Dashboard"; // Ensure this is correctly imported

const App = () => {
  useIdleTimer(); // Call the hook here to start monitoring user activity

  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Home page */}
      <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard page */}
      <Route path="/register" element={<RegisterInstitute />} /> {/* Register Institute page */}
      <Route path="/courses" element={<Courses />} /> {/* Courses page */}
      <Route path="/login" element={<Login />} /> {/* Login page */}
      <Route path="*" element={<NotFound />} /> {/* Handle all undefined routes */}
      <Route path="/choose-plan" element={<ChoosePlan />} /> {/* Choose plan page */}
    </Routes>
  );
};

export default App;
