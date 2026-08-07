import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, KeyRound, Lock, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, MailCheck } from 'lucide-react';

export const ForgotPasswordPage = ({ onSwitchToLogin }) => {
  const { 
    sendForgotPasswordOtp, 
    verifyForgotPasswordOtp, 
    resetPassword,
    authError, 
    authSuccess, 
    setAuthError, 
    isSendingEmail,
    forgotEmail
  } = useAuth();

  const [step, setStep] = useState(1);
  const [emailInput, setEmailInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendCode = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (!emailInput.trim()) {
      setAuthError('Please enter your registered email address.');
      return;
    }
    const sent = await sendForgotPasswordOtp(emailInput.trim());
    if (sent) {
      setStep(2);
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!codeInput.trim() || codeInput.trim().length !== 6) {
      setAuthError('Please enter the full 6-digit code received on your email.');
      return;
    }
    const verified = verifyForgotPasswordOtp(codeInput.trim());
    if (verified) {
      setStep(3);
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!newPassword || !confirmPassword) {
      setAuthError('Please enter and confirm your new password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setAuthError('Passwords do not match. Please verify.');
      return;
    }
    if (newPassword.length < 8) {
      setAuthError('Password must be at least 8 characters long.');
      return;
    }

    const success = resetPassword(newPassword);
    if (success) {
      setStep(4);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      position: 'relative'
    }}>
      <div className="glass-card" style={{
        maxWidth: '480px',
        width: '100%',
        padding: '2.6rem 2.2rem',
        borderRadius: '32px',
        boxShadow: '0 25px 60px -10px rgba(26, 51, 35, 0.18)'
      }}>
        {/* Top Navigation Back Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="btn-text"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0 }}
          >
            <ArrowLeft size={18} /> Back to Sign In
          </button>
        </div>

        {/* Header Icon & Title */}
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
            <KeyRound size={32} color="#FEFEFE" />
          </div>
          
          <h1 className="font-serif-title" style={{ fontSize: '1.75rem', color: '#1A3323', marginBottom: '0.3rem', fontWeight: 800 }}>
            Password Reset
          </h1>
          
          <p style={{ fontSize: '0.9rem', color: '#567360', fontWeight: 500 }}>
            {step === 1 && 'Enter your account email to receive a 6-digit verification code.'}
            {step === 2 && `Enter the 6-digit code dispatched to ${forgotEmail}.`}
            {step === 3 && 'Verification successful! Set your new account password below.'}
            {step === 4 && 'Your password has been reset successfully!'}
          </p>
        </div>

        {/* Status Alerts */}
        {authError && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#DC2626',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600
          }}>
            <AlertCircle size={18} />
            {authError}
          </div>
        )}

        {authSuccess && step !== 4 && (
          <div style={{
            background: 'rgba(186, 225, 100, 0.25)',
            border: '1.5px solid #BAE164',
            color: '#1A3323',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 700
          }}>
            <CheckCircle2 size={18} color="#1A3323" />
            {authSuccess}
          </div>
        )}

        {/* STEP 1: Enter Registered Email */}
        {step === 1 && (
          <form onSubmit={handleSendCode}>
            <div className="form-group">
              <label className="form-label">Registered Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="form-input"
                  placeholder="user@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  style={{ width: '100%', paddingLeft: '2.6rem' }}
                  required
                />
                <Mail size={18} color="#1A3323" style={{ position: 'absolute', left: '0.88rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={isSendingEmail}
              style={{ width: '100%', padding: '0.95rem', marginTop: '0.5rem' }}
            >
              {isSendingEmail ? 'Sending Code to Email...' : 'Send Verification Code'} <ArrowRight size={18} />
            </button>
          </form>
        )}

        {/* STEP 2: Enter Verification Code */}
        {step === 2 && (
          <form onSubmit={handleVerifyCode}>
            {/* Clean Code Status Banner */}
            <div style={{
              background: 'rgba(240, 247, 232, 0.95)',
              border: '1.5px solid #BAE164',
              borderRadius: '14px',
              padding: '0.85rem 1rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <MailCheck size={18} color="#1A3323" />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1A3323' }}>
                Verification Code Dispatched! Check your email inbox.
              </span>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ textAlign: 'center', display: 'block' }}>
                6-Digit Email Reset Code
              </label>
              <input
                type="text"
                className="form-input"
                maxLength={6}
                placeholder="Enter 6-digit code"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value.replace(/[^0-9]/g, ''))}
                style={{
                  textAlign: 'center',
                  fontSize: '1.6rem',
                  letterSpacing: '0.3em',
                  fontWeight: 900,
                  color: '#1A3323'
                }}
                autoFocus
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary"
                style={{ flex: 1 }}
              >
                Change Email
              </button>
              
              <button
                type="submit"
                className="btn-primary"
                style={{ flex: 1 }}
              >
                Verify Code <ShieldCheck size={18} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Set New Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Min 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{ width: '100%', paddingLeft: '2.6rem' }}
                  required
                />
                <Lock size={18} color="#1A3323" style={{ position: 'absolute', left: '0.88rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Re-enter new password"
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
              style={{ width: '100%', padding: '0.95rem', marginTop: '0.5rem' }}
            >
              Update Password & Complete
            </button>
          </form>
        )}

        {/* STEP 4: Success Message & Return */}
        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              background: 'rgba(186, 225, 100, 0.3)',
              border: '2px solid #BAE164',
              width: '66px',
              height: '66px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <CheckCircle2 size={38} color="#1A3323" />
            </div>

            <h3 className="font-serif-title" style={{ fontSize: '1.4rem', color: '#1A3323', marginBottom: '0.5rem', fontWeight: 800 }}>
              Password Reset Complete!
            </h3>
            
            <p style={{ fontSize: '0.9rem', color: '#567360', marginBottom: '1.75rem' }}>
              Your account password has been updated successfully. You can now sign in using your new password.
            </p>

            <button
              onClick={onSwitchToLogin}
              className="btn-primary"
              style={{ width: '100%', padding: '0.95rem' }}
            >
              Sign In to Your Account <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
