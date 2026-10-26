import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="footer" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '2.5rem 0', marginTop: '3rem' }}>
      <div className="container text-center">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.75rem' }}>
          <div className="logo-icon" style={{ width: '24px', height: '24px', fontSize: '0.75rem' }}>
            VS
          </div>
          <strong style={{ fontSize: '1rem', color: 'var(--text)' }}>VocalSense AI</strong>
          <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>React Edition</span>
        </div>
        <p className="text-sm text-muted" style={{ maxWidth: '600px', margin: '0 auto 1rem' }}>
          Platform latihan vokal cerdas in-browser dengan Web Audio API, Normalized Square Difference Function (NSDF), visualisasi Canvas DAW, dan evaluasi 5-dimensi objektif.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.82rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: 'var(--text2)' }}>Beranda</Link>
          <Link to="/studio" style={{ color: 'var(--text2)' }}>Studio Vokal</Link>
          <Link to="/tuner" style={{ color: 'var(--text2)' }}>Tuner Kromatik</Link>
          <Link to="/range-finder" style={{ color: 'var(--text2)' }}>Jangkauan Vokal</Link>
          <Link to="/login" style={{ color: 'var(--text2)' }}>Autentikasi</Link>
        </div>
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} VocalSense AI — Dikembangkan untuk implementasi Rekayasa Perangkat Lunak / IPPL. Pemrosesan suara berjalan 100% lokal di browser.
        </p>
      </div>
    </footer>
  );
};
