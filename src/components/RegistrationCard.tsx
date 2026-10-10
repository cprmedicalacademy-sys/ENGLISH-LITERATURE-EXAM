import React, { useState } from 'react';
import { User, Hash, CheckCircle2, AlertCircle, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { StudentData } from '../types/exam';

interface RegistrationCardProps {
  onStart: (data: StudentData) => void;
}

export const RegistrationCard: React.FC<RegistrationCardProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setError('অনুগ্রহ করে আপনার নাম লিখুন (Please enter your name)');
      return;
    }
    setError('');
    onStart({
      name: cleanName,
      roll: roll.trim() || 'N/A',
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8 max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>TOPIC: ENGLISH LITERATURE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-950 mb-1 english-sans">
          Online Exam Portal
        </h2>
        <p className="text-sm text-slate-500 bangla-text">
          পরীক্ষায় অংশগ্রহণ করতে আপনার নাম এবং রোল / রেজিস্ট্রেশন নম্বর লিখুন
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 bangla-text">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 bangla-text mb-1.5 flex items-center gap-1.5">
            <User className="w-4 h-4 text-indigo-600" />
            <span>শিক্ষার্থীর নাম (Student Name) <span className="text-rose-500">*</span></span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none english-sans text-slate-900 placeholder:text-slate-400 text-sm transition"
            placeholder="Enter your full name (e.g. Dr. Tanvir Ahmed)"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 bangla-text mb-1.5 flex items-center gap-1.5">
            <Hash className="w-4 h-4 text-indigo-600" />
            <span>রেজিস্ট্রেশন নম্বর / রোল (Registration No / ID)</span>
            <span className="text-xs text-slate-400 font-normal">(ঐচ্ছিক / Optional)</span>
          </label>
          <input
            type="text"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none english-sans text-slate-900 placeholder:text-slate-400 text-sm transition"
            placeholder="e.g. CPR-2026-042"
          />
        </div>

        {/* Exam Overview Summary */}
        <div className="grid grid-cols-2 gap-3 py-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span className="bangla-text">সময়সীমা:</span>
            </div>
            <p className="font-bold text-slate-800 english-sans">30 Minutes</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
              <span className="bangla-text">মোট প্রশ্ন:</span>
            </div>
            <p className="font-bold text-slate-800 english-sans">40 MCQs</p>
          </div>
        </div>

        {/* Agreement */}
        <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 bangla-text select-none pt-1">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span>
            আমি পরীক্ষার সকল নিয়মাবলি এবং নেগেটিভ মার্কিং পদ্ধতি সম্পর্কে অবগত এবং পরীক্ষায় অংশ নিতে প্রস্তুত।
          </span>
        </label>

        <button
          type="submit"
          disabled={!agreed}
          className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 rounded-xl transition duration-200 bangla-text text-base shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>পরীক্ষা শুরু করুন (Start Exam)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Rules Notice */}
      <div className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-600 bangla-text space-y-1.5 bg-indigo-50/50 p-4 rounded-xl border">
        <p className="font-semibold text-indigo-950 flex items-center gap-1.5">
          <span>মূল্যায়ন পদ্ধতি (Marking System):</span>
        </p>
        <p className="text-slate-700">
          • প্রতিটি সঠিক উত্তরের জন্য <strong className="text-emerald-700">১ নম্বর</strong> যোগ হবে।
        </p>
        <p className="text-slate-700">
          • প্রতিটি ভুল উত্তরের জন্য <strong className="text-rose-700">০.৫ নম্বর</strong> কর্তন করা হবে।
        </p>
        <div className="font-mono text-[11px] bg-white p-2 rounded border border-indigo-100 text-indigo-900 mt-1">
          প্রাপ্ত ফলাফল = সঠিক উত্তর সংখ্যা - (ভুল উত্তর সংখ্যা × ০.৫)
        </div>
      </div>
    </div>
  );
};
