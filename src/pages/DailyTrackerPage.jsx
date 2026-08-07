import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Flame } from 'lucide-react';

export const DailyTrackerPage = () => {
  const { currentUser } = useAuth();
  const todayKey = new Date().toISOString().split('T')[0];

  const habits = [
    { id: 'h1', title: 'Warm Lemon & Honey Water', desc: 'Kickstarts digestive Agni and flushes morning toxins (Ama).', time: 'Morning' },
    { id: 'h2', title: 'Tongue Scraping & Oil Pulling', desc: 'Cleanses bacteria, enhances taste buds, and stimulates internal organs.', time: 'Morning' },
    { id: 'h3', title: 'Warm Oil Self-Massage (Abhyanga)', desc: 'Nourishes nervous system, lubricates joints, and pacifies Vata.', time: 'Morning' },
    { id: 'h4', title: '15-Min Yoga Asana Practice', desc: 'Keeps spine supple, improves lymphatic circulation, and builds core heat.', time: 'Midday' },
    { id: 'h5', title: '10-Min Pranayama Breathwork', desc: 'Harmonizes Prana energy, reduces mental stress, and centers focus.', time: 'Evening' },
    { id: 'h6', title: 'Early Restful Bedtime (By 10:00 PM)', desc: 'Prevents late-night Pitta heat surge and promotes deep restorative sleep.', time: 'Night' }
  ];

  const [checkedHabits, setCheckedHabits] = useState({});
  const [streakDays, setStreakDays] = useState(1);

  useEffect(() => {
    if (!currentUser) return;
    try {
      const stored = JSON.parse(localStorage.getItem(`ayurveda_tracker_${currentUser.id}`) || '{}');
      if (stored[todayKey]) {
        setCheckedHabits(stored[todayKey]);
      }
      
      const dateKeys = Object.keys(stored).sort();
      let streak = dateKeys.length > 0 ? dateKeys.length : 1;
      setStreakDays(streak);
    } catch (e) {
      console.error('Error loading habit tracker:', e);
    }
  }, [currentUser, todayKey]);

  const toggleHabit = (id) => {
    const updated = {
      ...checkedHabits,
      [id]: !checkedHabits[id]
    };
    setCheckedHabits(updated);

    if (currentUser) {
      const stored = JSON.parse(localStorage.getItem(`ayurveda_tracker_${currentUser.id}`) || '{}');
      stored[todayKey] = updated;
      localStorage.setItem(`ayurveda_tracker_${currentUser.id}`, JSON.stringify(stored));
    }
  };

  const completedCount = Object.values(checkedHabits).filter(Boolean).length;
  const completionPct = Math.round((completedCount / habits.length) * 100);

  return (
    <div className="container" style={{ padding: '2.5rem 1rem', maxWidth: '760px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="font-serif-title" style={{ fontSize: '1.85rem', color: '#1A3323', marginBottom: '0.4rem', fontWeight: 800 }}>
          Daily Dinacharya Habit Tracker
        </h1>
        <p style={{ color: '#567360', fontSize: '0.96rem', fontWeight: 500 }}>
          Build consistency with time-tested Ayurvedic daily rituals for lasting vitality
        </p>
      </div>

      {/* Streak & Score Banner */}
      <div className="glass-card" style={{
        padding: '1.75rem 2rem',
        borderRadius: '28px',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        background: 'linear-gradient(135deg, rgba(249, 251, 242, 0.95) 0%, rgba(240, 247, 232, 0.9) 100%)',
        border: '1.5px solid #BAE164'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #B86B18 0%, #D97A24 100%)',
            width: '58px',
            height: '58px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(184, 107, 24, 0.35)',
            border: '1px solid #FEFEFE'
          }}>
            <Flame size={32} color="#FEFEFE" />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#B86B18', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Habit Streak
            </div>
            <h2 className="font-serif-title" style={{ fontSize: '1.65rem', color: '#1A3323', margin: 0, fontWeight: 900 }}>
              {streakDays} Day{streakDays > 1 ? 's' : ''} Streak 🔥
            </h2>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.8rem', color: '#1A3323', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Today's Completion
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1A3323' }}>
            {completionPct}%
          </span>
        </div>
      </div>

      {/* Habits List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {habits.map((habit) => {
          const isDone = !!checkedHabits[habit.id];
          return (
            <div
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className="glass-card"
              style={{
                borderRadius: '22px',
                padding: '1.35rem 1.6rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                cursor: 'pointer',
                border: isDone ? '2px solid #BAE164' : '1.5px solid rgba(26, 51, 35, 0.15)',
                background: isDone ? 'rgba(240, 247, 232, 0.95)' : 'rgba(253, 255, 249, 0.8)',
                transition: 'all 0.22s ease'
              }}
            >
              {/* Checkbox Circle */}
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                border: isDone ? 'none' : '2px solid #1A3323',
                background: isDone ? 'linear-gradient(135deg, #1A3323 0%, #2B5738 100%)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {isDone && <CheckCircle2 size={24} color="#BAE164" />}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                  <h3 style={{
                    fontSize: '1.08rem',
                    color: '#1A3323',
                    textDecoration: isDone ? 'line-through' : 'none',
                    margin: 0,
                    fontWeight: 700
                  }}>
                    {habit.title}
                  </h3>
                  <span style={{
                    fontSize: '0.74rem',
                    background: 'rgba(186, 225, 100, 0.3)',
                    color: '#1A3323',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '50px',
                    fontWeight: 800,
                    textTransform: 'uppercase'
                  }}>
                    {habit.time}
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: isDone ? '#567360' : '#2B4534', margin: 0, fontWeight: 500 }}>
                  {habit.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
