import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

// ✅ Your Home & Catalog are inside /pages
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";

// ✅ Use ChatBot from /components
import ChatBot from "./components/ChatBot.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assistant" element={<ChatBot />} /> {/* ✅ Chat page */}
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
    </BrowserRouter>
  );
}
