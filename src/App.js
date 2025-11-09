import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import CarGallery from "./components/CarGallery";
import ChatBot from "./components/ChatBot";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import IntroAnimation from "./components/IntroAnimation";
import PageTransition from "./components/PageTransition";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <IntroAnimation>
        <div className="app-content">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/gallery" element={<PageTransition><CarGallery /></PageTransition>} />
              <Route path="/chat" element={<PageTransition><ChatBot /></PageTransition>} />
              <Route path="/assistant" element={<PageTransition><ChatBot /></PageTransition>} />
              <Route path="/catalog" element={<PageTransition><Catalog /></PageTransition>} />
            </Routes>
          </BrowserRouter>
        </div>
      </IntroAnimation>
    </ThemeProvider>
  );
}

export default App;
