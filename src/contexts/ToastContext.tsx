/**
 * Toast context: bottom-right toasts for login welcome, errors, goodbye, and post actions.
 */
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { Hand, AlertCircle, CheckCircle, LogOut } from "lucide-react";

export type ToastType = "success" | "error";

export interface ToastOptions {
  type: ToastType;
  title: string;
  message?: string;
  /** Optional icon override: 'hand' | 'check' | 'alert' | 'logout' */
  icon?: "hand" | "check" | "alert" | "logout";
}

interface ToastContextValue {
  showToast: (opts: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION_MS = 4500;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastOptions | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((opts: ToastOptions) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToast(opts);
    timeoutRef.current = setTimeout(() => {
      setToast(null);
      timeoutRef.current = null;
    }, TOAST_DURATION_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const icon = toast?.icon ?? (toast?.type === "error" ? "alert" : "check");
  const IconComponent =
    icon === "hand" ? Hand : icon === "alert" ? AlertCircle : icon === "logout" ? LogOut : CheckCircle;
  const isError = toast?.type === "error";

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-50 max-w-sm"
          role="status"
          aria-live="polite"
        >
          <div
            className={
              isError
                ? "rounded-xl border border-red-200 bg-red-50 p-4 shadow-lg"
                : "rounded-xl border border-stone-200 bg-white p-4 shadow-lg"
            }
          >
            <div className="flex gap-3">
              <span
                className={
                  isError ? "text-red-600" : "text-green-600"
                }
                aria-hidden
              >
                <IconComponent size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={
                    isError
                      ? "font-semibold text-red-800"
                      : "font-semibold text-stone-900"
                  }
                >
                  {toast.title}
                </p>
                {toast.message && (
                  <p
                    className={
                      isError
                        ? "mt-0.5 text-sm text-red-700"
                        : "mt-0.5 text-sm text-stone-600"
                    }
                  >
                    {toast.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- context + hook in one file
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
