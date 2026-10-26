import React, { useRef, useEffect, useCallback } from 'react';
import { GuideNote, MidiNoteBlock, NoteInfo } from '../../types';
import { SHARP_MAP, midiToName } from '../../utils/pitch';

interface PianoRollCanvasProps {
  currentT: number;
  currentFreq: number;
  currentNote: NoteInfo | null;
  guideNotes: GuideNote[];
  userMidiBlocks: MidiNoteBlock[];
  zoomMode: 'focus' | 'full';
  isPaused: boolean;
  userScrollOffset: number;
  onSeekTime?: (timeSec: number) => void;
  height?: number;
}

export const PianoRollCanvas: React.FC<PianoRollCanvasProps> = ({
  currentT,
  currentFreq,
  currentNote,
  guideNotes,
  userMidiBlocks,
  zoomMode,
  isPaused,
  userScrollOffset,
  onSeekTime,
  height = 560,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const PITCH_MIN_MIDI = zoomMode === 'focus' ? 48 : 36; // C3 or C2
  const PITCH_MAX_MIDI = zoomMode === 'focus' ? 72 : 84; // C5 or C6
  const TOTAL_NOTES = PITCH_MAX_MIDI - PITCH_MIN_MIDI + 1;
  const WINDOW_SECS = 10;
  const KEY_COL_WIDTH = 62;

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas || !onSeekTime) return;

      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      if (clickX < KEY_COL_WIDTH) return;

      const gridWidth = rect.width - KEY_COL_WIDTH;
      const CURSOR_RATIO = 0.32;
      const cursorX = KEY_COL_WIDTH + gridWidth * CURSOR_RATIO;
      const pixelsPerSec = gridWidth / WINDOW_SECS;

      const viewT = Math.max(0, currentT + userScrollOffset);
      const clickedTime = viewT + (clickX - cursorX) / pixelsPerSec;
      if (clickedTime >= 0) {
        onSeekTime(clickedTime);
      }
    },
    [currentT, userScrollOffset, onSeekTime]
  );

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

    const noteHeight = height / TOTAL_NOTES;
    const gridWidth = W - KEY_COL_WIDTH;
    const activeMidi = currentFreq > 0 && currentNote ? currentNote.midiNote : null;

    const CURSOR_RATIO = 0.32;
    const cursorX = KEY_COL_WIDTH + gridWidth * CURSOR_RATIO;
    const viewT = Math.max(0, currentT + userScrollOffset);
    const pixelsPerSec = gridWidth / WINDOW_SECS;

    // 1. Draw piano keys & grid rows
    for (let i = 0; i < TOTAL_NOTES; i++) {
      const midi = PITCH_MIN_MIDI + i;
      const yTop = height - (i + 1) * noteHeight;
      const isBlack = SHARP_MAP[midi % 12] === 1;
      const isC = midi % 12 === 0;
      const isMiddleC = midi === 60; // C4

      // Grid background
      ctx.fillStyle = isBlack ? '#0c111e' : '#080c16';
      ctx.fillRect(KEY_COL_WIDTH, yTop, gridWidth, noteHeight);

      // Grid line
      if (isMiddleC) {
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
        ctx.lineWidth = 1.5;
      } else if (isC) {
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.2;
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 0.8;
      }
      ctx.beginPath();
      ctx.moveTo(KEY_COL_WIDTH, yTop);
      ctx.lineTo(W, yTop);
      ctx.stroke();

      // Left Piano Key
      const isActiveKey = activeMidi === midi;
      ctx.fillStyle = isActiveKey ? '#4f46e5' : isBlack ? '#0f172a' : '#f8fafc';
      const keyWidth = isBlack ? KEY_COL_WIDTH - 18 : KEY_COL_WIDTH - 2;
      ctx.fillRect(0, yTop + 0.5, keyWidth, noteHeight - 1);

      ctx.strokeStyle = isBlack ? '#1e293b' : '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, yTop + 0.5, keyWidth, noteHeight - 1);

      if (isC || isActiveKey) {
        ctx.fillStyle = isBlack || isActiveKey ? '#ffffff' : '#0f172a';
        ctx.font = `${isActiveKey ? 'bold ' : '600 '}9px JetBrains Mono, monospace`;
        let label = midiToName(midi);
        if (isMiddleC) label += ' (Mid)';
        ctx.fillText(label, 4, yTop + noteHeight - 3);
      }
    }

    // Vertical time grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 4]);
    const startSec = Math.floor(viewT - (cursorX - KEY_COL_WIDTH) / pixelsPerSec);
    const endSec = Math.ceil(viewT + (W - cursorX) / pixelsPerSec);
    for (let s = startSec; s <= endSec; s++) {
      const x = cursorX + (s - viewT) * pixelsPerSec;
      if (x >= KEY_COL_WIDTH && x <= W) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '8px JetBrains Mono, monospace';
        ctx.fillText(`${s}s`, x + 3, 11);
      }
    }
    ctx.setLineDash([]);

    // Separator line
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(KEY_COL_WIDTH, 0);
    ctx.lineTo(KEY_COL_WIDTH, height);
    ctx.stroke();

    // 2. Draw Target Guide Notes (flowing from right to left)
    guideNotes.forEach((b) => {
      const effectiveMidi = Math.max(PITCH_MIN_MIDI, Math.min(PITCH_MAX_MIDI, b.midi));
      const x1 = cursorX + (b.startT - viewT) * pixelsPerSec;
      const x2 = cursorX + (b.endT - viewT) * pixelsPerSec;
      if (x2 < KEY_COL_WIDTH || x1 > W) return;

      const noteIndex = effectiveMidi - PITCH_MIN_MIDI;
      const yTop = height - (noteIndex + 1) * noteHeight;
      const blockH = Math.max(7, noteHeight - 2);

      const isCurrentTarget = currentT >= b.startT && currentT <= b.endT;
      const isHit =
        isCurrentTarget && currentNote && Math.abs(currentNote.midiNote - b.midi) === 0 && Math.abs(currentNote.cents) <= 25;
      const isNear =
        isCurrentTarget && currentNote && Math.abs(currentNote.midiNote - b.midi) <= 1;

      let blockBg = 'rgba(71, 85, 105, 0.25)';
      let blockBorder = '#64748b';

      if (isHit) {
        blockBg = 'rgba(21, 128, 61, 0.45)';
        blockBorder = '#15803d';
      } else if (isNear) {
        blockBg = 'rgba(180, 83, 9, 0.4)';
        blockBorder = '#b45309';
      }

      ctx.fillStyle = blockBg;
      ctx.strokeStyle = blockBorder;
      ctx.lineWidth = isHit ? 2 : 1;

      const renderX = Math.max(KEY_COL_WIDTH, x1);
      const renderW = Math.max(8, x2 - renderX);

      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(renderX, yTop + 1, renderW, blockH, 4);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(renderX, yTop + 1, renderW, blockH);
        ctx.strokeRect(renderX, yTop + 1, renderW, blockH);
      }

      if (renderW >= 24) {
        ctx.fillStyle = isHit ? '#ecfdf5' : '#e0e7ff';
        ctx.font = 'bold 9px JetBrains Mono, monospace';
        const solfegeTxt = b.solfege ? ` ${b.solfege}` : '';
        const chordTxt = b.chord ? ` / ${b.chord}` : '';
        const label = renderW >= 42 ? `${b.note}${b.octave}${solfegeTxt}${chordTxt}` : `${b.note}${b.octave}`;
        ctx.fillText(label, renderX + 4, yTop + blockH - 3);
      }
    });

    // 3. Draw Sung MIDI Blocks (User voice trailing to the left)
    userMidiBlocks.forEach((b) => {
      const clampedMidi = Math.max(PITCH_MIN_MIDI, Math.min(PITCH_MAX_MIDI, b.midi));
      const x1 = cursorX + (b.startT - viewT) * pixelsPerSec;
      const x2 = cursorX + (b.endT - viewT) * pixelsPerSec;
      if (x2 < KEY_COL_WIDTH || x1 > W) return;

      const noteIndex = clampedMidi - PITCH_MIN_MIDI;
      const yTop = height - (noteIndex + 1) * noteHeight;
      const blockH = Math.max(7, noteHeight - 2);

      const avgCents = b.centsList.length
        ? b.centsList.reduce((acc, c) => acc + c, 0) / b.centsList.length
        : 0;

      let fillCol = '#10b981'; // In-tune
      let borderCol = '#059669';
      let tag = 'PAS';
      if (avgCents < -20) {
        fillCol = '#ef4444'; // Flat
        borderCol = '#dc2626';
        tag = 'FALS -';
      } else if (avgCents > 20) {
        fillCol = '#f59e0b'; // Sharp
        borderCol = '#d97706';
        tag = 'FALS +';
      }

      ctx.fillStyle = fillCol;
      ctx.strokeStyle = borderCol;
      ctx.lineWidth = 1.5;

      const renderX = Math.max(KEY_COL_WIDTH, x1);
      const renderW = Math.max(6, x2 - renderX);

      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(renderX, yTop + 1, renderW, blockH, 4);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(renderX, yTop + 1, renderW, blockH);
        ctx.strokeRect(renderX, yTop + 1, renderW, blockH);
      }

      if (renderW >= 32) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px JetBrains Mono, monospace';
        const label = `${b.note}${b.octave} [${tag}]`;
        ctx.fillText(label, renderX + 4, yTop + blockH - 3);
      }
    });

    // 4. Static target cursor line
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.85)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(cursorX, 0);
    ctx.lineTo(cursorX, height);
    ctx.stroke();
    ctx.setLineDash([]);

    // 5. Floating Singer Cursor (moves up/down according to live pitch!)
    if (currentFreq > 0 && currentNote && activeMidi !== null) {
      const clampedMidi = Math.max(PITCH_MIN_MIDI, Math.min(PITCH_MAX_MIDI, activeMidi));
      const noteIdx = clampedMidi - PITCH_MIN_MIDI;
      const centsOffset = (currentNote.cents || 0) / 100;
      const singerY = height - (noteIdx + 0.5 + centsOffset) * noteHeight;

      ctx.fillStyle = '#10b981';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#10b981';
      ctx.beginPath();
      ctx.arc(cursorX, singerY, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Note badge tooltip next to singer cursor
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px JetBrains Mono, monospace';
      ctx.fillText(`${currentNote.note}${currentNote.octave}`, cursorX + 12, singerY + 4);
    }
  }, [
    currentT,
    currentFreq,
    currentNote,
    guideNotes,
    userMidiBlocks,
    zoomMode,
    isPaused,
    userScrollOffset,
    height,
    PITCH_MIN_MIDI,
    PITCH_MAX_MIDI,
    TOTAL_NOTES,
  ]);

  return (
    <div style={{ position: 'relative' }}>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{
          width: '100%',
          height: `${height}px`,
          display: 'block',
          background: '#090d16',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid #1e293b',
          cursor: 'pointer',
        }}
        title="Klik di mana saja pada bidang piano untuk melompat ke detik tersebut"
      />
    </div>
  );
};
