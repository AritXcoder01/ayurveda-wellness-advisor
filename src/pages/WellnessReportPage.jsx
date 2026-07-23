import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useDosha } from '../context/DoshaContext';
import { Printer, ArrowLeft, Leaf, Sparkles, CheckCircle2 } from 'lucide-react';

export const WellnessReportPage = ({ onBackToDashboard }) => {
  const { currentUser } = useAuth();
  const { activeResult, recommendations } = useDosha();

  if (!activeResult || !recommendations) {
    return (
      <div className="container" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
        <p style={{ color: '#DAF1DE' }}>No wellness report generated yet. Please complete the assessment.</p>
        <button onClick={onBackToDashboard} className="btn-primary" style={{ marginTop: '1rem' }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const { dominant, doshaType, primaryProfile, secondaryProfile } = recommendations;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1rem', maxWidth: '850px', margin: '0 auto' }}>
      {/* Top Controls */}
      <div className="no-print" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem'
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
        padding: '2.5rem 2rem',
        borderRadius: '24px',
        background: 'rgba(11, 43, 38, 0.9)',
        border: '1px solid rgba(142, 182, 155, 0.3)'
      }}>
        {/* Report Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #8EB69B',
          paddingBottom: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              background: '#FF9500',
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Leaf size={26} color="#FFFFFF" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', margin: 0, color: '#FFFFFF' }}>
                AyurVeda Life
              </h1>
              <span style={{ fontSize: '0.75rem', color: '#8EB69B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Personalized Dosha & Wellness Diagnostic Report
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#B8D8C2' }}>
            <div>Date: <strong>{new Date(activeResult.createdAt).toLocaleDateString()}</strong></div>
            <div>Report ID: <strong>{activeResult.id}</strong></div>
          </div>
        </div>

        {/* User Info Table */}
        <div style={{
          background: 'rgba(5, 31, 32, 0.6)',
          borderRadius: '14px',
          padding: '1rem 1.25rem',
          marginBottom: '1.75rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          fontSize: '0.88rem'
        }}>
          <div>
            <span style={{ color: '#8EB69B', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Client Name</span>
            <strong style={{ color: '#FFFFFF' }}>{currentUser?.name}</strong>
          </div>
          <div>
            <span style={{ color: '#8EB69B', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Email</span>
            <strong style={{ color: '#FFFFFF' }}>{currentUser?.email}</strong>
          </div>
          <div>
            <span style={{ color: '#8EB69B', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Age</span>
            <strong style={{ color: '#FFFFFF' }}>{currentUser?.age} yrs</strong>
          </div>
          <div>
            <span style={{ color: '#8EB69B', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Gender</span>
            <strong style={{ color: '#FFFFFF' }}>{currentUser?.gender}</strong>
          </div>
        </div>

        {/* Section 1: Dosha Analysis */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#FFB84D', marginBottom: '0.75rem', borderBottom: '1px solid rgba(142, 182, 155, 0.2)', paddingBottom: '0.4rem' }}>
            1. Constitutional Score Analysis (Prakriti)
          </h2>

          <p style={{ color: '#DAF1DE', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
            Dominant Constitution: <strong style={{ color: '#FF9500', fontSize: '1.1rem' }}>{doshaType}</strong>. {primaryProfile.summary}
          </p>

          {/* Dosha Progress Meters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {/* Vata Meter */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                <span style={{ color: '#8EB69B', fontWeight: 600 }}>Vata Dosha (Air & Space)</span>
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>{activeResult.vataScore}%</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: 'rgba(5, 31, 32, 0.7)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${activeResult.vataScore}%`, height: '100%', background: '#8EB69B', borderRadius: '10px' }} />
              </div>
            </div>

            {/* Pitta Meter */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                <span style={{ color: '#FFB84D', fontWeight: 600 }}>Pitta Dosha (Fire & Water)</span>
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>{activeResult.pittaScore}%</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: 'rgba(5, 31, 32, 0.7)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${activeResult.pittaScore}%`, height: '100%', background: '#FF9500', borderRadius: '10px' }} />
              </div>
            </div>

            {/* Kapha Meter */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                <span style={{ color: '#DAF1DE', fontWeight: 600 }}>Kapha Dosha (Earth & Water)</span>
                <span style={{ color: '#FFFFFF', fontWeight: 700 }}>{activeResult.kaphaScore}%</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: 'rgba(5, 31, 32, 0.7)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${activeResult.kaphaScore}%`, height: '100%', background: '#DAF1DE', borderRadius: '10px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Dietary Guidelines */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#FFB84D', marginBottom: '0.75rem', borderBottom: '1px solid rgba(142, 182, 155, 0.2)', paddingBottom: '0.4rem' }}>
            2. Dietary Recommendations (Ahara)
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.88rem' }}>
            <div style={{ background: 'rgba(5, 31, 32, 0.5)', padding: '1rem', borderRadius: '12px' }}>
              <h4 style={{ color: '#8EB69B', marginBottom: '0.5rem' }}>Foods to Favor</h4>
              <ul style={{ paddingLeft: '1.2rem', color: '#DAF1DE' }}>
                {primaryProfile.diet.favor.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>

            <div style={{ background: 'rgba(5, 31, 32, 0.5)', padding: '1rem', borderRadius: '12px' }}>
              <h4 style={{ color: '#FF9500', marginBottom: '0.5rem' }}>Foods to Avoid</h4>
              <ul style={{ paddingLeft: '1.2rem', color: '#DAF1DE' }}>
                {primaryProfile.diet.avoid.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3: Yoga & Asanas */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#FFB84D', marginBottom: '0.75rem', borderBottom: '1px solid rgba(142, 182, 155, 0.2)', paddingBottom: '0.4rem' }}>
            3. Therapeutic Yoga Asanas & Exercises
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.88rem' }}>
            {primaryProfile.yoga.map((pose, i) => (
              <div key={i} style={{ background: 'rgba(5, 31, 32, 0.5)', padding: '0.75rem', borderRadius: '10px' }}>
                <strong style={{ color: '#FFFFFF' }}>{pose.name}</strong>
                <p style={{ color: '#B8D8C2', margin: '0.2rem 0 0 0', fontSize: '0.82rem' }}>{pose.benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Daily Schedule & Lifestyle */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#FFB84D', marginBottom: '0.75rem', borderBottom: '1px solid rgba(142, 182, 155, 0.2)', paddingBottom: '0.4rem' }}>
            4. Lifestyle & Dinacharya Routine
          </h2>

          <p style={{ color: '#DAF1DE', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
            <strong>Morning:</strong> {primaryProfile.dinacharya.morning}
          </p>
          <p style={{ color: '#DAF1DE', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
            <strong>Afternoon:</strong> {primaryProfile.dinacharya.afternoon}
          </p>
          <p style={{ color: '#DAF1DE', fontSize: '0.88rem', marginBottom: '0.5rem' }}>
            <strong>Evening:</strong> {primaryProfile.dinacharya.evening}
          </p>
          <p style={{ color: '#DAF1DE', fontSize: '0.88rem' }}>
            <strong>Meditation & Sleep:</strong> {primaryProfile.meditation}. {primaryProfile.sleep}
          </p>
        </div>

        {/* Footer Note */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(142, 182, 155, 0.3)',
          textAlign: 'center',
          fontSize: '0.78rem',
          color: '#8EB69B'
        }}>
          This document is generated for informational wellness guidance based on Ayurvedic principles.
        </div>
      </div>
    </div>
  );
};
