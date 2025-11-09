import React from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="nav">
      <div className="nav-left">
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
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
