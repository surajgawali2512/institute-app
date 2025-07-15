import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterInstitute from "./components/RegisterInstitute";
import NotFound from "./pages/NotFound";
import Courses from "./components/Courses";
import ChoosePlan from "./components/ChoosePlan";
import useIdleTimer from "./services/useIdleTimer";
import Dashboard from "./pages/Dashboard";
import Departments from "./components/Departments"; // ✅ New import

const App = () => {
  useIdleTimer(); // Starts user idle session tracking

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<RegisterInstitute />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/login" element={<Login />} />
      <Route path="/choose-plan" element={<ChoosePlan />} />
      <Route path="/departments/:courseId" element={<Departments />} /> {/* ✅ New Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
