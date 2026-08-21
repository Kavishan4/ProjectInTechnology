import React from 'react';
import { BookOpen, Users, Clock, CheckCircle } from 'lucide-react';
import './FeatureGrid.css';

const features = [
  {
    title: 'Introductory Learning',
    description: 'Access fundamental concepts tailored to your future university courses before the semester starts.',
    icon: <BookOpen className="feature-icon" size={24} />
  },
  {
    title: 'Peer Mentorship',
    description: 'Connect with current university students to get guidance, ask questions, and build confidence.',
    icon: <Users className="feature-icon" size={24} />
  },
  {
    title: 'Time Management',
    description: 'Learn proven strategies to adapt to university-level independent study and balance your workload.',
    icon: <Clock className="feature-icon" size={24} />
  },
  {
    title: 'Readiness Assessments',
    description: 'Take interactive quizzes to assess your knowledge and track your preparation progress.',
    icon: <CheckCircle className="feature-icon" size={24} />
  }
];

const FeatureGrid = () => {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="features-header text-center animate-fade-in-up">
          <h2 className="section-title">Everything you need to <span className="text-gradient">succeed</span></h2>
          <p className="section-subtitle">
            BridgeEd equips you with the tools, knowledge, and community to make a seamless transition to university life.
          </p>
        </div>
        
        <div className="grid grid-cols-2 features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`glass-card feature-card delay-${(index + 1) * 100}`}
            >
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
