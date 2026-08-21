import React from 'react';
import { BookOpen, UserCircle, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, openSignInModal } = useAuth();
  return (
    <nav className="navbar glass">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">
          <BookOpen size={28} className="logo-icon" />
          <span className="logo-text">BridgeEd</span>
        </Link>
        
        <div className="navbar-links desktop-only">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/learning-hub" className="nav-link">Learning Hub</Link>
          <Link to="/mentorship" className="nav-link">Mentorship</Link>
          <Link to="/quizzes" className="nav-link">Quizzes</Link>
          <Link to="/faq" className="nav-link">FAQ</Link>
        </div>
        
        <div className="navbar-actions desktop-only">
          {user ? (
            <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: '500' }}>Hi, {user.name}</span>
              <button className="btn btn-secondary" onClick={logout} style={{ padding: '0.5rem 1rem' }}>Sign Out</button>
            </div>
          ) : (
            <>
              <button className="btn btn-secondary" onClick={openSignInModal}>Sign In</button>
              <button className="btn btn-primary" onClick={openSignInModal}>Get Started</button>
            </>
          )}
        </div>

        <div className="mobile-menu-btn mobile-only">
          <Menu size={28} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
