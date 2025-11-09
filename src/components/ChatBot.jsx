import React, { useEffect, useRef, useState } from "react";
import { Bot, User, Send, RefreshCw, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ChatBot.css";
import { generateResponse, createSystemPrompt } from "../Services/aiService";
import { cars } from "../data/cars";

// (Optional improvement) light typo normalization
function normalize(text) {
  return text
    .replace(/\bcommtue|comute\b/gi, "commute")
    .replace(/\bhybird|hibryd\b/gi, "hybrid")
    .replace(/\bsuvv\b/gi, "SUV")
    .replace(/\b(\d{2,3})k\b/gi, (_, n) => `$${n}000`) // 30k → $30000
    .trim();
}

// Function to extract recommended car names from AI response
function extractRecommendations(message) {
  const carNames = cars.map(car => car.name);
  const recommendations = [];
  
  for (const carName of carNames) {
    // Check if car name appears in the message (case insensitive)
    if (message.toLowerCase().includes(carName.toLowerCase())) {
      recommendations.push(carName);
    }
  }
  
  return recommendations;
}

export default function ChatBot() {
  const initialAssistantMessage =
    "Hi — I'm your Toyota Advisor. What will you primarily use the vehicle for? (Commute, Family, Work, Travel)";

  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { role: "assistant", content: initialAssistantMessage }
  ]);

  // ✅ THIS is the key fix — Chat history now starts with system + greeting
  const [chatHistory, setChatHistory] = useState([
    createSystemPrompt(),
    { role: "assistant", content: initialAssistantMessage }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendedCars, setRecommendedCars] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const original = input.trim();
    if (!original || loading) return;

    const cleaned = normalize(original);

    // Show user message in UI
    const userUI = { role: "user", content: original };
    setMessages((prev) => [...prev, userUI]);

    // Add normalized text to AI history
    const userAI = { role: "user", content: cleaned };
    const updatedHistory = [...chatHistory, userAI];
    setChatHistory(updatedHistory);

    setInput("");
    setLoading(true);

    // Request DeepSeek response
    const reply = await generateResponse(updatedHistory);
    const bot = { role: "assistant", content: reply };

    // Check if this message contains car recommendations
    const recommendations = extractRecommendations(reply);
    if (recommendations.length > 0) {
      setRecommendedCars(recommendations);
    }

    // Update UI
    setMessages((prev) => [...prev, bot]);

    // Update AI history
    setChatHistory((prev) => [...prev, bot]);

    setLoading(false);
  };

  const resetChat = () => {
    setMessages([{ role: "assistant", content: initialAssistantMessage }]);
    // ✅ Reset history INCLUDING greeting
    setChatHistory([
      createSystemPrompt(),
      { role: "assistant", content: initialAssistantMessage }
    ]);
    setInput("");
    setRecommendedCars([]);
  };

  const goToCatalog = () => {
    // Store recommended cars in sessionStorage
    sessionStorage.setItem('recommendedCars', JSON.stringify(recommendedCars));
    navigate('/catalog');
  };

  return (
    <div className="chat">
      <header className="chat__header">
        <div className="chat__brand">
          <Bot size={20} />
          <h2>Vehicle Advisor</h2>
        </div>
        <button className="chat__reset" onClick={resetChat}>
          <RefreshCw size={16} /> New Chat
        </button>
      </header>

      <main className="chat__body">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            <div className="msg__avatar">{m.role === "assistant" ? <Bot /> : <User />}</div>
            <div className="msg__bubble">{m.content}</div>
          </div>
        ))}

        {loading && (
          <div className="msg assistant">
            <div className="msg__avatar"><Bot /></div>
            <div className="msg__bubble">
              <div className="typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        {recommendedCars.length > 0 && !loading && (
          <div className="recommendation-button-container">
            <button className="view-catalog-button" onClick={goToCatalog}>
              <span>View {recommendedCars.length > 1 ? 'Recommendations' : 'Recommendation'} in Catalog</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </main>

      <footer className="chat__composer">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} disabled={!input.trim() || loading}>
          <Send size={18} /> Send
        </button>
      </footer>
    </div>
  );
}
