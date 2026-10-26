import { useState, useRef, useCallback } from 'react';
import { GuideNote } from '../types';
import { midiToFreq } from '../utils/pitch';

export function usePianoSynth(externalAudioCtx?: AudioContext | null) {
  const [isPlayingMelody, setIsPlayingMelody] = useState(false);
  const internalCtxRef = useRef<AudioContext | null>(null);
  const activeNodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);
  const timeoutIdsRef = useRef<number[]>([]);

  const getAudioContext = useCallback(() => {
    if (externalAudioCtx && externalAudioCtx.state !== 'closed') {
      if (externalAudioCtx.state === 'suspended') {
        externalAudioCtx.resume().catch(() => {});
      }
      return externalAudioCtx;
    }
    if (!internalCtxRef.current || internalCtxRef.current.state === 'closed') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      internalCtxRef.current = new AudioCtxClass();
    }
    if (internalCtxRef.current.state === 'suspended') {
      internalCtxRef.current.resume().catch(() => {});
    }
    return internalCtxRef.current;
  }, [externalAudioCtx]);

  const playTone = useCallback(
    (freq: number, duration = 0.8) => {
      if (freq <= 0) return;
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Create warm piano-like synth timbre using fundamental + soft overtone
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + duration);
      osc2.stop(now + duration);

      const nodePair = { osc, gain };
      activeNodesRef.current.push(nodePair);
      setTimeout(() => {
        activeNodesRef.current = activeNodesRef.current.filter((n) => n !== nodePair);
      }, duration * 1000 + 100);
    },
    [getAudioContext]
  );

  const playMidi = useCallback(
    (midi: number, duration = 0.8) => {
      const freq = midiToFreq(midi);
      playTone(freq, duration);
    },
    [playTone]
  );

  const stopMelody = useCallback(() => {
    timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    timeoutIdsRef.current = [];
    activeNodesRef.current.forEach(({ osc, gain }) => {
      try {
        gain.gain.cancelScheduledValues(0);
        gain.gain.value = 0;
        osc.stop();
      } catch {
        // ignore already stopped
      }
    });
    activeNodesRef.current = [];
    setIsPlayingMelody(false);
  }, []);

  const playMelody = useCallback(
    (guideNotes: GuideNote[], onProgressNote?: (note: GuideNote, index: number) => void, onComplete?: () => void) => {
      stopMelody();
      if (!guideNotes.length) return;

      setIsPlayingMelody(true);
      const startTime = guideNotes[0].startT;

      guideNotes.forEach((item, index) => {
        const delayMs = Math.max(0, (item.startT - startTime) * 1000);
        const durationSec = Math.max(0.4, item.endT - item.startT);

        const id = window.setTimeout(() => {
          playMidi(item.midi, durationSec);
          if (onProgressNote) {
            onProgressNote(item, index);
          }
        }, delayMs);

        timeoutIdsRef.current.push(id);
      });

      const totalDurationMs = Math.max(0, (guideNotes[guideNotes.length - 1].endT - startTime) * 1000) + 800;
      const endId = window.setTimeout(() => {
        setIsPlayingMelody(false);
        if (onComplete) onComplete();
      }, totalDurationMs);

      timeoutIdsRef.current.push(endId);
    },
    [playMidi, stopMelody]
  );

  return {
    playTone,
    playMidi,
    playMelody,
    stopMelody,
    isPlayingMelody,
  };
}
