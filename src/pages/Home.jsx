// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => (
  <>
    <Navbar />

    <header className="hero">
      <div className="hero-content">
        <h1>Welcome to InstituteApp</h1>
        <p>Manage courses, students, and teachers efficiently—all in one place.</p>
        <Link to="/login" className="btn">
          Get Started
        </Link>
      </div>
    </header>

    <section className="features">
      <div className="feature-card">
        <h3>📚 Courses</h3>
        <p>Create and organize course materials with ease.</p>
      </div>
      <div className="feature-card">
        <h3>👩‍🎓 Students</h3>
        <p>Track student profiles, attendance, and progress.</p>
      </div>
      <div className="feature-card">
        <h3>👩‍🏫 Teachers</h3>
        <p>Manage teacher assignments and schedules seamlessly.</p>
      </div>
    </section>

    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} InstituteApp. All rights reserved.</p>
    </footer>
  </>
);

export default Home;
