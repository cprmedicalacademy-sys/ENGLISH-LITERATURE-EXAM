import React, { useState } from 'react';
import { Bookmark, BookmarkCheck, RotateCcw, Send, CheckCircle2, AlertCircle, HelpCircle, Layers } from 'lucide-react';
import { Question, StudentData } from '../types/exam';

interface ExamInterfaceProps {
  studentData: StudentData;
  questions: Question[];
  userAnswers: Record<number, number>;
  flaggedQuestions: Record<number, boolean>;
  onSelectAnswer: (questionId: number, optionIdx: number) => void;
  onClearAnswer: (questionId: number) => void;
  onToggleFlag: (questionId: number) => void;
  onSubmit: () => void;
}

export const ExamInterface: React.FC<ExamInterfaceProps> = ({
  studentData,
  questions,
  userAnswers,
  flaggedQuestions,
  onSelectAnswer,
  onClearAnswer,
  onToggleFlag,
  onSubmit,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [paletteFilter, setPaletteFilter] = useState<'all' | 'unanswered' | 'flagged'>('all');

  const answeredCount = Object.keys(userAnswers).length;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const unansweredCount = questions.length - answeredCount;

  const scrollToQuestion = (id: number) => {
    const el = document.getElementById(`question-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const filteredPaletteQuestions = questions.filter((q) => {
    const isAnswered = userAnswers[q.id] !== undefined;
    const isFlagged = Boolean(flaggedQuestions[q.id]);
    if (paletteFilter === 'unanswered') return !isAnswered;
    if (paletteFilter === 'flagged') return isFlagged;
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24">
      {/* Candidate Profile Strip */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/90 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-sm">
          <div>
            <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider block">Candidate</span>
            <span className="font-bold text-slate-900 english-sans text-base">{studentData.name}</span>
          </div>
          <div className="border-l border-slate-200 pl-6">
            <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider block">Roll / ID</span>
            <span className="font-semibold text-slate-800 english-sans text-base">{studentData.roll}</span>
          </div>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
            ✓ {answeredCount} Answered
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
            ★ {flaggedCount} Flagged
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
            ○ {unansweredCount} Left
          </span>
        </div>
      </div>

      {/* Main Grid: Question Navigator Palette & Questions List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Column (Desktop sticky palette) */}
        <aside className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200/90 p-4 lg:sticky lg:top-20">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Question Palette ({questions.length})</span>
            </h3>
          </div>

          {/* Palette Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg mb-3 text-xs">
            <button
              type="button"
              onClick={() => setPaletteFilter('all')}
              className={`flex-1 py-1 rounded text-center transition ${
                paletteFilter === 'all' ? 'bg-white font-semibold text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setPaletteFilter('unanswered')}
              className={`flex-1 py-1 rounded text-center transition ${
                paletteFilter === 'unanswered' ? 'bg-white font-semibold text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Left ({unansweredCount})
            </button>
            <button
              type="button"
              onClick={() => setPaletteFilter('flagged')}
              className={`flex-1 py-1 rounded text-center transition ${
                paletteFilter === 'flagged' ? 'bg-white font-semibold text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ★ ({flaggedCount})
            </button>
          </div>

          {/* Numbers Grid */}
          <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-1.5 max-h-[360px] overflow-y-auto p-0.5">
            {filteredPaletteQuestions.map((q) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isFlagged = Boolean(flaggedQuestions[q.id]);

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => scrollToQuestion(q.id)}
                  className={`h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition border ${
                    isAnswered
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                      : isFlagged
                      ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                  title={`Question ${q.id}: ${isAnswered ? 'Answered' : 'Unanswered'}${isFlagged ? ' (Flagged)' : ''}`}
                >
                  {q.id}
                </button>
              );
            })}
          </div>

          {/* Palette Legend */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-600 inline-block" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300 inline-block" />
              <span>Flagged for Review</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-slate-50 border border-slate-200 inline-block" />
              <span>Not Answered</span>
            </div>
          </div>
        </aside>

        {/* Right Column: Questions List */}
        <div className="lg:col-span-3 space-y-5">
          {questions.map((item, index) => {
            const currentSelected = userAnswers[item.id];
            const isFlagged = Boolean(flaggedQuestions[item.id]);

            return (
              <div
                key={item.id}
                id={`question-${item.id}`}
                className={`bg-white rounded-2xl shadow-sm border p-5 sm:p-6 transition-all ${
                  isFlagged
                    ? 'border-amber-300 bg-amber-50/20'
                    : currentSelected !== undefined
                    ? 'border-indigo-200/80 shadow-md'
                    : 'border-slate-200/90'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 mt-0.5">
                      Q.{item.id}
                    </span>
                    <div>
                      <h4 className="text-base sm:text-lg font-medium text-slate-900 english-text leading-snug">
                        {item.q.replace(/^\d+[\.\)]\s*/, '')}
                      </h4>
                      {item.category && (
                        <span className="text-[11px] text-slate-500 tracking-wide mt-1 block">
                          Topic: {item.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Flag action */}
                  <button
                    type="button"
                    onClick={() => onToggleFlag(item.id)}
                    className={`p-2 rounded-lg transition shrink-0 ${
                      isFlagged
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'text-slate-400 hover:text-amber-600 hover:bg-slate-50'
                    }`}
                    title={isFlagged ? 'Remove bookmark' : 'Flag question for review'}
                  >
                    {isFlagged ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {item.opts.map((opt, optIdx) => {
                    const isSelected = currentSelected === optIdx;
                    return (
                      <label
                        key={optIdx}
                        onClick={() => onSelectAnswer(item.id, optIdx)}
                        className={`flex items-center space-x-3 p-3.5 rounded-xl border cursor-pointer transition select-none ${
                          isSelected
                            ? 'bg-indigo-50/90 border-indigo-500 ring-1 ring-indigo-500 text-indigo-950 font-medium'
                            : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q_${item.id}`}
                          checked={isSelected}
                          onChange={() => onSelectAnswer(item.id, optIdx)}
                          className="h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer"
                        />
                        <span className="text-sm english-text leading-relaxed">{opt}</span>
                      </label>
                    );
                  })}
                </div>

                {/* Footer Controls: Clear answer */}
                {currentSelected !== undefined && (
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => onClearAnswer(item.id)}
                      className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-lg transition font-medium bangla-text"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>উত্তর বাতিল করুন (Clear Answer)</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl py-3 px-4 sm:px-8 z-30 no-print">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span className="bangla-text font-medium">
              উত্তর সম্পন্ন: <strong className="text-slate-900 font-bold tabular-nums">{answeredCount}</strong> / {questions.length}
            </span>
            <div className="w-32 sm:w-48 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(answeredCount / questions.length) * 100}%` }}
              />
            </div>
            <span className="tabular-nums font-semibold text-slate-700">
              {Math.round((answeredCount / questions.length) * 100)}%
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-200 bangla-text text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>পরীক্ষা জমা দিন (Submit Exam)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Submission Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in no-print">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5 border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center mx-auto">
              <HelpCircle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900 bangla-text mb-1">
                আপনি কি নিশ্চিত পরীক্ষা জমা দিতে চান?
              </h3>
              <p className="text-xs text-slate-500 bangla-text">
                একবার জমা দেওয়ার পর উত্তরপত্র আর পরিবর্তন করা যাবে না।
              </p>
            </div>

            {/* Submission Status Breakdown */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-900">
                <span className="block font-bold text-lg tabular-nums">{answeredCount}</span>
                <span className="bangla-text">উত্তরিত</span>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-900">
                <span className="block font-bold text-lg tabular-nums">{unansweredCount}</span>
                <span className="bangla-text">অনুত্তরিত</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 text-amber-900">
                <span className="block font-bold text-lg tabular-nums">{flaggedCount}</span>
                <span className="bangla-text">লক্ষণীয়</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-800 text-xs flex items-center gap-2 bangla-text">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>
                  আপনার এখনও <strong>{unansweredCount}টি</strong> প্রশ্নের উত্তর দেওয়া বাকি রয়েছে!
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition bangla-text cursor-pointer"
              >
                ফিরে যান (Review More)
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmModal(false);
                  onSubmit();
                }}
                className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition bangla-text cursor-pointer"
              >
                হ্যাঁ, জমা দিন (Submit)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
