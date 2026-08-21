import React from 'react';
import { BookOpen, Hash, MessageCircle, Globe, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <BookOpen size={24} className="logo-icon" />
            <span className="logo-text">BridgeEd</span>
          </Link>
          <p className="footer-desc">
            Empowering Sri Lankan students to confidently transition from A/L studies to university success.
          </p>
          <div className="social-links">
            <a href="#" className="social-link"><Hash size={20} /></a>
            <a href="#" className="social-link"><MessageCircle size={20} /></a>
            <a href="#" className="social-link"><Globe size={20} /></a>
            <a href="#" className="social-link"><Mail size={20} /></a>
          </div>
        </div>
        
        <div className="footer-links-group">
          <h4 className="footer-heading">Platform</h4>
          <Link to="/learning-hub" className="footer-link">Learning Hub</Link>
          <Link to="/mentorship" className="footer-link">Mentorship</Link>
          <Link to="/quizzes" className="footer-link">Quizzes</Link>
          <Link to="/faq" className="footer-link">FAQ</Link>
        </div>
        
        <div className="footer-links-group">
          <h4 className="footer-heading">Company</h4>
          <Link to="#" className="footer-link">About Us</Link>
          <Link to="#" className="footer-link">Careers</Link>
          <Link to="#" className="footer-link">Privacy Policy</Link>
          <Link to="#" className="footer-link">Terms of Service</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} BridgeEd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
