import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import Swal from "sweetalert2";
import axiosInstance from "../services/axiosInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/institutions/login", null, {
        params: {
          email: form.username,
          password: form.password,
        },
      });
      if (response.status === 200) {
        sessionStorage.setItem("username", response.data.username);
        localStorage.setItem("token", "true");
        Swal.fire({
          title: "Logging you in...",
          text: "Successfully logged in to your account.",
          icon: "success",
          showConfirmButton: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
          timer: 1000,
        }).then(() => {
          navigate("/dashboard");
        });
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* ✅ Back button now navigates to Home */}
        <button className="back-button" onClick={() => navigate("/")}>
          <IoArrowBack /> Back
        </button>

        <h2>Welcome Back!</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username (email)"
            value={form.username}
            onChange={handleChange}
            required
            className="input-field"
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="input-field"
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {isLoading ? (
            <button className="btn loading" disabled>
              Logging in...
            </button>
          ) : (
            <button type="submit" className="btn">
              Login
            </button>
          )}

          {error && <p className="error">{error}</p>}

          <div className="options">
            <span onClick={() => navigate("/forgot-password")} className="forgot-password">
              Forgot Password?
            </span>
            <span onClick={() => navigate("/register")} className="signup">
              Don't have an account? Sign Up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
