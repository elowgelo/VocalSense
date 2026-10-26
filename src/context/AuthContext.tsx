import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, TierType } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  maxRecordingDuration: number;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, pass: string, tier: TierType) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  switchTier: (tier: TierType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'vs_user';
const USERS_STORAGE_KEY = 'vs_users';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const maxRecordingDuration = React.useMemo(() => {
    if (!user) return 60;
    if (user.tier === 'premium') return 900;
    if (user.tier === 'pro') return 300;
    return 60;
  }, [user]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    // Simulate slight delay for authentic feel
    await new Promise((r) => setTimeout(r, 400));
    try {
      const users: { name: string; email: string; password?: string; tier: TierType }[] = JSON.parse(
        localStorage.getItem(USERS_STORAGE_KEY) || '[]'
      );
      const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (!found) {
        return { success: false, message: 'Email tidak ditemukan. Silakan daftar terlebih dahulu.' };
      }
      if (found.password && found.password !== btoa(pass)) {
        return { success: false, message: 'Kata sandi salah. Coba lagi.' };
      }

      const loggedUser: User = {
        name: found.name,
        email: found.email,
        tier: found.tier || 'free',
      };
      setUser(loggedUser);
      return { success: true };
    } catch {
      return { success: false, message: 'Terjadi kesalahan saat masuk.' };
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 500));
    const googleUser: User = {
      name: 'Pengguna Google (Demo)',
      email: 'demo@google.com',
      tier: 'pro',
    };
    setUser(googleUser);
    return true;
  };

  const register = async (
    name: string,
    email: string,
    pass: string,
    tier: TierType
  ): Promise<{ success: boolean; message?: string }> => {
    await new Promise((r) => setTimeout(r, 400));
    try {
      const users: { name: string; email: string; password?: string; tier: TierType }[] = JSON.parse(
        localStorage.getItem(USERS_STORAGE_KEY) || '[]'
      );

      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, message: 'Email sudah terdaftar. Silakan masuk.' };
      }

      users.push({
        name,
        email,
        password: btoa(pass),
        tier,
      });
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      const newUser: User = { name, email, tier };
      setUser(newUser);
      return { success: true };
    } catch {
      return { success: false, message: 'Terjadi kesalahan saat pendaftaran.' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const switchTier = (tier: TierType) => {
    if (!user) return;
    const updated: User = { ...user, tier };
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        maxRecordingDuration,
        login,
        loginWithGoogle,
        register,
        logout,
        switchTier,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
