import React, { useState } from 'react';
import { X, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './SignInModal.css';

const SignInModal = () => {
  const { isSignInModalOpen, closeSignInModal, login } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!isSignInModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && name.trim()) {
      login(email, name);
      closeSignInModal();
      setEmail('');
      setName('');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-card animate-fade-in-up sign-in-modal">
        <button className="close-btn" onClick={closeSignInModal}>
          <X size={24} />
        </button>
        <div className="modal-header">
          <LogIn size={32} className="text-primary mb-2" />
          <h2>Welcome to BridgeEd</h2>
          <p className="text-muted">Sign in to join the community.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="sign-in-form">
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="e.g. yourname@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Display Name</label>
            <input 
              type="text" 
              placeholder="e.g. Kasun" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-full mt-4">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;
