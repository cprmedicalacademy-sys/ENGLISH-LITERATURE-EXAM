import React, { useState } from 'react';
import { CheckCircle2, XCircle, MinusCircle, Info, Search, Filter } from 'lucide-react';
import { Question } from '../types/exam';

interface ReviewSectionProps {
  questions: Question[];
  userAnswers: Record<number, number>;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ questions, userAnswers }) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'skipped'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuestions = questions.filter((item) => {
    const userAns = userAnswers[item.id];
    const isAnswered = userAns !== undefined;
    const isCorrect = isAnswered && userAns === item.ans;
    const isIncorrect = isAnswered && userAns !== item.ans;
    const isSkipped = !isAnswered;

    if (filter === 'correct' && !isCorrect) return false;
    if (filter === 'incorrect' && !isIncorrect) return false;
    if (filter === 'skipped' && !isSkipped) return false;

    if (searchQuery.trim()) {
      const qText = item.q.toLowerCase();
      const optsText = item.opts.join(' ').toLowerCase();
      const query = searchQuery.toLowerCase();
      return qText.includes(query) || optsText.includes(query);
    }
    return true;
  });

  return (
    <div className="space-y-6 pt-4 animate-fade-in">
      {/* Review Header & Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 bangla-text">
              বিস্তারিত উত্তরপত্র ও সঠিক সমাধান (Answer Sheet & Explanations)
            </h3>
            <p className="text-xs text-slate-500 bangla-text mt-0.5">
              প্রতিটি প্রশ্নের সঠিক উত্তর এবং বিসিএস প্রস্তুতিমূলক ব্যাখ্যা নিচে দেওয়া হলো
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search question or author..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
          <span className="text-slate-500 flex items-center gap-1 font-medium mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>ফিল্টার:</span>
          </span>
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              filter === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            সকল প্রশ্ন ({questions.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('correct')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              filter === 'correct'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            সঠিক উত্তর
          </button>
          <button
            type="button"
            onClick={() => setFilter('incorrect')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              filter === 'incorrect'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            ভুল উত্তর
          </button>
          <button
            type="button"
            onClick={() => setFilter('skipped')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              filter === 'skipped'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            উত্তর দেওয়া হয়নি
          </button>
        </div>
      </div>

      {/* Questions Review Cards */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-sm bangla-text">
            কোনো প্রশ্ন পাওয়া যায়নি। ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
          </div>
        ) : (
          filteredQuestions.map((item) => {
            const userAns = userAnswers[item.id];
            const isAnswered = userAns !== undefined;
            const isCorrect = isAnswered && userAns === item.ans;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl shadow-sm p-6 border transition-all ${
                  !isAnswered
                    ? 'border-slate-200/90 bg-white'
                    : isCorrect
                    ? 'border-emerald-300 bg-emerald-50/10'
                    : 'border-rose-300 bg-rose-50/10'
                }`}
              >
                {/* Status bar */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-900">
                      Q.{item.id}
                    </span>
                    {item.category && (
                      <span className="text-xs text-slate-500 font-medium">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <div>
                    {!isAnswered ? (
                      <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-800 font-semibold px-2.5 py-1 rounded-lg">
                        <MinusCircle className="w-3.5 h-3.5" />
                        <span className="bangla-text">অনুত্তরিত (0)</span>
                      </span>
                    ) : isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="bangla-text">সঠিক (+১.০)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs bg-rose-100 text-rose-800 font-semibold px-2.5 py-1 rounded-lg">
                        <XCircle className="w-3.5 h-3.5" />
                        <span className="bangla-text">ভুল (-০.৫)</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Question title */}
                <p className="font-medium text-slate-900 english-text text-base mb-4 leading-relaxed">
                  {item.q}
                </p>

                {/* Options List with Visual State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  {item.opts.map((opt, optIdx) => {
                    const isCandidateChoice = userAns === optIdx;
                    const isOfficialCorrect = item.ans === optIdx;

                    let optStyles = 'bg-slate-50/60 border-slate-200 text-slate-700';

                    if (isOfficialCorrect) {
                      optStyles = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                    } else if (isCandidateChoice && !isCorrect) {
                      optStyles = 'bg-rose-50 border-rose-400 text-rose-950 font-medium line-through';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-sm flex items-center justify-between gap-2 ${optStyles}`}
                      >
                        <span className="english-text">{opt}</span>
                        <div className="flex items-center gap-1 shrink-0 text-xs font-sans">
                          {isOfficialCorrect && (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                              ✓ Correct Answer
                            </span>
                          )}
                          {isCandidateChoice && !isOfficialCorrect && (
                            <span className="text-[11px] font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded">
                              ✕ Your Choice
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* BCS Literature Explanation Card */}
                {item.explanation && (
                  <div className="mt-4 bg-indigo-50/70 border border-indigo-100/90 rounded-xl p-3.5 text-xs text-indigo-950 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-indigo-900 block mb-0.5 bangla-text">
                        বিসিএস সাহিত্য নোট / ব্যাখ্যা (Literary Insight):
                      </span>
                      <p className="text-slate-700 leading-relaxed english-sans text-[13px]">
                        {item.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
