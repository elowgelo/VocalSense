import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { user, login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/studio');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/studio');
    } else {
      setErrorMsg(res.message || 'Gagal masuk.');
    }
  };

  const handleGoogleLogin = async () => {
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
          maxWidth: '420px',
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
          Selamat Datang Kembali
        </h1>
        <p className="text-muted text-sm text-center" style={{ marginBottom: '1.5rem' }}>
          Masuk untuk mengakses studio vokal dan arsip rekaman Anda
        </p>

        {errorMsg && <div className="alert alert-error mb-3">{errorMsg}</div>}

        {/* OAuth Google */}
        <button
          onClick={handleGoogleLogin}
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
          <span>Lanjutkan dengan Google</span>
        </button>

        <div className="divider">atau masuk dengan email</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="nama@email.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <label className="form-label" style={{ margin: 0 }}>
                Kata Sandi
              </label>
              <span className="text-xs text-muted" style={{ cursor: 'pointer' }}>
                Lupa kata sandi?
              </span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
            style={{ padding: '0.75rem', marginTop: '0.5rem' }}
          >
            {loading ? 'Memverifikasi...' : 'Masuk'}
          </button>
        </form>

        <div className="text-center text-sm text-muted mt-3">
          Belum punya akun?{' '}
          <Link to="/register" style={{ fontWeight: 700, color: 'var(--text)', textDecoration: 'underline' }}>
            Daftar sekarang
          </Link>
        </div>

        <div className="text-center text-sm mt-2">
          <Link to="/studio" style={{ color: 'var(--text2)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span>Atau coba gratis tanpa daftar</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};
