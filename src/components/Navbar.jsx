import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // if token exists, user is logged in
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    setIsLoggedIn(false);
    navigate("/login"); // redirect to login page
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        InstituteApp
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/register">Register Institute</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
