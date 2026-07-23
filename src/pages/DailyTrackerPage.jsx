import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Flame, Sparkles, Calendar, Award, Sun, Moon, Coffee } from 'lucide-react';

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

  // Load tracker state from localStorage
  useEffect(() => {
    if (!currentUser) return;
    try {
      const stored = JSON.parse(localStorage.getItem(`ayurveda_tracker_${currentUser.id}`) || '{}');
      if (stored[todayKey]) {
        setCheckedHabits(stored[todayKey]);
      }
      
      // Calculate streak
      const dateKeys = Object.keys(stored).sort();
      let streak = 0;
      if (dateKeys.length > 0) {
        streak = dateKeys.length;
      } else {
        streak = 1;
      }
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

    // Save to localStorage
    if (currentUser) {
      const stored = JSON.parse(localStorage.getItem(`ayurveda_tracker_${currentUser.id}`) || '{}');
      stored[todayKey] = updated;
      localStorage.setItem(`ayurveda_tracker_${currentUser.id}`, JSON.stringify(stored));
    }
  };

  const completedCount = Object.values(checkedHabits).filter(Boolean).length;
  const completionPct = Math.round((completedCount / habits.length) * 100);

  return (
    <div className="container" style={{ padding: '2.5rem 1rem', maxWidth: '720px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>
          Daily Dinacharya Habit Tracker
        </h1>
        <p style={{ color: '#B8D8C2', fontSize: '0.95rem' }}>
          Build consistency with time-tested Ayurvedic daily rituals for lasting vitality
        </p>
      </div>

      {/* Streak & Score Banner */}
      <div className="glass-card" style={{
        padding: '1.5rem 2rem',
        borderRadius: '24px',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        background: 'linear-gradient(135deg, rgba(35, 83, 71, 0.9) 0%, rgba(11, 43, 38, 0.95) 100%)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #FF9500 0%, #FFB84D 100%)',
            width: '56px',
            height: '56px',
            borderRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(255, 149, 0, 0.35)'
          }}>
            <Flame size={30} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#FFB84D', fontWeight: 700, textTransform: 'uppercase' }}>
              Active Habit Streak
            </div>
            <h2 style={{ fontSize: '1.6rem', color: '#FFFFFF', margin: 0 }}>
              {streakDays} Day{streakDays > 1 ? 's' : ''} Streak 🔥
            </h2>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.8rem', color: '#8EB69B', fontWeight: 700, textTransform: 'uppercase' }}>
            Today's Completion
          </div>
          <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#DAF1DE' }}>
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
                borderRadius: '20px',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                cursor: 'pointer',
                border: isDone ? '2px solid #FF9500' : '1px solid rgba(142, 182, 155, 0.25)',
                background: isDone ? 'rgba(35, 83, 71, 0.75)' : 'rgba(5, 31, 32, 0.6)',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Checkbox circle */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: isDone ? 'none' : '2px solid #8EB69B',
                background: isDone ? '#FF9500' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {isDone && <CheckCircle2 size={22} color="#FFFFFF" />}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <h3 style={{
                    fontSize: '1.05rem',
                    color: isDone ? '#FFFFFF' : '#DAF1DE',
                    textDecoration: isDone ? 'line-through' : 'none',
                    margin: 0
                  }}>
                    {habit.title}
                  </h3>
                  <span style={{
                    fontSize: '0.72rem',
                    background: 'rgba(142, 182, 155, 0.2)',
                    color: '#8EB69B',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '50px',
                    fontWeight: 600
                  }}>
                    {habit.time}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: isDone ? '#B8D8C2' : 'rgba(184, 216, 194, 0.7)', margin: 0 }}>
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
