import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useDosha } from '../context/DoshaContext';
import { Printer, ArrowLeft, Leaf } from 'lucide-react';

export const WellnessReportPage = ({ onBackToDashboard }) => {
  const { currentUser } = useAuth();
  const { activeResult, recommendations } = useDosha();

  if (!activeResult || !recommendations) {
    return (
      <div className="container" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
        <p style={{ color: '#1A3323', fontWeight: 600 }}>No wellness report generated yet. Please complete the assessment.</p>
        <button onClick={onBackToDashboard} className="btn-primary" style={{ marginTop: '1rem' }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const { dominant, doshaType, primaryProfile } = recommendations;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1rem', maxWidth: '880px', margin: '0 auto' }}>
      {/* Top Controls */}
      <div className="no-print" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.75rem'
      }}>
        <button onClick={onBackToDashboard} className="btn-secondary">
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <button onClick={handlePrint} className="btn-primary">
          <Printer size={18} /> Download / Print Report (PDF)
        </button>
      </div>

      {/* Printable Report Sheet */}
      <div className="glass-card" style={{
        padding: '2.8rem 2.2rem',
        borderRadius: '32px',
        background: 'rgba(253, 255, 249, 0.96)',
        border: '1.5px solid #BAE164'
      }}>
        {/* Report Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #BAE164',
          paddingBottom: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #1A3323 0%, #2B5738 50%, #BAE164 100%)',
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #BAE164'
            }}>
              <Leaf size={28} color="#FEFEFE" />
            </div>
            <div>
              <h1 className="font-serif-title" style={{ fontSize: '1.6rem', margin: 0, color: '#1A3323', fontWeight: 900 }}>
                AyurVeda Life
              </h1>
              <span style={{ fontSize: '0.75rem', color: '#1A3323', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 800 }}>
                Personalized Dosha & Wellness Diagnostic Report
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#567360' }}>
            <div>Date: <strong style={{ color: '#1A3323' }}>{new Date(activeResult.createdAt).toLocaleDateString()}</strong></div>
            <div>Report ID: <strong style={{ color: '#1A3323' }}>{activeResult.id}</strong></div>
          </div>
        </div>

        {/* User Info Table */}
        <div style={{
          background: 'rgba(240, 247, 232, 0.95)',
          borderRadius: '16px',
          padding: '1.1rem 1.35rem',
          marginBottom: '1.85rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          fontSize: '0.9rem',
          border: '1px solid rgba(26, 51, 35, 0.12)'
        }}>
          <div>
            <span style={{ color: '#1A3323', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800 }}>Client Name</span>
            <strong style={{ color: '#1A3323' }}>{currentUser?.name}</strong>
          </div>
          <div>
            <span style={{ color: '#1A3323', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800 }}>Email</span>
            <strong style={{ color: '#1A3323' }}>{currentUser?.email}</strong>
          </div>
          <div>
            <span style={{ color: '#1A3323', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800 }}>Age</span>
            <strong style={{ color: '#1A3323' }}>{currentUser?.age} yrs</strong>
          </div>
          <div>
            <span style={{ color: '#1A3323', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800 }}>Gender</span>
            <strong style={{ color: '#1A3323' }}>{currentUser?.gender}</strong>
          </div>
        </div>

        {/* Section 1: Dosha Analysis */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 className="font-serif-title" style={{ fontSize: '1.3rem', color: '#B86B18', marginBottom: '0.75rem', borderBottom: '1.5px solid rgba(26, 51, 35, 0.15)', paddingBottom: '0.4rem', fontWeight: 800 }}>
            1. Constitutional Score Analysis (Prakriti)
          </h2>

          <p style={{ color: '#2B4534', fontSize: '0.96rem', marginBottom: '1.25rem', fontWeight: 500 }}>
            Dominant Constitution: <strong style={{ color: '#1A3323', fontSize: '1.1rem' }}>{doshaType}</strong>. {primaryProfile.summary}
          </p>

          {/* Dosha Progress Meters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.3rem' }}>
                <span style={{ color: '#1A3323', fontWeight: 800 }}>Vata Dosha (Air & Space)</span>
                <span style={{ color: '#1A3323', fontWeight: 800 }}>{activeResult.vataScore}%</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: 'rgba(26, 51, 35, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${activeResult.vataScore}%`, height: '100%', background: 'linear-gradient(90deg, #7DA488, #2D5A3C)', borderRadius: '10px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.3rem' }}>
                <span style={{ color: '#B86B18', fontWeight: 800 }}>Pitta Dosha (Fire & Water)</span>
                <span style={{ color: '#B86B18', fontWeight: 800 }}>{activeResult.pittaScore}%</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: 'rgba(184, 107, 24, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${activeResult.pittaScore}%`, height: '100%', background: 'linear-gradient(90deg, #B86B18, #D97A24)', borderRadius: '10px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.3rem' }}>
                <span style={{ color: '#1A3323', fontWeight: 800 }}>Kapha Dosha (Earth & Water)</span>
                <span style={{ color: '#1A3323', fontWeight: 800 }}>{activeResult.kaphaScore}%</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: 'rgba(186, 225, 100, 0.25)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${activeResult.kaphaScore}%`, height: '100%', background: 'linear-gradient(90deg, #2B5738, #BAE164)', borderRadius: '10px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Dietary Guidelines */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 className="font-serif-title" style={{ fontSize: '1.3rem', color: '#B86B18', marginBottom: '0.75rem', borderBottom: '1.5px solid rgba(26, 51, 35, 0.15)', paddingBottom: '0.4rem', fontWeight: 800 }}>
            2. Dietary Recommendations (Ahara)
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
            <div style={{ background: 'rgba(253, 255, 249, 0.95)', padding: '1rem', borderRadius: '14px', border: '1px solid rgba(26, 51, 35, 0.1)' }}>
              <h4 style={{ color: '#1A3323', marginBottom: '0.5rem', fontWeight: 800 }}>Foods to Favor</h4>
              <ul style={{ paddingLeft: '1.2rem', color: '#2B4534' }}>
                {primaryProfile.diet.favor.map((f, i) => <li key={i} style={{ marginBottom: '0.3rem' }}>{f}</li>)}
              </ul>
            </div>

            <div style={{ background: 'rgba(253, 255, 249, 0.95)', padding: '1rem', borderRadius: '14px', border: '1px solid rgba(26, 51, 35, 0.1)' }}>
              <h4 style={{ color: '#B86B18', marginBottom: '0.5rem', fontWeight: 800 }}>Foods to Avoid</h4>
              <ul style={{ paddingLeft: '1.2rem', color: '#2B4534' }}>
                {primaryProfile.diet.avoid.map((f, i) => <li key={i} style={{ marginBottom: '0.3rem' }}>{f}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3: Yoga & Asanas */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 className="font-serif-title" style={{ fontSize: '1.3rem', color: '#B86B18', marginBottom: '0.75rem', borderBottom: '1.5px solid rgba(26, 51, 35, 0.15)', paddingBottom: '0.4rem', fontWeight: 800 }}>
            3. Therapeutic Yoga Asanas & Exercises
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.9rem' }}>
            {primaryProfile.yoga.map((pose, i) => (
              <div key={i} style={{ background: 'rgba(253, 255, 249, 0.95)', padding: '0.85rem', borderRadius: '12px', border: '1px solid rgba(26, 51, 35, 0.1)' }}>
                <strong style={{ color: '#1A3323' }}>{pose.name}</strong>
                <p style={{ color: '#567360', margin: '0.2rem 0 0 0', fontSize: '0.85rem', fontWeight: 500 }}>{pose.benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Daily Schedule & Lifestyle */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 className="font-serif-title" style={{ fontSize: '1.3rem', color: '#B86B18', marginBottom: '0.75rem', borderBottom: '1.5px solid rgba(26, 51, 35, 0.15)', paddingBottom: '0.4rem', fontWeight: 800 }}>
            4. Lifestyle & Dinacharya Routine
          </h2>

          <p style={{ color: '#2B4534', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>
            <strong style={{ color: '#1A3323' }}>Morning:</strong> {primaryProfile.dinacharya.morning}
          </p>
          <p style={{ color: '#2B4534', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>
            <strong style={{ color: '#1A3323' }}>Afternoon:</strong> {primaryProfile.dinacharya.afternoon}
          </p>
          <p style={{ color: '#2B4534', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500 }}>
            <strong style={{ color: '#1A3323' }}>Evening:</strong> {primaryProfile.dinacharya.evening}
          </p>
          <p style={{ color: '#2B4534', fontSize: '0.9rem', fontWeight: 500 }}>
            <strong style={{ color: '#1A3323' }}>Meditation & Sleep:</strong> {primaryProfile.meditation}. {primaryProfile.sleep}
          </p>
        </div>

        {/* Footer Note */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1.5px solid rgba(26, 51, 35, 0.15)',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: '#567360',
          fontWeight: 600
        }}>
          This document is generated for informational wellness guidance based on Ayurvedic principles.
        </div>
      </div>
    </div>
  );
};
