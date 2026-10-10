import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle, XCircle, HelpCircle, Download, RefreshCw, Eye, BookOpen, Send, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { ExamResult } from '../types/exam';
import { CertificateModal } from './CertificateModal';

interface ResultInterfaceProps {
  result: ExamResult;
  isReviewOpen: boolean;
  onToggleReview: () => void;
  onRetake: () => void;
  syncStatus: string;
  isSyncing: boolean;
  onResync: () => void;
}

export const ResultInterface: React.FC<ResultInterfaceProps> = ({
  result,
  isReviewOpen,
  onToggleReview,
  onRetake,
  syncStatus,
  isSyncing,
  onResync,
}) => {
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  useEffect(() => {
    // Celebratory confetti upon completion
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore confetti error
    }
  }, []);

  const getPerformanceBadge = (score: number) => {
    if (score >= 32) {
      return {
        label: 'অসাধারণ / Outstanding Merit',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        note: 'বিসিএস পরীক্ষায় এই ফলাফল অত্যন্ত প্রতিযোগিতামূলক এবং শীর্ষ মেধা তালিকায় অবস্থানের নির্দেশক।',
      };
    }
    if (score >= 24) {
      return {
        label: 'চমৎকার / Excellent',
        badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-300',
        note: 'আপনার ইংরেজি সাহিত্যের দখল বেশ ভালো। ভুল উত্তরের নেগেটিভ মার্কিং কমিয়ে আরও ভালো করা সম্ভব।',
      };
    }
    if (score >= 16) {
      return {
        label: 'সন্তোষজনক / Satisfactory',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
        note: 'সাহিত্য অংশের আরও কিছু মূল লেখক ও তাঁদের বিখ্যাত উক্তিগুলো পুনরায় রিভিশন দেওয়া প্রয়োজন।',
      };
    }
    return {
      label: 'অনুশীলন প্রয়োজন / Needs Practice',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
      note: 'নেগেটিভ মার্কিংয়ের কারণে নম্বর কমেছে। নিশ্চিত না হয়ে অনুমাননির্ভর দাগানো থেকে বিরত থাকুন।',
    };
  };

  const performance = getPerformanceBadge(result.finalScore);
  const minutesSpent = Math.floor(result.timeSpentSeconds / 60);
  const secondsSpent = result.timeSpentSeconds % 60;

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-fade-in pb-16">
      {/* Official Scorecard Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-6 sm:p-10 text-center relative overflow-hidden">
        {/* Top Watermark Gradient Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-indigo-800 to-amber-500" />

        {/* Institution Branding */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-800 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>BCS SPECIAL CRYSTAL BATCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-950 uppercase tracking-wide english-sans">
            CPR Medical Academy
          </h2>
          <p className="text-sm font-semibold text-slate-500 bangla-text mt-0.5">
            অনলাইন পরীক্ষা ফলাফল ও মেধা মূল্যায়ন (Official Exam Result)
          </p>
          <p className="text-xs text-slate-400 mt-1">
            বিষয়: English Literature · পূর্ণমান: ৪০.০০ · সময়: ৩০ মিনিট
          </p>
        </div>

        {/* Candidate Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200/80 p-4 rounded-2xl mb-6 text-left text-xs">
          <div>
            <span className="text-slate-400 block bangla-text">শিক্ষার্থীর নাম</span>
            <span className="font-bold text-slate-900 english-sans text-sm truncate block">{result.studentName}</span>
          </div>
          <div>
            <span className="text-slate-400 block bangla-text">রেজিস্ট্রেশন / রোল</span>
            <span className="font-bold text-slate-900 english-sans text-sm block">{result.studentRoll}</span>
          </div>
          <div>
            <span className="text-slate-400 block bangla-text">ব্যয়িত সময়</span>
            <span className="font-bold text-slate-900 english-sans text-sm flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              {minutesSpent}m {secondsSpent}s
            </span>
          </div>
          <div>
            <span className="text-slate-400 block bangla-text">তারিখ ও সময়</span>
            <span className="font-medium text-slate-700 text-[11px] block">{result.submittedAt}</span>
          </div>
        </div>

        {/* Final Merit Score Spotlight */}
        <div className="bg-indigo-50/70 border-2 border-indigo-200/80 rounded-2xl p-6 sm:p-8 mb-6 relative">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bangla-text block mb-1">
            চূড়ান্ত প্রাপ্ত নম্বর (FINAL MERIT SCORE)
          </span>

          <div className="flex items-baseline justify-center gap-1.5 my-2">
            <span className="text-5xl sm:text-6xl font-black text-indigo-950 tabular-nums font-mono">
              {result.finalScore.toFixed(2)}
            </span>
            <span className="text-slate-500 font-bold text-xl">/ 40.00</span>
          </div>

          <div className="inline-block mt-1">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${performance.badgeClass} bangla-text`}>
              {performance.label}
            </span>
          </div>

          <p className="text-xs text-slate-600 mt-3 bangla-text max-w-md mx-auto">
            {performance.note}
          </p>

          <div className="mt-3 text-[11px] text-indigo-700 font-mono bg-white/80 py-1.5 px-3 rounded-lg border border-indigo-100 inline-block">
            হিসাব: {result.correctCount} (সঠিক) - ({result.incorrectCount} × ০.৫) = {result.finalScore.toFixed(2)}
          </div>
        </div>

        {/* 4 Quantitative Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-left">
          <div className="bg-emerald-50/80 border border-emerald-200/90 p-4 rounded-xl">
            <div className="flex items-center justify-between text-emerald-800 text-xs font-medium mb-1">
              <span className="bangla-text">সঠিক MCQ</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-950 tabular-nums">
              {result.correctCount}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium">+{result.correctCount * 1.0} নম্বর</span>
          </div>

          <div className="bg-rose-50/80 border border-rose-200/90 p-4 rounded-xl">
            <div className="flex items-center justify-between text-rose-800 text-xs font-medium mb-1">
              <span className="bangla-text">ভুল MCQ</span>
              <XCircle className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-2xl font-bold text-rose-950 tabular-nums">
              {result.incorrectCount}
            </div>
            <span className="text-[11px] text-rose-700 font-medium">-{result.negativePenalty.toFixed(2)} নম্বর কাটা</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <div className="flex items-center justify-between text-slate-600 text-xs font-medium mb-1">
              <span className="bangla-text">অনুত্তরিত</span>
              <HelpCircle className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-800 tabular-nums">
              {result.unansweredCount}
            </div>
            <span className="text-[11px] text-slate-500">০.০০ পরিবর্তন</span>
          </div>

          <div className="bg-indigo-50/80 border border-indigo-200/90 p-4 rounded-xl">
            <div className="flex items-center justify-between text-indigo-800 text-xs font-medium mb-1">
              <span className="bangla-text">সঠিকতার হার</span>
              <Award className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-indigo-950 tabular-nums">
              {result.accuracy.toFixed(1)}%
            </div>
            <span className="text-[11px] text-indigo-700 font-medium">Accuracy</span>
          </div>
        </div>

        {/* Sync Status Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="bangla-text">{syncStatus}</span>
          </div>
          <button
            type="button"
            onClick={onResync}
            disabled={isSyncing}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSyncing ? 'রেকর্ড পাঠানো হচ্ছে...' : 'পুনরায় রেকর্ড পাঠান'}</span>
          </button>
        </div>

        {/* Action Controls: Direct Certificate Button */}
        <div className="flex flex-wrap items-center justify-center gap-3 no-print">
          {/* Certificate Main Button */}
          <button
            type="button"
            onClick={() => setIsCertificateModalOpen(true)}
            className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 bangla-text text-base flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Award className="w-5 h-5 text-yellow-100" />
            <span>সার্টিফিকেট গ্রহণ ও ডাউনলোড করুন (Get Certificate)</span>
            <Sparkles className="w-4 h-4 text-yellow-200 animate-pulse" />
          </button>

          <button
            type="button"
            onClick={onToggleReview}
            className={`px-6 py-3.5 rounded-xl font-semibold text-sm transition bangla-text shadow-sm flex items-center gap-2 cursor-pointer ${
              isReviewOpen
                ? 'bg-indigo-700 text-white hover:bg-indigo-800'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>
              {isReviewOpen ? 'উত্তরপত্র পর্যালোচনা লুকান' : 'উত্তরপত্র পর্যালোচনা করুন (Review Answers)'}
            </span>
          </button>

          <button
            type="button"
            onClick={onRetake}
            className="px-5 py-3.5 rounded-xl font-semibold text-sm border border-slate-300 text-slate-700 hover:bg-slate-50 transition bangla-text flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>পুনরায় পরীক্ষা দিন</span>
          </button>
        </div>
      </div>

      {/* Certificate Modal (Auto-Locked, Zero Manual Edits) */}
      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        result={result}
      />
    </div>
  );
};
