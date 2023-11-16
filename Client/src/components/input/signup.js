import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',    
    email: '',    
    password: '',
    error: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email.endsWith('@kiit.ac.in')) {
      setFormData({ ...formData, error: 'Email must end with @kiit.ac.in' });
      return;
    }
    if (password.length < 8) {
      setFormData({ ...formData, error: 'Password must have at least 8 characters' });
      return;
    }
    
    console.log("Submitted data:", { email, password });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, error: '' });
  }

  return (
    <div className="container-login">
      <div className="wrapper">
        <div className="title"><span>Signup Form</span></div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Username"
              required
              autoComplete="name"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              required
              autoComplete='gmail'
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="row button">
            <input type="submit" value="Signup" />
          </div>
          <div className="signup-link">Already a member? <Link to="/login">Login now</Link></div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
