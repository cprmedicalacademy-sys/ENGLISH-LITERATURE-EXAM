import React from 'react';
import { CalendarClock, ShieldAlert, Clock } from 'lucide-react';

interface TimeNoticeCardProps {
  isBeforeStart: boolean;
  currentTimeString: string;
}

export const TimeNoticeCard: React.FC<TimeNoticeCardProps> = ({
  isBeforeStart,
  currentTimeString,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8 max-w-xl mx-auto text-center transition-all animate-fade-in my-8">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-5 text-indigo-700">
        <CalendarClock className="w-8 h-8" />
      </div>

      <h2 className="text-2xl font-bold text-indigo-950 mb-3 bangla-text">
        {isBeforeStart ? 'পরীক্ষা এখনো শুরু হয়নি!' : 'পরীক্ষার সময় শেষ!'}
      </h2>

      <p className="text-slate-600 bangla-text mb-6 text-base leading-relaxed">
        {isBeforeStart
          ? 'আজকের পরীক্ষা শুরু হবে সন্ধ্যা ৮:০০ টায়। রাত ৮:০০ টা থেকে ৯:০০ টার মধ্যে আপনাকে পরীক্ষায় অংশগ্রহণ করতে হবে।'
          : 'আজকের পরীক্ষার নির্ধারিত সময় (সন্ধ্যা ৮:০০টা - রাত ৯:০০টা) ইতিমধ্যে শেষ হয়ে গেছে। এখন আর পরীক্ষা দেওয়ার কোনো সুযোগ নেই।'}
      </p>

      {/* Official Schedule Box */}
      <div className="bg-indigo-50/80 border border-indigo-200/70 p-5 rounded-xl text-indigo-950 text-sm bangla-text text-left space-y-2.5 mb-6">
        <div className="flex items-center justify-between text-xs text-indigo-800 border-b border-indigo-200/60 pb-2">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>বর্তমান সময় (Current Time):</span>
          </span>
          <span className="font-mono font-bold tabular-nums text-sm bg-white px-2 py-0.5 rounded border border-indigo-200">
            {currentTimeString}
          </span>
        </div>
        <p>
          <strong>নির্ধারিত সময়:</strong> আজ সন্ধ্যা ৮:০০ টা থেকে রাত ৯:০০ টা পর্যন্ত।
        </p>
        <p className="text-xs text-slate-600">
          এই সময়ের বাইরে পরীক্ষা দেওয়ার কোনো সুযোগ নেই।
        </p>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
        <span className="bangla-text">সিপিআর মেডিকেল একাডেমি - বিসিএস স্পেশাল ক্রিস্টাল ব্যাচ</span>
      </div>
    </div>
  );
};
