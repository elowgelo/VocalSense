import React from 'react';
import { NoteInfo } from '../../types';

interface ArcGaugeProps {
  noteInfo: NoteInfo | null;
  cents: number;
  color: string;
}

export const ArcGauge: React.FC<ArcGaugeProps> = ({ noteInfo, cents, color }) => {
  // Full arc = 408 units; offset = 204 is center (0 cents)
  // Positive cents -> less offset (moves right); negative -> more offset (moves left)
  const offset = 204 - (cents / 50) * 150;
  const clampedOffset = Math.max(0, Math.min(408, offset));

  return (
    <div style={{ position: 'relative', width: '320px', margin: '0 auto 1rem' }}>
      <svg viewBox="0 0 320 180" style={{ width: '320px', height: '180px' }}>
        {/* Background arc */}
        <path
          d="M 30 160 A 130 130 0 0 1 290 160"
          stroke="var(--bg3)"
          strokeWidth="24"
          fill="none"
          strokeLinecap="round"
        />

        {/* Color fill arc */}
        <path
          d="M 30 160 A 130 130 0 0 1 290 160"
          stroke={color}
          strokeWidth="24"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="408"
          strokeDashoffset={noteInfo ? clampedOffset : 204}
          style={{ transition: 'stroke-dashoffset 0.12s, stroke 0.2s' }}
        />

        {/* Center tick */}
        <line x1="160" y1="30" x2="160" y2="52" stroke="var(--text3)" strokeWidth="2" />

        {/* Zone markers */}
        <text x="18" y="175" fill="var(--text3)" fontSize="11" fontWeight="600">
          Fals Bawah
        </text>
        <text x="246" y="175" fill="var(--text3)" fontSize="11" fontWeight="600">
          Fals Atas
        </text>
        <text x="131" y="24" fill="var(--text3)" fontSize="11" fontWeight="600">
          Tepat Nada
        </text>
      </svg>

      {/* Note display inside arc */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        <div
          style={{
            fontSize: '4.5rem',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-2px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text)',
          }}
        >
          {noteInfo ? `${noteInfo.note}${noteInfo.octave}` : '—'}
        </div>
        <div
          style={{
            fontSize: '0.95rem',
            color: 'var(--text2)',
            marginTop: '0.25rem',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {noteInfo ? `${noteInfo.freq.toFixed(1)} Hz` : '— Hz'}
        </div>
      </div>
    </div>
  );
};
