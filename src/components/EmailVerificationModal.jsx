import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, AlertCircle, RefreshCw, MailCheck, Loader2 } from 'lucide-react';

export const EmailVerificationModal = () => {
  const { 
    showOtpModal, 
    setShowOtpModal, 
    pendingUser, 
    confirmEmailOtp, 
    authError, 
    setAuthError,
    isSendingEmail,
    resendOtp
  } = useAuth();
  
  const [inputCode, setInputCode] = useState('');

  if (!showOtpModal || !pendingUser) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = inputCode.trim();
    if (!otpCode || otpCode.length !== 6) {
      setAuthError('Please enter a valid 6-digit verification code.');
      return;
    }

    await confirmEmailOtp(otpCode);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1A3323 0%, #2B5738 50%, #BAE164 100%)',
            border: '2px solid #BAE164',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.8rem auto',
            boxShadow: '0 8px 24px rgba(26, 51, 35, 0.28)'
          }}>
            {isSendingEmail ? (
              <Loader2 size={30} color="#FEFEFE" style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <ShieldCheck size={34} color="#FEFEFE" />
            )}
          </div>
          
          <h2 className="font-serif-title" style={{ fontSize: '1.55rem', color: '#1A3323', marginBottom: '0.3rem', fontWeight: 800 }}>
            Email Verification Required
          </h2>
          
          <p style={{ fontSize: '0.9rem', color: '#567360', lineHeight: '1.4' }}>
            A 6-digit verification code has been dispatched to:
            <br />
            <strong style={{ color: '#B86B18', fontSize: '0.96rem' }}>{pendingUser.email}</strong>
          </p>
        </div>

        <div style={{
          background: 'rgba(240, 247, 232, 0.95)',
          border: '1.5px solid #BAE164',
          borderRadius: '14px',
          padding: '0.85rem 1rem',
          marginBottom: '1.25rem',
          fontSize: '0.85rem',
          color: '#1A3323'
        }}>
          {isSendingEmail ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1A3323', fontWeight: 700 }}>
              <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
              Sending verification code to your email inbox...
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1A3323', fontWeight: 800 }}>
              <MailCheck size={18} color="#1A3323" /> Verification Code Dispatched! Check your email inbox.
            </div>
          )}
        </div>

        {authError && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#DC2626',
            borderRadius: '10px',
            padding: '0.65rem 0.9rem',
            fontSize: '0.85rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600
          }}>
            <AlertCircle size={18} />
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ textAlign: 'center', display: 'block', marginBottom: '0.4rem' }}>
              Enter 6-Digit Code Received in Email
            </label>
            <input
              type="text"
              className="form-input"
              maxLength={6}
              placeholder="Enter 6-digit code"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.replace(/[^0-9]/g, ''))}
              style={{
                textAlign: 'center',
                fontSize: '1.65rem',
                letterSpacing: '0.3em',
                fontWeight: 900,
                color: '#1A3323'
              }}
              autoFocus
            />
          </div>

          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <button
              type="button"
              onClick={resendOtp}
              disabled={isSendingEmail}
              style={{
                background: 'none',
                border: 'none',
                color: '#B86B18',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <RefreshCw size={14} /> Didn't get email? Resend Code
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
              disabled={isSendingEmail}
            >
              {isSendingEmail ? 'Verifying...' : 'Verify & Proceed'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
