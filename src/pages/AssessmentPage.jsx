import React, { useState } from 'react';
import { useDosha } from '../context/DoshaContext';
import { ProgressBar } from '../components/ProgressBar';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

export const AssessmentPage = ({ onComplete }) => {
  const { questions, currentQuestionIndex, setCurrentQuestionIndex, userAnswers, handleSelectAnswer, calculateAndSaveResult } = useDosha();
  const [errorMsg, setErrorMsg] = useState('');

  const currentQ = questions[currentQuestionIndex];
  const selectedOptionKey = userAnswers[currentQ.id];

  const handleNext = () => {
    if (!selectedOptionKey) {
      setErrorMsg('Please select an option to continue.');
      return;
    }
    setErrorMsg('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setErrorMsg('');
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (!selectedOptionKey) {
      setErrorMsg('Please answer the final question before submitting.');
      return;
    }
    setErrorMsg('');
    const result = calculateAndSaveResult();
    if (result && onComplete) {
      onComplete();
    }
  };

  return (
    <div style={{ padding: '2.5rem 1rem', maxWidth: '750px', margin: '0 auto', width: '100%' }}>
      {/* Category Badge */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <span style={{
          background: 'rgba(255, 149, 0, 0.15)',
          color: '#FFB84D',
          border: '1px solid rgba(255, 149, 0, 0.4)',
          borderRadius: '50px',
          padding: '0.4rem 1rem',
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <Sparkles size={14} /> {currentQ.category}
        </span>
      </div>

      <h1 style={{ textAlign: 'center', fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '1.5rem' }}>
        Ayurvedic Dosha Assessment
      </h1>

      {/* Progress Bar */}
      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />

      {/* Question Card */}
      <div className="glass-card" style={{ padding: '2rem 1.75rem', borderRadius: '24px', position: 'relative' }}>
        <h2 style={{ fontSize: '1.25rem', color: '#DAF1DE', marginBottom: '1.5rem', lineHeight: '1.4' }}>
          {currentQ.text}
        </h2>

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#FCA5A5',
            borderRadius: '10px',
            padding: '0.65rem 1rem',
            fontSize: '0.85rem',
            marginBottom: '1.2rem'
          }}>
            {errorMsg}
          </div>
        )}

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {currentQ.options.map((opt) => {
            const isSelected = selectedOptionKey === opt.key;
            return (
              <div
                key={opt.key}
                onClick={() => {
                  setErrorMsg('');
                  handleSelectAnswer(currentQ.id, opt.key);
                }}
                style={{
                  background: isSelected 
                    ? 'linear-gradient(135deg, rgba(35, 83, 71, 0.9) 0%, rgba(11, 43, 38, 0.95) 100%)' 
                    : 'rgba(5, 31, 32, 0.6)',
                  border: isSelected 
                    ? '2px solid #FF9500' 
                    : '1px solid rgba(142, 182, 155, 0.25)',
                  borderRadius: '16px',
                  padding: '1.1rem 1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 6px 20px rgba(255, 149, 0, 0.25)' : 'none'
                }}
              >
                {/* Check / Circle Indicator */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: isSelected ? 'none' : '2px solid rgba(142, 182, 155, 0.4)',
                  background: isSelected ? '#FF9500' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {isSelected ? (
                    <CheckCircle2 size={20} color="#FFFFFF" />
                  ) : (
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8EB69B' }}>{opt.key}</span>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{
                    color: isSelected ? '#FFFFFF' : '#DAF1DE',
                    fontWeight: isSelected ? 600 : 400,
                    fontSize: '0.98rem',
                    margin: 0
                  }}>
                    {opt.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(142, 182, 155, 0.2)'
        }}>
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="btn-secondary"
            style={{ opacity: currentQuestionIndex === 0 ? 0.4 : 1 }}
          >
            <ArrowLeft size={18} /> Previous
          </button>

          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="btn-primary"
            >
              Next Question <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              className="btn-primary"
              style={{ background: 'linear-gradient(135deg, #FF9500 0%, #FFB84D 100%)' }}
            >
              Calculate My Dosha <Sparkles size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
