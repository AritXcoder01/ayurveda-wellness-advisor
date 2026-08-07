import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Save, Trash2, CheckCircle } from 'lucide-react';

export const ProfilePage = () => {
  const { currentUser, updateProfile, authSuccess } = useAuth();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [age, setAge] = useState(currentUser?.age || 30);
  const [gender, setGender] = useState(currentUser?.gender || 'Female');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ name, email, age: parseInt(age, 10), gender });
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all assessment history?')) {
      const allResults = JSON.parse(localStorage.getItem('ayurveda_results') || '[]');
      const filtered = allResults.filter(r => r.userId !== currentUser.id);
      localStorage.setItem('ayurveda_results', JSON.stringify(filtered));
      window.location.reload();
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1rem', maxWidth: '620px', margin: '0 auto' }}>
      <h1 className="font-serif-title" style={{ fontSize: '1.85rem', color: '#1A3323', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 800 }}>
        User Profile & Settings
      </h1>

      <div className="glass-card" style={{ padding: '2.4rem 2rem', borderRadius: '32px' }}>
        {authSuccess && (
          <div style={{
            background: 'rgba(186, 225, 100, 0.25)',
            border: '1.5px solid #BAE164',
            color: '#1A3323',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            fontSize: '0.88rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 800
          }}>
            <CheckCircle size={18} color="#1A3323" /> {authSuccess}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
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
              <input
                type="range"
                min="18"
                max="80"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={{ width: '100%', accentColor: '#1A3323', cursor: 'pointer' }}
              />
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

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '0.95rem', marginTop: '0.5rem' }}
          >
            <Save size={18} /> Save Changes
          </button>
        </form>

        <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1.5px solid rgba(26, 51, 35, 0.15)' }}>
          <button
            type="button"
            onClick={handleClearHistory}
            style={{
              background: 'rgba(239, 68, 68, 0.12)',
              color: '#DC2626',
              border: '1.5px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '14px',
              padding: '0.8rem 1.2rem',
              fontSize: '0.88rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%'
            }}
          >
            <Trash2 size={18} /> Clear Assessment History
          </button>
        </div>
      </div>
    </div>
  );
};
