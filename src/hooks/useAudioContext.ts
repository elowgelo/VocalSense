import { useState, useRef, useCallback, useEffect } from 'react';

export interface AudioContextHook {
  audioCtx: AudioContext | null;
  analyser: AnalyserNode | null;
  fftAnalyser: AnalyserNode | null;
  stream: MediaStream | null;
  isActive: boolean;
  error: string | null;
  startAudio: () => Promise<boolean>;
  stopAudio: () => void;
}

export function useAudioContext(fftSize = 2048): AudioContextHook {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const fftAnalyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startAudio = useCallback(async (): Promise<boolean> => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
        video: false,
      });

      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();

      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const analyser = ctx.createAnalyser();
      analyser.fftSize = fftSize;

      const fftAnalyser = ctx.createAnalyser();
      fftAnalyser.fftSize = fftSize;
      fftAnalyser.smoothingTimeConstant = 0.8;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);
      source.connect(fftAnalyser);

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      fftAnalyserRef.current = fftAnalyser;
      sourceRef.current = source;
      streamRef.current = stream;

      setIsActive(true);
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Akses mikrofon ditolak atau tidak tersedia.';
      setError(msg);
      setIsActive(false);
      return false;
    }
  }, [fftSize]);

  const stopAudio = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    analyserRef.current = null;
    fftAnalyserRef.current = null;
    setIsActive(false);
  }, []);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  return {
    audioCtx: audioCtxRef.current,
    analyser: analyserRef.current,
    fftAnalyser: fftAnalyserRef.current,
    stream: streamRef.current,
    isActive,
    error,
    startAudio,
    stopAudio,
  };
}
