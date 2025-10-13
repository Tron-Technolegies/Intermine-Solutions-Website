import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { faqData } from '../../utils/faq';
import "../faq/FAQ.css"

const FAQ = () => {

  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="faq-container sora">
      <div className="faq-header">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <p className="faq-subtitle">Find answers to common questions about our hosting services</p>
      </div>

      <div className="faq-content">
        {faqData.map((item) => (
          <div key={item.id} className="faq-item">
            <button 
              className={`faq-question ${activeId === item.id ? 'active' : ''}`}
              onClick={() => toggleAccordion(item.id)}
            >
              <span className="question-text">{item.question}</span>
              <span className="faq-icon">
                {activeId === item.id ? (
                  <FiChevronUp size={24} />
                ) : (
                  <FiChevronDown size={24} />
                )}
              </span>
            </button>
            
            {activeId === item.id && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;