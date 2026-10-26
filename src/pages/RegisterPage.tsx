import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TierType } from '../types';

export const RegisterPage: React.FC = () => {
  const { user, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedTier, setSelectedTier] = useState<TierType>(() => {
    const queryTier = searchParams.get('tier') as TierType;
    return queryTier === 'pro' || queryTier === 'premium' ? queryTier : 'free';
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/studio');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Kata sandi harus minimal 6 karakter.');
      return;
    }

    setLoading(true);
    const res = await register(name, email, password, selectedTier);
    setLoading(false);

    if (res.success) {
      setSuccessMsg('Akun berhasil dibuat! Mengalihkan ke studio...');
      setTimeout(() => navigate('/studio'), 600);
    } else {
      setErrorMsg(res.message || 'Pendaftaran gagal.');
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    await loginWithGoogle();
    setLoading(false);
    navigate('/studio');
  };

  return (
    <div
      className="page"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 1.5rem 2rem',
        background: 'var(--bg)',
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '460px',
          background: '#ffffff',
          border: '1px solid var(--border-dark)',
          borderRadius: 'var(--radius-sm)',
          padding: '2.25rem',
          boxShadow: 'var(--shadow)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <div className="logo-icon" style={{ width: '36px', height: '36px', fontSize: '0.9rem' }}>
            VS
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>VocalSense AI</span>
        </div>

        <h1 style={{ fontSize: '1.35rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.25rem' }}>
          Buat Akun Baru
        </h1>
        <p className="text-muted text-sm text-center" style={{ marginBottom: '1.5rem' }}>
          Mulai evaluasi dan latihan vokal presisi tinggi Anda hari ini
        </p>

        {errorMsg && <div className="alert alert-error mb-3">{errorMsg}</div>}
        {successMsg && <div className="alert alert-success mb-3">{successMsg}</div>}

        <button
          onClick={handleGoogleRegister}
          disabled={loading}
          className="btn btn-outline w-full mb-2"
          style={{ padding: '0.65rem', display: 'flex', gap: '0.75rem', justifyContent: 'center' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path
              fill="#4285F4"
              d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
            />
            <path
              fill="#34A853"
              d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
            />
            <path
              fill="#FBBC05"
              d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
            />
            <path
              fill="#EA4335"
              d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
            />
          </svg>
          <span>Daftar dengan Google</span>
        </button>

        <div className="divider">atau daftar dengan email</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nama Lengkap</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Contoh: Rian Pratama"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="nama@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Kata Sandi</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Minimal 6 karakter"
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Konfirmasi Kata Sandi</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              placeholder="Ulangi kata sandi"
              required
            />
          </div>

          {/* Tier Selection */}
          <div className="form-group">
            <label className="form-label">Pilih Paket Layanan</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem' }}>
              <div
                onClick={() => setSelectedTier('free')}
                style={{
                  border: selectedTier === 'free' ? '2px solid var(--text)' : '1px solid var(--border-dark)',
                  background: selectedTier === 'free' ? 'var(--bg3)' : '#ffffff',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.75rem 0.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <div style={{ fontSize: '1.2rem' }}>🎤</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, marginTop: '0.25rem' }}>Free</div>
                <div className="text-xs text-muted">Gratis</div>
              </div>

              <div
                onClick={() => setSelectedTier('pro')}
                style={{
                  border: selectedTier === 'pro' ? '2px solid var(--text)' : '1px solid var(--border-dark)',
                  background: selectedTier === 'pro' ? 'var(--bg3)' : '#ffffff',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.75rem 0.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <div style={{ fontSize: '1.2rem' }}>⭐</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, marginTop: '0.25rem' }}>Pro</div>
                <div className="text-xs text-muted">Rp 49rb/bln</div>
              </div>

              <div
                onClick={() => setSelectedTier('premium')}
                style={{
                  border: selectedTier === 'premium' ? '2px solid var(--text)' : '1px solid var(--border-dark)',
                  background: selectedTier === 'premium' ? 'var(--bg3)' : '#ffffff',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.75rem 0.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <div style={{ fontSize: '1.2rem' }}>👑</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, marginTop: '0.25rem' }}>Premium</div>
                <div className="text-xs text-muted">Rp 99rb/bln</div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
            style={{ padding: '0.75rem', marginTop: '0.5rem' }}
          >
            {loading ? 'Mendaftarkan Akun...' : 'Buat Akun'}
          </button>
        </form>

        <div className="text-center text-sm text-muted mt-3">
          Sudah punya akun?{' '}
          <Link to="/login" style={{ fontWeight: 700, color: 'var(--text)', textDecoration: 'underline' }}>
            Masuk sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};
