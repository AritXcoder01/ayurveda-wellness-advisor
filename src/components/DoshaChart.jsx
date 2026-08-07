import React from 'react';

export const DoshaChart = ({ vata = 33, pitta = 33, kapha = 34 }) => {
  const total = vata + pitta + kapha || 100;
  
  // Calculate stroke dash offsets for SVG donut
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const vataPct = vata / total;
  const pittaPct = pitta / total;
  const kaphaPct = kapha / total;

  const vataDash = vataPct * circumference;
  const pittaDash = pittaPct * circumference;
  const kaphaDash = kaphaPct * circumference;

  const vataOffset = 0;
  const pittaOffset = -vataDash;
  const kaphaOffset = -(vataDash + pittaDash);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div style={{ position: 'relative', width: '170px', height: '170px' }}>
        <svg width="170" height="170" viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background Ring */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke="rgba(142, 182, 155, 0.15)"
            strokeWidth="18"
          />

          {/* Vata Segment (Sage Green) */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke="#8EB69B"
            strokeWidth="18"
            strokeDasharray={`${vataDash} ${circumference - vataDash}`}
            strokeDashoffset={vataOffset}
            style={{ transition: 'stroke-dasharray 0.8s ease' }}
          />

          {/* Pitta Segment (Orange Accent) */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke="#FF9500"
            strokeWidth="18"
            strokeDasharray={`${pittaDash} ${circumference - pittaDash}`}
            strokeDashoffset={pittaOffset}
            style={{ transition: 'stroke-dasharray 0.8s ease' }}
          />

          {/* Kapha Segment (Cream / Dark Green) */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke="#DAF1DE"
            strokeWidth="18"
            strokeDasharray={`${kaphaDash} ${circumference - kaphaDash}`}
            strokeDashoffset={kaphaOffset}
            style={{ transition: 'stroke-dasharray 0.8s ease' }}
          />
        </svg>

        {/* Donut Inner Text */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '0.7rem', color: '#8EB69B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Tridosha Ratio
          </span>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
            100%
          </span>
        </div>
      </div>

      {/* Donut Legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1.2rem',
        marginTop: '1.2rem',
        width: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#8EB69B' }} />
          <span style={{ fontSize: '0.85rem', color: '#B8D8C2' }}>
            Vata <strong style={{ color: '#FFFFFF' }}>{vata}%</strong>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF9500' }} />
          <span style={{ fontSize: '0.85rem', color: '#B8D8C2' }}>
            Pitta <strong style={{ color: '#FFFFFF' }}>{pitta}%</strong>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#DAF1DE' }} />
          <span style={{ fontSize: '0.85rem', color: '#B8D8C2' }}>
            Kapha <strong style={{ color: '#FFFFFF' }}>{kapha}%</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
