import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-hero">
      {/* Animated background lines */}
      <div className="animated-lines">
        <div className="line" style={{ top: '2%', animationDelay: '-10s' }}></div>
        <div className="line" style={{ top: '6%', animationDelay: '-6.5s' }}></div>
        <div className="line" style={{ top: '10%', animationDelay: '-3s' }}></div>
        <div className="line" style={{ top: '14%', animationDelay: '-8.5s' }}></div>
        <div className="line" style={{ top: '18%', animationDelay: '-5s' }}></div>
        <div className="line" style={{ top: '22%', animationDelay: '-1.5s' }}></div>
        <div className="line" style={{ top: '26%', animationDelay: '-12s' }}></div>
        <div className="line" style={{ top: '30%', animationDelay: '-8.5s' }}></div>
        <div className="line" style={{ top: '34%', animationDelay: '-5s' }}></div>
        <div className="line" style={{ top: '38%', animationDelay: '-11.5s' }}></div>
        <div className="line" style={{ top: '42%', animationDelay: '-8s' }}></div>
        <div className="line" style={{ top: '46%', animationDelay: '-4.5s' }}></div>
        <div className="line" style={{ top: '50%', animationDelay: '-11s' }}></div>
        <div className="line" style={{ top: '54%', animationDelay: '-7.5s' }}></div>
        <div className="line" style={{ top: '58%', animationDelay: '-4s' }}></div>
        <div className="line" style={{ top: '62%', animationDelay: '-10.5s' }}></div>
        <div className="line" style={{ top: '66%', animationDelay: '-7s' }}></div>
        <div className="line" style={{ top: '70%', animationDelay: '-3.5s' }}></div>
        <div className="line" style={{ top: '74%', animationDelay: '-10s' }}></div>
        <div className="line" style={{ top: '78%', animationDelay: '-6.5s' }}></div>
        <div className="line" style={{ top: '82%', animationDelay: '-3s' }}></div>
        <div className="line" style={{ top: '86%', animationDelay: '-9.5s' }}></div>
        <div className="line" style={{ top: '90%', animationDelay: '-6s' }}></div>
        <div className="line" style={{ top: '94%', animationDelay: '-2.5s' }}></div>
        <div className="line" style={{ top: '98%', animationDelay: '-9s' }}></div>
      </div>

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
