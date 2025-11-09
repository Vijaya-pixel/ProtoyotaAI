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

// Validate user input for unrealistic values
function validateInput(text) {
  const lowerText = text.toLowerCase();
  const errors = [];

  // Check for unrealistic seat numbers
  const seatMatch = text.match(/(\d+)\s*seat/i);
  if (seatMatch) {
    const seats = parseInt(seatMatch[1]);
    if (seats > 7) {
      errors.push("Toyota vehicles offer between 2 and 7 seats. The largest options (Sienna, Sequoia, Highlander, Grand Highlander) seat 7. Would that work for you?");
    } else if (seats < 1) {
      errors.push("A vehicle needs at least 2 seats. How many passengers do you need to accommodate?");
    }
  }

  // Check for unrealistic budget
  const budgetMatch = text.match(/\$?\s*(\d+)(?:,(\d+))?(?:k)?\s*(?:budget|price|cost)?/i);
  if (budgetMatch && (lowerText.includes('budget') || lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('$'))) {
    const amount = budgetMatch[2] ? 
      parseInt(budgetMatch[1] + budgetMatch[2]) : 
      (text.toLowerCase().includes('k') ? parseInt(budgetMatch[1]) * 1000 : parseInt(budgetMatch[1]));
    
    if (amount < 15000 && amount > 100) {
      errors.push("Toyota vehicles typically range from around $22,000 to $80,000. What's your realistic budget?");
    } else if (amount > 100000) {
      errors.push("Most Toyota vehicles range from $22,000 to $80,000. Looking at the premium end of that range?");
    }
  }

  // Check for unrealistic MPG
  const mpgMatch = text.match(/(\d+)\s*mpg/i);
  if (mpgMatch) {
    const mpg = parseInt(mpgMatch[1]);
    if (mpg > 140) {
      errors.push("Current Toyota vehicles offer up to 57 MPG for hybrids and 119 MPGe for electric. What's your target fuel efficiency?");
    }
  }

  return errors.length > 0 ? errors[0] : null;
}

// Function to detect if AI is making a final recommendation (1-2 models)
function extractRecommendations(message) {
  const lowerMessage = message.toLowerCase();
  
  // Check for recommendation keywords
  const hasRecommendationKeywords = 
    lowerMessage.includes('recommend') ||
    lowerMessage.includes('suggest') ||
    lowerMessage.includes('perfect fit') ||
    lowerMessage.includes('best choice') ||
    lowerMessage.includes('ideal') ||
    lowerMessage.includes('top pick') ||
    lowerMessage.includes('would be') ||
    lowerMessage.includes('great option') ||
    (lowerMessage.includes('check out') && lowerMessage.includes('the'));
  
  // Only proceed if recommendation keywords are present
  if (!hasRecommendationKeywords) {
    return [];
  }
  
  const carNames = cars.map(car => car.name);
  const recommendations = [];
  
  for (const carName of carNames) {
    // Check if car name appears in the message (case insensitive)
    if (lowerMessage.includes(carName.toLowerCase())) {
      recommendations.push(carName);
    }
  }
  
  // Only return recommendations if 1-2 models are mentioned
  return recommendations.length >= 1 && recommendations.length <= 2 ? recommendations : [];
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

    // Validate input for unrealistic values
    const validationError = validateInput(original);
    if (validationError) {
      // Show user message in UI
      const userUI = { role: "user", content: original };
      setMessages((prev) => [...prev, userUI]);
      
      // Show validation error as bot response
      const errorBot = { role: "assistant", content: validationError };
      setMessages((prev) => [...prev, errorBot]);
      
      // Add to chat history
      setChatHistory((prev) => [...prev, { role: "user", content: original }, errorBot]);
      
      setInput("");
      return;
    }

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
