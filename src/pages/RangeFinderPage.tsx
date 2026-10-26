import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAudioContext } from '../hooks/useAudioContext';
import { usePitchDetection } from '../hooks/usePitchDetection';
import { usePianoSynth } from '../hooks/usePianoSynth';
import { PianoRangeBar } from '../components/range-finder/PianoRangeBar';
import { VoiceTypeTable } from '../components/range-finder/VoiceTypeTable';
import { NoteInfo, VoiceTypeName } from '../types';
import { classifyVoiceType } from '../utils/pitch';
import { Mic, CheckCircle2, RotateCcw, ArrowRight, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RangeFinderPage: React.FC = () => {
  const [step, setStep] = useState<'idle' | 'testing' | 'result'>('idle');
  const [capturedLow, setCapturedLow] = useState<NoteInfo | null>(null);
  const [capturedHigh, setCapturedHigh] = useState<NoteInfo | null>(null);
  const [detectedVoiceType, setDetectedVoiceType] = useState<VoiceTypeName | null>(null);
  const [octaves, setOctaves] = useState<string>('0');

  const { audioCtx, analyser, isActive, error, startAudio, stopAudio } = useAudioContext(2048);
  const { currentNote, currentFreq } = usePitchDetection({
    audioCtx,
    analyser,
    enabled: isActive && step === 'testing',
  });
  const { playMidi } = usePianoSynth(audioCtx);

  const startFinder = async () => {
    setCapturedLow(null);
    setCapturedHigh(null);
    setDetectedVoiceType(null);
    const ok = await startAudio();
    if (ok) {
      setStep('testing');
    }
  };

  const captureNote = (type: 'low' | 'high') => {
    if (!currentNote || currentFreq <= 0) return;
    if (type === 'low') {
      setCapturedLow(currentNote);
    } else {
      setCapturedHigh(currentNote);
    }
  };

  const analyzeRange = () => {
    if (!capturedLow || !capturedHigh) return;
    stopAudio();

    let low = capturedLow;
    let high = capturedHigh;
    if (low.midiNote > high.midiNote) {
      [low, high] = [high, low];
      setCapturedLow(low);
      setCapturedHigh(high);
    }

    const oct = ((high.midiNote - low.midiNote) / 12).toFixed(1);
    const vType = classifyVoiceType(low.midiNote, high.midiNote);

    setOctaves(oct);
    setDetectedVoiceType(vType);
    setStep('result');

    // Confetti celebration
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const resetAll = () => {
    stopAudio();
    setCapturedLow(null);
    setCapturedHigh(null);
    setDetectedVoiceType(null);
    setStep('idle');
  };

  return (
    <div className="page">
      <div className="container">
        {/* Page Header */}
        <div style={{ padding: '2.5rem 0 1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Pengukuran Jangkauan Vokal</h1>
          <p className="text-muted" style={{ marginTop: '0.4rem', maxWidth: '560px', margin: '0.4rem auto 0' }}>
            Ukur nada terendah dan tertinggi yang dapat Anda capai secara nyaman untuk menentukan batas wilayah vokal yang aman.
          </p>
        </div>

        {error && (
          <div className="alert alert-error mb-3" style={{ maxWidth: '560px', margin: '0 auto 1.5rem' }}>
            {error}
          </div>
        )}

        {/* Step 1: Idle start button */}
        {step === 'idle' && (
          <div className="card text-center" style={{ padding: '3.5rem 1.5rem', maxWidth: '540px', margin: '0 auto' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--bg3)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}
            >
              <Mic size={28} className="text-muted" />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Mulai Tes Rentang Suara
            </h2>
            <p className="text-muted text-sm" style={{ marginBottom: '1.5rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
              Uji ini membutuhkan dua nada stabil: nada terendah dan nada tertinggi. Nyanyikan secara wajar tanpa memaksakan pita suara.
            </p>
            <button onClick={startFinder} className="btn btn-primary btn-lg">
              <Mic size={16} />
              <span>Mulai Pengukuran</span>
            </button>
          </div>
        )}

        {/* Step 2: Testing mode */}
        {step === 'testing' && (
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div className="alert alert-info mb-3">
              Nyanyikan nada serendah mungkin yang nyaman, tahan setidaknya 2 detik, lalu klik "Catat Nada Terendah". Lanjutkan ke nada tertinggi.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              {/* Lowest Note Card */}
              <div
                className={`card text-center ${capturedLow ? 'glow-border' : ''}`}
                style={{
                  position: 'relative',
                  borderWidth: capturedLow ? '2px' : '1px',
                  borderColor: capturedLow ? 'var(--green)' : 'var(--border)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-11px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.65rem',
                    border: '1px solid var(--border-dark)',
                    borderRadius: '2px',
                    background: '#ffffff',
                    color: 'var(--text)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Langkah 1
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                  Nada Terendah
                </h3>
                <p className="text-xs text-muted" style={{ marginBottom: '1rem' }}>
                  Nyanyikan "aaah" pada nada terendah yang nyaman dan tahan stabil
                </p>

                <div
                  style={{
                    fontSize: '3rem',
                    fontWeight: 800,
                    height: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text)',
                  }}
                >
                  {currentNote ? `${currentNote.note}${currentNote.octave}` : '—'}
                </div>
                <div className="text-xs text-muted font-mono" style={{ marginBottom: '1.25rem' }}>
                  {currentFreq > 0 ? `${currentFreq.toFixed(1)} Hz` : '— Hz'}
                </div>

                <button
                  onClick={() => captureNote('low')}
                  disabled={!currentNote}
                  className="btn btn-primary w-full"
                >
                  Catat Nada Terendah
                </button>

                {capturedLow && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <span className="badge badge-green" style={{ fontSize: '0.75rem', padding: '4px 8px' }}>
                      <CheckCircle2 size={12} />
                      <span>
                        Tercatat: {capturedLow.note}
                        {capturedLow.octave} ({capturedLow.freq.toFixed(1)} Hz)
                      </span>
                    </span>
                  </div>
                )}
              </div>

              {/* Highest Note Card */}
              <div
                className={`card text-center ${capturedHigh ? 'glow-border' : ''}`}
                style={{
                  position: 'relative',
                  borderWidth: capturedHigh ? '2px' : '1px',
                  borderColor: capturedHigh ? 'var(--green)' : 'var(--border)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-11px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.65rem',
                    border: '1px solid var(--border-dark)',
                    borderRadius: '2px',
                    background: '#ffffff',
                    color: 'var(--text)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Langkah 2
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.5rem', marginBottom: '0.25rem' }}>
                  Nada Tertinggi
                </h3>
                <p className="text-xs text-muted" style={{ marginBottom: '1rem' }}>
                  Nyanyikan "eeee" pada nada tertinggi yang nyaman tanpa memaksakan leher
                </p>

                <div
                  style={{
                    fontSize: '3rem',
                    fontWeight: 800,
                    height: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text)',
                  }}
                >
                  {currentNote ? `${currentNote.note}${currentNote.octave}` : '—'}
                </div>
                <div className="text-xs text-muted font-mono" style={{ marginBottom: '1.25rem' }}>
                  {currentFreq > 0 ? `${currentFreq.toFixed(1)} Hz` : '— Hz'}
                </div>

                <button
                  onClick={() => captureNote('high')}
                  disabled={!currentNote}
                  className="btn btn-primary w-full"
                >
                  Catat Nada Tertinggi
                </button>

                {capturedHigh && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <span className="badge badge-green" style={{ fontSize: '0.75rem', padding: '4px 8px' }}>
                      <CheckCircle2 size={12} />
                      <span>
                        Tercatat: {capturedHigh.note}
                        {capturedHigh.octave} ({capturedHigh.freq.toFixed(1)} Hz)
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Analysis triggers */}
            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={analyzeRange}
                disabled={!capturedLow || !capturedHigh}
                className="btn btn-success btn-lg"
              >
                Analisis Tipe Suara
              </button>
              <button onClick={resetAll} className="btn btn-outline btn-lg">
                <RotateCcw size={14} />
                <span>Ulangi Tes</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Result section */}
        {step === 'result' && capturedLow && capturedHigh && (
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <div className="card mb-4 text-center" style={{ padding: '2.5rem 1.5rem' }}>
              <span className="badge badge-green mb-1" style={{ fontSize: '0.72rem' }}>
                ANALISIS SELESAI
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Hasil Jangkauan Suara Anda
              </h2>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--bg3)',
                  border: '1.5px solid var(--text)',
                  borderRadius: '3px',
                  padding: '0.4rem 1.25rem',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: 'var(--text)',
                  margin: '0.5rem auto 1.5rem',
                }}
              >
                Tipe Vokal: {detectedVoiceType}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', margin: '1.5rem 0', flexWrap: 'wrap' }}>
                <div>
                  <div className="stat-value" style={{ fontSize: '2.5rem' }}>
                    {capturedLow.note}
                    {capturedLow.octave}
                  </div>
                  <div className="stat-label">Nada Terendah ({capturedLow.freq.toFixed(1)} Hz)</div>
                </div>
                <div style={{ color: 'var(--text3)', fontSize: '1.75rem', alignSelf: 'center' }}>
                  sampai
                </div>
                <div>
                  <div className="stat-value" style={{ fontSize: '2.5rem' }}>
                    {capturedHigh.note}
                    {capturedHigh.octave}
                  </div>
                  <div className="stat-label">Nada Tertinggi ({capturedHigh.freq.toFixed(1)} Hz)</div>
                </div>
              </div>

              <div className="stat-label" style={{ marginBottom: '1.5rem' }}>
                Rentang Jangkauan: <strong style={{ color: 'var(--text)' }}>{octaves} oktaf</strong>
              </div>

              {/* Piano Keyboard Range Bar */}
              <PianoRangeBar
                lowMidi={capturedLow.midiNote}
                highMidi={capturedHigh.midiNote}
                onKeyClick={(m) => playMidi(m, 0.6)}
              />
              <p className="text-xs text-muted" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Volume2 size={12} />
                <span>Klik salah satu tuts piano di atas untuk mendengarkan nada contoh</span>
              </p>
            </div>

            {/* Voice Type Comparison Table */}
            <VoiceTypeTable detectedVoiceType={detectedVoiceType} />

            {/* Actions */}
            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/studio" className="btn btn-primary btn-lg">
                <span>Buka Studio Latihan</span>
                <ArrowRight size={16} />
              </Link>
              <button onClick={resetAll} className="btn btn-outline btn-lg">
                <RotateCcw size={14} />
                <span>Ulangi Tes</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
