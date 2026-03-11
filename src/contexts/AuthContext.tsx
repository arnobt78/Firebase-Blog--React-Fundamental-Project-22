/**
 * Auth context (code walkthrough).
 * Provides isAuth, login (Google), loginWithTestUser (email/password), logout, and authError to the whole app.
 * onAuthStateChanged keeps isAuth in sync with Firebase; localStorage is used for persistence across refresh.
 */
import { createContext, useCallback, useContext, useState, useEffect } from 'react';
import { signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../firebase/config';

const AUTH_KEY = 'isAuth';

export const TEST_USER_EMAIL = 'test@user.com';
export const TEST_USER_PASSWORD = '12345678';

/** Read auth state from localStorage (used for initial state before Firebase resolves) */
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
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(getStoredAuth);
  const [authError, setAuthError] = useState<string | null>(null);

  // Sync React state with Firebase auth; unsub on unmount to avoid leaks
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
      if (user) {
        localStorage.setItem(AUTH_KEY, 'true');
        setAuthError(null);
      } else {
        localStorage.setItem(AUTH_KEY, 'false');
      }
    });
    return () => unsub();
  }, []);

  const login = useCallback(() => {
    setAuthError(null);
    return signInWithPopup(auth, provider).then(() => {
      setIsAuth(true);
      localStorage.setItem(AUTH_KEY, 'true');
    }).catch((err: Error) => {
      setAuthError(err.message ?? 'Google sign-in failed');
    });
  }, []);

  const loginWithTestUser = useCallback(() => {
    setAuthError(null);
    return signInWithEmailAndPassword(auth, TEST_USER_EMAIL, TEST_USER_PASSWORD).then(() => {
      setIsAuth(true);
      localStorage.setItem(AUTH_KEY, 'true');
    }).catch((err: Error) => {
      setAuthError(err.message ?? 'Test user sign-in failed. Enable Email/Password in Firebase Console and add user test@user.com.');
    });
  }, []);

  const logout = useCallback(() => {
    signOut(auth);
    setIsAuth(false);
    localStorage.setItem(AUTH_KEY, 'false');
    setAuthError(null);
  }, []);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  return (
    <AuthContext.Provider value={{ isAuth, login, loginWithTestUser, logout, authError, clearAuthError }}>
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
