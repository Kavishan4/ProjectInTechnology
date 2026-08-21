import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage on mount
    const savedUser = localStorage.getItem('bridgeEdUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, name) => {
    const newUser = { email, name, role: 'Fresher' };
    setUser(newUser);
    localStorage.setItem('bridgeEdUser', JSON.stringify(newUser));
  };

  const registerAsMentor = (mentorInfo) => {
    if (user) {
      const updatedUser = { ...user, role: 'Mentor', mentorInfo };
      setUser(updatedUser);
      localStorage.setItem('bridgeEdUser', JSON.stringify(updatedUser));
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
      closeSignInModal 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
