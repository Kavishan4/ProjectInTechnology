import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LearningHub from './pages/LearningHub';
import Mentorship from './pages/Mentorship';
import Quizzes from './pages/Quizzes';
import FAQ from './pages/FAQ';
import Community from './pages/Community';
import { AuthProvider } from './context/AuthContext';
import { MentorProvider } from './context/MentorContext';
import SignInModal from './components/SignInModal';

function App() {
  return (
    <AuthProvider>
      <MentorProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <SignInModal />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/learning-hub" element={<LearningHub />} />
                <Route path="/mentorship" element={<Mentorship />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/community" element={<Community />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </MentorProvider>
    </AuthProvider>
  );
}

export default App;
