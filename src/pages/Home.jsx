import React from 'react';
import HeroSection from '../components/HeroSection';
import FeatureGrid from '../components/FeatureGrid';
import MentorshipTeaser from '../components/MentorshipTeaser';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <FeatureGrid />
      <MentorshipTeaser />
    </div>
  );
};

export default Home;
