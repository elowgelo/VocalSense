import React, { useRef, useEffect } from 'react';

interface PitchHistoryCanvasProps {
  history: number[]; // Array of recent frequencies (Hz)
  width?: number;
  height?: number;
}

export const PitchHistoryCanvas: React.FC<PitchHistoryCanvasProps> = ({
  history,
  height = 80,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    const w = parent ? parent.clientWidth : 400;
    canvas.width = w;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, w, height);

    // Dark grid background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, height);

    // Center pitch grid line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(w, height / 2);
    ctx.stroke();

    const valids = history.filter((h) => h > 0);
    if (!valids.length) return;

    const minF = Math.min(...valids) * 0.95;
    const maxF = Math.max(...valids) * 1.05;
    const range = maxF - minF || 1;

    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();

    let first = true;
    history.forEach((h, i) => {
      if (h <= 0) {
        first = true;
        return;
      }
      const x = (i / (history.length - 1)) * w;
      const y = height - ((h - minF) / range) * (height - 12) - 6;
      if (first) {
        ctx.moveTo(x, y);
        first = false;
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  }, [history, height]);

  return (
    <div style={{ width: '100%', height: `${height}px`, borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: `${height}px`, display: 'block' }} />
    </div>
  );
};
