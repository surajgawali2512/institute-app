// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
 import RegisterInstitute from './components/RegisterInstitute';
import NotFound from './pages/NotFound';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
+   <Route path="/register" element={<RegisterInstitute />} />

    <Route path="/login" element={<Login />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
