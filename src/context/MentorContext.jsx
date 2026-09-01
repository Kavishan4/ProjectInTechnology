import React, { createContext, useState, useContext, useEffect } from 'react';

const MentorContext = createContext();

export const useMentors = () => useContext(MentorContext);

export const MentorProvider = ({ children }) => {
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch mentors from Neon DB on mount
  const fetchMentors = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/mentors');
      if (!res.ok) throw new Error('Failed to fetch mentors');
      const data = await res.json();
      setMentors(data);
    } catch (err) {
      console.error('Fetch mentors error:', err);
      setError(err.message);
      // Fallback to seed data if API is unreachable
      setMentors([
        { id: 1, name: 'Kasun Perera', faculty: 'Engineering', university: 'University of Moratuwa', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop', subjects: 'Mathematics, Physics' },
        { id: 2, name: 'Amandi Silva', faculty: 'Medicine', university: 'University of Colombo', rating: 5.0, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', subjects: 'Biology, Chemistry' },
        { id: 3, name: 'Dilshan Fernando', faculty: 'IT', university: 'UCSC', rating: 4.8, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop', subjects: 'Programming, Data Structures' },
        { id: 4, name: 'Nethmi Rajapaksha', faculty: 'Science', university: 'University of Peradeniya', rating: 4.7, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', subjects: 'Statistics, Chemistry' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const addMentor = async (newMentor) => {
    try {
      const res = await fetch('/api/mentors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMentor),
      });
      if (!res.ok) throw new Error('Failed to add mentor');
      const created = await res.json();
      setMentors(prev => [...prev, created]);
    } catch (err) {
      console.error('Add mentor error:', err);
      // Optimistic fallback
      const mentorWithId = {
        ...newMentor,
        id: Date.now(),
        rating: 5.0,
        avatar: newMentor.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      };
      setMentors(prev => [...prev, mentorWithId]);
    }
  };

  return (
    <MentorContext.Provider value={{ mentors, addMentor, isLoading, error, refetch: fetchMentors }}>
      {children}
    </MentorContext.Provider>
  );
};
