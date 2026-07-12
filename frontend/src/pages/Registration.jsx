import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Phone } from 'lucide-react';
import './Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', formData);
    // Backend integration will go here
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h2>Create Account</h2>
        <p>Join GroceryFresh for a better shopping experience</p>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="name-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="+880 1XXX XXXXXX"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="terms">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>
            </label>
          </div>

          <button type="submit" className="signup-btn">Create Account</button>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
