import React, { createContext, useState, useContext, useCallback } from 'react';
import { useAuth } from './AuthContext';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const { user } = useAuth();

  const fetchResults = useCallback(async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`/api/quiz-results?email=${encodeURIComponent(user.email)}`);
      if (!res.ok) throw new Error('Failed to fetch quiz results');
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Fetch quiz results error:', err);
    }
  }, [user?.email]);

  const saveResult = async ({ subject, score, total }) => {
    if (!user?.email) return;
    try {
      const res = await fetch('/api/quiz-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_email: user.email, subject, score, total }),
      });
      if (!res.ok) throw new Error('Failed to save quiz result');
      const saved = await res.json();
      setResults(prev => [saved, ...prev]);
      return saved;
    } catch (err) {
      console.error('Save quiz result error:', err);
    }
  };

  return (
    <QuizContext.Provider value={{ results, fetchResults, saveResult }}>
      {children}
    </QuizContext.Provider>
  );
};
