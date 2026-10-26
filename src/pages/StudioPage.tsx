import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAudioContext } from '../hooks/useAudioContext';
import { usePitchDetection } from '../hooks/usePitchDetection';
import { usePianoSynth } from '../hooks/usePianoSynth';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { SpectrumCanvas } from '../components/studio/SpectrumCanvas';
import { PianoRollCanvas } from '../components/studio/PianoRollCanvas';
import { WaveformCanvas } from '../components/studio/WaveformCanvas';
import { TelemetrySidebar } from '../components/studio/TelemetrySidebar';
import { SingingReport } from '../components/studio/SingingReport';
import { ImportSongModal } from '../components/studio/ImportSongModal';
import { EXERCISE_PRESETS, transposeGuideNotes } from '../utils/exercisePresets';
import { extractNotesFromAudioBuffer } from '../utils/audioExport';
import { NoteInfo, MidiNoteBlock, PitchHistoryItem, ResonanceData, EvaluationReport, GuideNote } from '../types';
import { freqToNote, estimateVibrato, midiToFreq } from '../utils/pitch';
import {
  Mic,
  Play,
  Square,
  Pause,
  Upload,
  Music,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Radio,
  FileText,
} from 'lucide-react';

export const StudioPage: React.FC = () => {
  const { user, maxRecordingDuration } = useAuth();

  // Audio Context & Mic
  const { audioCtx, analyser, fftAnalyser, stream, isActive, error, startAudio, stopAudio } = useAudioContext(2048);
  const [isMicInitialized, setIsMicInitialized] = useState(false);

  // Exercise & Transposition
  const [exerciseKey, setExerciseKey] = useState<string>('scale');
  const [keyTranspose, setKeyTranspose] = useState<number>(0);
  const [guideNotes, setGuideNotes] = useState<GuideNote[]>(() =>
    transposeGuideNotes(EXERCISE_PRESETS['scale'], 0)
  );

  // Controls & Panning
  const [zoomMode, setZoomMode] = useState<'focus' | 'full'>('focus');
  const [isRollPaused, setIsRollPaused] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  // Demo mode (Simulate vocal pitch)
  const [isDemoMode, setIsDemoMode] = useState(false);
  const demoIntervalRef = useRef<number | null>(null);
  const [demoFreq, setDemoFreq] = useState<number>(-1);

  // Custom imported song state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importedSongName, setImportedSongName] = useState<string>('');
  const [importProgress, setImportProgress] = useState<number | null>(null);

  // Recorded & Analyzed Data
  const [sessionStartTime] = useState<number>(Date.now());
  const [currentSessionTime, setCurrentSessionTime] = useState<number>(0);
  const [userMidiBlocks, setUserMidiBlocks] = useState<MidiNoteBlock[]>([]);
  const activeBlockRef = useRef<MidiNoteBlock | null>(null);

  const pitchHistoryRef = useRef<PitchHistoryItem[]>([]);
  const resonanceHistoryRef = useRef<ResonanceData[]>([]);
  const rmsHistoryRef = useRef<number[]>([]);

  const [evaluationReport, setEvaluationReport] = useState<EvaluationReport | null>(null);

  // Piano Synth
  const { playMelody, stopMelody, isPlayingMelody } = usePianoSynth(audioCtx);

  // Voice Recorder
  const {
    isRecording,
    isPlaying: isAudioPlaying,
    recordedDuration,
    waveformPeaks,
    playbackTime,
    startRecording: startVoiceRecording,
    stopRecording: stopVoiceRecording,
    togglePlayback,
    seekPlayback,
    resetRecording,
  } = useVoiceRecorder();

  // Tick callback from PitchDetection
  const handlePitchTick = useCallback(
    ({
      freq,
      note,
      rmsDb,
      resonance,
    }: {
      freq: number;
      note: NoteInfo | null;
      rmsDb: number;
      resonance: ResonanceData;
    }) => {
      const activeF = isDemoMode ? demoFreq : freq;
      const activeN = isDemoMode && demoFreq > 0 ? freqToNote(demoFreq) : note;

      const t = isRecording ? recordedDuration : (Date.now() - sessionStartTime) / 1000;
      setCurrentSessionTime(t);

      // Record telemetry history when recording
      if (isRecording) {
        pitchHistoryRef.current.push({
          t,
          freq: activeF,
          note: activeN?.note,
          octave: activeN?.octave,
          cents: activeN?.cents,
          midi: activeN?.midiNote,
        });
        resonanceHistoryRef.current.push(resonance);
        rmsHistoryRef.current.push(rmsDb);

        // Coalesce continuous sung blocks
        if (activeF > 0 && activeN) {
          const currentMidi = activeN.midiNote;
          if (!activeBlockRef.current) {
            activeBlockRef.current = {
              midi: currentMidi,
              note: activeN.note,
              octave: activeN.octave,
              centsList: [activeN.cents],
              startT: t,
              endT: t + 0.12,
            };
          } else if (Math.abs(activeBlockRef.current.midi - currentMidi) <= 1) {
            // Continuation of same note
            activeBlockRef.current.centsList.push(activeN.cents);
            activeBlockRef.current.endT = t + 0.12;
          } else {
            // Note transition
            if (activeBlockRef.current.endT - activeBlockRef.current.startT >= 0.15) {
              setUserMidiBlocks((prev) => [...prev, { ...activeBlockRef.current! }]);
            }
            activeBlockRef.current = {
              midi: currentMidi,
              note: activeN.note,
              octave: activeN.octave,
              centsList: [activeN.cents],
              startT: t,
              endT: t + 0.12,
            };
          }
        } else {
          if (activeBlockRef.current) {
            if (activeBlockRef.current.endT - activeBlockRef.current.startT >= 0.15) {
              setUserMidiBlocks((prev) => [...prev, { ...activeBlockRef.current! }]);
            }
            activeBlockRef.current = null;
          }
        }
      }
    },
    [isDemoMode, demoFreq, isRecording, recordedDuration, sessionStartTime]
  );

  const { currentFreq, currentNote, rmsDb, resonance, fftData } = usePitchDetection({
    audioCtx,
    analyser,
    fftAnalyser,
    enabled: isMicInitialized || isDemoMode,
    onTick: handlePitchTick,
  });

  // Effective frequency and note factoring in Demo mode
  const effectiveFreq = isDemoMode ? demoFreq : currentFreq;
  const effectiveNote = isDemoMode && demoFreq > 0 ? freqToNote(demoFreq) : currentNote;

  // Exercise selection & Transposition
  const handleExerciseChange = (newExercise: string, newTranspose: number) => {
    setExerciseKey(newExercise);
    setKeyTranspose(newTranspose);
    const base = EXERCISE_PRESETS[newExercise] || [];
    setGuideNotes(transposeGuideNotes(base, newTranspose));
  };

  // Demo vocal simulation loop
  const toggleDemoMode = () => {
    if (isDemoMode) {
      if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
      setIsDemoMode(false);
      setDemoFreq(-1);
    } else {
      setIsDemoMode(true);
      setIsMicInitialized(true);
      let step = 0;
      demoIntervalRef.current = window.setInterval(() => {
        step++;
        const targetList = guideNotes.length ? guideNotes : EXERCISE_PRESETS['scale'];
        const noteIndex = Math.floor(step / 12) % targetList.length;
        const targetNote = targetList[noteIndex];
        const baseFreq = midiToFreq(targetNote.midi);

        // Add subtle natural vibrato (±6 Hz)
        const vibratoMod = Math.sin(step * 0.45) * 5.2;
        setDemoFreq(baseFreq + vibratoMod);
      }, 100);
    }
  };

  useEffect(() => {
    return () => {
      if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
    };
  }, []);

  // Start Mic
  const initMic = async () => {
    const ok = await startAudio();
    if (ok) {
      setIsMicInitialized(true);
    }
  };

  // Recording controls
  const handleStartRecord = () => {
    if (!stream && !isDemoMode) {
      alert('Aktifkan mikrofon atau mode simulasi terlebih dahulu.');
      return;
    }
    setEvaluationReport(null);
    setUserMidiBlocks([]);
    pitchHistoryRef.current = [];
    resonanceHistoryRef.current = [];
    rmsHistoryRef.current = [];
    activeBlockRef.current = null;

    if (stream) {
      startVoiceRecording(stream);
    }
  };

  const handleStopRecord = async () => {
    if (activeBlockRef.current) {
      setUserMidiBlocks((prev) => [...prev, { ...activeBlockRef.current! }]);
      activeBlockRef.current = null;
    }
    await stopVoiceRecording();
  };

  // Auto stop if exceeding tier limit
  useEffect(() => {
    if (isRecording && recordedDuration >= maxRecordingDuration) {
      handleStopRecord();
    }
  }, [isRecording, recordedDuration, maxRecordingDuration]);

  // Scoring Analysis
  const analyzeVoice = () => {
    const valid = pitchHistoryRef.current.filter((p) => p.freq > 0);
    if (valid.length < 5) {
      alert('Rekaman vokal tidak cukup panjang untuk dievaluasi. Lakukan rekaman minimal 3 detik.');
      return;
    }

    const freqs = valid.map((p) => p.freq);
    const sorted = [...freqs].sort((a, b) => a - b);
    const medianF0 = sorted[Math.floor(sorted.length / 2)];
    const robustLow = sorted[Math.floor(sorted.length * 0.1)];
    const robustHigh = sorted[Math.floor(sorted.length * 0.9)];
    const voicedPct = Math.round((valid.length / (pitchHistoryRef.current.length || 1)) * 100);

    const cents = valid.map((p) => p.cents || 0);
    const inTuneCount = cents.filter((c) => Math.abs(c) <= 20).length;
    const flatCount = cents.filter((c) => c < -20).length;
    const sharpCount = cents.filter((c) => c > 20).length;
    const pitchAccuracy = Math.round((inTuneCount / (cents.length || 1)) * 100);

    const avgRes = resonanceHistoryRef.current.length
      ? {
          chest: Math.round(
            resonanceHistoryRef.current.reduce((s, r) => s + r.chest, 0) / resonanceHistoryRef.current.length
          ),
          mask: Math.round(
            resonanceHistoryRef.current.reduce((s, r) => s + r.mask, 0) / resonanceHistoryRef.current.length
          ),
          head: Math.round(
            resonanceHistoryRef.current.reduce((s, r) => s + r.head, 0) / resonanceHistoryRef.current.length
          ),
        }
      : { chest: 33, mask: 33, head: 33 };

    const vibrato = estimateVibrato(valid.slice(-60).map((p) => p.freq));
    const validRms = rmsHistoryRef.current.filter((r) => isFinite(r));
    const avgRms = validRms.length ? validRms.reduce((a, b) => a + b, 0) / validRms.length : -40;
    const rmsStd =
      validRms.length > 1
        ? Math.sqrt(validRms.reduce((s, r) => s + Math.pow(r - avgRms, 2), 0) / validRms.length)
        : 10;
    const breathScore = Math.max(0, Math.min(100, Math.round(100 - rmsStd * 4.5)));

    const totalScore = Math.round(
      pitchAccuracy * 0.35 +
        Math.min(voicedPct, 100) * 0.15 +
        breathScore * 0.2 +
        (vibrato.hasVibrato ? 85 : 50) * 0.15 +
        Math.min(avgRes.mask, 60) * 0.15
    );

    const report: EvaluationReport = {
      score: totalScore,
      pitchAccuracy,
      voicedPct,
      breathScore,
      vibrato,
      avgRes,
      medianF0,
      robustLow,
      robustHigh,
      inTuneCount,
      flatCount,
      sharpCount,
      totalFrames: cents.length,
      duration: pitchHistoryRef.current.at(-1)?.t || recordedDuration,
      samples: valid,
    };

    setEvaluationReport(report);
  };

  // Reset Studio
  const resetStudio = () => {
    setEvaluationReport(null);
    setUserMidiBlocks([]);
    pitchHistoryRef.current = [];
    resonanceHistoryRef.current = [];
    rmsHistoryRef.current = [];
    resetRecording();
  };

  // Custom song import handlers
  const handleSingleSongUpload = async (file: File) => {
    setImportedSongName(file.name);
    setImportProgress(10);
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();
      const arrayBuf = await file.arrayBuffer();
      const decoded = await ctx.decodeAudioData(arrayBuf);
      setImportProgress(40);

      const { extractedNotes } = await extractNotesFromAudioBuffer(decoded, (pct) => {
        setImportProgress(40 + Math.round(pct * 0.5));
      });

      setGuideNotes(extractedNotes);
      setExerciseKey('custom');
      setImportProgress(null);
      ctx.close().catch(() => {});
    } catch (err) {
      console.error(err);
      alert('Gagal mengekstrak lagu. Format tidak didukung.');
      setImportProgress(null);
    }
  };

  // Telemetry computation for sidebar
  const validPitch = pitchHistoryRef.current.filter((p) => p.freq > 0);
  const sortedPitch = [...validPitch.map((p) => p.freq)].sort((a, b) => a - b);
  const medFreq = sortedPitch.length ? sortedPitch[Math.floor(sortedPitch.length / 2)] : 0;
  const lowFreq = sortedPitch.length ? sortedPitch[0] : 0;
  const highFreq = sortedPitch.length ? sortedPitch[sortedPitch.length - 1] : 0;
  const medN = freqToNote(medFreq);
  const lowN = freqToNote(lowFreq);
  const highN = freqToNote(highFreq);

  const telemetryData = {
    medianNote: medN ? `${medN.note}${medN.octave} (${medFreq.toFixed(1)} Hz)` : '—',
    lowNote: lowN ? `${lowN.note}${lowN.octave} (${lowFreq.toFixed(1)} Hz)` : '—',
    highNote: highN ? `${highN.note}${highN.octave} (${highFreq.toFixed(1)} Hz)` : '—',
    voicedPct: pitchHistoryRef.current.length
      ? Math.round((validPitch.length / pitchHistoryRef.current.length) * 100)
      : 0,
  };

  // Time format MM:SS
  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="page">
      <div className="studio-container">
        {/* Studio Header */}
        <div className="d-flex justify-between align-center flex-wrap gap-1" style={{ padding: '1.5rem 0 1rem', borderBottom: '1px solid var(--border)', marginBottom: '1.25rem' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Studio Bernyanyi &amp; Cek Nada</h1>
            <p className="text-muted text-sm">
              Latihan vokal interaktif berbasis DAW Piano Roll dengan deteksi ketepatan nada real-time dan evaluasi vokal komprehensif.
            </p>
          </div>
          <div className="d-flex align-center gap-1">
            <span className={`badge ${user?.tier === 'premium' ? 'badge-purple' : user?.tier === 'pro' ? 'badge-blue' : 'badge-green'}`}>
              PAKET: {user?.tier ? user.tier.toUpperCase() : 'FREE'}
            </span>
          </div>
        </div>

        {error && <div className="alert alert-error mb-3">{error}</div>}

        {/* Microphone prompt if not active */}
        {!isMicInitialized && (
          <div className="card text-center mb-3" style={{ padding: '3rem 1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Aktifkan Mikrofon Anda
            </h2>
            <p className="text-muted text-sm" style={{ maxWidth: '480px', margin: '0 auto 1.5rem' }}>
              Pemrosesan suara berlangsung 100% aman di peramban Anda. Tidak ada rekaman suara yang dikirimkan ke server eksternal.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={initMic} className="btn btn-primary btn-lg">
                <Mic size={16} />
                <span>Izinkan Mikrofon &amp; Mulai</span>
              </button>
              <button onClick={() => setIsMicInitialized(true)} className="btn btn-outline btn-lg">
                <span>Gunakan Mode Latihan Mandiri</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Studio Workspace */}
        {isMicInitialized && (
          <div>
            {/* Toolbar: Exercises, Transposition, Audio Guides, Import */}
            <div className="card mb-2" style={{ padding: '0.75rem 1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                {/* Left side selectors */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span className="text-xs font-bold text-muted">Latihan:</span>
                    <select
                      value={exerciseKey}
                      onChange={(e) => handleExerciseChange(e.target.value, keyTranspose)}
                      className="form-control"
                      style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.8rem', height: '32px' }}
                    >
                      <option value="scale">Tangga Nada Solmisasi (Do-Re-Mi)</option>
                      <option value="arpeggio">Lompatan Nada Akor (Arpeggio)</option>
                      <option value="twinkle">Melodi Bintang Kecil (Twinkle)</option>
                      <option value="custom">Lagu Pengiring Mandiri</option>
                      <option value="free">Bebas Tanpa Panduan Balok</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span className="text-xs font-bold text-muted">Kunci:</span>
                    <select
                      value={keyTranspose}
                      onChange={(e) => handleExerciseChange(exerciseKey, Number(e.target.value))}
                      className="form-control"
                      style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.8rem', height: '32px' }}
                    >
                      <option value="-12">Rendah, C3 (Suara Pria)</option>
                      <option value="0">Standar, C4 (Rentang Menengah)</option>
                      <option value="12">Tinggi, C5 (Suara Wanita)</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setIsImportModalOpen(true)}
                    className="btn btn-sm btn-outline"
                    title="Import lagu vokal atau instrumen"
                  >
                    <Upload size={13} />
                    <span>Import Lagu</span>
                  </button>

                  {importedSongName && (
                    <span className="text-xs font-bold text-muted font-mono" style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      🎵 {importedSongName}
                    </span>
                  )}

                  {importProgress !== null && (
                    <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                      Menganalisis Audio: {importProgress}%
                    </span>
                  )}
                </div>

                {/* Right side actions: Synth guide & Demo simulator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      if (isPlayingMelody) stopMelody();
                      else playMelody(guideNotes);
                    }}
                    className="btn btn-sm btn-outline"
                    title="Dengarkan melodi panduan piano synthesizer"
                  >
                    <Music size={13} />
                    <span>{isPlayingMelody ? 'Hentikan Piano' : 'Putar Panduan Piano'}</span>
                  </button>

                  <button
                    onClick={toggleDemoMode}
                    className={`btn btn-sm ${isDemoMode ? 'btn-primary' : 'btn-outline'}`}
                    title="Simulasi deteksi vokal untuk demonstrasi visual tanpa mic"
                  >
                    <Sparkles size={13} />
                    <span>{isDemoMode ? 'Hentikan Simulasi' : 'Simulasi Vokal'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2-Column DAW Workspace */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 290px', gap: '1.25rem', alignItems: 'start' }}>
              {/* Left Column: Audio Spectrum, Piano Roll & Waveform */}
              <div>
                {/* 1. Real-time Sound Spectrum */}
                <SpectrumCanvas
                  fftData={fftData}
                  sampleRate={audioCtx?.sampleRate || 44100}
                  fundamentalFreq={effectiveFreq}
                  currentNote={effectiveNote}
                  height={95}
                />

                {/* 2. Piano Roll Deck Panel */}
                <div className="canvas-panel">
                  {/* Toolbar Kontrol Rekam & Pemutaran */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.65rem',
                      marginBottom: '0.75rem',
                      padding: '0.75rem 0.85rem',
                      background: 'var(--bg3)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {/* Top row: Record controls & RMS meter */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.65rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <div className="status-badge">
                          <div
                            style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: isRecording ? 'var(--red)' : '#94a3b8',
                              boxShadow: isRecording ? '0 0 8px rgba(239, 68, 68, 0.8)' : 'none',
                            }}
                          />
                          <span style={{ fontSize: '0.72rem', fontWeight: 700 }}>
                            {isRecording ? 'RECORDING' : 'IDLE'}
                          </span>
                        </div>

                        {!isRecording ? (
                          <button onClick={handleStartRecord} className="btn btn-sm btn-danger">
                            <Radio size={12} />
                            <span>Mulai Rekam</span>
                          </button>
                        ) : (
                          <button onClick={handleStopRecord} className="btn btn-sm btn-outline">
                            <Square size={12} />
                            <span>Berhenti</span>
                          </button>
                        )}

                        <div className="timer-display font-mono" style={{ fontSize: '1.1rem', fontWeight: 700, minWidth: '50px' }}>
                          {formatTimer(recordedDuration)}
                        </div>
                        <span className="text-xs text-muted">Batas {maxRecordingDuration}s</span>
                      </div>

                      {/* Microphone Level Meter */}
                      <div style={{ flex: 1, maxWidth: '170px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div className="d-flex justify-between text-xs text-muted" style={{ fontSize: '0.68rem' }}>
                          <span>Level Suara</span>
                          <span className="font-mono">{isFinite(rmsDb) ? `${rmsDb.toFixed(0)} dB` : '-inf'}</span>
                        </div>
                        <div style={{ height: '6px', background: 'var(--bg2)', borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                          <div
                            style={{
                              height: '100%',
                              width: `${Math.max(0, Math.min(100, (rmsDb + 60) * 1.8))}%`,
                              background: 'var(--text)',
                              transition: 'width 0.08s ease-out',
                            }}
                          />
                        </div>
                      </div>

                      {/* Evaluation Trigger Button */}
                      <div>
                        <button
                          onClick={analyzeVoice}
                          disabled={isRecording || pitchHistoryRef.current.length < 5}
                          className="btn btn-sm btn-primary"
                        >
                          <FileText size={13} />
                          <span>Lihat Nilai Vokal</span>
                        </button>
                      </div>
                    </div>

                    {/* Bottom row: Playback & Navigation */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.65rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <button
                          onClick={togglePlayback}
                          disabled={!waveformPeaks.length}
                          className="btn btn-sm btn-outline"
                          title="Putar atau jeda audio vokal yang direkam"
                        >
                          {isAudioPlaying ? <Pause size={12} /> : <Play size={12} />}
                          <span>{isAudioPlaying ? 'Jeda Audio' : 'Putar Audio'}</span>
                        </button>

                        <button
                          onClick={() => setIsRollPaused(!isRollPaused)}
                          className="btn btn-sm btn-outline"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.72rem' }}
                        >
                          <span>{isRollPaused ? 'Lanjutkan Kanvas' : 'Jeda Kanvas'}</span>
                        </button>

                        <button
                          onClick={() => setScrollOffset((s) => s - 2)}
                          className="btn btn-sm btn-outline"
                          style={{ padding: '0.25rem 0.45rem', fontSize: '0.72rem' }}
                        >
                          -2s
                        </button>
                        <button
                          onClick={() => setScrollOffset((s) => s + 2)}
                          className="btn btn-sm btn-outline"
                          style={{ padding: '0.25rem 0.45rem', fontSize: '0.72rem' }}
                        >
                          +2s
                        </button>
                        <button
                          onClick={() => setScrollOffset(0)}
                          className="btn btn-sm btn-outline"
                          style={{ padding: '0.25rem 0.45rem', fontSize: '0.72rem' }}
                        >
                          Live
                        </button>
                      </div>

                      {/* Zoom Toggles */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginLeft: 'auto' }}>
                        <span className="text-xs text-muted font-bold">ZOOM:</span>
                        <button
                          onClick={() => setZoomMode('focus')}
                          className={`btn btn-xs ${zoomMode === 'focus' ? 'btn-primary' : 'btn-outline'}`}
                          style={{ padding: '2px 6px', fontSize: '0.7rem' }}
                        >
                          C3-C5
                        </button>
                        <button
                          onClick={() => setZoomMode('full')}
                          className={`btn btn-xs ${zoomMode === 'full' ? 'btn-primary' : 'btn-outline'}`}
                          style={{ padding: '2px 6px', fontSize: '0.7rem' }}
                        >
                          C2-C6
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Target Hint */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', fontSize: '0.72rem', color: 'var(--text2)' }}>
                    <div>
                      <span>Target:</span> <strong style={{ color: 'var(--text)' }}>Tangga Nada Adaptif</strong>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text3)' }}>
                      Tip: Klik titik mana saja pada bidang piano untuk melompat ke detik tersebut
                    </div>
                  </div>

                  {/* Piano Roll Canvas */}
                  <PianoRollCanvas
                    currentT={currentSessionTime}
                    currentFreq={effectiveFreq}
                    currentNote={effectiveNote}
                    guideNotes={guideNotes}
                    userMidiBlocks={userMidiBlocks}
                    zoomMode={zoomMode}
                    isPaused={isRollPaused}
                    userScrollOffset={scrollOffset}
                    onSeekTime={(t) => {
                      seekPlayback(t);
                    }}
                    height={560}
                  />

                  {/* Vocal Waveform Track */}
                  <WaveformCanvas
                    peaks={waveformPeaks}
                    playbackTime={playbackTime}
                    totalDuration={recordedDuration}
                    onSeek={seekPlayback}
                    height={68}
                  />
                </div>
              </div>

              {/* Right Column: Telemetry & Live Resonance Metrics */}
              <TelemetrySidebar
                currentNote={effectiveNote}
                currentFreq={effectiveFreq}
                telemetry={telemetryData}
                resonance={resonance}
              />
            </div>

            {/* 5-Dimensional Singing Report Section */}
            {evaluationReport && (
              <SingingReport report={evaluationReport} onReset={resetStudio} />
            )}

            {/* Modal Import Lagu */}
            <ImportSongModal
              isOpen={isImportModalOpen}
              onClose={() => setIsImportModalOpen(false)}
              onSelectSingleFile={handleSingleSongUpload}
              onSelectSeparateTracks={(vocalFile) => handleSingleSongUpload(vocalFile)}
              onSelectBackingTrack={(f) => {
                setImportedSongName(f.name);
                setExerciseKey('free');
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
