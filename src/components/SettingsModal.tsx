import React, { useState } from 'react';
import { X, Save, Link2, Volume2, Clock, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { DEFAULT_SCRIPT_URL_KEY, DEFAULT_EXAM_MODE_KEY } from '../data/questions';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  examMode: 'live' | 'open';
  onUpdateExamMode: (mode: 'live' | 'open') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onScriptUrlChange: (url: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  examMode,
  onUpdateExamMode,
  soundEnabled,
  onToggleSound,
  onScriptUrlChange,
}) => {
  const [scriptUrl, setScriptUrl] = useState(() => {
    return localStorage.getItem(DEFAULT_SCRIPT_URL_KEY) || '';
  });
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(DEFAULT_SCRIPT_URL_KEY, scriptUrl.trim());
    onScriptUrlChange(scriptUrl.trim());
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const testConnection = async () => {
    const url = scriptUrl.trim();
    if (!url) {
      setTestStatus('অনুগ্রহ করে প্রথমে একটি বৈধ Google Apps Script URL প্রদান করুন।');
      return;
    }
    setIsTesting(true);
    setTestStatus('Google Apps Script সংযোগ পরীক্ষা করা হচ্ছে...');
    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Ping',
          roll: 'TEST-001',
          correct: 40,
          incorrect: 0,
          score: 40,
          test: true,
        }),
      });
      setTestStatus('✓ অনুরোধ পাঠানো সম্পন্ন হয়েছে (নো-কোর্স মোডে রিকোয়েস্ট সফল)।');
    } catch {
      setTestStatus('সংযোগে সমস্যা হয়েছে। URL সঠিক কিনা এবং Apps Script "Anyone" এক্সেস দেওয়া আছে কিনা তা যাচাই করুন।');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-slate-900 english-sans">
            Exam & Integration Settings
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="space-y-5">
          {/* Google Sheets Apps Script URL */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Link2 className="w-4 h-4 text-indigo-600" />
              <span>Google Apps Script Web App URL</span>
            </label>
            <p className="text-xs text-slate-500 mb-2 bangla-text">
              পরীক্ষার ফলাফল সরাসরি আপনার গুগল স্প্রেডশিটে জমা করতে Web App URL টি এখানে দিন:
            </p>
            <input
              type="url"
              value={scriptUrl}
              onChange={(e) => setScriptUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 font-mono text-slate-900"
            />
            <div className="mt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={testConnection}
                disabled={isTesting || !scriptUrl.trim()}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 disabled:opacity-40 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                <span>{isTesting ? 'Testing...' : 'Test Connection Ping'}</span>
              </button>
            </div>
            {testStatus && (
              <p className="text-[11px] mt-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 bangla-text">
                {testStatus}
              </p>
            )}
          </div>

          {/* Exam Timing Mode */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>পরীক্ষা সময়সূচি মোড (Timing Schedule Mode)</span>
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => onUpdateExamMode('live')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  examMode === 'live'
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <span className="block font-bold">লাইভ সময়সূচি (8:00 - 9:00 PM)</span>
                <span className="text-[11px] text-slate-500 mt-0.5 block bangla-text">
                  শুধুমাত্র নির্ধারিত লাইভ সময়ে পরীক্ষা দেওয়া যাবে।
                </span>
              </button>
              <button
                type="button"
                onClick={() => onUpdateExamMode('open')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  examMode === 'open'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <span className="block font-bold">প্র্যাকটিস মোড (Open Access)</span>
                <span className="text-[11px] text-slate-500 mt-0.5 block bangla-text">
                  যেকোনো সময় অনুশীলন ও প্রশ্নপত্র যাচাই করা যাবে।
                </span>
              </button>
            </div>
          </div>

          {/* Sound Audio Toggle */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-indigo-600" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">সাউন্ড অ্যালার্ট (Audio Alerts)</span>
                <span className="text-[11px] text-slate-500 bangla-text">
                  পরীক্ষার শেষ ৫ মিনিটের সতর্কবার্তা ও জমা দেওয়ার সাউন্ড
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleSound}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                soundEnabled ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {soundEnabled ? 'সচল (Active)' : 'বন্ধ (Muted)'}
            </button>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            {saveSuccess && (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Saved successfully!</span>
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 transition cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
