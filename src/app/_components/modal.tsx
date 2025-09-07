"use client";
import { X } from "lucide-react";
import { useEffect } from "react";
import Button from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  primaryButton?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
  };
  secondaryButton?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
  };
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  primaryButton,
  secondaryButton,
}: ModalProps) {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      // Restore scrolling when modal is closed
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4 ">
        <div
          className={`relative w-full max-w-xl rounded-xl bg-[#101522] shadow-lg transition-all border border-zinc-500`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-500 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-[#2d2d2d] hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4">{children}</div>

          {/* Footer */}
          {(primaryButton || secondaryButton) && (
            <div className="flex items-center justify-end gap-3 border-t border-zinc-500 px-6 py-4">
              {secondaryButton && (
                <Button
                  props={{
                    onClick: secondaryButton.onClick,
                    disabled: secondaryButton.loading,
                  }}
                >
                  {secondaryButton.loading
                    ? "Уншиж байна..."
                    : secondaryButton.label}
                </Button>
              )}
              {primaryButton && (
                <Button
                  props={{
                    onClick: primaryButton.onClick,
                    disabled: primaryButton.loading,
                  }}
                >
                  {primaryButton.loading
                    ? "Уншиж байна..."
                    : primaryButton.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
