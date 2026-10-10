import React from 'react';
import { CalendarClock, ShieldAlert, Sparkles, Play } from 'lucide-react';

interface TimeNoticeCardProps {
  isBeforeStart: boolean;
  isAfterEnd: boolean;
  currentTimeString: string;
  onEnterPracticeMode: () => void;
}

export const TimeNoticeCard: React.FC<TimeNoticeCardProps> = ({
  isBeforeStart,
  currentTimeString,
  onEnterPracticeMode,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8 max-w-xl mx-auto text-center transition-all animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-5 text-indigo-700">
        <CalendarClock className="w-8 h-8" />
      </div>

      <h2 className="text-2xl font-bold text-indigo-950 mb-3 bangla-text">
        {isBeforeStart ? 'পরীক্ষা এখনো শুরু হয়নি!' : 'পরীক্ষার সময় শেষ!'}
      </h2>

      <p className="text-slate-600 bangla-text mb-6 text-base leading-relaxed">
        {isBeforeStart
          ? 'আজকের পরীক্ষা শুরু হবে সন্ধ্যা ৮:০০ টায়। রাত ৮:০০ টা থেকে ৯:০০ টার মধ্যে আপনাকে পরীক্ষায় অংশগ্রহণ করতে হবে।'
          : 'আজকের পরীক্ষার নির্ধারিত সময় (সন্ধ্যা ৮:০০টা - রাত ৯:০০টা) ইতিমধ্যে শেষ হয়ে গেছে। নির্ধারিত লাইভ সময়ের বাইরে সাধারণ পরীক্ষা দেওয়ার সুযোগ নেই।'}
      </p>

      {/* Official Schedule Box */}
      <div className="bg-indigo-50/80 border border-indigo-200/70 p-5 rounded-xl text-indigo-950 text-sm bangla-text text-left space-y-2 mb-6">
        <div className="flex items-center justify-between text-xs text-indigo-700 border-b border-indigo-200/60 pb-2">
          <span>বর্তমান সময় (Current Time):</span>
          <span className="font-mono font-semibold tabular-nums">{currentTimeString}</span>
        </div>
        <p>
          <strong>নির্ধারিত সময়:</strong> আজ সন্ধ্যা ৮:০০ টা থেকে রাত ৯:০০ টা পর্যন্ত (২০:০০ - ২১:০০)।
        </p>
        <p className="text-xs text-slate-600">
          • মোট প্রশ্ন: ৪০টি | সময়: ৩০ মিনিট | নেগেটিভ মার্কিং: প্রতিটি ভুলের জন্য ০.৫ কাটা।
        </p>
      </div>

      {/* Practice / Evaluator Access Option */}
      <div className="bg-amber-50/80 border border-amber-200/80 p-5 rounded-xl text-left mb-6">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-amber-900 bangla-text">
              পরীক্ষামূলক বা অনুশীলনের জন্য অংশগ্রহণ
            </h4>
            <p className="text-xs text-amber-800/90 mt-1 bangla-text">
              আপনি কি এখনই প্রশ্নপত্র যাচাই বা অনুশীলন করতে চান? নিচের বাটনে ক্লিক করে প্র্যাকটিস মোডে তাৎক্ষণিক পরীক্ষা শুরু করতে পারেন।
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onEnterPracticeMode}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-6 rounded-xl transition duration-200 bangla-text text-base shadow-md flex items-center justify-center gap-2 group cursor-pointer"
      >
        <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span>প্র্যাকটিস / টেস্ট মোডে পরীক্ষা দিন (Start Practice Exam)</span>
      </button>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
        <span className="bangla-text">সিপিআর মেডিকেল একাডেমি - বিসিএস স্পেশাল ক্রিস্টাল ব্যাচ</span>
      </div>
    </div>
  );
};
