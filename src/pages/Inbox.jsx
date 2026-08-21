import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMessages } from '../context/MessageContext';
import { Trash2, Reply, Check } from 'lucide-react';
import './Inbox.css';

const Inbox = () => {
  const { user } = useAuth();
  const { 
    getReceivedMessages, 
    getSentMessages, 
    deleteMessage, 
    replyToMessage,
    markAsRead
  } = useMessages();

  const [activeTab, setActiveTab] = useState('received');
  const [replyContent, setReplyContent] = useState({});

  if (!user) {
    return (
      <div className="inbox-page page-container">
        <div className="container">
          <div className="empty-state">
            <h2>Please sign in to view your messages.</h2>
          </div>
        </div>
      </div>
    );
  }

  const receivedMessages = getReceivedMessages(user.name);
  const sentMessages = getSentMessages(user.name);

  const handleReplyChange = (id, text) => {
    setReplyContent({ ...replyContent, [id]: text });
  };

  const handleSendReply = (id) => {
    if (replyContent[id]?.trim()) {
      replyToMessage(id, replyContent[id]);
      setReplyContent({ ...replyContent, [id]: '' });
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="inbox-page page-container">
      <div className="inbox-container">
        <h1 className="page-title mb-6">Your Inbox</h1>
        
        <div className="inbox-tabs">
          <button 
            className={`inbox-tab ${activeTab === 'received' ? 'active' : ''}`}
            onClick={() => setActiveTab('received')}
          >
            Received ({receivedMessages.length})
          </button>
          <button 
            className={`inbox-tab ${activeTab === 'sent' ? 'active' : ''}`}
            onClick={() => setActiveTab('sent')}
          >
            Sent ({sentMessages.length})
          </button>
        </div>

        <div className="messages-list">
          {activeTab === 'received' && (
            receivedMessages.length === 0 ? (
              <div className="empty-state">No messages received yet.</div>
            ) : (
              receivedMessages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`message-card glass-card ${!msg.isRead ? 'unread' : ''}`}
                  onMouseEnter={() => !msg.isRead && markAsRead(msg.id)}
                >
                  <div className="message-header">
                    <span className="message-sender">From: {msg.senderName}</span>
                    <span className="message-date">{formatDate(msg.timestamp)}</span>
                  </div>
                  <p className="message-content">{msg.content}</p>
                  
                  {msg.reply ? (
                    <div className="reply-box">
                      <strong>Your Reply:</strong>
                      <p className="mt-2">{msg.reply}</p>
                    </div>
                  ) : (
                    <div className="reply-box">
                      <textarea 
                        className="reply-input" 
                        placeholder="Type your reply here..."
                        rows="2"
                        value={replyContent[msg.id] || ''}
                        onChange={(e) => handleReplyChange(msg.id, e.target.value)}
                      ></textarea>
                      <div className="flex justify-end gap-2" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button className="btn btn-secondary flex items-center gap-1" onClick={() => deleteMessage(msg.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Trash2 size={16} /> Delete
                        </button>
                        <button className="btn btn-primary flex items-center gap-1" onClick={() => handleSendReply(msg.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Reply size={16} /> Send Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )
          )}

          {activeTab === 'sent' && (
            sentMessages.length === 0 ? (
              <div className="empty-state">You haven't sent any messages yet.</div>
            ) : (
              sentMessages.map(msg => (
                <div key={msg.id} className="message-card glass-card">
                  <div className="message-header">
                    <span className="message-sender">To: {msg.receiverName}</span>
                    <span className="message-date">{formatDate(msg.timestamp)}</span>
                  </div>
                  <p className="message-content">{msg.content}</p>
                  
                  {msg.reply ? (
                    <div className="reply-box" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                      <strong className="text-green-600 flex items-center gap-1" style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Check size={18} /> Reply from {msg.receiverName}:
                      </strong>
                      <p className="mt-2 text-green-800">{msg.reply}</p>
                    </div>
                  ) : (
                    <div className="text-sm text-muted mt-2 italic">
                      Waiting for reply...
                    </div>
                  )}
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
