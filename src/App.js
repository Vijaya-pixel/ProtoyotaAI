import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
=======
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar.jsx";
>>>>>>> e5eab1dbeb1b57551fda1adc5df54b7dc7275216

import Navbar from "./components/Navbar";
import CarGallery from "./components/CarGallery";
import ChatBot from "./components/ChatBot";
import Home from "./pages/Home";

import IntroAnimation from "./components/IntroAnimation";
import "./App.css";

function App() {
  return (
<<<<<<< HEAD
    <IntroAnimation>
      <div className="app-content">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<CarGallery />} />
            <Route path="/chat" element={<ChatBot />} />
          </Routes>
        </BrowserRouter>
      </div>
    </IntroAnimation>
=======
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assistant" element={<ChatBot />} /> {/* ✅ Chat page */}
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
>>>>>>> e5eab1dbeb1b57551fda1adc5df54b7dc7275216
  );
}

export default App;
