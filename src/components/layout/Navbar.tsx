import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, LogOut, User as UserIcon, Mic } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getTierBadgeClass = (tier?: string) => {
    if (tier === 'premium') return 'badge-purple';
    if (tier === 'pro') return 'badge-blue';
    return 'badge-green';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="logo-icon">VS</div>
        <span>VocalSense AI</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="navbar-nav desktop-nav">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Beranda
        </NavLink>
        <NavLink to="/studio" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Studio
        </NavLink>
        <NavLink to="/tuner" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Tuner
        </NavLink>
        <NavLink to="/range-finder" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Jangkauan Vokal
        </NavLink>
      </div>

      <div className="navbar-actions desktop-actions">
        {user ? (
          <div className="d-flex align-center gap-1">
            <span className={`badge ${getTierBadgeClass(user.tier)}`}>
              {user.tier.toUpperCase()}
            </span>
            <span className="text-sm text-muted d-flex align-center gap-1">
              <UserIcon size={14} />
              {user.name}
            </span>
            <button onClick={handleLogout} className="btn btn-outline btn-sm" title="Keluar">
              <LogOut size={13} />
              <span>Keluar</span>
            </button>
          </div>
        ) : (
          <div className="d-flex align-center gap-1">
            <Link to="/login" className="btn btn-outline btn-sm">
              Masuk
            </Link>
            <Link to="/studio" className="btn btn-primary btn-sm">
              <Mic size={13} />
              <span>Mulai Gratis</span>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        className="btn btn-ghost btn-sm mobile-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle Menu"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Beranda
          </NavLink>
          <NavLink
            to="/studio"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Studio
          </NavLink>
          <NavLink
            to="/tuner"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Tuner
          </NavLink>
          <NavLink
            to="/range-finder"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Jangkauan Vokal
          </NavLink>

          <div className="mobile-drawer-auth">
            {user ? (
              <div className="d-flex flex-column gap-1">
                <div className="d-flex align-center gap-1">
                  <span className={`badge ${getTierBadgeClass(user.tier)}`}>
                    {user.tier.toUpperCase()}
                  </span>
                  <span className="text-sm font-bold">{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-outline btn-sm w-full"
                >
                  <LogOut size={13} />
                  <span>Keluar</span>
                </button>
              </div>
            ) : (
              <div className="d-flex flex-column gap-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-outline btn-sm w-full"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary btn-sm w-full"
                >
                  Daftar Akun
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
