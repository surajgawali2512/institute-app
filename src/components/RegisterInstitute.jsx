import React, { useState } from "react";
import "./RegisterInstitute.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

export default function RegisterInstitute() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Registering institute:", form);

      const response = await axiosInstance.post("/institutions/register", form);

      if (response.status === 200) {
        sessionStorage.setItem("email", form.email); // Save email for trial plan
        alert("Institute registered successfully!");
        navigate("/choose-plan");
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register Institute</h2>
        {error && <p className="error">{error}</p>}
        <form className="reg-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-submit">
            <button type="submit" className="btn">Register</button>
            <button
              className="back-button"
              type="button"
              onClick={() => navigate("/login")}
            >
              ← Back
            </button>
          </div>
        </form>

        {/* Add a login option for already registered users */}
        <div className="signin-link">
          <p>
            Already have an account?{" "}
            <span
              className="signin-text"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
