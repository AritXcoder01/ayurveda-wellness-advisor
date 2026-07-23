import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Save, Trash2, CheckCircle } from 'lucide-react';

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
    <div className="container" style={{ padding: '2.5rem 1rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '1.5rem', textAlign: 'center' }}>
        User Profile & Settings
      </h1>

      <div className="glass-card" style={{ padding: '2rem', borderRadius: '24px' }}>
        {authSuccess && (
          <div style={{
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            color: '#86EFAC',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            fontSize: '0.88rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle size={18} /> {authSuccess}
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
                style={{ width: '100%', paddingLeft: '2.5rem' }}
                required
              />
              <User size={18} color="#8EB69B" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
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
                style={{ width: '100%', paddingLeft: '2.5rem' }}
                required
              />
              <Mail size={18} color="#8EB69B" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
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
                style={{ width: '100%', accentColor: '#FF9500', cursor: 'pointer' }}
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
            style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}
          >
            <Save size={18} /> Save Changes
          </button>
        </form>

        <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(142, 182, 155, 0.2)' }}>
          <button
            type="button"
            onClick={handleClearHistory}
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#FCA5A5',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '12px',
              padding: '0.75rem 1.2rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%'
            }}
          >
            <Trash2 size={16} /> Clear Assessment History
          </button>
        </div>
      </div>
    </div>
  );
};
