import { useState, useRef, useEffect, useCallback } from 'react';
import { NoteInfo, ResonanceData } from '../types';
import { detectPitch, freqToNote, computeResonance, computeRMS, median } from '../utils/pitch';

export interface PitchDetectionHook {
  currentFreq: number;
  currentNote: NoteInfo | null;
  rmsDb: number;
  resonance: ResonanceData;
  fftData: Float32Array;
  isRunning: boolean;
  startDetection: () => void;
  stopDetection: () => void;
}

interface UsePitchDetectionOptions {
  audioCtx: AudioContext | null;
  analyser: AnalyserNode | null;
  fftAnalyser?: AnalyserNode | null;
  refFreq?: number;
  noiseGate?: number; // 0..50
  enabled?: boolean;
  onTick?: (data: {
    freq: number;
    note: NoteInfo | null;
    rmsDb: number;
    resonance: ResonanceData;
    fftData: Float32Array;
  }) => void;
}

export function usePitchDetection({
  audioCtx,
  analyser,
  fftAnalyser,
  refFreq = 440,
  noiseGate = 10,
  enabled = true,
  onTick,
}: UsePitchDetectionOptions): PitchDetectionHook {
  const [currentFreq, setCurrentFreq] = useState<number>(-1);
  const [currentNote, setCurrentNote] = useState<NoteInfo | null>(null);
  const [rmsDb, setRmsDb] = useState<number>(-Infinity);
  const [resonance, setResonance] = useState<ResonanceData>({ chest: 33, mask: 33, head: 33 });

  const isRunningRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);
  const timeBufRef = useRef<Float32Array | null>(null);
  const freqBufRef = useRef<Float32Array | null>(null);
  const medianBufRef = useRef<number[]>([]);

  const startDetection = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;
  }, []);

  const stopDetection = useCallback(() => {
    isRunningRef.current = false;
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setCurrentFreq(-1);
    setCurrentNote(null);
    setRmsDb(-Infinity);
  }, []);

  useEffect(() => {
    if (!enabled || !audioCtx || !analyser) {
      stopDetection();
      return;
    }

    if (!timeBufRef.current || timeBufRef.current.length !== analyser.fftSize) {
      timeBufRef.current = new Float32Array(analyser.fftSize);
    }
    const targetFft = fftAnalyser || analyser;
    if (!freqBufRef.current || freqBufRef.current.length !== targetFft.frequencyBinCount) {
      freqBufRef.current = new Float32Array(targetFft.frequencyBinCount);
    }

    isRunningRef.current = true;

    const tick = () => {
      if (!isRunningRef.current || !analyser || !audioCtx) return;

      const timeBuf = timeBufRef.current!;
      const freqBuf = freqBufRef.current!;
      analyser.getFloatTimeDomainData(timeBuf as any);

      const db = computeRMS(timeBuf);
      setRmsDb(db);

      // Noise gate: threshold from slider (e.g. 10 -> -45dB approx)
      const gateLimit = -55 + noiseGate * 0.5;
      let rawFreq = -1;

      if (db > gateLimit) {
        rawFreq = detectPitch(timeBuf, audioCtx.sampleRate);
      }

      // Median filter stabilization (7 samples)
      let stableFreq = -1;
      if (rawFreq > 0) {
        medianBufRef.current.push(rawFreq);
        if (medianBufRef.current.length > 7) medianBufRef.current.shift();
        stableFreq = median(medianBufRef.current);
      } else {
        medianBufRef.current = [];
      }

      const noteInfo = stableFreq > 0 ? freqToNote(stableFreq, refFreq) : null;
      setCurrentFreq(stableFreq);
      setCurrentNote(noteInfo);

      // Compute resonance from FFT
      targetFft.getFloatFrequencyData(freqBuf as any);
      const res = computeResonance(freqBuf, audioCtx.sampleRate, targetFft.fftSize);
      if (stableFreq > 0) {
        setResonance(res);
      }

      if (onTick) {
        onTick({
          freq: stableFreq,
          note: noteInfo,
          rmsDb: db,
          resonance: res,
          fftData: freqBuf,
        });
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      isRunningRef.current = false;
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [enabled, audioCtx, analyser, fftAnalyser, refFreq, noiseGate, onTick, stopDetection]);

  return {
    currentFreq,
    currentNote,
    rmsDb,
    resonance,
    fftData: freqBufRef.current || new Float32Array(1024),
    isRunning: isRunningRef.current,
    startDetection,
    stopDetection,
  };
}
