import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Restore session from localStorage on mount (just for UX continuity)
    const savedUser = localStorage.getItem('bridgeEdUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, name) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      if (!res.ok) throw new Error('Login failed');
      const dbUser = await res.json();
      setUser(dbUser);
      localStorage.setItem('bridgeEdUser', JSON.stringify(dbUser));
    } catch (err) {
      console.error('Login error:', err);
      // Fallback: still log in locally so the app doesn't break
      const fallbackUser = { email, name, role: 'Fresher' };
      setUser(fallbackUser);
      localStorage.setItem('bridgeEdUser', JSON.stringify(fallbackUser));
    } finally {
      setIsLoading(false);
    }
  };

  const registerAsMentor = async (mentorInfo) => {
    if (!user) return;
    try {
      // Update role in DB
      await fetch('/api/auth/role', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, role: 'Mentor' }),
      });

      // Add mentor record
      await fetch('/api/mentors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name,
          faculty: mentorInfo.faculty,
          university: mentorInfo.university,
          subjects: mentorInfo.subjects,
          user_id: user.id || null,
        }),
      });

      const updatedUser = { ...user, role: 'Mentor', mentorInfo };
      setUser(updatedUser);
      localStorage.setItem('bridgeEdUser', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Register mentor error:', err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bridgeEdUser');
  };

  const openSignInModal = () => setIsSignInModalOpen(true);
  const closeSignInModal = () => setIsSignInModalOpen(false);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      registerAsMentor,
      isSignInModalOpen, 
      openSignInModal, 
      closeSignInModal,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
