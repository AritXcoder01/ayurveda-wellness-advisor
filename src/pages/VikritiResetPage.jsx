import React, { useState } from 'react';
import { AlertCircle, Sparkles, ShieldCheck, RefreshCw, Zap } from 'lucide-react';

export const VikritiResetPage = () => {
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  const imbalances = [
    {
      id: 'vata_imbalance',
      dosha: 'Vata Imbalance (Air & Space Surge)',
      title: 'Anxiety, Bloating, Restless Mind & Insomnia',
      badge: 'Vata Acute Reset',
      color: '#8EB69B',
      symptoms: [
        'Excessive worrying, anxiety, or racing thoughts',
        'Abdominal gas, bloating, or irregular constipation',
        'Dry skin, cold hands/feet, or restless light sleep'
      ],
      protocol: {
        immediateAction: 'Sip warm water or ginger tea continuously. Avoid raw salads, cold sodas, and caffeine today.',
        dietReset: 'Eat warm, soft, moist foods like Kitchari, oatmeal, rice with ghee, or sweet potato soup.',
        lifestyleReset: 'Take a warm bath, massage warm sesame oil into feet before sleep, and practice 10 mins of Nadi Shodhana breathing.',
        herbalReset: 'Take 1/2 tsp Ashwagandha in warm milk at night.'
      }
    },
    {
      id: 'pitta_imbalance',
      dosha: 'Pitta Imbalance (Fire Surge)',
      title: 'Irritability, Acidity, Overheating & Skin Breakouts',
      badge: 'Pitta Acute Reset',
      color: '#FF9500',
      symptoms: [
        'Frustration, impatience, anger, or feeling overworked',
        'Acid reflux, heartburn, or intense burning hunger',
        'Skin redness, rashes, breakouts, or excessive body heat'
      ],
      protocol: {
        immediateAction: 'Drink cool coconut water or cucumber-mint juice. Avoid hot chili peppers, alcohol, and deep-fried foods.',
        dietReset: 'Favor sweet, cooling foods: Basmati rice, sweet fruits (melons, apples), cucumber, and coriander tea.',
        lifestyleReset: 'Step away from stressful work screens, take a stroll in a shaded green park or near water, practice Sheetali cooling breath.',
        herbalReset: 'Drink Shatavari or Brahmi tea in the evening.'
      }
    },
    {
      id: 'kapha_imbalance',
      dosha: 'Kapha Imbalance (Earth Surge)',
      title: 'Lethargy, Congestion, Heavy Feeling & Brain Fog',
      badge: 'Kapha Acute Reset',
      color: '#DAF1DE',
      symptoms: [
        'Feeling heavy, unmotivated, sluggish, or oversleeping',
        'Sinus congestion, mucus excess, or heavy chest',
        'Sluggish digestion, fluid retention, or craving sweets'
      ],
      protocol: {
        immediateAction: 'Drink hot water with black pepper and honey. Skip heavy dairy, cheese, and cold ice cream.',
        dietReset: 'Eat light, spicy, steamed vegetables, rye toast, mung bean soup, and generous warming spices (ginger, mustard, cayenne).',
        lifestyleReset: 'Perform 15 minutes of vigorous Sun Salutations or brisk walking to fire up metabolism. Avoid afternoon naps.',
        herbalReset: 'Sip warm Tulsi or Trikatu spice tea twice daily.'
      }
    }
  ];

  return (
    <div className="container" style={{ padding: '2.5rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span style={{
          background: 'rgba(255, 149, 0, 0.15)',
          color: '#FFB84D',
          border: '1px solid rgba(255, 149, 0, 0.4)',
          padding: '0.4rem 1rem',
          borderRadius: '50px',
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          marginBottom: '0.75rem'
        }}>
          <Zap size={14} /> Vikriti Imbalance Diagnostic
        </span>

        <h1 style={{ fontSize: '1.75rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>
          24-Hour Acute Imbalance Reset Protocol
        </h1>
        
        <p style={{ color: '#B8D8C2', fontSize: '0.95rem' }}>
          Feeling off today? Select your current temporary symptom to generate an immediate 24-hour Ayurvedic reset plan.
        </p>
      </div>

      {/* Symptom Selector Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {imbalances.map((item) => {
          const isSelected = selectedSymptom?.id === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedSymptom(item)}
              className="glass-card"
              style={{
                borderRadius: '24px',
                padding: '1.5rem',
                cursor: 'pointer',
                border: isSelected ? `2px solid ${item.color}` : '1px solid rgba(142, 182, 155, 0.25)',
                background: isSelected ? 'rgba(35, 83, 71, 0.85)' : 'rgba(5, 31, 32, 0.6)',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{
                  background: `${item.color}22`,
                  color: item.color,
                  border: `1px solid ${item.color}44`,
                  padding: '0.25rem 0.75rem',
                  borderRadius: '50px',
                  fontSize: '0.78rem',
                  fontWeight: 700
                }}>
                  {item.badge}
                </span>

                <span style={{ fontSize: '0.85rem', color: '#FFB84D', fontWeight: 600 }}>
                  {isSelected ? 'Selected ✓' : 'Click to Diagnose'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                {item.title}
              </h3>

              <ul style={{ paddingLeft: '1.2rem', color: '#B8D8C2', fontSize: '0.88rem' }}>
                {item.symptoms.map((s, idx) => (
                  <li key={idx} style={{ marginBottom: '0.2rem' }}>{s}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Display Protocol */}
      {selectedSymptom && (
        <div className="glass-card" style={{
          padding: '2rem',
          borderRadius: '24px',
          border: `2px solid ${selectedSymptom.color}`,
          background: 'linear-gradient(135deg, rgba(11, 43, 38, 0.95) 0%, rgba(35, 83, 71, 0.9) 100%)'
        }}>
          <h2 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck color={selectedSymptom.color} size={24} /> 
            24-Hour Reset Action Plan for {selectedSymptom.dosha}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(5, 31, 32, 0.6)', padding: '1rem', borderRadius: '14px', borderLeft: `4px solid ${selectedSymptom.color}` }}>
              <strong style={{ color: '#FFB84D', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                1. Immediate Emergency Action
              </strong>
              <p style={{ color: '#DAF1DE', fontSize: '0.92rem', margin: 0 }}>
                {selectedSymptom.protocol.immediateAction}
              </p>
            </div>

            <div style={{ background: 'rgba(5, 31, 32, 0.6)', padding: '1rem', borderRadius: '14px', borderLeft: `4px solid ${selectedSymptom.color}` }}>
              <strong style={{ color: '#8EB69B', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                2. Dietary Reset Meals
              </strong>
              <p style={{ color: '#DAF1DE', fontSize: '0.92rem', margin: 0 }}>
                {selectedSymptom.protocol.dietReset}
              </p>
            </div>

            <div style={{ background: 'rgba(5, 31, 32, 0.6)', padding: '1rem', borderRadius: '14px', borderLeft: `4px solid ${selectedSymptom.color}` }}>
              <strong style={{ color: '#DAF1DE', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                3. Lifestyle & Mindset Reset
              </strong>
              <p style={{ color: '#DAF1DE', fontSize: '0.92rem', margin: 0 }}>
                {selectedSymptom.protocol.lifestyleReset}
              </p>
            </div>

            <div style={{ background: 'rgba(5, 31, 32, 0.6)', padding: '1rem', borderRadius: '14px', borderLeft: `4px solid ${selectedSymptom.color}` }}>
              <strong style={{ color: '#FF9500', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                4. Herbal Support
              </strong>
              <p style={{ color: '#DAF1DE', fontSize: '0.92rem', margin: 0 }}>
                {selectedSymptom.protocol.herbalReset}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
