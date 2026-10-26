import React from 'react';
import { NoteInfo, ResonanceData } from '../../types';

interface TelemetrySidebarProps {
  currentNote: NoteInfo | null;
  currentFreq: number;
  telemetry: {
    medianNote: string;
    lowNote: string;
    highNote: string;
    voicedPct: number;
  };
  resonance: ResonanceData;
}

export const TelemetrySidebar: React.FC<TelemetrySidebarProps> = ({
  currentNote,
  currentFreq,
  telemetry,
  resonance,
}) => {
  const cents = currentNote ? currentNote.cents : 0;
  let statusText = 'MENUNGGU SUARA...';
  let statusColor = 'var(--text3)';

  if (currentNote && currentFreq > 0) {
    if (cents < -20) {
      statusText = 'FALS BAWAH (TERLALU RENDAH)';
      statusColor = 'var(--red)';
    } else if (cents > 20) {
      statusText = 'FALS ATAS (TERLALU TINGGI)';
      statusColor = 'var(--yellow)';
    } else {
      statusText = 'INTONASI TEPAT ✓';
      statusColor = 'var(--green)';
    }
  }

  // Determine dominant vocal register
  let dominantRegister = 'Netral / Seimbang';
  if (currentFreq > 0) {
    if (resonance.chest > resonance.mask && resonance.chest > resonance.head) {
      dominantRegister = 'Suara Dada (Chest Voice)';
    } else if (resonance.mask >= resonance.chest && resonance.mask >= resonance.head) {
      dominantRegister = 'Suara Campuran (Mixed/Mask)';
    } else {
      dominantRegister = 'Suara Kepala (Head Voice)';
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {/* Detected Note Box */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div
          style={{
            textAlign: 'center',
            padding: '1.5rem 0.5rem',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg2)',
          }}
        >
          <div className="text-xs text-muted font-bold" style={{ letterSpacing: '1px' }}>
            NADA TERDETEKSI
          </div>
          <div
            style={{
              fontSize: '3.6rem',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-1.5px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text)',
              margin: '0.4rem 0',
            }}
          >
            {currentNote ? `${currentNote.note}${currentNote.octave}` : '—'}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              fontWeight: 700,
              color: currentNote ? statusColor : 'var(--text3)',
            }}
          >
            {currentNote ? `${cents >= 0 ? '+' : ''}${cents} sen` : '± 0 sen'}
          </div>
          <div
            style={{
              fontSize: '0.85rem',
              color: 'var(--text2)',
              marginTop: '0.2rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {currentFreq > 0 ? `${currentFreq.toFixed(1)} Hz` : '— Hz'}
          </div>
        </div>

        <div style={{ padding: '0.75rem 1rem' }}>
          <div className="d-flex justify-between text-xs">
            <span className="text-muted">STATUS KETEPATAN</span>
            <span style={{ fontWeight: 700, color: statusColor }}>{statusText}</span>
          </div>
        </div>
      </div>

      {/* Session Acoustics Table */}
      <div className="card">
        <div className="card-title mb-2">RINGKASAN SESI</div>
        <table className="table-metrics">
          <tbody>
            <tr>
              <td>Nada Rata-rata</td>
              <td>{telemetry.medianNote || '—'}</td>
            </tr>
            <tr>
              <td>Nada Terendah</td>
              <td>{telemetry.lowNote || '—'}</td>
            </tr>
            <tr>
              <td>Nada Tertinggi</td>
              <td>{telemetry.highNote || '—'}</td>
            </tr>
            <tr>
              <td>Waktu Bersuara</td>
              <td>{telemetry.voicedPct}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Resonance Energy Distribution */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <div className="card-title" style={{ margin: 0 }}>
            FOKUS RESONANSI
          </div>
          <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
            {currentFreq > 0 ? 'AKTIF' : 'STANDBY'}
          </span>
        </div>

        <div
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.75rem',
            marginBottom: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
            <strong style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{dominantRegister}</strong>
          </div>
          <div style={{ height: '6px', background: 'var(--bg2)', borderRadius: '3px', overflow: 'hidden', display: 'flex' }}>
            <div style={{ height: '100%', width: `${resonance.chest}%`, background: '#2563eb', transition: 'width 0.15s ease' }} />
            <div style={{ height: '100%', width: `${resonance.mask}%`, background: '#16a34a', transition: 'width 0.15s ease' }} />
            <div style={{ height: '100%', width: `${resonance.head}%`, background: '#d97706', transition: 'width 0.15s ease' }} />
          </div>
        </div>

        <div className="resonance-bar">
          <span className="resonance-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '1px', background: '#2563eb', display: 'inline-block' }} />
            Suara Dada
          </span>
          <div className="resonance-track">
            <div className="resonance-fill chest" style={{ width: `${resonance.chest}%` }} />
          </div>
          <span className="resonance-val">{resonance.chest}%</span>
        </div>

        <div className="resonance-bar">
          <span className="resonance-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '1px', background: '#16a34a', display: 'inline-block' }} />
            Suara Campuran
          </span>
          <div className="resonance-track">
            <div className="resonance-fill mask" style={{ width: `${resonance.mask}%` }} />
          </div>
          <span className="resonance-val">{resonance.mask}%</span>
        </div>

        <div className="resonance-bar">
          <span className="resonance-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '1px', background: '#d97706', display: 'inline-block' }} />
            Suara Kepala
          </span>
          <div className="resonance-track">
            <div className="resonance-fill head" style={{ width: `${resonance.head}%` }} />
          </div>
          <span className="resonance-val">{resonance.head}%</span>
        </div>
      </div>
    </div>
  );
};
