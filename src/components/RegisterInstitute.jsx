// import React, { useState } from 'react';
// import './RegisterInstitute.css';
// import { useNavigate } from 'react-router-dom';

// export default function RegisterInstitute() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: '',
//     address: '',
//     email: '',
//     phone: '',
//     username: '',
//     password: '',
//     startDate: '',
//     endDate: '',
//     status: '',
//     dbName: ''
//   });

//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prevForm) => ({
//       ...prevForm,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log('Registering institute:', form);
//       alert('Institute registered successfully!');
//       navigate('/');
//     } catch (err) {
//       setError('Registration failed');
//     }
//   };

//   return (
//     <div className="register-container">
//       {/* 👇 Back Button */}
//       <button className="back-button" onClick={() => navigate('/')}>
//         ← Back
//       </button>

//       <form className="reg-form" onSubmit={handleSubmit}>
//         <h2>Register Institute</h2>
//         {error && <p className="error">{error}</p>}
//         <div className="form-grid">
//           {/* form inputs remain unchanged */}
//           <div className="form-group">
//             <label>Name</label>
//             <input name="name" value={form.name} onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Address</label>
//             <input name="address" value={form.address} onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Email</label>
//             <input type="email" name="email" value={form.email} onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Phone</label>
//             <input name="phone" value={form.phone} onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Username</label>
//             <input name="username" value={form.username} onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <input type="password" name="password" value={form.password} onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Start Date</label>
//             <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>End Date</label>
//             <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
//           </div>

//           <div className="form-group">
//             <label>Status</label>
//             <input name="status" value={form.status} onChange={handleChange} required />
//           </div>

//           <div className="form-group">
//             <label>Database Name</label>
//             <input name="dbName" value={form.dbName} onChange={handleChange} required />
//           </div>
//         </div>

//         <div className="form-submit">
//           <button type="submit">Register</button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import "./RegisterInstitute.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 👈 import axios

export default function RegisterInstitute() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    startDate: "",
    endDate: "",
    status: "",
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

      const response = await axios.post(
        "http://localhost:8081/institutions/register",
        form
      ); // 👈 API call

      if (response.status === 200) {
        alert("Institute registered successfully!");
        navigate("/");
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
      {/* 👇 Back Button */}

      <form className="reg-form" onSubmit={handleSubmit}>
        <h2>Register Institute</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-grid">
          {/* Form inputs */}
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

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <input
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className="form-group">
            <label>Database Name</label>
            <input
              name="dbName"
              value={form.dbName}
              onChange={handleChange}
              required
            />
          </div> */}
        </div>

        <div className="form-submit">
          <button type="submit">Register</button>
          <button className="back-button" onClick={() => navigate("/")}>
            ← Back
          </button>
        </div>
      </form>
    </div>
  );
}
