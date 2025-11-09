import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import CarGallery from "./components/CarGallery";
import ChatBot from "./components/ChatBot";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import IntroAnimation from "./components/IntroAnimation";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <IntroAnimation>
        <div className="app-content">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<CarGallery />} />
              <Route path="/chat" element={<ChatBot />} />
              <Route path="/assistant" element={<ChatBot />} />
              <Route path="/catalog" element={<Catalog />} />
            </Routes>
          </BrowserRouter>
        </div>
      </IntroAnimation>
    </ThemeProvider>
  );
}

export default App;
