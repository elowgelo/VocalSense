import React from 'react';
import { SHARP_MAP, midiToName } from '../../utils/pitch';

interface PianoRangeBarProps {
  lowMidi: number;
  highMidi: number;
  onKeyClick?: (midi: number) => void;
}

export const PianoRangeBar: React.FC<PianoRangeBarProps> = ({ lowMidi, highMidi, onKeyClick }) => {
  const START = 36; // C2
  const END = 84; // C6

  const keys = [];
  for (let midi = START; midi <= END; midi++) {
    const isBlack = SHARP_MAP[midi % 12] === 1;
    const inRange = midi >= lowMidi && midi <= highMidi;
    const isLow = midi === lowMidi;
    const isHigh = midi === highMidi;
    const noteName = midiToName(midi);
    const isC = midi % 12 === 0;

    keys.push({
      midi,
      isBlack,
      inRange,
      isLow,
      isHigh,
      noteName,
      isC,
      label: isC && !isBlack ? `C${Math.floor(midi / 12) - 1}` : '',
    });
  }

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)',
          height: '56px',
          minWidth: '100%',
          background: '#ffffff',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {keys.map((k) => {
          let bg = k.isBlack ? 'var(--bg3)' : '#ffffff';
          let color = k.isBlack ? 'var(--text)' : 'var(--text2)';
          let fontWeight = '400';

          if (k.inRange) {
            bg = '#e5e7eb';
          }
          if (k.isLow || k.isHigh) {
            bg = '#18181b';
            color = '#ffffff';
            fontWeight = 'bold';
          }

          return (
            <div
              key={k.midi}
              onClick={() => onKeyClick && onKeyClick(k.midi)}
              title={`${k.noteName} (MIDI ${k.midi})${k.isLow ? ' - Nada Terendah' : ''}${k.isHigh ? ' - Nada Tertinggi' : ''}`}
              style={{
                minWidth: '20px',
                flex: 1,
                height: k.isBlack ? '65%' : '100%',
                alignSelf: 'flex-start',
                borderRight: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                paddingBottom: '3px',
                fontSize: '0.6rem',
                cursor: 'pointer',
                background: bg,
                color: color,
                fontWeight: fontWeight,
                transition: 'background 0.15s ease',
                userSelect: 'none',
              }}
            >
              {k.label}
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.4rem',
          fontSize: '0.72rem',
          color: 'var(--text3)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <span>C2 (65.4 Hz)</span>
        <span>C3</span>
        <span>C4 Tengah (261.6 Hz)</span>
        <span>C5</span>
        <span>C6 (1046.5 Hz)</span>
      </div>
    </div>
  );
};
