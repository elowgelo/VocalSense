import { useState, useRef, useCallback } from 'react';

export interface VoiceRecorderHook {
  isRecording: boolean;
  isPlaying: boolean;
  recordedDuration: number;
  recordedBlob: Blob | null;
  audioUrl: string | null;
  audioBuffer: AudioBuffer | null;
  waveformPeaks: number[];
  playbackTime: number;
  startRecording: (stream?: MediaStream | null) => boolean;
  stopRecording: () => Promise<Blob | null>;
  togglePlayback: () => void;
  seekPlayback: (timeInSeconds: number) => void;
  resetRecording: () => void;
}

export function useVoiceRecorder(): VoiceRecorderHook {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedDuration, setRecordedDuration] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [waveformPeaks, setWaveformPeaks] = useState<number[]>([]);
  const [playbackTime, setPlaybackTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const startTimeRef = useRef<number>(0);
  const timerIntervalRef = useRef<number | null>(null);

  const extractPeaks = (buffer: AudioBuffer, count = 200): number[] => {
    const rawData = buffer.getChannelData(0);
    const blockSize = Math.floor(rawData.length / count);
    const peaks: number[] = [];

    for (let i = 0; i < count; i++) {
      const start = i * blockSize;
      let max = 0;
      for (let j = 0; j < blockSize; j++) {
        const val = Math.abs(rawData[start + j]);
        if (val > max) max = val;
      }
      peaks.push(max);
    }
    return peaks;
  };

  const startRecording = useCallback((stream?: MediaStream | null): boolean => {
    try {
      chunksRef.current = [];
      if (stream) {
        const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : 'audio/webm';
        const recorder = new MediaRecorder(stream, { mimeType });

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            chunksRef.current.push(e.data);
          }
        };

        recorder.start(100);
        mediaRecorderRef.current = recorder;
      } else {
        mediaRecorderRef.current = null;
      }

      setIsRecording(true);
      startTimeRef.current = Date.now();
      setRecordedDuration(0);

      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      timerIntervalRef.current = window.setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setRecordedDuration(elapsed);
      }, 100);

      return true;
    } catch (err) {
      console.error('Failed to start recorder:', err);
      return false;
    }
  }, []);

  const stopRecording = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }

      const recorder = mediaRecorderRef.current;
      if (!recorder || recorder.state === 'inactive') {
        setIsRecording(false);
        resolve(null);
        return;
      }

      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        setRecordedBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);

        // Decode into AudioBuffer
        try {
          const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new AudioCtxClass();
          const arrayBuf = await blob.arrayBuffer();
          const decoded = await ctx.decodeAudioData(arrayBuf);
          setAudioBuffer(decoded);
          const peaks = extractPeaks(decoded);
          setWaveformPeaks(peaks);
          ctx.close().catch(() => {});
        } catch (err) {
          console.warn('Could not decode audio waveform:', err);
        }

        setIsRecording(false);
        resolve(blob);
      };

      recorder.stop();
    });
  }, []);

  const togglePlayback = useCallback(() => {
    if (!audioUrl) return;

    if (!audioElementRef.current) {
      const audio = new Audio(audioUrl);
      audioElementRef.current = audio;

      audio.ontimeupdate = () => {
        setPlaybackTime(audio.currentTime);
      };
      audio.onended = () => {
        setIsPlaying(false);
        setPlaybackTime(0);
      };
    }

    const audio = audioElementRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch((e) => console.error(e));
    }
  }, [audioUrl, isPlaying]);

  const seekPlayback = useCallback((timeInSeconds: number) => {
    if (audioElementRef.current) {
      audioElementRef.current.currentTime = timeInSeconds;
      setPlaybackTime(timeInSeconds);
    }
  }, []);

  const resetRecording = useCallback(() => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current = null;
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setRecordedBlob(null);
    setAudioUrl(null);
    setAudioBuffer(null);
    setWaveformPeaks([]);
    setRecordedDuration(0);
    setPlaybackTime(0);
    setIsPlaying(false);
    setIsRecording(false);
  }, [audioUrl]);

  return {
    isRecording,
    isPlaying,
    recordedDuration,
    recordedBlob,
    audioUrl,
    audioBuffer,
    waveformPeaks,
    playbackTime,
    startRecording,
    stopRecording,
    togglePlayback,
    seekPlayback,
    resetRecording,
  };
}
