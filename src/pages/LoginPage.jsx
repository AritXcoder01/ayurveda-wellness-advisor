import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Leaf, Lock, Mail, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

export const LoginPage = ({ onSwitchToRegister }) => {
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
    loginUser(email, password, rememberMe);
  };

  const fillDemoAccount = () => {
    // Register demo account if not exists
    const users = JSON.parse(localStorage.getItem('ayurveda_users') || '[]');
    const demoEmail = 'user@ayurveda.com';
    const demoPass = 'Password123';
    
    if (!users.some(u => u.email === demoEmail)) {
      users.push({
        id: 'usr_demo',
        name: 'Aarav Sharma',
        email: demoEmail,
        password: demoPass,
        age: 32,
        gender: 'Male',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('ayurveda_users', JSON.stringify(users));
    }

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
        maxWidth: '440px',
        width: '100%',
        padding: '2.5rem 2rem',
        borderRadius: '28px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #FF9500 0%, #FFB84D 100%)',
            width: '56px',
            height: '56px',
            borderRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto',
            boxShadow: '0 8px 20px rgba(255, 149, 0, 0.35)'
          }}>
            <Leaf size={30} color="#FFFFFF" />
          </div>
          
          <h1 style={{ fontSize: '1.75rem', color: '#FFFFFF', marginBottom: '0.3rem' }}>
            Welcome to <span style={{ color: '#FF9500' }}>AyurVeda</span> Life
          </h1>
          
          <p style={{ fontSize: '0.9rem', color: '#B8D8C2' }}>
            Discover your Mind-Body Prakriti (Vata, Pitta, Kapha) & personalized wellness advice
          </p>
        </div>

        {/* Demo Account Quick Button */}
        <div style={{
          background: 'rgba(35, 83, 71, 0.4)',
          border: '1px solid rgba(142, 182, 155, 0.3)',
          borderRadius: '14px',
          padding: '0.75rem 1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="#FFB84D" />
            <span style={{ fontSize: '0.85rem', color: '#DAF1DE' }}>Want to test quickly?</span>
          </div>
          <button
            type="button"
            onClick={fillDemoAccount}
            style={{
              background: 'rgba(255, 149, 0, 0.2)',
              color: '#FFB84D',
              border: '1px solid #FF9500',
              borderRadius: '8px',
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Fill Demo Login
          </button>
        </div>

        {authError && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#FCA5A5',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
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
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', paddingLeft: '2.5rem' }}
                required
              />
              <Mail size={18} color="#8EB69B" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
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
                style={{ width: '100%', paddingLeft: '2.5rem' }}
                required
              />
              <Lock size={18} color="#8EB69B" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            fontSize: '0.85rem'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#B8D8C2', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: '#FF9500' }}
              />
              Remember me
            </label>
            <span style={{ color: '#8EB69B', cursor: 'pointer' }}>Forgot password?</span>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '0.95rem' }}
          >
            Sign In & Continue <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(142, 182, 155, 0.2)' }}>
          <p style={{ fontSize: '0.9rem', color: '#B8D8C2' }}>
            New to AyurVeda Life?{' '}
            <button
              onClick={onSwitchToRegister}
              style={{
                background: 'none',
                border: 'none',
                color: '#FFB84D',
                fontWeight: 700,
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
