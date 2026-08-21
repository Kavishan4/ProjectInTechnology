import React from 'react';
import { Link } from 'react-router-dom';
import './MentorshipTeaser.css';

const MentorshipTeaser = () => {
  return (
    <section id="mentorship" className="mentorship-section">
      <div className="container mentorship-content">
        <div className="mentorship-text animate-fade-in-up">
          <h2 className="section-title">Learn from those who've been there</h2>
          <p className="section-subtitle">
            Our community connects you with successful university students who recently made the transition. Get real advice, not just textbook theories.
          </p>
          <ul className="mentor-benefits">
            <li><span className="check-icon">✓</span> 1-on-1 guidance sessions</li>
            <li><span className="check-icon">✓</span> Faculty-specific insights</li>
            <li><span className="check-icon">✓</span> Q&A forums for quick help</li>
          </ul>
          <Link to="/community" className="btn btn-primary">Join the Community</Link>
        </div>
        
        <div className="mentor-cards-container animate-fade-in-up delay-200">
          <div className="glass-card mentor-profile card-1">
            <div className="avatar bg-blue"></div>
            <div>
              <h4>Kasun Perera</h4>
              <p className="text-sm">Engineering • 2nd Year</p>
            </div>
          </div>
          
          <div className="glass-card mentor-profile card-2">
            <div className="avatar bg-pink"></div>
            <div>
              <h4>Amandi Silva</h4>
              <p className="text-sm">Medicine • 3rd Year</p>
            </div>
          </div>
          
          <div className="glass-card mentor-profile card-3">
            <div className="avatar bg-green"></div>
            <div>
              <h4>Dilshan Fernando</h4>
              <p className="text-sm">IT • 1st Year</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorshipTeaser;
