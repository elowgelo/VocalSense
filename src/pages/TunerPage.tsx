import React, { useState, useRef, useCallback } from 'react';
import { useAudioContext } from '../hooks/useAudioContext';
import { usePitchDetection } from '../hooks/usePitchDetection';
import { ArcGauge } from '../components/tuner/ArcGauge';
import { NeedleMeter } from '../components/tuner/NeedleMeter';
import { PitchHistoryCanvas } from '../components/tuner/PitchHistoryCanvas';
import { Mic, MicOff, Settings2, Sliders } from 'lucide-react';

export const TunerPage: React.FC = () => {
  const [refPitch, setRefPitch] = useState<number>(440);
  const [noiseGate, setNoiseGate] = useState<number>(10);
  const historyBufRef = useRef<number[]>(new Array(100).fill(0));
  const [historyRender, setHistoryRender] = useState<number[]>([]);

  const { audioCtx, analyser, isActive, error, startAudio, stopAudio } = useAudioContext(2048);

  const handleTick = useCallback(({ freq }: { freq: number }) => {
    historyBufRef.current.shift();
    historyBufRef.current.push(freq > 0 ? freq : 0);
    // Trigger render throttled
    setHistoryRender([...historyBufRef.current]);
  }, []);

  const { currentNote, currentFreq } = usePitchDetection({
    audioCtx,
    analyser,
    refFreq: refPitch,
    noiseGate,
    enabled: isActive,
    onTick: handleTick,
  });

  const handleStart = async () => {
    historyBufRef.current = new Array(100).fill(0);
    setHistoryRender(new Array(100).fill(0));
    await startAudio();
  };

  const handleStop = () => {
    stopAudio();
    historyBufRef.current = new Array(100).fill(0);
    setHistoryRender(new Array(100).fill(0));
  };

  // Determine deviation status
  const cents = currentNote ? currentNote.cents : 0;
  let color = 'var(--text3)';
  let statusText = 'Menunggu suara...';
  let statusClass = 'text-muted';

  if (currentNote && currentFreq > 0) {
    if (cents < -20) {
      color = 'var(--red)';
      statusText = 'Terlalu rendah (Fals Bawah)';
      statusClass = 'text-red font-bold';
    } else if (cents > 20) {
      color = 'var(--yellow)';
      statusText = 'Terlalu tinggi (Fals Atas)';
      statusClass = 'text-yellow font-bold';
    } else {
      color = 'var(--green)';
      statusText = 'Intonasi tepat ✓';
      statusClass = 'text-green font-bold';
    }
  }

  return (
    <div className="page">
      <div className="container">
        {/* Page Header */}
        <div style={{ padding: '2.5rem 0 1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800 }}>Tuner Nada Kromatik</h1>
          <p className="text-muted" style={{ marginTop: '0.4rem', maxWidth: '560px', margin: '0.4rem auto 0' }}>
            Pemeriksaan pitch vokal real-time dengan deviasi sen presisi tinggi untuk menjaga ketepatan intonasi.
          </p>
        </div>

        {error && (
          <div className="alert alert-error mb-3" style={{ maxWidth: '480px', margin: '0 auto 1.5rem' }}>
            {error}
          </div>
        )}

        <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {!isActive ? (
            <div className="card text-center" style={{ padding: '3.5rem 1.5rem' }}>
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
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Mulai Uji Nada Anda
              </h2>
              <p className="text-muted text-sm" style={{ marginBottom: '1.5rem', maxWidth: '340px', margin: '0 auto 1.5rem' }}>
                Izinkan akses mikrofon untuk mendeteksi frekuensi dan ketepatan nada secara in-browser.
              </p>
              <button onClick={handleStart} className="btn btn-primary btn-lg">
                <Mic size={16} />
                <span>Aktifkan Tuner</span>
              </button>
            </div>
          ) : (
            <div className="card" style={{ padding: '2rem' }}>
              {/* Arc Gauge */}
              <ArcGauge noteInfo={currentNote} cents={cents} color={color} />

              {/* Cents Value */}
              <div
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  color: currentNote ? color : 'var(--text3)',
                  transition: 'color 0.15s ease',
                  lineHeight: 1,
                  marginBottom: '0.25rem',
                }}
              >
                {currentNote ? `${cents >= 0 ? '+' : ''}${cents} sen` : '± 0 sen'}
              </div>

              {/* Status Message */}
              <div className={`text-center text-sm ${statusClass}`} style={{ marginBottom: '1.5rem' }}>
                {statusText}
              </div>

              {/* Linear Needle Meter */}
              <NeedleMeter cents={cents} color={color} isActive={!!currentNote} />

              {/* Controls Card */}
              <div
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.75rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase' }}>
                  <Settings2 size={13} />
                  <span>Pengaturan Sensitivitas &amp; Nada Referensi</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.85rem' }}>
                    <label style={{ color: 'var(--text2)' }}>Referensi Nada A4:</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="range"
                        min="420"
                        max="460"
                        value={refPitch}
                        onChange={(e) => setRefPitch(Number(e.target.value))}
                        style={{ width: '110px', accentColor: 'var(--text)' }}
                      />
                      <span className="font-mono text-xs font-bold" style={{ minWidth: '55px', textAlign: 'right' }}>
                        {refPitch} Hz
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.85rem' }}>
                    <label style={{ color: 'var(--text2)' }}>Ambang Batas Kebisingan:</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={noiseGate}
                        onChange={(e) => setNoiseGate(Number(e.target.value))}
                        style={{ width: '110px', accentColor: 'var(--text)' }}
                      />
                      <span className="font-mono text-xs font-bold" style={{ minWidth: '55px', textAlign: 'right' }}>
                        {noiseGate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pitch History Chart */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', fontSize: '0.75rem', color: 'var(--text2)', fontWeight: 600 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Sliders size={12} />
                    <span>Riwayat Nada Sepanjang 10 Detik</span>
                  </span>
                  <span className="font-mono text-xs">{currentFreq > 0 ? `${currentFreq.toFixed(1)} Hz` : '0 Hz'}</span>
                </div>
                <PitchHistoryCanvas history={historyRender} height={80} />
              </div>

              {/* Stop Tuner Button */}
              <div style={{ textAlign: 'center' }}>
                <button onClick={handleStop} className="btn btn-outline" style={{ minWidth: '160px' }}>
                  <MicOff size={14} />
                  <span>Hentikan Tuner</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
