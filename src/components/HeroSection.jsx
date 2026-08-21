import React from 'react';
import { ArrowRight, GraduationCap } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container hero-content">
        <div className="hero-text animate-fade-in-up">
          <div className="badge">
            <span className="badge-dot"></span>
            Empowering Sri Lankan Students
          </div>
          <h1 className="hero-title">
            Bridge the Gap to <br />
            <span className="text-gradient">University Success</span>
          </h1>
          <p className="hero-subtitle delay-100">
            Transition confidently from A/L studies to university life. Get access to introductory materials, mentorship, and study guides tailored for your success.
          </p>
          <div className="hero-actions delay-200">
            <button className="btn btn-primary btn-lg">
              Start Learning <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary btn-lg">
              Find a Mentor <GraduationCap size={20} />
            </button>
          </div>
        </div>
        
        <div className="hero-image-container animate-fade-in-up delay-300">
          <div className="glass-card hero-image-card">
            {/* We'll use a placeholder structure for the visual to represent the platform's UI */}
            <div className="mock-ui">
              <div className="mock-header">
                <div className="mock-dot red"></div>
                <div className="mock-dot yellow"></div>
                <div className="mock-dot green"></div>
              </div>
              <div className="mock-body">
                <div className="mock-title"></div>
                <div className="mock-line"></div>
                <div className="mock-line short"></div>
                
                <div className="mock-grid">
                  <div className="mock-card"></div>
                  <div className="mock-card"></div>
                  <div className="mock-card"></div>
                  <div className="mock-card"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="floating-element el-1 glass">
            📚 Foundational Materials
          </div>
          <div className="floating-element el-2 glass">
            🤝 Peer Mentorship
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
