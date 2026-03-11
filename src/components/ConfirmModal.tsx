/**
 * Simple confirmation modal (not browser alert). Used for delete confirmation etc.
 */
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
}: ConfirmModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  const isDanger = variant === "danger";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-desc"
    >
      <div
        className="absolute inset-0 bg-stone-900/50"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-xl border border-stone-200 bg-white p-6 shadow-xl">
        <div className="flex gap-4">
          <span
            className={
              isDanger
                ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600"
                : "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600"
            }
          >
            <AlertTriangle size={20} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h2
              id="confirm-modal-title"
              className="text-base font-medium text-stone-900"
            >
              {title}
            </h2>
            <p
              id="confirm-modal-desc"
              className="mt-1 text-base text-stone-600"
            >
              {description}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-base font-medium text-stone-700 hover:bg-stone-50"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={
                  isDanger
                    ? "rounded-lg bg-red-600 px-4 py-2 text-base font-medium text-white hover:bg-red-700"
                    : "rounded-lg bg-stone-900 px-4 py-2 text-base font-medium text-white hover:bg-stone-800"
                }
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
