import React, { useRef, useEffect } from 'react';
import { EvaluationReport } from '../../types';
import { freqToNote } from '../../utils/pitch';
import { Printer, RefreshCw, Award, CheckCircle2, TrendingUp, Music } from 'lucide-react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface SingingReportProps {
  report: EvaluationReport;
  onReset: () => void;
}

export const SingingReport: React.FC<SingingReportProps> = ({ report, onReset }) => {
  const radarCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  const getGradeInfo = (score: number) => {
    if (score >= 85) {
      return {
        grade: 'Predikat A: Sangat Baik',
        cls: 'text-green',
        desc: 'Ketepatan nada dan kontrol vokal stabil, harmonis, serta resonansi seimbang.',
      };
    }
    if (score >= 70) {
      return {
        grade: 'Predikat B: Baik',
        cls: 'text-green',
        desc: 'Penguasaan melodi sudah baik, pertahankan konsistensi intonasi pada nada tinggi.',
      };
    }
    if (score >= 55) {
      return {
        grade: 'Predikat C: Cukup',
        cls: 'text-yellow',
        desc: 'Ada deviasi nada yang perlu dilatih ulang dengan tangga nada solmisasi.',
      };
    }
    return {
      grade: 'Predikat D: Perlu Latihan',
      cls: 'text-red',
      desc: 'Fokus latihan pada kestabilan penahanan nada dasar dan dukungan napas diafragma.',
    };
  };

  const gradeInfo = getGradeInfo(report.score);

  // Recommendations generator
  const getRecommendations = () => {
    const recs: string[] = [];
    if (report.pitchAccuracy < 70) {
      recs.push(
        'Latihan Ketepatan Nada: Gunakan menu Tuner untuk melatih tangga nada Do-Re-Mi hingga deviasi stabil di bawah ±15 sen.'
      );
    }
    if (report.flatCount > report.sharpCount * 1.5) {
      recs.push(
        'Dukungan Napas dan Nada Rendah: Sebagian nada berada di bawah target (flat). Tingkatkan tekanan napas diafragma saat menahan nada panjang.'
      );
    } else if (report.sharpCount > report.flatCount * 1.5) {
      recs.push(
        'Relaksasi Leher dan Nada Tinggi: Hindari tekanan berlebih pada laring saat nada tinggi serta lemaskan otot rahang bawah.'
      );
    }
    if (report.avgRes.mask < 25) {
      recs.push(
        'Resonansi Rongga Wajah (Mask): Latih dengungan suara sengau (humming) untuk memperkuat fokus proyeksi suara di rongga wajah.'
      );
    }
    if (recs.length === 0) {
      recs.push(
        'Konsistensi Vokal Sangat Baik: Kontrol intonasi dan resonansi sudah sangat stabil. Tingkatkan ke repertoar dengan jangkauan vokal lebih luas.'
      );
    }
    return recs;
  };

  const recommendations = getRecommendations();

  // Radar chart setup
  useEffect(() => {
    const canvas = radarCanvasRef.current;
    if (!canvas) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    const labels = ['Akurasi Nada', 'Kestabilan Suara', 'Kontrol Napas', 'Getaran Vibrato', 'Resonansi Mask'];
    const values = [
      report.pitchAccuracy,
      Math.min(report.voicedPct, 100),
      report.breathScore,
      report.vibrato.hasVibrato ? 85 : 45,
      Math.min(report.avgRes.mask, 100),
    ];

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'radar',
      data: {
        labels,
        datasets: [
          {
            label: 'Skor Sesi',
            data: values,
            fill: true,
            backgroundColor: 'rgba(99, 102, 241, 0.20)',
            borderColor: '#6366f1',
            borderWidth: 2,
            pointBackgroundColor: '#4f46e5',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(226, 232, 240, 0.9)' },
            angleLines: { color: 'rgba(226, 232, 240, 0.9)' },
            ticks: { display: false, stepSize: 25 },
            pointLabels: {
              color: '#334155',
              font: { size: 10, weight: 'bold', family: 'Plus Jakarta Sans' },
              padding: 6,
            },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.raw}%`,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [report]);

  const medInfo = freqToNote(report.medianF0);
  const lowInfo = freqToNote(report.robustLow);
  const highInfo = freqToNote(report.robustHigh);

  return (
    <div id="reportSection" style={{ marginTop: '2.5rem', borderTop: '2px solid var(--accent)', paddingTop: '1.75rem' }}>
      {/* Print only header */}
      <div className="print-header">
        <h1 style={{ fontSize: '18pt', fontWeight: 800, textTransform: 'uppercase' }}>
          VocalSense AI — Evaluasi Bernyanyi
        </h1>
        <p style={{ fontSize: '9pt', color: '#555' }}>
          Tanggal: {new Date().toLocaleString('id-ID')} | Durasi: {report.duration.toFixed(1)}s | Skor: {report.score}/100
        </p>
      </div>

      {/* Action Header */}
      <div
        className="d-flex justify-between align-center flex-wrap gap-1 mb-3"
        style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem' }}
      >
        <div>
          <span className="badge badge-green mb-1" style={{ fontSize: '0.72rem' }}>
            <CheckCircle2 size={11} />
            <span>ANALISIS SELESAI</span>
          </span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.3px', margin: '0.25rem 0' }}>
            Ringkasan Hasil Evaluasi Latihan
          </h2>
          <p className="text-sm text-muted">
            Evaluasi objektif ketepatan nada, respirasi napas, dan distribusi resonansi vokal Anda.
          </p>
        </div>

        <div className="d-flex gap-1 print-hide" style={{ flexWrap: 'wrap' }}>
          <button onClick={() => window.print()} className="btn btn-outline">
            <Printer size={14} />
            <span>Cetak / Simpan PDF</span>
          </button>
          <button onClick={onReset} className="btn btn-primary">
            <RefreshCw size={14} />
            <span>Mulai Sesi Baru</span>
          </button>
        </div>
      </div>

      {/* Hero Summary Banner */}
      <div className="card mb-3" style={{ background: 'var(--bg2)', padding: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '78px',
                height: '78px',
                borderRadius: '50%',
                background: 'var(--bg)',
                border: '2.5px solid var(--accent)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1, fontFamily: 'var(--font-mono)' }}>
                {report.score}
              </span>
              <span style={{ fontSize: '0.62rem', color: 'var(--text3)', fontWeight: 700 }}>/ 100</span>
            </div>
            <div>
              <div className={`score-status ${gradeInfo.cls}`} style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                {gradeInfo.grade}
              </div>
              <p className="text-xs text-muted" style={{ margin: '0.2rem 0 0', lineHeight: 1.4 }}>
                {gradeInfo.desc}
              </p>
            </div>
          </div>

          {/* 3 Quick KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
            <div style={{ background: 'var(--bg)', padding: '0.75rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div className="text-xs text-muted font-bold" style={{ fontSize: '0.68rem' }}>
                AKURASI NADA
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--green)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                {report.pitchAccuracy}%
              </div>
            </div>
            <div style={{ background: 'var(--bg)', padding: '0.75rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div className="text-xs text-muted font-bold" style={{ fontSize: '0.68rem' }}>
                KESTABILAN
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                {report.breathScore}%
              </div>
            </div>
            <div style={{ background: 'var(--bg)', padding: '0.75rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', textAlign: 'center' }}>
              <div className="text-xs text-muted font-bold" style={{ fontSize: '0.68rem' }}>
                DURASI
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                {report.duration.toFixed(1)}s
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Detail Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {/* Radar Dimensions */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <div className="card-title" style={{ margin: 0 }}>
                5 DIMENSI VOKAL
              </div>
              <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
                SKALA 0–100
              </span>
            </div>
            <p className="text-xs text-muted">Pemetaan keseimbangan kontrol pitch, napas, dan resonansi.</p>
          </div>

          <div style={{ width: '100%', maxWidth: '280px', margin: '0.75rem auto 0.25rem', aspectRatio: '1/1' }}>
            <canvas ref={radarCanvasRef} />
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.35rem 0.75rem', fontSize: '0.72rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Akurasi Nada:</span>
                <b className="font-mono">{report.pitchAccuracy}%</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Kestabilan Suara:</span>
                <b className="font-mono">{report.voicedPct}%</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Kontrol Napas:</span>
                <b className="font-mono">{report.breathScore}%</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Getaran Vibrato:</span>
                <b className="font-mono">{report.vibrato.hasVibrato ? 85 : 45}%</b>
              </div>
            </div>
          </div>
        </div>

        {/* Full Metrics Table */}
        <div className="card">
          <div className="card-title mb-2">PARAMETER AKUSTIK</div>
          <table className="table-metrics">
            <tbody>
              <tr>
                <td>Durasi Bernyanyi Efektif</td>
                <td>{report.duration.toFixed(1)} detik</td>
              </tr>
              <tr>
                <td>Frekuensi Nada Rata-rata</td>
                <td>
                  {report.medianF0.toFixed(1)} Hz {medInfo ? `(${medInfo.note}${medInfo.octave})` : ''}
                </td>
              </tr>
              <tr>
                <td>Batas Nada Terendah</td>
                <td>
                  {report.robustLow.toFixed(1)} Hz {lowInfo ? `(${lowInfo.note}${lowInfo.octave})` : ''}
                </td>
              </tr>
              <tr>
                <td>Batas Nada Tertinggi</td>
                <td>
                  {report.robustHigh.toFixed(1)} Hz {highInfo ? `(${highInfo.note}${highInfo.octave})` : ''}
                </td>
              </tr>
              <tr>
                <td>Persentase Waktu Bersuara</td>
                <td>{report.voicedPct} %</td>
              </tr>
              <tr>
                <td>Tingkat Akurasi Nada Tepat</td>
                <td>{report.pitchAccuracy} %</td>
              </tr>
              <tr>
                <td>Jumlah Sampel Nada Tepat</td>
                <td>
                  {report.inTuneCount} dari {report.totalFrames} sampel
                </td>
              </tr>
              <tr>
                <td>Jumlah Sampel Fals Bawah</td>
                <td>{report.flatCount} sampel</td>
              </tr>
              <tr>
                <td>Jumlah Sampel Fals Atas</td>
                <td>{report.sharpCount} sampel</td>
              </tr>
              <tr>
                <td>Kestabilan Dinamika Napas</td>
                <td>{report.breathScore} %</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Resonance & Vibrato */}
        <div className="card">
          <div className="card-title mb-2">RESONANSI &amp; VIBRATO</div>
          <div className="text-xs text-muted mb-2">Distribusi rongga resonansi suara:</div>

          <div className="resonance-bar">
            <span className="resonance-label">Suara Dada</span>
            <div className="resonance-track">
              <div className="resonance-fill chest" style={{ width: `${report.avgRes.chest}%` }} />
            </div>
            <span className="resonance-val">{report.avgRes.chest}%</span>
          </div>
          <div className="resonance-bar">
            <span className="resonance-label">Suara Campuran</span>
            <div className="resonance-track">
              <div className="resonance-fill mask" style={{ width: `${report.avgRes.mask}%` }} />
            </div>
            <span className="resonance-val">{report.avgRes.mask}%</span>
          </div>
          <div className="resonance-bar">
            <span className="resonance-label">Suara Kepala</span>
            <div className="resonance-track">
              <div className="resonance-fill head" style={{ width: `${report.avgRes.head}%` }} />
            </div>
            <span className="resonance-val">{report.avgRes.head}%</span>
          </div>

          <div className="card-title mb-1 mt-3" style={{ fontSize: '0.75rem' }}>
            MODULASI VIBRATO
          </div>
          <div className="text-xs text-muted" style={{ lineHeight: 1.5 }}>
            {report.vibrato.hasVibrato ? (
              <span>
                Getaran vokal alami terdeteksi stabil. Kecepatan modulasi nada: <b>{report.vibrato.rate} Hz</b> dengan kedalaman getaran: <b>{report.vibrato.depth} sen</b>.
              </span>
            ) : (
              <span>
                Tidak ada getaran vibrato dominan yang terdeteksi karena karakter nada lurus (straight tone) atau durasi penahanan nada singkat.
              </span>
            )}
          </div>
        </div>

        {/* Registered Note Chips */}
        <div className="card">
          <div className="card-title mb-2">SAMPEL NADA TERDETEKSI</div>
          <p className="text-xs text-muted mb-2">Riwayat nada yang dinyanyikan selama sesi rekaman:</p>
          <div className="chips-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '180px', overflowY: 'auto' }}>
            {report.samples.slice(0, 36).map((s, idx) => {
              const info = freqToNote(s.freq);
              if (!info) return null;
              const centsRound = Math.round(info.cents);
              const cls = Math.abs(centsRound) <= 20 ? 'in-tune' : centsRound < -20 ? 'flat' : 'sharp';
              const tag = Math.abs(centsRound) <= 20 ? 'Pas' : centsRound < -20 ? 'Fals -' : 'Fals +';
              return (
                <div key={idx} className={`metric-chip ${cls}`}>
                  {info.note}
                  {info.octave} • {centsRound >= 0 ? `+${centsRound}` : centsRound} sen • {tag}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Actionable Recommendations */}
      <div className="card mb-3">
        <div className="card-title mb-2" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <TrendingUp size={15} />
          <span>REKOMENDASI LATIHAN KHUSUS</span>
        </div>
        <div>
          {recommendations.map((rec, i) => (
            <div
              key={i}
              style={{
                padding: '0.65rem 0.85rem',
                marginBottom: '0.4rem',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.82rem',
                lineHeight: 1.5,
              }}
            >
              {rec}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
