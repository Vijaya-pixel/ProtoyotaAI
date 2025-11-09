import React, { useEffect, useState } from "react";
import "./IntroAnimation.css";

export default function IntroAnimation({ children }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    console.log("[IntroAnimation] mounted  showing intro");
    const timer = setTimeout(() => {
      console.log("[IntroAnimation] hiding intro now");
      setShow(false);
    }, 3800);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return children;

  return (
    <div className="intro-container">
      <div className="intro-image-wrapper">
        <img 
          src="/supra-outline2.png" 
          alt="Toyota Supra"
          className="supra-outline"
        />
      </div>
      <h1 className="intro-title">Toyota Advisor</h1>
    </div>
  );
}
