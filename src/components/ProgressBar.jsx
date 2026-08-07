import React from 'react';

export const ProgressBar = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div style={{ width: '100%', marginBottom: '1.5rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem',
        fontSize: '0.85rem'
      }}>
        <span style={{ color: '#8EB69B', fontWeight: 600 }}>
          Question {current} of {total}
        </span>
        <span style={{ color: '#FFB84D', fontWeight: 700 }}>
          {percentage}% Completed
        </span>
      </div>

      <div style={{
        width: '100%',
        height: '10px',
        background: 'rgba(5, 31, 32, 0.6)',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(142, 182, 155, 0.2)'
      }}>
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #FF9500 0%, #FFB84D 100%)',
            borderRadius: '20px',
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 10px rgba(255, 149, 0, 0.4)'
          }}
        />
      </div>
    </div>
  );
};
