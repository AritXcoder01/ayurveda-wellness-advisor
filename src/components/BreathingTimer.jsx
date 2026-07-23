import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Wind, Sparkles, CheckCircle2 } from 'lucide-react';

export const BreathingTimer = () => {
  const techniques = [
    {
      id: 'nadi',
      name: 'Nadi Shodhana (Alternate Nostril)',
      dosha: 'Vata Balancing',
      desc: 'Calms anxious thoughts, balances left/right brain hemispheres, grounds nervous energy.',
      inhale: 4,
      hold: 4,
      exhale: 4,
      color: '#8EB69B'
    },
    {
      id: 'sheetali',
      name: 'Sheetali (Cooling Breath)',
      dosha: 'Pitta Balancing',
      desc: 'Cools body temperature, releases frustration and internal heat, calms acidity.',
      inhale: 4,
      hold: 2,
      exhale: 6,
      color: '#FF9500'
    },
    {
      id: 'kapalabhati',
      name: 'Kapalabhati (Skull-shining Breath)',
      dosha: 'Kapha Balancing',
      desc: 'Invigorates metabolism, clears sinus congestion, boosts energy & mental alertness.',
      inhale: 2,
      hold: 1,
      exhale: 2,
      color: '#DAF1DE'
    }
  ];

  const [selectedTech, setSelectedTech] = useState(techniques[0]);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Inhale'); // 'Inhale' | 'Hold' | 'Exhale'
  const [timer, setTimer] = useState(selectedTech.inhale);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    setIsActive(false);
    setPhase('Inhale');
    setTimer(selectedTech.inhale);
    setCycleCount(0);
  }, [selectedTech]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 1) {
            return prevTimer - 1;
          } else {
            // Switch phases
            if (phase === 'Inhale') {
              if (selectedTech.hold > 0) {
                setPhase('Hold');
                return selectedTech.hold;
              } else {
                setPhase('Exhale');
                return selectedTech.exhale;
              }
            } else if (phase === 'Hold') {
              setPhase('Exhale');
              return selectedTech.exhale;
            } else {
              // Completed Exhale -> Reset cycle
              setCycleCount(c => c + 1);
              setPhase('Inhale');
              return selectedTech.inhale;
            }
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, phase, selectedTech]);

  // Determine scaling ring size based on phase
  let scale = 1;
  if (phase === 'Inhale') scale = 1.35;
  if (phase === 'Hold') scale = 1.35;
  if (phase === 'Exhale') scale = 0.85;

  return (
    <div className="container" style={{ padding: '2.5rem 1rem', maxWidth: '650px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.6rem', color: '#FFFFFF', textAlign: 'center', marginBottom: '0.4rem' }}>
        Guided Ayurvedic Pranayama
      </h1>
      
      <p style={{ color: '#B8D8C2', textAlign: 'center', marginBottom: '1.75rem', fontSize: '0.92rem' }}>
        Harmonize your Prana (life energy) with visual breathwork tailored to your Dosha
      </p>

      {/* Technique Switcher */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.75rem',
        marginBottom: '2rem'
      }}>
        {techniques.map(t => {
          const isSelected = selectedTech.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSelectedTech(t)}
              style={{
                background: isSelected ? 'rgba(35, 83, 71, 0.85)' : 'rgba(5, 31, 32, 0.6)',
                border: isSelected ? `2px solid ${t.color}` : '1px solid rgba(142, 182, 155, 0.25)',
                borderRadius: '16px',
                padding: '0.9rem 0.6rem',
                color: '#FFFFFF',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: t.color, fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                {t.dosha}
              </div>
              <strong style={{ fontSize: '0.85rem', display: 'block', color: isSelected ? '#FFFFFF' : '#DAF1DE' }}>
                {t.name.split(' ')[0]}
              </strong>
            </button>
          );
        })}
      </div>

      {/* Breathing Sphere Card */}
      <div className="glass-card" style={{
        padding: '2.5rem 2rem',
        borderRadius: '28px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{ fontSize: '1.25rem', color: selectedTech.color, marginBottom: '0.3rem' }}>
          {selectedTech.name}
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#B8D8C2', marginBottom: '2rem', maxWidth: '420px' }}>
          {selectedTech.desc}
        </p>

        {/* Animated Breathing Circle */}
        <div style={{
          position: 'relative',
          width: '200px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          {/* Outer Pulsing Aura */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${selectedTech.color}33 0%, transparent 70%)`,
            transform: `scale(${scale})`,
            transition: `transform ${phase === 'Inhale' ? selectedTech.inhale : selectedTech.exhale}s ease-in-out`
          }} />

          {/* Main Breathing Circle */}
          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${selectedTech.color} 0%, rgba(5,31,32,0.9) 100%)`,
            border: `3px solid ${selectedTech.color}`,
            boxShadow: `0 0 30px ${selectedTech.color}66`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${scale})`,
            transition: `transform ${phase === 'Inhale' ? selectedTech.inhale : selectedTech.exhale}s ease-in-out`,
            zIndex: 2
          }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {phase}
            </span>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
              {timer}s
            </span>
          </div>
        </div>

        {/* Status Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#DAF1DE' }}>
          <span>Completed Cycles: <strong style={{ color: '#FFB84D' }}>{cycleCount}</strong></span>
        </div>

        {/* Control Buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setIsActive(!isActive)}
            className="btn-primary"
            style={{ padding: '0.85rem 2rem', fontSize: '1rem', background: selectedTech.color }}
          >
            {isActive ? <Pause size={20} /> : <Play size={20} />}
            {isActive ? 'Pause' : 'Start Breathwork'}
          </button>

          <button
            onClick={() => {
              setIsActive(false);
              setPhase('Inhale');
              setTimer(selectedTech.inhale);
              setCycleCount(0);
            }}
            className="btn-secondary"
          >
            <RotateCcw size={18} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};
