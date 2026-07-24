import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useDosha } from '../context/DoshaContext';
import { DoshaChart } from '../components/DoshaChart';
import { 
  Sparkles, RefreshCw, FileText, Utensils, Activity, 
  Clock, Moon, Sun, Calendar, Heart, ShieldCheck
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
        <div className="glass-card" style={{ maxWidth: '580px', margin: '0 auto', padding: '3.5rem 2rem', borderRadius: '32px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1A3323 0%, #2B5738 50%, #BAE164 100%)',
            width: '74px',
            height: '74px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            border: '2px solid #BAE164',
            boxShadow: '0 8px 24px rgba(26, 51, 35, 0.28)'
          }}>
            <Sparkles size={38} color="#FEFEFE" />
          </div>

          <h2 className="font-serif-title" style={{ fontSize: '1.9rem', color: '#1A3323', marginBottom: '0.5rem', fontWeight: 800 }}>
            Welcome, {currentUser?.name}! 🙏
          </h2>
          
          <p style={{ color: '#567360', marginBottom: '2rem', fontSize: '1.02rem', fontWeight: 500 }}>
            You haven't completed your 15-question Ayurvedic Dosha Assessment yet. Take 3 minutes to discover your unique Vata, Pitta, and Kapha constitution.
          </p>

          <button onClick={onStartQuiz} className="btn-primary" style={{ padding: '1rem 2.2rem', fontSize: '1.08rem' }}>
            Start 15-Question Assessment <Sparkles size={20} />
          </button>
        </div>
      </div>
    );
  }

  const { dominant, secondary, isDual, doshaType, primaryProfile } = recommendations;

  return (
    <div className="container" style={{ padding: '2rem 1rem 4rem 1rem' }}>
      {/* Welcome Banner - Organic Luxury Pine Sparkle */}
      <div className="glass-card" style={{
        padding: '2rem 2.2rem',
        borderRadius: '28px',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        background: 'linear-gradient(135deg, rgba(249, 251, 242, 0.92) 0%, rgba(240, 247, 232, 0.85) 100%)',
        border: '1.5px solid #BAE164'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#B86B18', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Calendar size={15} /> {formattedDate}
          </div>
          <h1 className="font-serif-title" style={{ fontSize: '2rem', color: '#1A3323', margin: 0, fontWeight: 900 }}>
            Namaste, {currentUser?.name}! 🙏
          </h1>
          <p style={{ color: '#2B4534', margin: '0.3rem 0 0 0', fontSize: '1rem', fontWeight: 600 }}>
            Your primary Ayurvedic constitution is <strong style={{ color: '#B86B18' }}>{doshaType}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <button onClick={onStartQuiz} className="btn-secondary">
            <RefreshCw size={16} /> Retake Quiz
          </button>
          <button onClick={onViewReport} className="btn-primary">
            <FileText size={16} /> Full Diagnostic Report
          </button>
        </div>
      </div>

      {/* Main Grid: Dosha Balance Metric Card & Daily Dinacharya Overview */}
      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        {/* Left: Dosha Balance Metric Card */}
        <div className="glass-card" style={{ borderRadius: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
              <h3 className="font-serif-title" style={{ fontSize: '1.35rem', color: '#1A3323', margin: 0, fontWeight: 800 }}>
                Dosha Balance Metric Card
              </h3>
              <span className={`dosha-badge badge-${dominant.toLowerCase()}`}>
                {doshaType}
              </span>
            </div>

            <p style={{ fontSize: '0.92rem', color: '#567360', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              {primaryProfile.summary}
            </p>

            {/* Dosha Progress Metric Visualizers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 800, color: '#1A3323', marginBottom: '0.3rem' }}>
                  <span>Vata (Air & Space)</span>
                  <span style={{ color: '#2D5A3C' }}>{activeResult.vataScore}%</span>
                </div>
                <div style={{ height: '10px', background: 'rgba(26, 51, 35, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${activeResult.vataScore}%`, height: '100%', background: 'linear-gradient(90deg, #7DA488, #2D5A3C)', borderRadius: '10px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 800, color: '#1A3323', marginBottom: '0.3rem' }}>
                  <span>Pitta (Fire & Water)</span>
                  <span style={{ color: '#B86B18' }}>{activeResult.pittaScore}%</span>
                </div>
                <div style={{ height: '10px', background: 'rgba(184, 107, 24, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${activeResult.pittaScore}%`, height: '100%', background: 'linear-gradient(90deg, #B86B18, #D97A24)', borderRadius: '10px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 800, color: '#1A3323', marginBottom: '0.3rem' }}>
                  <span>Kapha (Earth & Water)</span>
                  <span style={{ color: '#1A3323' }}>{activeResult.kaphaScore}%</span>
                </div>
                <div style={{ height: '10px', background: 'rgba(186, 225, 100, 0.25)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${activeResult.kaphaScore}%`, height: '100%', background: 'linear-gradient(90deg, #2B5738, #BAE164)', borderRadius: '10px' }} />
                </div>
              </div>
            </div>

            <DoshaChart
              vata={activeResult.vataScore}
              pitta={activeResult.pittaScore}
              kapha={activeResult.kaphaScore}
            />
          </div>

          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1.5px solid rgba(26, 51, 35, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.88rem'
          }}>
            <span style={{ color: '#567360' }}>Primary Element: <strong style={{ color: '#1A3323' }}>{primaryProfile.element}</strong></span>
            <span style={{ color: '#567360' }}>Qualities: <strong style={{ color: '#1A3323' }}>{primaryProfile.qualities}</strong></span>
          </div>
        </div>

        {/* Right: Quick Daily Dinacharya Schedule Overview */}
        <div className="glass-card" style={{ borderRadius: '28px' }}>
          <h3 className="font-serif-title" style={{ fontSize: '1.35rem', color: '#1A3323', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800 }}>
            <Clock color="#B86B18" size={22} /> Daily Dinacharya Schedule
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              background: 'rgba(253, 255, 249, 0.95)',
              borderRadius: '16px',
              padding: '1rem 1.2rem',
              borderLeft: '5px solid #B86B18',
              border: '1px solid rgba(26, 51, 35, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#B86B18', fontWeight: 800, fontSize: '0.88rem', textTransform: 'uppercase' }}>
                <Sun size={18} /> Morning Routine
              </div>
              <p style={{ color: '#2B4534', fontSize: '0.9rem', marginTop: '0.4rem', margin: 0, fontWeight: 500 }}>
                {primaryProfile.dinacharya.morning}
              </p>
            </div>

            <div style={{
              background: 'rgba(253, 255, 249, 0.95)',
              borderRadius: '16px',
              padding: '1rem 1.2rem',
              borderLeft: '5px solid #BAE164',
              border: '1px solid rgba(26, 51, 35, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1A3323', fontWeight: 800, fontSize: '0.88rem', textTransform: 'uppercase' }}>
                <Clock size={18} /> Afternoon Routine
              </div>
              <p style={{ color: '#2B4534', fontSize: '0.9rem', marginTop: '0.4rem', margin: 0, fontWeight: 500 }}>
                {primaryProfile.dinacharya.afternoon}
              </p>
            </div>

            <div style={{
              background: 'rgba(253, 255, 249, 0.95)',
              borderRadius: '16px',
              padding: '1rem 1.2rem',
              borderLeft: '5px solid #1A3323',
              border: '1px solid rgba(26, 51, 35, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1A3323', fontWeight: 800, fontSize: '0.88rem', textTransform: 'uppercase' }}>
                <Moon size={18} /> Evening Routine
              </div>
              <p style={{ color: '#2B4534', fontSize: '0.9rem', marginTop: '0.4rem', margin: 0, fontWeight: 500 }}>
                {primaryProfile.dinacharya.evening}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Guidelines Section */}
      <h2 className="font-serif-title" style={{ fontSize: '1.55rem', color: '#1A3323', marginBottom: '1.25rem', fontWeight: 800 }}>
        Personalized Wellness Guidelines
      </h2>

      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        {/* Diet Card */}
        <div className="glass-card" style={{ borderRadius: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#B86B18', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800 }}>
            <Utensils size={22} color="#B86B18" /> Ayurvedic Diet Plan
          </h3>

          <div style={{ marginBottom: '1.2rem' }}>
            <h4 style={{ fontSize: '0.88rem', color: '#1A3323', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 800 }}>Foods to Favor</h4>
            <ul style={{ paddingLeft: '1.2rem', color: '#2B4534', fontSize: '0.9rem' }}>
              {primaryProfile.diet.favor.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '0.35rem', fontWeight: 500 }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <h4 style={{ fontSize: '0.88rem', color: '#B86B18', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 800 }}>Foods to Avoid</h4>
            <ul style={{ paddingLeft: '1.2rem', color: '#2B4534', fontSize: '0.9rem' }}>
              {primaryProfile.diet.avoid.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '0.35rem', fontWeight: 500 }}>{item}</li>
              ))}
            </ul>
          </div>

          <p style={{ fontSize: '0.88rem', color: '#1A3323', fontStyle: 'italic', background: 'rgba(240, 247, 232, 0.9)', padding: '0.75rem 1rem', borderRadius: '14px', border: '1px solid #BAE164', fontWeight: 600 }}>
            💡 {primaryProfile.diet.mealRoutine}
          </p>
        </div>

        {/* Yoga Routine Card */}
        <div className="glass-card" style={{ borderRadius: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#1A3323', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800 }}>
            <Activity size={22} color="#1A3323" /> Recommended Yoga Poses
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {primaryProfile.yoga.map((pose, idx) => (
              <div key={idx} style={{
                background: 'rgba(253, 255, 249, 0.95)',
                borderRadius: '14px',
                padding: '0.85rem 1rem',
                border: '1px solid rgba(26, 51, 35, 0.12)'
              }}>
                <strong style={{ color: '#1A3323', fontSize: '0.95rem' }}>{idx + 1}. {pose.name}</strong>
                <p style={{ color: '#567360', fontSize: '0.88rem', margin: '0.2rem 0 0 0', fontWeight: 500 }}>{pose.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assessment History */}
      {history.length > 0 && (
        <div className="glass-card" style={{ borderRadius: '28px' }}>
          <h3 className="font-serif-title" style={{ fontSize: '1.35rem', color: '#1A3323', marginBottom: '1.2rem', fontWeight: 800 }}>
            Assessment History & Log
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid rgba(26, 51, 35, 0.18)', color: '#1A3323', fontWeight: 800 }}>
                  <th style={{ padding: '0.85rem' }}>Date</th>
                  <th style={{ padding: '0.85rem' }}>Dominant Dosha</th>
                  <th style={{ padding: '0.85rem' }}>Vata</th>
                  <th style={{ padding: '0.85rem' }}>Pitta</th>
                  <th style={{ padding: '0.85rem' }}>Kapha</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid rgba(26, 51, 35, 0.08)', color: '#2B4534', fontWeight: 600 }}>
                    <td style={{ padding: '0.85rem' }}>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '0.85rem' }}>
                      <span className={`dosha-badge badge-${item.dominantDosha.split('-')[0].toLowerCase()}`}>
                        {item.dominantDosha}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem' }}>{item.vataScore}%</td>
                    <td style={{ padding: '0.85rem' }}>{item.pittaScore}%</td>
                    <td style={{ padding: '0.85rem' }}>{item.kaphaScore}%</td>
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
