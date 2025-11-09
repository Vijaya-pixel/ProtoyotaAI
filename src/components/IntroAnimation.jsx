import React, { useEffect, useState } from "react";
import "./IntroAnimation.css";

export default function IntroAnimation({ children }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    console.log("[IntroAnimation] mounted → forcing intro to show");
    // ⏱ Hide after animation completes (matches CSS timing below)
    const timer = setTimeout(() => {
      console.log("[IntroAnimation] hiding intro now");
      setShow(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return children;

  return (
    <div className="intro-container">
      <div className="bg-gradient" />
      <svg
        className="car-outline"
        viewBox="0 0 1400 520"
        fill="none"
        stroke="#ff2a2a"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="
          M70 330
          Q140 320, 210 300
          Q300 270, 410 250
          Q520 235, 620 240
          Q700 245, 770 235
          Q915 210, 1040 200
          Q1105 195, 1165 210
          Q1210 220, 1250 250
          Q1275 270, 1288 295
          Q1298 315, 1284 330
          Q1265 350, 1228 355
          L310 370
          Q220 370, 180 355
          Q130 338, 90 332
          Q80 331, 70 330
          Z
        " />
      </svg>
      <h1 className="intro-title">Toyota Advisor</h1>
    </div>
  );
}
