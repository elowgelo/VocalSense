import React from 'react';

interface NeedleMeterProps {
  cents: number;
  color: string;
  isActive: boolean;
}

export const NeedleMeter: React.FC<NeedleMeterProps> = ({ cents, color, isActive }) => {
  // Map cents (-50..50) to percentage (5%..95%)
  const clampedCents = Math.max(-50, Math.min(50, cents));
  const pinLeftPct = isActive ? 50 + (clampedCents / 50) * 45 : 50;

  return (
    <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
      <div
        style={{
          width: '100%',
          height: '56px',
          background: 'var(--bg3)',
          borderRadius: 'var(--radius-sm)',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid var(--border)',
        }}
      >
        {/* Needle Zones */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
          <div style={{ flex: 1, background: 'rgba(239, 68, 68, 0.08)' }} />
          <div style={{ width: '64px', background: 'rgba(16, 185, 129, 0.15)' }} />
          <div style={{ flex: 1, background: 'rgba(245, 158, 11, 0.08)' }} />
        </div>

        {/* Center line mark */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'var(--border)',
            transform: 'translateX(-50%)',
          }}
        />

        {/* Needle pin */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            bottom: '8px',
            width: '3px',
            borderRadius: '1.5px',
            background: isActive ? color : 'var(--text3)',
            transform: 'translateX(-50%)',
            left: `${pinLeftPct}%`,
            transition: 'left 0.12s ease, background 0.2s',
            boxShadow: isActive ? `0 0 10px ${color}` : 'none',
          }}
        />
      </div>

      {/* Needle scale labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0.35rem 0.75rem',
          fontSize: '0.72rem',
          color: 'var(--text3)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <span>-50 sen</span>
        <span>-25 sen</span>
        <span>0</span>
        <span>+25 sen</span>
        <span>+50 sen</span>
      </div>
    </div>
  );
};
