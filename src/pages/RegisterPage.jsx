import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Leaf, User, Mail, Lock, ArrowRight, ShieldCheck, MailCheck, Loader2, Clipboard, RefreshCw } from 'lucide-react';

export const RegisterPage = ({ onSwitchToLogin }) => {
  const { registerUser, confirmEmailOtp, authError, setAuthError, isSendingEmail, resendOtp, verificationCode } = useAuth();
  
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState(28);
  const [gender, setGender] = useState('Female');

  const [otpCode, setOtpCode] = useState('');

  const validatePassword = (pass) => {
    if (pass.length < 8) return 'Password must be at least 8 characters long.';
    if (!/[A-Z]/.test(pass)) return 'Password must contain at least 1 uppercase letter.';
    if (!/[0-9]/.test(pass)) return 'Password must contain at least 1 number.';
    return null;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!name || !email || !password || !confirmPassword) {
      setAuthError('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setAuthError('Passwords do not match. Please verify.');
      return;
    }

    const passErr = validatePassword(password);
    if (passErr) {
      setAuthError(passErr);
      return;
    }

    const success = await registerUser(name, email, password, age, gender);
    if (success) {
      setStep(2);
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setAuthError('Please enter a valid 6-digit verification code.');
      return;
    }

    await confirmEmailOtp(otpCode.trim());
  };

  const handlePasteCode = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const cleanDigits = text.replace(/[^0-9]/g, '').slice(0, 6);
      if (cleanDigits && cleanDigits.length === 6) {
        setOtpCode(cleanDigits);
        setAuthError('');
        return;
      }
    } catch (err) {}

    if (verificationCode) {
      setOtpCode(verificationCode);
      setAuthError('');
    } else {
      setAuthError('No verification code found.');
    }
  };

  const handleInputPaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const cleanDigits = pastedText.replace(/[^0-9]/g, '').slice(0, 6);
    if (cleanDigits) {
      setOtpCode(cleanDigits);
      setAuthError('');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem'
    }}>
      <div className="glass-card" style={{
        maxWidth: '500px',
        width: '100%',
        padding: '2.6rem 2.2rem',
        borderRadius: '32px',
        boxShadow: '0 25px 60px -10px rgba(26, 51, 35, 0.18)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1A3323 0%, #2B5738 50%, #BAE164 100%)',
            width: '60px',
            height: '60px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto',
            boxShadow: '0 8px 24px rgba(26, 51, 35, 0.28)',
            border: '1.5px solid #BAE164'
          }}>
            {step === 1 ? <Leaf size={32} color="#FEFEFE" /> : <ShieldCheck size={32} color="#FEFEFE" />}
          </div>
          
          <h1 className="font-serif-title" style={{ fontSize: '1.85rem', color: '#1A3323', marginBottom: '0.3rem', fontWeight: 800 }}>
            {step === 1 ? 'Create Your Account' : 'Email Verification'}
          </h1>
          
          <p style={{ fontSize: '0.92rem', color: '#567360', fontWeight: 500 }}>
            {step === 1 
              ? 'Join AyurVeda Life to unlock your personalized dosha analysis & wellness guidelines'
              : `A 6-digit verification code has been sent to ${email}`}
          </p>
        </div>

        {authError && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#DC2626',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            fontWeight: 600
          }}>
            {authError}
          </div>
        )}

        {/* STEP 1: Registration Form */}
        {step === 1 && (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Kanha Pandey"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', paddingLeft: '2.6rem' }}
                  required
                />
                <User size={18} color="#1A3323" style={{ position: 'absolute', left: '0.88rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="form-input"
                  placeholder="kanhapandey389@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', paddingLeft: '2.6rem' }}
                  required
                />
                <Mail size={18} color="#1A3323" style={{ position: 'absolute', left: '0.88rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="grid-2" style={{ marginBottom: '1.2rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Age ({age} yrs)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="range"
                    min="18"
                    max="80"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    style={{ width: '100%', accentColor: '#1A3323', cursor: 'pointer' }}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Min 8 chars, 1 uppercase & 1 number"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', paddingLeft: '2.6rem' }}
                  required
                />
                <Lock size={18} color="#1A3323" style={{ position: 'absolute', left: '0.88rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ width: '100%', paddingLeft: '2.6rem' }}
                  required
                />
                <Lock size={18} color="#1A3323" style={{ position: 'absolute', left: '0.88rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={isSendingEmail}
              style={{ width: '100%', padding: '0.95rem', marginTop: '0.5rem' }}
            >
              {isSendingEmail ? 'Sending Verification Code...' : 'Create Account & Verify Email'} <ArrowRight size={18} />
            </button>
          </form>
        )}

        {/* STEP 2: Inline 6-Digit Verification Code on Same Page */}
        {step === 2 && (
          <form onSubmit={handleVerifySubmit}>
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
                  Sending code to email...
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#1A3323', fontWeight: 800 }}>
                    <MailCheck size={18} color="#1A3323" /> Verification Code Dispatched!
                  </span>

                  {verificationCode && (
                    <span style={{
                      background: 'linear-gradient(135deg, #1A3323 0%, #2B5738 100%)',
                      color: '#BAE164',
                      padding: '0.2rem 0.65rem',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 900,
                      letterSpacing: '0.15em',
                      boxShadow: '0 2px 6px rgba(26, 51, 35, 0.2)'
                    }}>
                      Code: {verificationCode}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="form-group">
              {/* Header line with Label and Paste Code Option right above the verification enter line */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>
                  Enter 6-Digit Code
                </label>

                <button
                  type="button"
                  onClick={handlePasteCode}
                  style={{
                    background: 'linear-gradient(135deg, #1A3323 0%, #2B5738 100%)',
                    color: '#BAE164',
                    border: '1.5px solid #BAE164',
                    borderRadius: '8px',
                    padding: '0.28rem 0.7rem',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: '0 2px 8px rgba(26, 51, 35, 0.2)'
                  }}
                >
                  <Clipboard size={14} color="#BAE164" /> Paste Code
                </button>
              </div>

              <input
                type="text"
                className="form-input"
                maxLength={6}
                placeholder="Enter 6-digit code"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                onPaste={handleInputPaste}
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
                onClick={() => setStep(1)}
                className="btn-secondary"
                style={{ flex: 1 }}
              >
                Back / Edit Details
              </button>

              <button
                type="submit"
                className="btn-primary"
                disabled={isSendingEmail}
                style={{ flex: 1 }}
              >
                {isSendingEmail ? 'Verifying...' : 'Verify & Complete'}
              </button>
            </div>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1.5px solid rgba(26, 51, 35, 0.12)' }}>
          <p style={{ fontSize: '0.9rem', color: '#567360' }}>
            Already registered?{' '}
            <button
              onClick={onSwitchToLogin}
              style={{
                background: 'none',
                border: 'none',
                color: '#B86B18',
                fontWeight: 800,
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
