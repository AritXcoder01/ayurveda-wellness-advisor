import React, { useState } from 'react';
import { useDosha } from '../context/DoshaContext';
import { ProgressBar } from '../components/ProgressBar';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

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
    <div style={{ padding: '2.5rem 1rem', maxWidth: '780px', margin: '0 auto', width: '100%' }}>
      {/* Category Badge */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <span style={{
          background: 'rgba(186, 225, 100, 0.3)',
          color: '#1A3323',
          border: '1.5px solid #BAE164',
          borderRadius: '50px',
          padding: '0.45rem 1.1rem',
          fontSize: '0.8rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem'
        }}>
          <Sparkles size={15} color="#1A3323" /> {currentQ.category}
        </span>
      </div>

      <h1 className="font-serif-title" style={{ textAlign: 'center', fontSize: '1.85rem', color: '#1A3323', marginBottom: '1.5rem', fontWeight: 800 }}>
        Ayurvedic Dosha Assessment
      </h1>

      {/* Progress Bar */}
      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />

      {/* Question Card */}
      <div className="glass-card" style={{ padding: '2.4rem 2rem', borderRadius: '28px', position: 'relative' }}>
        <h2 style={{ fontSize: '1.3rem', color: '#1A3323', marginBottom: '1.5rem', lineHeight: '1.4', fontWeight: 800 }}>
          {currentQ.text}
        </h2>

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#DC2626',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            fontSize: '0.88rem',
            marginBottom: '1.2rem',
            fontWeight: 600
          }}>
            {errorMsg}
          </div>
        )}

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
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
                    ? 'rgba(240, 247, 232, 0.95)' 
                    : 'rgba(253, 255, 249, 0.85)',
                  border: isSelected 
                    ? '2px solid #BAE164' 
                    : '1.5px solid rgba(26, 51, 35, 0.15)',
                  borderRadius: '18px',
                  padding: '1.15rem 1.35rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.1rem',
                  transition: 'all 0.22s ease',
                  boxShadow: isSelected ? '0 6px 20px rgba(186, 225, 100, 0.3)' : 'none'
                }}
              >
                {/* Check / Circle Indicator */}
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  border: isSelected ? 'none' : '2px solid #1A3323',
                  background: isSelected ? 'linear-gradient(135deg, #1A3323 0%, #2B5738 100%)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {isSelected ? (
                    <CheckCircle2 size={22} color="#BAE164" />
                  ) : (
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1A3323' }}>{opt.key}</span>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{
                    color: '#1A3323',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '1rem',
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
          marginTop: '2.2rem',
          paddingTop: '1.35rem',
          borderTop: '1.5px solid rgba(26, 51, 35, 0.12)'
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
            >
              Calculate My Dosha <Sparkles size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
