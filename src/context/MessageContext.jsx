import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const MessageContext = createContext();

export const useMessages = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();

  // Fetch messages for the logged-in user
  const fetchMessages = useCallback(async () => {
    if (!user?.name) return;
    try {
      const res = await fetch(`/api/messages?user=${encodeURIComponent(user.name)}`);
      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();
      // Normalize field names from snake_case (DB) to camelCase (app)
      setMessages(data.map(normalizeMessage));
    } catch (err) {
      console.error('Fetch messages error:', err);
    }
  }, [user?.name]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const normalizeMessage = (msg) => ({
    id: msg.id,
    senderName: msg.sender_name,
    receiverName: msg.receiver_name,
    content: msg.content,
    reply: msg.reply,
    isRead: msg.is_read,
    timestamp: msg.created_at,
  });

  const sendMessage = async (senderName, receiverName, content) => {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender_name: senderName, receiver_name: receiverName, content }),
      });
      if (!res.ok) throw new Error('Failed to send message');
      const newMsg = await res.json();
      setMessages(prev => [normalizeMessage(newMsg), ...prev]);
    } catch (err) {
      console.error('Send message error:', err);
      // Optimistic fallback
      const optimistic = {
        id: Date.now(),
        senderName,
        receiverName,
        content,
        timestamp: new Date().toISOString(),
        reply: null,
        isRead: false,
      };
      setMessages(prev => [optimistic, ...prev]);
    }
  };

  const deleteMessage = async (id) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Delete message error:', err);
    }
  };

  const replyToMessage = async (id, replyContent) => {
    setMessages(prev => prev.map(msg =>
      msg.id === id ? { ...msg, reply: replyContent, isRead: true } : msg
    ));
    try {
      await fetch(`/api/messages/${id}/reply`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: replyContent }),
      });
    } catch (err) {
      console.error('Reply error:', err);
    }
  };

  const markAsRead = async (id) => {
    setMessages(prev => prev.map(msg =>
      msg.id === id ? { ...msg, isRead: true } : msg
    ));
    try {
      await fetch(`/api/messages/${id}/read`, { method: 'PATCH' });
    } catch (err) {
      console.error('Mark read error:', err);
    }
  };

  const getReceivedMessages = (userName) =>
    messages.filter(msg => msg.receiverName === userName);

  const getSentMessages = (userName) =>
    messages.filter(msg => msg.senderName === userName);

  const getUnreadCount = (userName) =>
    messages.filter(msg => msg.receiverName === userName && !msg.isRead).length;

  return (
    <MessageContext.Provider value={{
      messages,
      sendMessage,
      deleteMessage,
      replyToMessage,
      markAsRead,
      getReceivedMessages,
      getSentMessages,
      getUnreadCount,
      refetch: fetchMessages,
    }}>
      {children}
    </MessageContext.Provider>
  );
};
