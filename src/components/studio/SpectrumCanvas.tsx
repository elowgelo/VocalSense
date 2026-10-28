import React, { useRef, useEffect } from 'react';
import { NoteInfo } from '../../types';

interface SpectrumCanvasProps {
  fftData: Float32Array;
  sampleRate: number;
  fundamentalFreq: number;
  currentNote: NoteInfo | null;
  height?: number;
}

export const SpectrumCanvas: React.FC<SpectrumCanvasProps> = ({
  fftData,
  sampleRate,
  fundamentalFreq,
  currentNote,
  height = 95,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const parent = canvas.parentElement;
      const W = parent ? parent.clientWidth : 800;
      canvas.width = W;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

    ctx.clearRect(0, 0, W, height);

    // Deep dark background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, W, height);

    const minFreq = 50;
    const maxFreq = 5000;
    const binHz = sampleRate / 2048;

    // Resonance boundary lines: 100Hz (Chest), 400Hz (Mask/Mixed), 2000Hz (Head)
    const zones = [100, 400, 2000];
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.setLineDash([3, 3]);
    zones.forEach((z) => {
      const x = ((z - minFreq) / (maxFreq - minFreq)) * W;
      if (x > 0 && x < W) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
    });
    ctx.setLineDash([]);

    // Draw smooth FFT curve
    ctx.fillStyle = 'rgba(71, 85, 105, 0.45)';
    ctx.beginPath();
    ctx.moveTo(0, height);

    const numBins = Math.floor(maxFreq / binHz);
    const minBin = Math.floor(minFreq / binHz);

    for (let b = minBin; b < numBins && b < fftData.length; b++) {
      const currentHz = b * binHz;
      const x = ((currentHz - minFreq) / (maxFreq - minFreq)) * W;
      const db = fftData[b];
      const norm = Math.max(0, Math.min(1, (db + 90) / 70));
      const y = height - norm * (height - 12);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W, height);
    ctx.closePath();
    ctx.fill();

    // Fundamental frequency (F0) peak line & badge
    if (fundamentalFreq > minFreq && fundamentalFreq < maxFreq) {
      const f0X = ((fundamentalFreq - minFreq) / (maxFreq - minFreq)) * W;
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(f0X, 0);
      ctx.lineTo(f0X, height);
      ctx.stroke();

      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 10px JetBrains Mono, monospace';
      const noteBadge = currentNote ? `[${currentNote.note}${currentNote.octave}] ` : '';
      ctx.fillText(`F0: ${fundamentalFreq.toFixed(1)} Hz ${noteBadge}`, Math.min(f0X + 5, W - 140), 16);
    }
    } catch (err) {
      console.warn('SpectrumCanvas rendering interrupted:', err);
    }
  }, [fftData, sampleRate, fundamentalFreq, currentNote, height]);

  return (
    <div className="canvas-panel">
      <div className="canvas-title-row">
        <span>Grafik Frekuensi &amp; Kejernihan Suara (FFT Spectrum)</span>
        <span style={{ fontFamily: 'var(--font-mono)' }}>
          {fundamentalFreq > 0 ? `Resonansi Aktif (${fundamentalFreq.toFixed(1)} Hz)` : 'Menunggu Suara...'}
        </span>
      </div>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: `${height}px`,
          display: 'block',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid #1e293b',
        }}
      />
      <div
        className="d-flex justify-between text-xs text-muted mt-1"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}
      >
        <span>55 Hz</span>
        <span>Suara Dada (100-400 Hz)</span>
        <span>Suara Campuran (400-2000 Hz)</span>
        <span>Suara Kepala (2000-5000 Hz)</span>
        <span>5000 Hz</span>
      </div>
    </div>
  );
};
