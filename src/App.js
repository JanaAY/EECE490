import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?', reasoned: true }
  ]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = () => {
    if (!userInput.trim()) return;

    const newMsg = { sender: 'user', text: userInput };
    setMessages([...messages, newMsg]);

    setTimeout(() => {
      const botResponse = {
        sender: 'bot',
        text: "Sorry, I can't answer that yet. Please try another question.",
        reasoned: true,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 800);

    setUserInput('');
  };

  return (
    <div className="app-layout">
      <header className="navbar">
        <div className="brand">Logo</div>
        <div className="auth-buttons">
          <button className="nav-btn">Log In</button>
          <button className="nav-btn signup">Sign Up</button>
        </div>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <div className="tab active">Feature 2</div>
          <div className="tab">Feature 3</div>
          <div className="tab">Feature 4</div>
        </aside>

        <div className="chat-wrapper">
          <div className="chat-area">
            {messages.map((msg, i) => (
              <div key={i} className={`message-row ${msg.sender}`}>
                {msg.reasoned && msg.sender === 'bot' && (
                  <div className="reasoned">Reasoned for a few seconds</div>
                )}
                <div className="bubble">{msg.text}</div>
              </div>
            ))}
          </div>

          <div className="input-area">
            <input
              type="text"
              placeholder="Say something..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>⬆</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
