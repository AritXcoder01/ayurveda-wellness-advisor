import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

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
      color: '#1A3323'
    },
    {
      id: 'sheetali',
      name: 'Sheetali (Cooling Breath)',
      dosha: 'Pitta Balancing',
      desc: 'Cools body temperature, releases frustration and internal heat, calms acidity.',
      inhale: 4,
      hold: 2,
      exhale: 6,
      color: '#B86B18'
    },
    {
      id: 'kapalabhati',
      name: 'Kapalabhati (Skull-shining Breath)',
      dosha: 'Kapha Balancing',
      desc: 'Invigorates metabolism, clears sinus congestion, boosts energy & mental alertness.',
      inhale: 2,
      hold: 1,
      exhale: 2,
      color: '#2B5738'
    }
  ];

  const [selectedTech, setSelectedTech] = useState(techniques[0]);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Inhale');
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

  let scale = 1;
  if (phase === 'Inhale') scale = 1.35;
  if (phase === 'Hold') scale = 1.35;
  if (phase === 'Exhale') scale = 0.85;

  return (
    <div className="container" style={{ padding: '2.5rem 1rem', maxWidth: '680px', margin: '0 auto' }}>
      <h1 className="font-serif-title" style={{ fontSize: '1.85rem', color: '#1A3323', textAlign: 'center', marginBottom: '0.4rem', fontWeight: 800 }}>
        Guided Ayurvedic Pranayama
      </h1>
      
      <p style={{ color: '#567360', textAlign: 'center', marginBottom: '2rem', fontSize: '0.96rem', fontWeight: 500 }}>
        Harmonize your Prana (life energy) with visual breathwork tailored to your Dosha
      </p>

      {/* Technique Switcher */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.85rem',
        marginBottom: '2rem'
      }}>
        {techniques.map(t => {
          const isSelected = selectedTech.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSelectedTech(t)}
              style={{
                background: isSelected ? 'linear-gradient(135deg, #1A3323 0%, #2B5738 100%)' : 'rgba(253, 255, 249, 0.85)',
                border: isSelected ? '1.5px solid #BAE164' : '1.5px solid rgba(26, 51, 35, 0.15)',
                borderRadius: '18px',
                padding: '1rem 0.6rem',
                color: isSelected ? '#FEFEFE' : '#1A3323',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.25s ease',
                boxShadow: isSelected ? '0 6px 18px rgba(26, 51, 35, 0.25)' : 'none'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: isSelected ? '#BAE164' : '#B86B18', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                {t.dosha}
              </div>
              <strong style={{ fontSize: '0.88rem', display: 'block' }}>
                {t.name.split(' ')[0]}
              </strong>
            </button>
          );
        })}
      </div>

      {/* Breathing Sphere Card */}
      <div className="glass-card" style={{
        padding: '2.8rem 2rem',
        borderRadius: '32px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 className="font-serif-title" style={{ fontSize: '1.4rem', color: '#1A3323', marginBottom: '0.3rem', fontWeight: 800 }}>
          {selectedTech.name}
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#567360', marginBottom: '2rem', maxWidth: '440px', fontWeight: 500 }}>
          {selectedTech.desc}
        </p>

        {/* Animated Breathing Circle */}
        <div style={{
          position: 'relative',
          width: '210px',
          height: '210px',
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
            background: 'radial-gradient(circle, rgba(186, 225, 100, 0.45) 0%, transparent 70%)',
            transform: `scale(${scale})`,
            transition: `transform ${phase === 'Inhale' ? selectedTech.inhale : selectedTech.exhale}s ease-in-out`
          }} />

          {/* Main Breathing Circle */}
          <div style={{
            width: '144px',
            height: '144px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1A3323 0%, #2B5738 100%)',
            border: '3px solid #BAE164',
            boxShadow: '0 0 35px rgba(186, 225, 100, 0.45)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${scale})`,
            transition: `transform ${phase === 'Inhale' ? selectedTech.inhale : selectedTech.exhale}s ease-in-out`,
            zIndex: 2
          }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#BAE164', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {phase}
            </span>
            <span style={{ fontSize: '2.4rem', fontWeight: 900, color: '#FEFEFE', lineHeight: 1 }}>
              {timer}s
            </span>
          </div>
        </div>

        {/* Status Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem', fontSize: '0.95rem', color: '#1A3323', fontWeight: 700 }}>
          <span>Completed Cycles: <strong style={{ color: '#B86B18', fontSize: '1.1rem' }}>{cycleCount}</strong></span>
        </div>

        {/* Control Buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setIsActive(!isActive)}
            className="btn-primary"
            style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}
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
