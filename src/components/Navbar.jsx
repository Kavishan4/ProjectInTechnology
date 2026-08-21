import React from 'react';
import { BookOpen, UserCircle, Menu, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMessages } from '../context/MessageContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, openSignInModal } = useAuth();
  const { getUnreadCount } = useMessages();
  const navigate = useNavigate();

  const unreadCount = user ? getUnreadCount(user.name) : 0;

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
            <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div 
                className="inbox-icon-container" 
                onClick={() => navigate('/inbox')}
                style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <MessageSquare size={22} className="text-muted hover:text-primary transition-colors" />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-8px',
                    background: '#EF4444',
                    color: 'white',
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    padding: '2px 6px',
                    borderRadius: '9999px',
                    lineHeight: '1'
                  }}>
                    {unreadCount}
                  </span>
                )}
              </div>
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
