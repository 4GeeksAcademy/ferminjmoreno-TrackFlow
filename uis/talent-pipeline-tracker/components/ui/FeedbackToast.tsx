import React from 'react';

interface FeedbackToastProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export const FeedbackToast: React.FC<FeedbackToastProps> = ({
  type,
  message,
  onClose,
}) => {
  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md animate-slide-up">
      <div
        className={`flex items-center gap-3 p-4 rounded-xl shadow-lg border ${
          isSuccess
            ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
            : 'bg-rose-50 text-rose-900 border-rose-200'
        }`}
      >
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            isSuccess ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
          }`}
        >
          {isSuccess ? '✓' : '!'}
        </span>
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 transition-colors p-1"
          aria-label="Cerrar notificación"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
