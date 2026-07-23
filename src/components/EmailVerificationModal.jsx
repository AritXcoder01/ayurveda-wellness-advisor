import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export const EmailVerificationModal = () => {
  const { showOtpModal, setShowOtpModal, pendingUser, confirmEmailOtp, authError, setAuthError } = useAuth();
  const [inputCode, setInputCode] = useState('');

  if (!showOtpModal || !pendingUser) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputCode.trim() || inputCode.trim().length !== 6) {
      setAuthError('Please enter a 6-digit verification code.');
      return;
    }
    confirmEmailOtp(inputCode.trim());
  };

  const handleQuickFill = () => {
    setInputCode('123456');
    setAuthError('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,149,0,0.2) 0%, rgba(255,184,77,0.2) 100%)',
            border: '1px solid #FF9500',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto',
            boxShadow: '0 4px 15px rgba(255,149,0,0.3)'
          }}>
            <ShieldCheck size={32} color="#FF9500" />
          </div>
          
          <h2 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>
            Email Security Verification
          </h2>
          
          <p style={{ fontSize: '0.9rem', color: '#B8D8C2', lineHeight: '1.4' }}>
            Enter the 6-digit verification code to confirm your email:
            <br />
            <strong style={{ color: '#DAF1DE' }}>{pendingUser.email}</strong>
          </p>
        </div>

        {authError && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#FCA5A5',
            borderRadius: '10px',
            padding: '0.65rem 0.9rem',
            fontSize: '0.85rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={18} />
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ textAlign: 'center', display: 'block', marginBottom: '0.5rem' }}>
              Enter 6-Digit Verification Code
            </label>
            <input
              type="text"
              className="form-input"
              maxLength={6}
              placeholder="1 2 3 4 5 6"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.replace(/[^0-9]/g, ''))}
              style={{
                textAlign: 'center',
                fontSize: '1.5rem',
                letterSpacing: '0.3em',
                fontWeight: 700
              }}
              autoFocus
            />
          </div>

          {/* Clean Demo Hint */}
          <div style={{
            textAlign: 'center',
            marginTop: '0.75rem',
            marginBottom: '1.25rem',
            fontSize: '0.8rem',
            color: '#8EB69B'
          }}>
            <span>💡 <em>Client-side Demo Mode:</em> Enter <strong>123456</strong> or </span>
            <button
              type="button"
              onClick={handleQuickFill}
              style={{
                background: 'none',
                border: 'none',
                color: '#FFB84D',
                fontWeight: 700,
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              click here to auto-fill (123456)
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => setShowOtpModal(false)}
              className="btn-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="btn-primary"
              style={{ flex: 1 }}
            >
              Verify & Proceed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
