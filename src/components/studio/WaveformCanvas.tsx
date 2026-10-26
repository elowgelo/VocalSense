import React, { useRef, useEffect } from 'react';

interface WaveformCanvasProps {
  peaks: number[];
  playbackTime: number;
  totalDuration: number;
  onSeek?: (timeSec: number) => void;
  height?: number;
}

export const WaveformCanvas: React.FC<WaveformCanvasProps> = ({
  peaks,
  playbackTime,
  totalDuration,
  onSeek,
  height = 68,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onSeek || totalDuration <= 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(pct * totalDuration);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    const W = parent ? parent.clientWidth : 800;
    canvas.width = W;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, W, height);

    // Dark sleek background
    ctx.fillStyle = '#1c1a32';
    ctx.fillRect(0, 0, W, height);

    // Center baseline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(W, height / 2);
    ctx.stroke();

    if (!peaks.length) {
      ctx.fillStyle = '#64748b';
      ctx.font = '11px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Belum ada rekaman vokal', W / 2, height / 2 + 4);
      return;
    }

    const barWidth = W / peaks.length;
    const playheadX = totalDuration > 0 ? (playbackTime / totalDuration) * W : 0;

    peaks.forEach((peak, i) => {
      const x = i * barWidth;
      const barH = Math.max(3, peak * (height - 12));
      const y = (height - barH) / 2;

      // Color past playhead vs remaining
      ctx.fillStyle = x <= playheadX ? '#a78bfa' : '#475569';
      ctx.fillRect(x, y, Math.max(1.5, barWidth - 1), barH);
    });

    // Draw playhead vertical line
    if (totalDuration > 0) {
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(playheadX, 0);
      ctx.lineTo(playheadX, height);
      ctx.stroke();
    }
  }, [peaks, playbackTime, totalDuration, height]);

  return (
    <div
      style={{
        marginTop: '0.5rem',
        background: '#262444',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.28rem 0.65rem',
          background: '#1c1a32',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.68rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#cbd5e1', fontWeight: 700 }}>
          <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#a78bfa' }} />
          <span>WAVEFORM VOKAL REKAMAN</span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#94a3b8' }}>
          {totalDuration > 0 ? `${playbackTime.toFixed(1)}s / ${totalDuration.toFixed(1)}s` : 'Belum ada rekaman'}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        style={{ width: '100%', height: `${height}px`, display: 'block', cursor: totalDuration > 0 ? 'pointer' : 'default' }}
        title={totalDuration > 0 ? 'Klik untuk memutar vokal di detik ini' : ''}
      />
    </div>
  );
};
