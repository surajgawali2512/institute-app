// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="navbar-logo">
      InstituteApp
    </Link>
    <div className="nav-links">
      <Link to="/">Home</Link>
     <Link to="/register">Register Institute</Link>
      <Link to="/login">Login</Link>
    </div>
  </nav>
);

export default Navbar;
