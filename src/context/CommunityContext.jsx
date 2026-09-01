import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const CommunityContext = createContext();

export const useCommunity = () => useContext(CommunityContext);

export const CommunityProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/community');
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Fetch community posts error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const createPost = async (content) => {
    if (!user) return;
    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author_name: user.name,
          author_email: user.email,
          content,
        }),
      });
      if (!res.ok) throw new Error('Failed to create post');
      const newPost = await res.json();
      setPosts(prev => [newPost, ...prev]);
    } catch (err) {
      console.error('Create post error:', err);
    }
  };

  const likePost = async (id) => {
    // Optimistic update
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    try {
      await fetch(`/api/community/${id}/like`, { method: 'PATCH' });
    } catch (err) {
      console.error('Like error:', err);
      setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes - 1 } : p));
    }
  };

  const deletePost = async (id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    try {
      await fetch(`/api/community/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Delete post error:', err);
    }
  };

  return (
    <CommunityContext.Provider value={{ posts, isLoading, createPost, likePost, deletePost, refetch: fetchPosts }}>
      {children}
    </CommunityContext.Provider>
  );
};
