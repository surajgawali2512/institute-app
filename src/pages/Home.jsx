// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

const Home = () => (
  <>
    <Navbar />

    {/* Hero Section */}
    <section className="hero">
      <div className="hero-content">
        <h1>Institute Management System</h1>
        <p>
          Manage students, teachers, attendance, fees, exams and more — all in
          one place.
        </p>
        <Link to="/register" className="btn1">
          Get Started
        </Link>
      </div>
    </section>

    {/* Features Section */}
    <section className="features">
      <div className="feature-card">
        <h3>Student Management</h3>
        <p>Enroll, update, and track students' academic progress with ease.</p>
      </div>
      <div className="feature-card">
        <h3>Teacher Management</h3>
        <p>Assign subjects, manage schedules, and monitor performance.</p>
      </div>
      <div className="feature-card">
        <h3>Attendance Tracking</h3>
        <p>
          Daily attendance logging and insightful reporting for every user role.
        </p>
      </div>
      <div className="feature-card">
        <h3>Fee Collection</h3>
        <p>Generate fee structures, collect payments, and track dues.</p>
      </div>
      <div className="feature-card">
        <h3>Exam & Results</h3>
        <p>Schedule exams, enter marks, and auto-generate report cards.</p>
      </div>
      <div className="feature-card">
        <h3>Communication</h3>
        <p>
          Share notices and alerts with students, teachers, and parents in
          real-time.
        </p>
      </div>
    </section>

    {/* Footer */}
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} InstituteApp. All rights reserved.
      </p>
    </footer>
  </>
);

export default Home;
