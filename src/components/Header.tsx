import React from 'react';
import { Clock, Volume2, VolumeX, Settings, BookOpen, AlertTriangle } from 'lucide-react';

interface HeaderProps {
  status: 'not_started' | 'registered' | 'in_progress' | 'submitted';
  timeLeftSeconds: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  answeredCount?: number;
  totalQuestions?: number;
}

export const Header: React.FC<HeaderProps> = ({
  status,
  timeLeftSeconds,
  soundEnabled,
  onToggleSound,
  onOpenSettings,
  answeredCount = 0,
  totalQuestions = 40,
}) => {
  const mins = Math.floor(timeLeftSeconds / 60);
  const secs = timeLeftSeconds % 60;
  const isUrgent = timeLeftSeconds <= 300 && status === 'in_progress'; // <= 5 minutes

  return (
    <header className="bg-indigo-950 text-white shadow-md sticky top-0 z-40 border-b border-indigo-900/60 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/80 border border-indigo-400/30 flex items-center justify-center shadow-inner">
              <BookOpen className="w-5 h-5 text-indigo-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-wide text-white uppercase english-sans">
                  CPR Medical Academy
                </h1>
              </div>
              <p className="text-xs text-indigo-300 font-medium bangla-text">
                BCS Special Crystal Batch · Online Exam
              </p>
            </div>
          </div>

          {/* Mobile Right Quick Controls */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={onToggleSound}
              className="p-2 rounded-lg text-indigo-200 hover:text-white hover:bg-indigo-900/60 transition"
              title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-lg text-indigo-200 hover:text-white hover:bg-indigo-900/60 transition"
              title="Exam Settings"
              aria-label="Exam Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center / Action Zone during In-Progress Exam */}
        {status === 'in_progress' && (
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-center">
            {/* Answer Progress */}
            <div className="flex items-center gap-2 bg-indigo-900/70 border border-indigo-700/60 px-3 py-1.5 rounded-lg text-xs font-medium">
              <span className="text-indigo-300 bangla-text">উত্তরিত:</span>
              <span className="font-bold tabular-nums text-white">
                {answeredCount} / {totalQuestions}
              </span>
            </div>

            {/* Timer Box */}
            <div
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border text-sm font-semibold transition-all ${
                isUrgent
                  ? 'bg-rose-950/80 border-rose-500/80 text-rose-200 animate-pulse'
                  : 'bg-indigo-900/80 border-indigo-700 text-slate-100'
              }`}
            >
              {isUrgent ? (
                <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
              ) : (
                <Clock className="w-4 h-4 text-amber-400" />
              )}
              <span className="text-xs text-indigo-200 bangla-text">সময় বাকি:</span>
              <span className={`tabular-nums font-mono font-bold text-base ${isUrgent ? 'text-rose-300' : 'text-amber-300'}`}>
                {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        )}

        {/* Desktop Controls Zone */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={onToggleSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-200 hover:text-white hover:bg-indigo-900/60 transition border border-transparent hover:border-indigo-700/50"
            title={soundEnabled ? 'Mute Alerts' : 'Unmute Alerts'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-indigo-300" />
                <span>Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">Audio Muted</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-200 hover:text-white hover:bg-indigo-900/60 transition border border-indigo-800/80 hover:border-indigo-600"
            title="Settings & Sheet Integration"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
};
