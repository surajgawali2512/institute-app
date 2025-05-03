import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

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
        Institute Management System
      </Link>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {/* Mobile popup for Register/Login */}
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

      {/* Links below the hamburger menu in larger screens */}
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

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation(); // detects route change

//   useEffect(() => {
//     // This will re-run every time route changes
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, [location.pathname]); // rerun on route change

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     navigate("/");
//   };

//   return (
//     <nav className="navbar">
//       <Link to="/" className="navbar-logo">
//         Institute Management System
//       </Link>
//       <div className="nav-links">
//         {!isLoggedIn ? (
//           <>
//             <Link to="/register">Register Institute</Link>
//             <Link to="/login">Login</Link>
//           </>
//         ) : (
//           <button onClick={handleLogout} className="logout-button">
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
