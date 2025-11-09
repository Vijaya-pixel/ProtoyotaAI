import React, { useState } from "react";
import "./Assistant.css";

export default function Assistant() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Welcome. I will help you find the right Toyota model. What is the primary purpose of this vehicle? (Commute, Family, Work, Travel)" }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: generateResponse(input) }
      ]);
    }, 600);

    setInput("");
  };

  const generateResponse = (msg) => {
    msg = msg.toLowerCase();
    if (msg.includes("commute"))
      return "For commuting, efficiency and comfort matter. Top recommendations: Toyota Corolla, Toyota Camry Hybrid, Toyota Prius.";
    if (msg.includes("family"))
      return "For family needs, space and safety matter. Recommended: Toyota RAV4, Highlander, or Sienna.";
    if (msg.includes("work"))
      return "For work and utility, durability is important. Consider: Toyota Tacoma or Toyota Tundra.";
    if (msg.includes("travel"))
      return "For long travel and flexibility, consider: Toyota RAV4 Hybrid, Venza, or Grand Highlander.";

    return "Tell me your budget range next.";
  };

  return (
    <div className="assistant-wrapper">
      <div className="assistant-chat">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="assistant-input">
        <input
          type="text"
          placeholder="Send a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
