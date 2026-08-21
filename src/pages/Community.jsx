import React, { useState, useEffect } from 'react';
import { Send, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Community.css';

const initialMessages = [
  { id: 1, user: 'Amandi Silva', role: 'Mentor', content: 'Welcome to the BridgeEd community everyone! Feel free to ask any questions about university transition here.', timestamp: '10:00 AM' },
  { id: 2, user: 'Dilshan Fernando', role: 'Mentor', content: 'Yes, we are here to help! Time management is usually the biggest challenge for freshers.', timestamp: '10:15 AM' },
  { id: 3, user: 'Nuwan P.', role: 'Fresher', content: 'Hi! Can someone recommend good resources for Engineering Math?', timestamp: '10:30 AM' },
];

const Community = () => {
  const { user, openSignInModal } = useAuth();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!user) {
      openSignInModal();
      return;
    }
    
    if (newMessage.trim() === '') return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const msg = {
      id: messages.length + 1,
      user: user.name,
      role: user.role,
      content: newMessage,
      timestamp: timeString
    };

    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="community-page page-container">
      <div className="container">
        <div className="page-header text-center mb-8 animate-fade-in-up">
          <h1 className="page-title">Community Hub</h1>
          <p className="page-subtitle">Connect, ask questions, and grow together.</p>
        </div>

        <div className="chat-container glass-card mx-auto animate-fade-in-up delay-100">
          <div className="chat-feed">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`chat-bubble-wrapper ${user && user.name === msg.user ? 'sent' : 'received'}`}
              >
                <div className="chat-avatar">
                  <UserCircle size={32} />
                </div>
                <div className="chat-bubble">
                  <div className="chat-meta">
                    <span className="chat-user">{msg.user}</span>
                    <span className="badge-small">{msg.role}</span>
                    <span className="chat-time">{msg.timestamp}</span>
                  </div>
                  <p className="chat-content">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input-area border-t pt-4 mt-4">
            {user ? (
              <form onSubmit={handleSendMessage} className="chat-form">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="chat-input"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="btn btn-primary btn-icon">
                  <Send size={18} />
                </button>
              </form>
            ) : (
              <div className="login-prompt">
                <p>You must be signed in to send messages.</p>
                <button className="btn btn-primary" onClick={openSignInModal}>Sign In to Chat</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
