// Homepage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Homepage() {
  const date = new Date();
  const currentyear=date.getFullYear();
  return (
    <div className="home-container">
      <header className="header">
        <h1>CampusCritique</h1>
      </header>

      <main className="home-main">
        <div className="welcome-box">
          <h1>Welcome to CampusCritique</h1>
          <p>
            Explore a world of possibilities and discover the amazing features
            our website has to offer. Whether you're looking for information,
            entertainment, or connection, we've got you covered!
          </p>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; {currentyear} Adhyan Agarwal and Arnab Dutta</p>
      </footer>
    </div>
  );
}

export default Homepage;
