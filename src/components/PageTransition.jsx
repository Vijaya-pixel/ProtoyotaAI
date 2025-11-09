import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./PageTransition.css";

export default function PageTransition({ children }) {
  const location = useLocation();
  const prevLocation = useRef(location.pathname);
  
  useEffect(() => {
    prevLocation.current = location.pathname;
  }, [location.pathname]);
  
  // Determine animation direction
  const isNavigatingToCatalog = location.pathname === "/catalog" && prevLocation.current === "/";
  const animationClass = isNavigatingToCatalog ? "slide-from-right" : "slide-from-right";
  
  return (
    <div key={location.pathname} className={`page-transition ${animationClass}`}>
      {children}
    </div>
  );
}
