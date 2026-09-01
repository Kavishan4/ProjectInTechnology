import React, { useState } from 'react';
import { Search, MapPin, Star, Send, UserPlus, X, LogOut, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMentors } from '../context/MentorContext';
import { useMessages } from '../context/MessageContext';
import './Mentorship.css';

const Mentorship = () => {
  const { user, registerAsMentor, leaveMentorRole, switchRole } = useAuth();
  const { mentors, addMentor } = useMentors();
  const { sendMessage } = useMessages();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const [showMentorReg, setShowMentorReg] = useState(false);
  const [regData, setRegData] = useState({ university: '', faculty: '', subjects: '' });
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  const filteredMentors = mentors.filter(m => 
    m.faculty?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.subjects && m.subjects.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSend = (e) => {
    e.preventDefault();
    if (user && message.trim()) {
      sendMessage(user.name, selectedMentor.name, message);
    }
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setSelectedMentor(null);
      setMessage('');
    }, 2000);
  };

  const handleRegisterMentor = (e) => {
    e.preventDefault();
    if (regData.university && regData.faculty && regData.subjects) {
      const newMentor = {
        name: user.name,
        faculty: regData.faculty,
        university: regData.university,
        subjects: regData.subjects
      };
      registerAsMentor(regData);
      addMentor(newMentor);
      setShowMentorReg(false);
    }
  };

  const handleLeaveRole = async () => {
    setIsSwitching(true);
    await leaveMentorRole();
    setShowLeaveConfirm(false);
    setIsSwitching(false);
  };

  const handleSwitchRole = async () => {
    if (!user) return;
    setIsSwitching(true);
    const newRole = user.role === 'Mentor' ? 'Fresher' : 'Mentor';
    await switchRole(newRole);
    setIsSwitching(false);
  };

  return (
    <div className="mentorship-page page-container">
      <div className="container">
        <div className="page-header animate-fade-in-up">
          <h1 className="page-title">Find Your Mentor</h1>
          <p className="page-subtitle">Connect with seniors who can guide you through university life.</p>
          
          <div className="search-bar-container">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search by faculty, name, or subjects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* ── Mentor controls: only visible to logged-in users with Mentor role ── */}
          {user && user.role === 'Mentor' && (
            <div className="mentor-controls-bar">
              {/* Role mode switch */}
              <div className="role-switch-container">
                <span className="role-switch-label">Viewing as:</span>
                <button
                  className={`role-switch-btn ${isSwitching ? 'switching' : ''}`}
                  onClick={handleSwitchRole}
                  disabled={isSwitching}
                  title="Switch between Mentor and Fresher view"
                >
                  <span className={`role-pill ${user.role === 'Mentor' ? 'active' : ''}`}>Mentor</span>
                  <span className="role-switch-icon">
                    <RefreshCw size={14} />
                  </span>
                  <span className={`role-pill ${user.role === 'Fresher' ? 'active' : ''}`}>Fresher</span>
                </button>
              </div>

              {/* Leave mentor role */}
              <button
                className="btn btn-leave-mentor"
                onClick={() => setShowLeaveConfirm(true)}
              >
                <LogOut size={16} />
                Leave Mentor Role
              </button>
            </div>
          )}

          {/* ── Become a mentor banner: only for Freshers ── */}
          {user && user.role === 'Fresher' && (
            <div className="become-mentor-banner mt-4">
              <div className="banner-content glass-card flex items-center justify-between p-4 rounded-xl shadow-sm">
                <div>
                  <h3 className="text-lg font-semibold">Want to share your knowledge?</h3>
                  <p className="text-sm text-muted">Register as a mentor and help other students.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowMentorReg(true)}>
                  <UserPlus size={18} className="mr-2" style={{ display: 'inline' }} />
                  Become a Mentor
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mentors-grid mt-8">
          {filteredMentors.map((mentor, index) => (
            <div key={mentor.id} className={`mentor-card glass-card delay-${(index % 4) * 100}`}>
              <img src={mentor.avatar} alt={mentor.name} className="mentor-avatar-large" />
              <h3 className="mentor-name">{mentor.name}</h3>
              <div className="mentor-details">
                <span><Star size={16} className="text-yellow" /> {mentor.rating}</span>
                <span><MapPin size={16} /> {universityAbbr(mentor.university)}</span>
              </div>
              <span className="badge mt-3 mb-3">{mentor.faculty}</span>
              {mentor.subjects && <p className="text-xs text-muted mt-2">Subjects: {mentor.subjects}</p>}
              <button 
                className="btn btn-primary w-full mt-4"
                onClick={() => setSelectedMentor(mentor)}
              >
                Connect
              </button>
            </div>
          ))}
        </div>

        {/* ── Message modal ── */}
        {selectedMentor && (
          <div className="modal-overlay">
            <div className="modal-content glass-card animate-fade-in-up">
              <h2>Message {selectedMentor.name}</h2>
              {isSent ? (
                <div className="success-message">
                  <span className="success-icon">✓</span>
                  <p>Message sent successfully!</p>
                </div>
              ) : (
                <form onSubmit={handleSend} className="message-form">
                  <textarea 
                    placeholder={`Hi ${selectedMentor.name.split(' ')[0]}, I'm looking for advice on...`}
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                  <div className="modal-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => setSelectedMentor(null)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">
                      Send <Send size={18} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
        
        {/* ── Register as mentor modal ── */}
        {showMentorReg && (
          <div className="modal-overlay">
            <div className="modal-content glass-card animate-fade-in-up">
              <button className="close-btn" onClick={() => setShowMentorReg(false)}>
                <X size={24} />
              </button>
              <h2>Register as a Mentor</h2>
              <p className="text-muted mb-4">Fill out the details below to start mentoring.</p>
              
              <form onSubmit={handleRegisterMentor} className="mentor-reg-form">
                <div className="form-group mb-4">
                  <label>University</label>
                  <input 
                    type="text" 
                    placeholder="e.g. University of Moratuwa" 
                    value={regData.university}
                    onChange={(e) => setRegData({...regData, university: e.target.value})}
                    required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}
                  />
                </div>
                <div className="form-group mb-4">
                  <label>Faculty</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Engineering" 
                    value={regData.faculty}
                    onChange={(e) => setRegData({...regData, faculty: e.target.value})}
                    required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}
                  />
                </div>
                <div className="form-group mb-4">
                  <label>Subjects you can cover</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Mathematics, Physics" 
                    value={regData.subjects}
                    onChange={(e) => setRegData({...regData, subjects: e.target.value})}
                    required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--bg-card)' }}
                  />
                </div>
                
                <button type="submit" className="btn btn-primary w-full mt-4">
                  Complete Registration
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── Leave mentor confirmation modal ── */}
        {showLeaveConfirm && (
          <div className="modal-overlay">
            <div className="modal-content glass-card animate-fade-in-up" style={{ maxWidth: '420px', textAlign: 'center' }}>
              <div className="leave-mentor-icon">
                <LogOut size={32} />
              </div>
              <h2 style={{ marginTop: '1rem' }}>Leave Mentor Role?</h2>
              <p className="text-muted" style={{ margin: '0.75rem 0 1.5rem' }}>
                You'll be switched back to <strong>Fresher</strong>. Your mentor profile will remain, but you won't appear as an active mentor.
              </p>
              <div className="modal-actions" style={{ justifyContent: 'center', gap: '1rem' }}>
                <button className="btn btn-secondary" onClick={() => setShowLeaveConfirm(false)}>
                  Cancel
                </button>
                <button
                  className="btn btn-leave-mentor"
                  onClick={handleLeaveRole}
                  disabled={isSwitching}
                >
                  {isSwitching ? 'Switching...' : 'Yes, Leave Role'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const universityAbbr = (name) => {
  if (!name) return '';
  if (name.includes('Moratuwa')) return 'UoM';
  if (name.includes('Colombo')) return 'UoC';
  if (name.includes('Peradeniya')) return 'UoP';
  return name;
};

export default Mentorship;
