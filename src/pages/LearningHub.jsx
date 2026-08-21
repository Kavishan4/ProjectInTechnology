import React, { useState } from 'react';
import { PlayCircle, Book, Clock } from 'lucide-react';
import './LearningHub.css';

const courses = [
  {
    id: 1,
    title: 'Introduction to Calculus',
    faculty: 'Engineering / Science',
    duration: '4 weeks',
    modules: 12,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    title: 'Fundamentals of Programming (Python)',
    faculty: 'IT / Computer Science',
    duration: '6 weeks',
    modules: 18,
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    title: 'Anatomy Basics',
    faculty: 'Medicine / Healthcare',
    duration: '5 weeks',
    modules: 15,
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 4,
    title: 'Academic Writing & Research',
    faculty: 'All Faculties',
    duration: '3 weeks',
    modules: 8,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?w=500&auto=format&fit=crop&q=60'
  }
];

const LearningHub = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="learning-hub-page page-container">
      <div className="container">
        <div className="page-header animate-fade-in-up">
          <h1 className="page-title">Learning Hub</h1>
          <p className="page-subtitle">Start building your university foundation today.</p>
        </div>

        {activeVideo && (
          <div className="video-player-container glass-card animate-fade-in-up">
            <div className="video-mockup">
              <div className="play-button-large">
                <PlayCircle size={64} />
              </div>
              <h3>Now Playing: {activeVideo.title}</h3>
            </div>
            <button className="btn btn-secondary mt-4" onClick={() => setActiveVideo(null)}>
              Close Player
            </button>
          </div>
        )}

        <div className="courses-grid">
          {courses.map((course, index) => (
            <div key={course.id} className={`course-card glass-card delay-${(index % 4) * 100}`}>
              <div 
                className="course-image" 
                style={{ backgroundImage: `url(${course.image})` }}
              >
                <div className="course-overlay">
                  <button 
                    className="btn btn-primary"
                    onClick={() => setActiveVideo(course)}
                  >
                    <PlayCircle size={20} /> Watch Preview
                  </button>
                </div>
              </div>
              <div className="course-content">
                <span className="badge">{course.faculty}</span>
                <h3 className="course-title">{course.title}</h3>
                <div className="course-meta">
                  <span><Clock size={16} /> {course.duration}</span>
                  <span><Book size={16} /> {course.modules} Modules</span>
                </div>
                <button className="btn btn-secondary w-full">Enroll Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningHub;
