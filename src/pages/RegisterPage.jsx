import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Leaf, User, Mail, Lock, ArrowRight } from 'lucide-react';

export const RegisterPage = ({ onSwitchToLogin }) => {
  const { registerUser, authError, setAuthError } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState(28);
  const [gender, setGender] = useState('Female');

  const validatePassword = (pass) => {
    if (pass.length < 8) return 'Password must be at least 8 characters long.';
    if (!/[A-Z]/.test(pass)) return 'Password must contain at least 1 uppercase letter.';
    if (!/[0-9]/.test(pass)) return 'Password must contain at least 1 number.';
    return null;
  };

  const handleSubmit = (e) => {
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

    registerUser(name, email, password, age, gender);
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
            <Leaf size={32} color="#FEFEFE" />
          </div>
          
          <h1 className="font-serif-title" style={{ fontSize: '1.85rem', color: '#1A3323', marginBottom: '0.3rem', fontWeight: 800 }}>
            Create Your Account
          </h1>
          
          <p style={{ fontSize: '0.92rem', color: '#567360', fontWeight: 500 }}>
            Join AyurVeda Life to unlock your personalized dosha analysis & wellness guidelines
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

        <form onSubmit={handleSubmit}>
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
            style={{ width: '100%', padding: '0.95rem', marginTop: '0.5rem' }}
          >
            Create Account & Verify Email <ArrowRight size={18} />
          </button>
        </form>

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
