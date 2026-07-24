import React, { useState } from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

export const VikritiResetPage = () => {
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  const imbalances = [
    {
      id: 'vata_imbalance',
      dosha: 'Vata Imbalance (Air & Space Surge)',
      title: 'Anxiety, Bloating, Restless Mind & Insomnia',
      badge: 'Vata Acute Reset',
      color: '#1A3323',
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
      color: '#B86B18',
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
      color: '#2B5738',
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
    <div className="container" style={{ padding: '2.5rem 1rem', maxWidth: '820px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span style={{
          background: 'rgba(186, 225, 100, 0.3)',
          color: '#1A3323',
          border: '1.5px solid #BAE164',
          padding: '0.45rem 1.1rem',
          borderRadius: '50px',
          fontSize: '0.8rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          marginBottom: '0.85rem'
        }}>
          <Zap size={15} color="#1A3323" /> Vikriti Imbalance Diagnostic
        </span>

        <h1 className="font-serif-title" style={{ fontSize: '1.85rem', color: '#1A3323', marginBottom: '0.4rem', fontWeight: 800 }}>
          24-Hour Acute Imbalance Reset Protocol
        </h1>
        
        <p style={{ color: '#567360', fontSize: '0.96rem', fontWeight: 500 }}>
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
                borderRadius: '26px',
                padding: '1.6rem',
                cursor: 'pointer',
                border: isSelected ? '2px solid #BAE164' : '1.5px solid rgba(26, 51, 35, 0.15)',
                background: isSelected ? 'rgba(240, 247, 232, 0.95)' : 'rgba(253, 255, 249, 0.8)',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                <span style={{
                  background: 'rgba(184, 107, 24, 0.12)',
                  color: '#B86B18',
                  border: '1.5px solid rgba(184, 107, 24, 0.35)',
                  padding: '0.28rem 0.8rem',
                  borderRadius: '50px',
                  fontSize: '0.78rem',
                  fontWeight: 800
                }}>
                  {item.badge}
                </span>

                <span style={{ fontSize: '0.85rem', color: '#1A3323', fontWeight: 800 }}>
                  {isSelected ? 'Selected ✓' : 'Click to Diagnose'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.22rem', color: '#1A3323', marginBottom: '0.5rem', fontWeight: 800 }}>
                {item.title}
              </h3>

              <ul style={{ paddingLeft: '1.2rem', color: '#2B4534', fontSize: '0.9rem' }}>
                {item.symptoms.map((s, idx) => (
                  <li key={idx} style={{ marginBottom: '0.25rem', fontWeight: 500 }}>{s}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Display Protocol */}
      {selectedSymptom && (
        <div className="glass-card" style={{
          padding: '2.2rem',
          borderRadius: '28px',
          border: '2px solid #BAE164',
          background: 'linear-gradient(135deg, rgba(249, 251, 242, 0.95) 0%, rgba(240, 247, 232, 0.9) 100%)'
        }}>
          <h2 className="font-serif-title" style={{ fontSize: '1.45rem', color: '#1A3323', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800 }}>
            <ShieldCheck color="#1A3323" size={26} /> 
            24-Hour Reset Action Plan for {selectedSymptom.dosha}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(253, 255, 249, 0.95)', padding: '1rem 1.2rem', borderRadius: '16px', borderLeft: '5px solid #B86B18', border: '1px solid rgba(26, 51, 35, 0.1)' }}>
              <strong style={{ color: '#B86B18', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.3rem', fontWeight: 800 }}>
                1. Immediate Emergency Action
              </strong>
              <p style={{ color: '#2B4534', fontSize: '0.92rem', margin: 0, fontWeight: 500 }}>
                {selectedSymptom.protocol.immediateAction}
              </p>
            </div>

            <div style={{ background: 'rgba(253, 255, 249, 0.95)', padding: '1rem 1.2rem', borderRadius: '16px', borderLeft: '5px solid #BAE164', border: '1px solid rgba(26, 51, 35, 0.1)' }}>
              <strong style={{ color: '#1A3323', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.3rem', fontWeight: 800 }}>
                2. Dietary Reset Meals
              </strong>
              <p style={{ color: '#2B4534', fontSize: '0.92rem', margin: 0, fontWeight: 500 }}>
                {selectedSymptom.protocol.dietReset}
              </p>
            </div>

            <div style={{ background: 'rgba(253, 255, 249, 0.95)', padding: '1rem 1.2rem', borderRadius: '16px', borderLeft: '5px solid #1A3323', border: '1px solid rgba(26, 51, 35, 0.1)' }}>
              <strong style={{ color: '#1A3323', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.3rem', fontWeight: 800 }}>
                3. Lifestyle & Mindset Reset
              </strong>
              <p style={{ color: '#2B4534', fontSize: '0.92rem', margin: 0, fontWeight: 500 }}>
                {selectedSymptom.protocol.lifestyleReset}
              </p>
            </div>

            <div style={{ background: 'rgba(253, 255, 249, 0.95)', padding: '1rem 1.2rem', borderRadius: '16px', borderLeft: '5px solid #B86B18', border: '1px solid rgba(26, 51, 35, 0.1)' }}>
              <strong style={{ color: '#B86B18', display: 'block', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.3rem', fontWeight: 800 }}>
                4. Herbal Support
              </strong>
              <p style={{ color: '#2B4534', fontSize: '0.92rem', margin: 0, fontWeight: 500 }}>
                {selectedSymptom.protocol.herbalReset}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
