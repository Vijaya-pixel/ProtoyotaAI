import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-hero">
      <div className="home-overlay">
        <div className="home-content">
          <h1>Are You Ready to Find Your Toyota?</h1>
          <p>Your perfect vehicle is just a few clicks away.</p>

          <div className="home-actions">
            <Link to="/assistant" className="home-action-card">
              <h2>AI Vehicle Advisor</h2>
              <p>Answer a few questions to receive personalized recommendations.</p>
            </Link>

            <Link to="/catalog" className="home-action-card">
              <h2>Browse Models</h2>
              <p>View specifications, compare models, and explore pricing.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
