import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, AlertCircle, RefreshCw, MailCheck, Loader2, FolderOpen } from 'lucide-react';

export const EmailVerificationModal = () => {
  const { 
    showOtpModal, 
    setShowOtpModal, 
    pendingUser, 
    confirmEmailOtp, 
    authError, 
    setAuthError,
    isSendingEmail,
    resendOtp,
    emailLogs,
    refreshEmailLogs
  } = useAuth();
  
  const [inputCode, setInputCode] = useState('');
  const [showDirectory, setShowDirectory] = useState(false);

  if (!showOtpModal || !pendingUser) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputCode.trim() || inputCode.trim().length !== 6) {
      setAuthError('Please enter a valid 6-digit verification code.');
      return;
    }
    confirmEmailOtp(inputCode.trim());
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

        {/* Live Email Dispatch Status */}
        <div style={{
          background: 'rgba(240, 247, 232, 0.95)',
          border: '1.5px solid #BAE164',
          borderRadius: '14px',
          padding: '0.8rem 1rem',
          marginBottom: '1.25rem',
          fontSize: '0.83rem',
          color: '#1A3323'
        }}>
          {isSendingEmail ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1A3323', fontWeight: 700 }}>
              <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
              Connecting to Mail Server & sending email...
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#1A3323', fontWeight: 800 }}>
                <MailCheck size={16} color="#1A3323" /> Verification Code Dispatched!
              </span>
              
              <button
                type="button"
                onClick={() => {
                  refreshEmailLogs();
                  setShowDirectory(!showDirectory);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#B86B18',
                  fontWeight: 800,
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  textDecoration: 'underline'
                }}
              >
                <FolderOpen size={12} /> Email Directory ({emailLogs.length})
              </button>
            </div>
          )}
        </div>

        {/* Directory Inspection Drawer */}
        {showDirectory && (
          <div style={{
            background: '#FEFEFE',
            border: '1.5px solid #BAE164',
            borderRadius: '14px',
            padding: '0.85rem',
            marginBottom: '1.25rem',
            maxHeight: '180px',
            overflowY: 'auto'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1A3323', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              📬 Live Email Directory Logs
            </div>

            {emailLogs.length === 0 ? (
              <div style={{ fontSize: '0.78rem', color: '#7E9E88', textAlign: 'center' }}>No email logs present.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {emailLogs.map((log, index) => (
                  <div key={log.id || index} style={{
                    background: '#F9FBF2',
                    border: '1px solid rgba(26, 51, 35, 0.15)',
                    borderRadius: '8px',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.78rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#1A3323' }}>
                      <span>To: {log.email}</span>
                      <span style={{ color: '#B86B18' }}>Code: {log.otp}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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
              placeholder="e.g. 194820"
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
            >
              Verify & Proceed
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
