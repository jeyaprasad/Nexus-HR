import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 max-w-sm rounded-xl border p-4 shadow-xl backdrop-blur-md transition-all duration-300 animate-slide-up ${
        type === 'error'
          ? 'border-red-500/30 bg-red-950/20 text-red-200'
          : 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold">
          {type === 'error' ? '✕' : '✓'}
        </span>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};
