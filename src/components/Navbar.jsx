import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="nav-logo">Protoyota</Link>
      </div>

      <div className="nav-links">
        <Link to="/assistant">AI Advisor</Link>
        <Link to="/catalog">Browse Models</Link>
      </div>
    </nav>
  );
}
