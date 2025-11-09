import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-left">
      </div>

      <div className="nav-center">
        <Link to="/" className="nav-logo">Protoyota v0.67</Link>
      </div>

      <div className="nav-right">
        <Link to="/assistant">AI Advisor</Link>
        <Link to="/catalog">Browse Models</Link>
      </div>
    </nav>
  );
}
