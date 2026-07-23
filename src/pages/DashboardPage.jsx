import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useDosha } from '../context/DoshaContext';
import { DoshaChart } from '../components/DoshaChart';
import { 
  Sparkles, RefreshCw, Printer, FileText, Utensils, Activity, 
  Clock, Moon, Sun, ShieldAlert, ChevronRight, Calendar, Heart
} from 'lucide-react';

export const DashboardPage = ({ onStartQuiz, onViewReport, onEditProfile }) => {
  const { currentUser } = useAuth();
  const { activeResult, recommendations, history } = useDosha();

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  if (!activeResult || !recommendations) {
    return (
      <div className="container" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '560px', margin: '0 auto', padding: '3rem 2rem', borderRadius: '28px' }}>
          <div style={{
            background: 'rgba(255, 149, 0, 0.2)',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            border: '1px solid #FF9500'
          }}>
            <Sparkles size={36} color="#FF9500" />
          </div>

          <h2 style={{ fontSize: '1.75rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
            Welcome, {currentUser?.name}!
          </h2>
          
          <p style={{ color: '#B8D8C2', marginBottom: '2rem', fontSize: '1rem' }}>
            You haven't completed your 15-question Ayurvedic Dosha Assessment yet. Take 3 minutes to discover your unique Vata, Pitta, and Kapha constitution.
          </p>

          <button onClick={onStartQuiz} className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
            Start 15-Question Assessment <Sparkles size={20} />
          </button>
        </div>
      </div>
    );
  }

  const { dominant, secondary, isDual, doshaType, primaryProfile } = recommendations;

  return (
    <div className="container" style={{ padding: '2rem 1rem 4rem 1rem' }}>
      {/* Welcome Banner */}
      <div className="glass-card" style={{
        padding: '1.75rem 2rem',
        borderRadius: '24px',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        background: 'linear-gradient(135deg, rgba(11, 43, 38, 0.85) 0%, rgba(35, 83, 71, 0.6) 100%)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8EB69B', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
            <Calendar size={15} /> {formattedDate}
          </div>
          <h1 style={{ fontSize: '1.8rem', color: '#FFFFFF', margin: 0 }}>
            Namaste, {currentUser?.name}! 🙏
          </h1>
          <p style={{ color: '#DAF1DE', margin: '0.3rem 0 0 0', fontSize: '0.95rem' }}>
            Your primary Ayurvedic constitution is <strong style={{ color: '#FFB84D' }}>{doshaType}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={onStartQuiz} className="btn-secondary">
            <RefreshCw size={16} /> Retake Quiz
          </button>
          <button onClick={onViewReport} className="btn-primary">
            <FileText size={16} /> Full Report
          </button>
        </div>
      </div>

      {/* Main Grid: My Dosha Card & Quick Stats */}
      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        {/* Left: My Dosha Breakdown */}
        <div className="glass-card" style={{ borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF' }}>My Dosha Profile</h3>
              <span className={`dosha-badge badge-${dominant.toLowerCase()}`}>
                {doshaType}
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#B8D8C2', marginBottom: '1.5rem' }}>
              {primaryProfile.summary}
            </p>

            <DoshaChart
              vata={activeResult.vataScore}
              pitta={activeResult.pittaScore}
              kapha={activeResult.kaphaScore}
            />
          </div>

          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(142, 182, 155, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.85rem'
          }}>
            <span style={{ color: '#8EB69B' }}>Primary Element: <strong>{primaryProfile.element}</strong></span>
            <span style={{ color: '#8EB69B' }}>Qualities: <strong>{primaryProfile.qualities}</strong></span>
          </div>
        </div>

        {/* Right: Quick Daily Dinacharya Overview */}
        <div className="glass-card" style={{ borderRadius: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock color="#FF9500" size={20} /> Daily Dinacharya Schedule
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              background: 'rgba(5, 31, 32, 0.6)',
              borderRadius: '14px',
              padding: '0.9rem 1.1rem',
              borderLeft: '4px solid #FFB84D'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFB84D', fontWeight: 700, fontSize: '0.85rem' }}>
                <Sun size={16} /> Morning Routine
              </div>
              <p style={{ color: '#DAF1DE', fontSize: '0.88rem', marginTop: '0.3rem', margin: 0 }}>
                {primaryProfile.dinacharya.morning}
              </p>
            </div>

            <div style={{
              background: 'rgba(5, 31, 32, 0.6)',
              borderRadius: '14px',
              padding: '0.9rem 1.1rem',
              borderLeft: '4px solid #8EB69B'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8EB69B', fontWeight: 700, fontSize: '0.85rem' }}>
                <Clock size={16} /> Afternoon Routine
              </div>
              <p style={{ color: '#DAF1DE', fontSize: '0.88rem', marginTop: '0.3rem', margin: 0 }}>
                {primaryProfile.dinacharya.afternoon}
              </p>
            </div>

            <div style={{
              background: 'rgba(5, 31, 32, 0.6)',
              borderRadius: '14px',
              padding: '0.9rem 1.1rem',
              borderLeft: '4px solid #235347'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#DAF1DE', fontWeight: 700, fontSize: '0.85rem' }}>
                <Moon size={16} /> Evening Routine
              </div>
              <p style={{ color: '#DAF1DE', fontSize: '0.88rem', marginTop: '0.3rem', margin: 0 }}>
                {primaryProfile.dinacharya.evening}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Cards Section */}
      <h2 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '1.25rem' }}>
        Personalized Wellness Guidelines
      </h2>

      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        {/* Diet Card */}
        <div className="glass-card" style={{ borderRadius: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#FFB84D', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Utensils size={20} /> Ayurvedic Diet Plan
          </h3>

          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#8EB69B', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Foods to Favor</h4>
            <ul style={{ paddingLeft: '1.2rem', color: '#DAF1DE', fontSize: '0.88rem' }}>
              {primaryProfile.diet.favor.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '0.3rem' }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#FF9500', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Foods to Avoid</h4>
            <ul style={{ paddingLeft: '1.2rem', color: '#DAF1DE', fontSize: '0.88rem' }}>
              {primaryProfile.diet.avoid.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '0.3rem' }}>{item}</li>
              ))}
            </ul>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#B8D8C2', fontStyle: 'italic', background: 'rgba(5,31,32,0.5)', padding: '0.6rem 0.8rem', borderRadius: '10px' }}>
            💡 {primaryProfile.diet.mealRoutine}
          </p>
        </div>

        {/* Yoga Routine Card */}
        <div className="glass-card" style={{ borderRadius: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#8EB69B', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={20} /> Recommended Yoga Poses
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {primaryProfile.yoga.map((pose, idx) => (
              <div key={idx} style={{
                background: 'rgba(5, 31, 32, 0.5)',
                borderRadius: '12px',
                padding: '0.75rem 0.9rem',
                border: '1px solid rgba(142, 182, 155, 0.2)'
              }}>
                <strong style={{ color: '#FFFFFF', fontSize: '0.92rem' }}>{idx + 1}. {pose.name}</strong>
                <p style={{ color: '#B8D8C2', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>{pose.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assessment History */}
      {history.length > 0 && (
        <div className="glass-card" style={{ borderRadius: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '1rem' }}>
            Assessment History & Log
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(142, 182, 155, 0.3)', color: '#8EB69B' }}>
                  <th style={{ padding: '0.75rem' }}>Date</th>
                  <th style={{ padding: '0.75rem' }}>Dominant Dosha</th>
                  <th style={{ padding: '0.75rem' }}>Vata</th>
                  <th style={{ padding: '0.75rem' }}>Pitta</th>
                  <th style={{ padding: '0.75rem' }}>Kapha</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid rgba(142, 182, 155, 0.1)', color: '#DAF1DE' }}>
                    <td style={{ padding: '0.75rem' }}>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`dosha-badge badge-${item.dominantDosha.split('-')[0].toLowerCase()}`}>
                        {item.dominantDosha}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>{item.vataScore}%</td>
                    <td style={{ padding: '0.75rem' }}>{item.pittaScore}%</td>
                    <td style={{ padding: '0.75rem' }}>{item.kaphaScore}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
