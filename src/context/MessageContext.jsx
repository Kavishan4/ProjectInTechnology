import React, { createContext, useState, useContext, useEffect } from 'react';

const MessageContext = createContext();

export const useMessages = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  // Load from local storage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('bridgeEdMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('bridgeEdMessages', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (senderName, receiverName, content) => {
    const newMessage = {
      id: Date.now(),
      senderName,
      receiverName,
      content,
      timestamp: new Date().toISOString(),
      reply: null,
      isRead: false
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const deleteMessage = (id) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const replyToMessage = (id, replyContent) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, reply: replyContent, isRead: true } : msg
    ));
  };

  const markAsRead = (id) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, isRead: true } : msg
    ));
  };

  const getReceivedMessages = (userName) => {
    return messages.filter(msg => msg.receiverName === userName);
  };

  const getSentMessages = (userName) => {
    return messages.filter(msg => msg.senderName === userName);
  };
  
  const getUnreadCount = (userName) => {
    return messages.filter(msg => msg.receiverName === userName && !msg.isRead).length;
  };

  return (
    <MessageContext.Provider value={{ 
      messages, 
      sendMessage, 
      deleteMessage, 
      replyToMessage,
      markAsRead,
      getReceivedMessages,
      getSentMessages,
      getUnreadCount
    }}>
      {children}
    </MessageContext.Provider>
  );
};
