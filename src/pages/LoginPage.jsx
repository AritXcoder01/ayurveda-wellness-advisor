import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Leaf, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

export const LoginPage = ({ onSwitchToRegister, onSwitchToForgotPassword }) => {
  const { loginUser, authError, setAuthError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAuthError('Please fill in both email and password.');
      return;
    }
    loginUser(email, password);
  };

  const fillDemoAccount = () => {
    const users = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
    const demoEmail = 'user@gmail.com';
    const demoPass = '@user123';
    
    // Check or update demo account with exact specified user details
    const existingIndex = users.findIndex(u => u.email.toLowerCase() === demoEmail.toLowerCase());
    const demoUserData = {
      id: 'usr_demo',
      name: 'Lewise Morish',
      email: demoEmail,
      password: demoPass,
      age: 25,
      gender: 'Male',
      createdAt: new Date().toISOString()
    };

    if (existingIndex !== -1) {
      users[existingIndex] = { ...users[existingIndex], ...demoUserData };
    } else {
      users.push(demoUserData);
    }
    localStorage.setItem('ayurveda_users', JSON.stringify(users));

    setEmail(demoEmail);
    setPassword(demoPass);
    setAuthError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem 1rem',
      position: 'relative'
    }}>
      <div className="glass-card" style={{
        maxWidth: '460px',
        width: '100%',
        padding: '2.6rem 2.2rem',
        borderRadius: '32px',
        boxShadow: '0 25px 60px -10px rgba(26, 51, 35, 0.18)'
      }}>
        {/* Organic Luxury Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
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
            <Leaf size={32} color="#FEFEFE" />
          </div>
          
          <h1 className="font-serif-title" style={{ fontSize: '1.85rem', color: '#1A3323', marginBottom: '0.3rem', fontWeight: 800 }}>
            Welcome to <span style={{ color: '#B86B18' }}>AyurVeda</span> Life
          </h1>
          
          <p style={{ fontSize: '0.92rem', color: '#567360', fontWeight: 500 }}>
            Discover your Mind-Body Prakriti (Vata, Pitta, Kapha) & personalized wellness advice
          </p>
        </div>

        {/* Quick Demo Account Button */}
        <div style={{
          background: 'rgba(240, 247, 232, 0.85)',
          border: '1.5px solid #BAE164',
          borderRadius: '16px',
          padding: '0.8rem 1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="#B86B18" />
            <span style={{ fontSize: '0.85rem', color: '#1A3323', fontWeight: 700 }}>Quick Test Account</span>
          </div>
          <button
            type="button"
            onClick={fillDemoAccount}
            style={{
              background: 'linear-gradient(135deg, #B86B18 0%, #D97A24 100%)',
              color: '#FEFEFE',
              border: 'none',
              borderRadius: '8px',
              padding: '0.38rem 0.8rem',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(184, 107, 24, 0.25)'
            }}
          >
            Fill Demo Login
          </button>
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

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="form-input"
                placeholder="user@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', paddingLeft: '2.6rem' }}
                required
              />
              <Mail size={18} color="#1A3323" style={{ position: 'absolute', left: '0.88rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', paddingLeft: '2.6rem' }}
                required
              />
              <Lock size={18} color="#1A3323" style={{ position: 'absolute', left: '0.88rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            fontSize: '0.85rem'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#2B4534', fontWeight: 600, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: '#1A3323' }}
              />
              Remember me
            </label>

            <button
              type="button"
              onClick={onSwitchToForgotPassword}
              style={{
                background: 'none',
                border: 'none',
                color: '#B86B18',
                fontWeight: 800,
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '0.95rem' }}
          >
            Sign In & Continue <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1.5px solid rgba(26, 51, 35, 0.12)' }}>
          <p style={{ fontSize: '0.9rem', color: '#567360' }}>
            New to AyurVeda Life?{' '}
            <button
              onClick={onSwitchToRegister}
              style={{
                background: 'none',
                border: 'none',
                color: '#B86B18',
                fontWeight: 800,
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
