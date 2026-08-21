import React, { createContext, useState, useContext } from 'react';

const MentorContext = createContext();

export const useMentors = () => useContext(MentorContext);

export const MentorProvider = ({ children }) => {
  const [mentors, setMentors] = useState([
    { id: 1, name: 'Kasun Perera', faculty: 'Engineering', university: 'University of Moratuwa', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop', subjects: 'Mathematics, Physics' },
    { id: 2, name: 'Amandi Silva', faculty: 'Medicine', university: 'University of Colombo', rating: 5.0, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', subjects: 'Biology, Chemistry' },
    { id: 3, name: 'Dilshan Fernando', faculty: 'IT', university: 'UCSC', rating: 4.8, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop', subjects: 'Programming, Data Structures' },
    { id: 4, name: 'Nethmi Rajapaksha', faculty: 'Science', university: 'University of Peradeniya', rating: 4.7, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', subjects: 'Statistics, Chemistry' },
  ]);

  const addMentor = (newMentor) => {
    const mentorWithId = {
      ...newMentor,
      id: Date.now(),
      rating: 5.0, // Default rating for new mentors
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' // Default dummy avatar
    };
    setMentors([...mentors, mentorWithId]);
  };

  return (
    <MentorContext.Provider value={{ mentors, addMentor }}>
      {children}
    </MentorContext.Provider>
  );
};
