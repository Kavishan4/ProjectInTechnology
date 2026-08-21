import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    question: "When should I start preparing for university?",
    answer: "It's best to start familiarizing yourself with foundational concepts about 2-3 months before your first semester begins. BridgeEd's Learning Hub offers a great starting point."
  },
  {
    question: "How do I request a mentor?",
    answer: "Navigate to the Mentorship tab, browse the available mentors by faculty, and click 'Connect'. You can send them a direct message to introduce yourself and ask your questions."
  },
  {
    question: "Is this platform completely free?",
    answer: "Yes! BridgeEd is a community-driven initiative aimed at helping Sri Lankan students transition smoothly into higher education without any financial barriers."
  },
  {
    question: "What if my specific faculty or degree program isn't listed?",
    answer: "We are constantly expanding our resources. However, general skills like Academic Writing, Time Management, and Research methodologies apply to all degree programs."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page page-container">
      <div className="container">
        <div className="page-header animate-fade-in-up">
          <div className="icon-wrapper mx-auto mb-4">
            <HelpCircle size={48} className="text-primary" />
          </div>
          <h1 className="page-title">Frequently Asked Questions</h1>
          <p className="page-subtitle">Find answers to common questions about BridgeEd and university life.</p>
        </div>

        <div className="faq-container mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item glass-card animate-fade-in-up delay-${(index + 1) * 100} ${openIndex === index ? 'open' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.question}</span>
                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              <div className="faq-answer-wrapper">
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="contact-box glass-card text-center mx-auto mt-8 animate-fade-in-up delay-500">
          <h3>Still have questions?</h3>
          <p className="text-muted mb-4">We're here to help you navigate this transition.</p>
          <button className="btn btn-primary">Contact Support</button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
