import { createContext, useCallback, useContext, useState } from 'react';
import { signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase/config';

const AUTH_KEY = 'isAuth';

export const TEST_USER_EMAIL = 'test@user.com';
export const TEST_USER_PASSWORD = '12345678';

function getStoredAuth(): boolean {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw === null) return false;
    return JSON.parse(raw) === true;
  } catch {
    return false;
  }
}

interface AuthContextValue {
  isAuth: boolean;
  login: () => Promise<void>;
  loginWithTestUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(getStoredAuth);

  const login = useCallback(() => {
    return signInWithPopup(auth, provider).then(() => {
      setIsAuth(true);
      localStorage.setItem(AUTH_KEY, 'true');
    });
  }, []);

  const loginWithTestUser = useCallback(() => {
    return signInWithEmailAndPassword(auth, TEST_USER_EMAIL, TEST_USER_PASSWORD).then(() => {
      setIsAuth(true);
      localStorage.setItem(AUTH_KEY, 'true');
    });
  }, []);

  const logout = useCallback(() => {
    signOut(auth);
    setIsAuth(false);
    localStorage.setItem(AUTH_KEY, 'false');
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, login, loginWithTestUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- context + hook in one file
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
