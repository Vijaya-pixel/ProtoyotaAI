import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Car, RefreshCw } from 'lucide-react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: "Hello! I'm your Toyota advisor 🚗\n\nWhat's the primary purpose of this vehicle?\n\n💼 Commute | 👨‍👩‍👧‍👦 Family | 🏗️ Work | 🏔️ Adventure"
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const messagesEndRef = useRef(null);

  const toyotaModels = [
    { name: 'Corolla', category: 'Sedan', price: 22000, mpg: 35, fuelType: 'Gas', features: ['Safety Sense', 'CarPlay'], description: 'Reliable and efficient', pros: ['Great reliability', 'Fuel efficient'] },
    { name: 'RAV4', category: 'SUV', price: 32000, mpg: 30, fuelType: 'Gas', features: ['AWD', 'Cargo Space'], description: 'Best-selling SUV', pros: ['Spacious', 'AWD'] },
    { name: 'Camry Hybrid', category: 'Sedan', price: 30000, mpg: 52, fuelType: 'Hybrid', features: ['52 MPG', 'Hybrid'], description: 'Exceptional efficiency', pros: ['Outstanding MPG'] },
    { name: 'Tacoma', category: 'Truck', price: 35000, mpg: 22, fuelType: 'Gas', features: ['Off-Road', 'Towing'], description: 'Legendary truck', pros: ['Reliable', 'Off-road'] },
    { name: 'Highlander', category: 'SUV', price: 42000, mpg: 24, fuelType: 'Gas', features: ['3-Row', 'Towing'], description: 'Family hauler', pros: ['Spacious'] }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1500,
          temperature: 0.7,
          system: `You are a Toyota expert. Ask questions about: budget, use, family size, commute. After 5 exchanges recommend 2-3 models. Format: "🥇 **Model** - $price | MPG mpg\n[reasons]"`,
          messages: [...messages, userMessage].map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content }))
        })
      });

      const data = await response.json();
      const reply = data.content[0].text;
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);

      if (reply.includes('🥇')) {
        const found = toyotaModels.filter(m => reply.toLowerCase().includes(m.name.toLowerCase()));
        if (found.length > 0) setRecommendations(found.slice(0, 3));
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error! Tell me: 1) Budget? 2) Use? 3) Fuel preference?" }]);
    }
    setIsLoading(false);
  };

  const resetChat = () => {
    setMessages([{ role: 'assistant', content: "Hello! I'm your Toyota advisor 🚗\n\nWhat's the primary purpose?\n\n💼 Commute | 👨‍👩‍👧‍👦 Family | 🏗️ Work | 🏔️ Adventure" }]);
    setRecommendations(null);
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <header className="app-header">
          <div className="header-icons">
            <Car size={48} className="icon-car" />
            <h1 className="title">Find My Toyota</h1>
            <Sparkles size={48} className="icon-sparkle" />
          </div>
          <p className="subtitle">AI-Powered Car Shopping Assistant</p>
        </header>

        <div className="main-grid">
          <div className="chat-section">
            <div className="chat-container">
              <div className="chat-header">
                <div className="chat-header-left">
                  <div className="bot-avatar"><Bot size={24} /></div>
                  <div>
                    <h2 className="chat-title">Toyota Expert</h2>
                    <p className="chat-status"><span className="status-dot"></span>Online</p>
                  </div>
                </div>
                <button onClick={resetChat} className="reset-button">
                  <RefreshCw size={16} />New Chat
                </button>
              </div>

              <div className="messages-container">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`message ${msg.role}`}>
                    <div className="message-avatar">
                      {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                    </div>
                    <div className="message-content"><p>{msg.content}</p></div>
                  </div>
                ))}
                {isLoading && (
                  <div className="message assistant">
                    <div className="message-avatar"><Bot size={20} /></div>
                    <div className="message-content loading">
                      <div className="typing-dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="input-container">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                  placeholder="Type your answer..."
                  disabled={isLoading}
                  className="chat-input"
                />
                <button onClick={sendMessage} disabled={isLoading || !input.trim()} className="send-button">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>

          {recommendations && (
            <div className="recommendations-section">
              <div className="recommendations-container">
                <h3 className="recommendations-title"><Sparkles size={24} />Recommendations</h3>
                <div className="recommendations-list">
                  {recommendations.map((model, idx) => (
                    <div key={idx} className="recommendation-card">
                      <div className="card-header">
                        <div>
                          <div className="card-title-row">
                            <span className="medal">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}</span>
                            <h4>{model.name}</h4>
                          </div>
                          <p className="card-category">{model.category}</p>
                        </div>
                        <div className="card-price">
                          <div className="price">${model.price.toLocaleString()}</div>
                          <div className="mpg">{model.mpg} MPG</div>
                        </div>
                      </div>
                      <p className="card-description">{model.description}</p>
                      <div className="card-features">
                        {model.features.map((f, i) => (
                          <span key={i} className="feature-tag">{f}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;