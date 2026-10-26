import React, { useState } from 'react';
import { X, Upload, Layers, Music, Server, Sliders } from 'lucide-react';

interface ImportSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSingleFile: (file: File) => void;
  onSelectSeparateTracks: (vocalFile: File, instFile: File) => void;
  onSelectBackingTrack: (file: File) => void;
}

export const ImportSongModal: React.FC<ImportSongModalProps> = ({
  isOpen,
  onClose,
  onSelectSingleFile,
  onSelectSeparateTracks,
  onSelectBackingTrack,
}) => {
  const [mode, setMode] = useState<'menu' | 'separate'>('menu');
  const [vocalFile, setVocalFile] = useState<File | null>(null);
  const [instFile, setInstFile] = useState<File | null>(null);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem',
      }}
    >
      <div className="card" style={{ width: '100%', maxWidth: '490px', padding: '1.5rem', background: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>
            {mode === 'menu' ? 'Pilih Format Import Lagu' : 'Upload Trek Terpisah'}
          </h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm" style={{ padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        {mode === 'menu' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {/* Opsi 1 */}
            <div
              onClick={() => setMode('separate')}
              style={{
                border: '1.5px solid #8b5cf6',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem 1rem',
                background: 'rgba(139, 92, 246, 0.06)',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#7c3aed', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Layers size={14} />
                  <span>1. File Vokal &amp; Instrumen Terpisah</span>
                </span>
                <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
                  Rekomendasi
                </span>
              </div>
              <p className="text-xs text-muted" style={{ margin: 0 }}>
                Upload 2 file audio: trek vokal untuk ekstraksi notasi balok, trek instrumen untuk musik pengiring.
              </p>
            </div>

            {/* Opsi 2 */}
            <label
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem 1rem',
                background: 'var(--bg)',
                cursor: 'pointer',
                display: 'block',
              }}
            >
              <input
                type="file"
                accept="audio/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    onSelectSingleFile(f);
                    onClose();
                  }
                }}
              />
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Music size={14} />
                <span>2. Satu File Audio Lengkap (Deteksi Otomatis)</span>
              </div>
              <p className="text-xs text-muted" style={{ margin: 0 }}>
                Analisis vokal langsung dari satu file lagu menggunakan algoritma deteksi nada in-browser.
              </p>
            </label>

            {/* Opsi 3 */}
            <label
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem 1rem',
                background: 'var(--bg)',
                cursor: 'pointer',
                display: 'block',
              }}
            >
              <input
                type="file"
                accept="audio/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    onSelectBackingTrack(f);
                    onClose();
                  }
                }}
              />
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sliders size={14} />
                <span>3. Musik Pengiring Saja (Karaoke Tanpa Not Balok)</span>
              </div>
              <p className="text-xs text-muted" style={{ margin: 0 }}>
                Putar file lagu Anda sebagai latar musik instrumen murni tanpa panduan balok nada.
              </p>
            </label>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.85rem', background: 'var(--bg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <strong style={{ fontSize: '0.82rem', color: '#7c3aed' }}>1. File Vokal Murni (.mp3, .wav)</strong>
                  <span className="text-xs text-muted">Untuk Panduan Not</span>
                </div>
                <input
                  type="file"
                  accept="audio/*"
                  className="form-control"
                  style={{ fontSize: '0.8rem', padding: '0.4rem' }}
                  onChange={(e) => setVocalFile(e.target.files?.[0] || null)}
                />
              </div>

              <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.85rem', background: 'var(--bg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <strong style={{ fontSize: '0.82rem', color: '#10b981' }}>2. File Instrumen Musik (.mp3, .wav)</strong>
                  <span className="text-xs text-muted">Untuk Latar Lagu</span>
                </div>
                <input
                  type="file"
                  accept="audio/*"
                  className="form-control"
                  style={{ fontSize: '0.8rem', padding: '0.4rem' }}
                  onChange={(e) => setInstFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button onClick={() => setMode('menu')} className="btn btn-outline btn-sm">
                Kembali
              </button>
              <button
                disabled={!vocalFile || !instFile}
                onClick={() => {
                  if (vocalFile && instFile) {
                    onSelectSeparateTracks(vocalFile, instFile);
                    onClose();
                  }
                }}
                className="btn btn-primary btn-sm"
              >
                Terapkan Lagu
              </button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          {mode === 'menu' && (
            <button onClick={onClose} className="btn btn-outline btn-sm">
              Tutup
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
