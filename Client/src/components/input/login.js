import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import {useNavigate} from 'react-router-dom';
function UseLogin() {
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        error: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
        if (!email.endsWith('@kiit.ac.in')) {
            setFormData({ ...formData,error: 'Email must end with @kiit.ac.in' });
            return;
        }
        if (password.length < 8) {
            setFormData({ ...formData,error: 'Password must have at least 8 characters' });
            return;
        }
        console.log("Submitted data:", { email, password });
        Navigate('/dashboard');
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, error: '' });
    }

    return (
        <div className="container-login">
      <div className="wrapper">
        <div className="title"><span>Login Form</span></div>
        <form onSubmit={handleSubmit}>
        <div className="row">
            <i className="fas fa-user"></i>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              autoComplete='email'
              value={formData.email}
              onChange={handleInputChange}
              className={formData.error && !formData.email.endsWith('@kiit.ac.in') ? 'error' : ''}
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
            <input type="submit" value="Login" />
          </div>
          <div className="signup-link">Not a member? <Link to="/signup">Signup now</Link></div>
        </form>
      </div>
    </div>
  );
};

export default UseLogin;
