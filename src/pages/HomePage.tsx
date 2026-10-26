import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TierType } from '../types';
import { Mic, ArrowRight, Check, Activity, BarChart2, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { user, switchTier } = useAuth();
  const navigate = useNavigate();

  const handleSelectTier = (tier: TierType) => {
    if (!user) {
      navigate(`/register?tier=${tier}`);
    } else {
      switchTier(tier);
      alert(`Paket akun berhasil dialihkan ke ${tier.toUpperCase()}! Batas durasi rekam dan hak akses telah diperbarui.`);
    }
  };

  return (
    <div className="page">
      <div className="container">
        {/* Hero Section */}
        <section style={{ padding: '4.5rem 0 3rem', borderBottom: '1px solid var(--border)' }}>
          <p
            className="text-xs text-muted"
            style={{
              marginBottom: '0.6rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 700,
            }}
          >
            Prototipe Tugas Besar IPPL · React Edition
          </p>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '0.85rem' }}>
            Latihan Vokal dengan Deteksi Nada Langsung
          </h1>
          <p className="text-muted" style={{ maxWidth: '560px', marginBottom: '1.75rem', fontSize: '1rem', lineHeight: 1.6 }}>
            Periksa ketepatan intonasi vokal, petakan wilayah suara terendah hingga tertinggi, dan tinjau evaluasi bernyanyi secara langsung dari peramban web tanpa pengiriman audio eksternal.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <Link to="/studio" className="btn btn-primary btn-lg">
              <Mic size={16} />
              <span>Buka Studio Vokal</span>
            </Link>
            <Link to="/range-finder" className="btn btn-outline btn-lg">
              <span>Uji Rentang Nada</span>
            </Link>
            <Link to="/tuner" className="btn btn-outline btn-lg">
              <span>Buka Tuner Kromatik</span>
            </Link>
          </div>

          <div
            style={{
              display: 'flex',
              border: '1px solid var(--border)',
              maxWidth: '520px',
              background: '#ffffff',
            }}
          >
            <div style={{ flex: 1, padding: '1rem 1.25rem', borderRight: '1px solid var(--border)' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>7</div>
              <div className="hero-stat-label" style={{ fontSize: '0.7rem', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.3px', marginTop: '0.2rem' }}>
                Parameter Akustik
              </div>
            </div>
            <div style={{ flex: 1, padding: '1rem 1.25rem', borderRight: '1px solid var(--border)' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>In-Browser</div>
              <div className="hero-stat-label" style={{ fontSize: '0.7rem', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.3px', marginTop: '0.2rem' }}>
                Web Audio NSDF
              </div>
            </div>
            <div style={{ flex: 1, padding: '1rem 1.25rem' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>100% Aman</div>
              <div className="hero-stat-label" style={{ fontSize: '0.7rem', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.3px', marginTop: '0.2rem' }}>
                Pemrosesan Lokal
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{ padding: '3.5rem 0', borderBottom: '1px solid var(--border)' }}>
          <div className="text-xs font-bold text-muted" style={{ textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
            FITUR UTAMA
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Kemampuan Unggulan VocalSense AI
          </h2>
          <p className="text-muted text-sm" style={{ marginBottom: '2rem', maxWidth: '550px' }}>
            Teknologi pemrosesan sinyal vokal presisi tinggi yang berjalan langsung pada peramban web modern.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1px',
              background: 'var(--border)',
            }}
          >
            <div className="feature-card" style={{ background: 'var(--bg)', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text3)', marginBottom: '0.5rem' }}>
                01
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Grafik Alur Nada Piano Roll
              </div>
              <p className="text-muted text-sm" style={{ lineHeight: 1.5 }}>
                Visualisasi alur nada berjalan sepanjang 10 detik di atas bidang notasi balok piano untuk memantau stabilitas vokal secara langsung.
              </p>
            </div>

            <div className="feature-card" style={{ background: 'var(--bg)', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text3)', marginBottom: '0.5rem' }}>
                02
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Ketepatan Nada &amp; Deviasi Sen
              </div>
              <p className="text-muted text-sm" style={{ lineHeight: 1.5 }}>
                Menampilkan notasi vokal terdeteksi, mengukur jarak deviasi sen (-50 hingga +50 sen), serta menandai kondisi In-Tune, Flat, atau Sharp.
              </p>
            </div>

            <div className="feature-card" style={{ background: 'var(--bg)', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text3)', marginBottom: '0.5rem' }}>
                03
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Penentu Rentang Vokal
              </div>
              <p className="text-muted text-sm" style={{ lineHeight: 1.5 }}>
                Mengidentifikasi nada paling rendah dan paling tinggi yang dapat dijangkau, lalu menentukan klasifikasi tipe vokal otomatis.
              </p>
            </div>

            <div className="feature-card" style={{ background: 'var(--bg)', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text3)', marginBottom: '0.5rem' }}>
                04
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Keseimbangan Resonansi 3 Rongga
              </div>
              <p className="text-muted text-sm" style={{ lineHeight: 1.5 }}>
                Memetakan distribusi energi resonansi antara suara dada (Chest), suara campuran (Mask), dan suara kepala (Head) secara FFT real-time.
              </p>
            </div>

            <div className="feature-card" style={{ background: 'var(--bg)', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text3)', marginBottom: '0.5rem' }}>
                05
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Stabilitas Napas &amp; Deteksi Vibrato
              </div>
              <p className="text-muted text-sm" style={{ lineHeight: 1.5 }}>
                Menilai kecepatan ayunan nada saat vibrato (5–7 Hz) serta konsistensi penahanan nada panjang agar tidak goyang.
              </p>
            </div>

            <div className="feature-card" style={{ background: 'var(--bg)', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text3)', marginBottom: '0.5rem' }}>
                06 <span className="badge badge-purple" style={{ marginLeft: '0.4rem' }}>Paket Lanjutan</span>
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Rapor 5D &amp; Rekomendasi Adaptif
              </div>
              <p className="text-muted text-sm" style={{ lineHeight: 1.5 }}>
                Visualisasi radar chart performa bernyanyi, kartu skor terpadu 0–100, ekspor laporan cetak siap arsip, dan rekomendasi latihan adaptif.
              </p>
            </div>
          </div>

          {/* 7 Acoustic Parameters */}
          <div style={{ marginTop: '2.5rem' }}>
            <div className="text-xs font-bold text-muted mb-2" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              7 Parameter Analisis Intonasi
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1px',
                background: 'var(--border)',
              }}
            >
              <div style={{ background: 'var(--bg)', padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'var(--text2)' }}>
                <strong style={{ color: 'var(--text)' }}>Ketepatan Nada:</strong> Pengukuran selisih sen serta penanda nada fals
              </div>
              <div style={{ background: 'var(--bg)', padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'var(--text2)' }}>
                <strong style={{ color: 'var(--text)' }}>Statistik Sesi:</strong> Nada dasar rata-rata, durasi bersuara, dan batas nada aman
              </div>
              <div style={{ background: 'var(--bg)', padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'var(--text2)' }}>
                <strong style={{ color: 'var(--text)' }}>Keseimbangan Resonansi:</strong> Distribusi suara dada, campuran, dan kepala
              </div>
              <div style={{ background: 'var(--bg)', padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'var(--text2)' }}>
                <strong style={{ color: 'var(--text)' }}>Rentang Vokal:</strong> Nada terendah, nada tertinggi, dan tipe vokal
              </div>
              <div style={{ background: 'var(--bg)', padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'var(--text2)' }}>
                <strong style={{ color: 'var(--text)' }}>Vibrato:</strong> Kecepatan osilasi serta kedalaman modulasi nada
              </div>
              <div style={{ background: 'var(--bg)', padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'var(--text2)' }}>
                <strong style={{ color: 'var(--text)' }}>Dukungan Napas:</strong> Kestabilan volume vokal dan dinamika desibel
              </div>
              <div style={{ background: 'var(--bg)', padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'var(--text2)' }}>
                <strong style={{ color: 'var(--text)' }}>Skor Keseluruhan:</strong> Evaluasi terpadu nilai 0 sampai 100 dengan grafik lima dimensi
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" style={{ padding: '3.5rem 0', borderBottom: '1px solid var(--border)' }}>
          <div className="text-xs font-bold text-muted" style={{ textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
            CARA KERJA
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            3 Langkah Mudah Memulai
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1px',
              background: 'var(--border)',
              marginTop: '1.5rem',
            }}
          >
            <div style={{ background: 'var(--bg)', padding: '1.5rem' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text3)', marginBottom: '0.5rem' }}>
                1
              </div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Izinkan Mikrofon
              </h3>
              <p className="text-muted text-sm">
                Buka studio vokal dan berikan izin akses mikrofon. Seluruh proses deteksi dijalankan di peramban pengguna.
              </p>
            </div>

            <div style={{ background: 'var(--bg)', padding: '1.5rem' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text3)', marginBottom: '0.5rem' }}>
                2
              </div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Rekam Suara
              </h3>
              <p className="text-muted text-sm">
                Mulai bernyanyi mengikuti panduan piano roll. Grafik alur nada langsung muncul secara interaktif.
              </p>
            </div>

            <div style={{ background: 'var(--bg)', padding: '1.5rem' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text3)', marginBottom: '0.5rem' }}>
                3
              </div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Tinjau Rapor Evaluasi
              </h3>
              <p className="text-muted text-sm">
                Dapatkan skor nilai terpadu, grafik visual radar 5 sumbu, dan catatan bagian nada yang perlu disesuaikan.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing / Freemium Catalog */}
        <section id="pricing" style={{ padding: '3.5rem 0', borderBottom: '1px solid var(--border)' }}>
          <div className="text-xs font-bold text-muted" style={{ textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
            PAKET LANGGANAN
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Pilihan Paket untuk Segala Kebutuhan
          </h2>
          <p className="text-muted text-sm" style={{ marginBottom: '1.75rem' }}>
            Tersedia paket gratis untuk mahasiswa dan paket lanjutan untuk penyanyi profesional.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Free */}
            <div className="card" style={{ background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
              <div className="card-title">Free</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, margin: '0.5rem 0 0.1rem' }}>Rp 0</div>
              <div className="text-xs text-muted mb-3">Selamanya gratis</div>

              <ul style={{ listStyle: 'none', marginBottom: '1.5rem', flex: 1 }}>
                <li style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem', display: 'flex', gap: '0.5rem' }}>
                  <Check size={14} className="text-green" /> <span>Rekam vokal hingga 60 detik</span>
                </li>
                <li style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem', display: 'flex', gap: '0.5rem' }}>
                  <Check size={14} className="text-green" /> <span>Tampilan kurva nada piano roll</span>
                </li>
                <li style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem', display: 'flex', gap: '0.5rem' }}>
                  <Check size={14} className="text-green" /> <span>Penentu rentang vokal &amp; tuts piano</span>
                </li>
                <li style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem', display: 'flex', gap: '0.5rem' }}>
                  <Check size={14} className="text-green" /> <span>Tuner nada kromatik digital</span>
                </li>
                <li style={{ padding: '0.4rem 0', fontSize: '0.82rem', display: 'flex', gap: '0.5rem' }}>
                  <Check size={14} className="text-green" /> <span>Evaluasi nada dan deviasi sen</span>
                </li>
              </ul>

              <button onClick={() => handleSelectTier('free')} className="btn btn-outline w-full">
                {user?.tier === 'free' ? 'Paket Aktif Saat Ini' : 'Pilih Paket Free'}
              </button>
            </div>

            {/* Pro */}
            <div
              className="card"
              style={{
                background: '#ffffff',
                border: '2px solid var(--text)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '16px',
                  background: 'var(--text)',
                  color: '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '3px',
                  letterSpacing: '0.5px',
                }}
              >
                REKOMENDASI
              </div>

              <div className="card-title">Pro — Mahasiswa</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, margin: '0.5rem 0 0.1rem' }}>Rp 49.000</div>
              <div className="text-xs text-muted mb-3">per bulan</div>

              <ul style={{ listStyle: 'none', marginBottom: '1.5rem', flex: 1 }}>
                <li style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem', display: 'flex', gap: '0.5rem' }}>
                  <Check size={14} className="text-green" /> <span>Durasi rekam hingga 5 menit (300s)</span>
                </li>
                <li style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem', display: 'flex', gap: '0.5rem' }}>
                  <Check size={14} className="text-green" /> <span>Seluruh fitur paket Free</span>
                </li>
                <li style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem', display: 'flex', gap: '0.5rem' }}>
                  <Check size={14} className="text-green" /> <span>Cetak &amp; simpan dokumen rapor PDF</span>
                </li>
                <li style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem', display: 'flex', gap: '0.5rem' }}>
                  <Check size={14} className="text-green" /> <span>Putar ulang audio vokal selaras nada</span>
                </li>
                <li style={{ padding: '0.4rem 0', fontSize: '0.82rem', display: 'flex', gap: '0.5rem' }}>
                  <Check size={14} className="text-green" /> <span>Rekomendasi perbaikan intonasi vokal</span>
                </li>
              </ul>

              <button onClick={() => handleSelectTier('pro')} className="btn btn-primary w-full">
                {user?.tier === 'pro' ? 'Paket Aktif Saat Ini' : 'Pilih Paket Pro'}
              </button>
            </div>

            {/* Premium */}
            <div className="card" style={{ background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
              <div className="card-title">Premium</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, margin: '0.5rem 0 0.1rem' }}>Rp 99.000</div>
              <div className="text-xs text-muted mb-3">per bulan</div>

              <ul style={{ listStyle: 'none', marginBottom: '1.5rem', flex: 1 }}>
                <li style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem', display: 'flex', gap: '0.5rem' }}>
                  <Check size={14} className="text-green" /> <span>Durasi rekam hingga 15 menit (900s)</span>
                </li>
                <li style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem', display: 'flex', gap: '0.5rem' }}>
                  <Check size={14} className="text-green" /> <span>Seluruh fitur paket Pro</span>
                </li>
                <li style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem', display: 'flex', gap: '0.5rem' }}>
                  <Check size={14} className="text-green" /> <span>Dasbor pemantauan tren perkembangan</span>
                </li>
                <li style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem', display: 'flex', gap: '0.5rem' }}>
                  <Check size={14} className="text-green" /> <span>Latihan tangga nada interaktif kustom</span>
                </li>
                <li style={{ padding: '0.4rem 0', fontSize: '0.82rem', display: 'flex', gap: '0.5rem' }}>
                  <Check size={14} className="text-green" /> <span>Jalur bantuan teknis utama</span>
                </li>
              </ul>

              <button onClick={() => handleSelectTier('premium')} className="btn btn-outline w-full">
                {user?.tier === 'premium' ? 'Paket Aktif Saat Ini' : 'Pilih Paket Premium'}
              </button>
            </div>
          </div>
        </section>

        {/* CTA Bar */}
        <section style={{ padding: '3rem 2rem', background: '#ffffff', border: '1px solid var(--border)', margin: '3rem 0', borderRadius: 'var(--radius)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Mulai Latihan Vokal Anda Sekarang
          </h2>
          <p className="text-muted text-sm" style={{ marginBottom: '1.5rem', maxWidth: '540px' }}>
            Coba langsung fitur studio, pemeriksa nada kromatik, dan pengujian rentang suara tanpa kewajiban membuat akun terlebih dahulu.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/studio" className="btn btn-primary">
              <Mic size={14} />
              <span>Buka Studio Vokal</span>
            </Link>
            <Link to="/tuner" className="btn btn-outline">
              <span>Buka Tuner Kromatik</span>
            </Link>
            <Link to="/range-finder" className="btn btn-outline">
              <span>Uji Rentang Nada</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
