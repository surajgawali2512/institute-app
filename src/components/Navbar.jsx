import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logoEdu.png"; // Make sure this path is correct

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setIsMenuOpen(false); // close menu on route change
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </Link>

      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {isMenuOpen && (
        <div className="mobile-popup">
          <div className="popup-content">
            {!isLoggedIn ? (
              <>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  Register Institute
                </Link>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="logout-button"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
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
