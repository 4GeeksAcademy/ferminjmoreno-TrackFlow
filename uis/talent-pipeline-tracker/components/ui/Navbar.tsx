import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  onNewCandidate?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNewCandidate }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
              TF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-lg tracking-tight">
                  TrackFlow
                </span>
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-200 uppercase tracking-wider">
                  Talent Tracker
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Sede Zaragoza · Proceso Asistente de Dirección
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Pipeline
            </Link>
            {onNewCandidate && (
              <button
                onClick={onNewCandidate}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm shadow-indigo-200 cursor-pointer"
              >
                <span>+</span>
                <span>Nuevo Candidato</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
