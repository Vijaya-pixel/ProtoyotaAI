import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CarGallery from "./components/CarGallery";
import ChatBot from "./components/ChatBot";
import Home from "./pages/Home";

import IntroAnimation from "./components/IntroAnimation";
import "./App.css";

function App() {
  return (
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
  );
}

export default App;
