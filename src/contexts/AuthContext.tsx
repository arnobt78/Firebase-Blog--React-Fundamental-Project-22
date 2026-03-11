/**
 * Auth context (code walkthrough).
 * Provides isAuth, login (Google), loginWithTestUser (email/password), logout, and authError to the whole app.
 * onAuthStateChanged keeps isAuth in sync with Firebase; toasts for welcome, error, goodbye.
 */
import { createContext, useCallback, useContext, useState, useEffect } from 'react';
import { signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../firebase/config';
import { useToast } from './ToastContext';

const AUTH_KEY = 'isAuth';

export const TEST_USER_EMAIL = 'test@user.com';
export const TEST_USER_PASSWORD = '12345678';

const TEST_USER_FIREBASE_GUIDE =
  'Enable Email/Password in Firebase Console → Authentication → Sign-in method. Then run: npm run create-test-user';

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
  const { showToast } = useToast();

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
    return signInWithPopup(auth, provider)
      .then(() => {
        setIsAuth(true);
        localStorage.setItem(AUTH_KEY, 'true');
        const name = auth.currentUser?.displayName ?? auth.currentUser?.email ?? 'there';
        showToast({
          type: 'success',
          title: `Hello, ${name} 👋`,
          message: 'Welcome back. Enjoy blog writing!',
          icon: 'hand',
        });
      })
      .catch((err: Error & { code?: string }) => {
        const msg = err.message ?? 'Google sign-in failed';
        if (err.code === 'auth/unauthorized-domain' || msg.includes('authorized') || msg.includes('OAuth')) {
          const text = 'Add this site to Firebase: Console → Authentication → Settings → Authorized domains (e.g. firebase-blog-writing.vercel.app)';
          setAuthError(text);
          showToast({ type: 'error', title: 'Login failed', message: text });
        } else {
          setAuthError(msg);
          showToast({ type: 'error', title: 'Login failed', message: msg });
        }
      });
  }, [showToast]);

  const loginWithTestUser = useCallback(() => {
    setAuthError(null);
    return signInWithEmailAndPassword(auth, TEST_USER_EMAIL, TEST_USER_PASSWORD)
      .then(() => {
        setIsAuth(true);
        localStorage.setItem(AUTH_KEY, 'true');
        showToast({
          type: 'success',
          title: 'Hello, Guest User 👋',
          message: 'Welcome back. Enjoy blog writing!',
          icon: 'hand',
        });
      })
      .catch((err: Error & { code?: string }) => {
        const isDisabled =
          err.code === 'auth/operation-not-allowed' ||
          (err as unknown as { message?: string }).message?.includes('operation-not-allowed');
        const msg = isDisabled
          ? TEST_USER_FIREBASE_GUIDE
          : (err.message ?? 'Test user sign-in failed. Run: npm run create-test-user');
        setAuthError(msg);
        showToast({ type: 'error', title: 'Test user login failed', message: msg });
      });
  }, [showToast]);

  const logout = useCallback(() => {
    const name = auth.currentUser?.displayName ?? auth.currentUser?.email ?? 'Guest';
    signOut(auth);
    setIsAuth(false);
    localStorage.setItem(AUTH_KEY, 'false');
    setAuthError(null);
    showToast({
      type: 'success',
      title: `Goodbye, ${name} 👋`,
      message: 'See you again soon!',
      icon: 'logout',
    });
  }, [showToast]);

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
