import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { TimeNoticeCard } from './components/TimeNoticeCard';
import { RegistrationCard } from './components/RegistrationCard';
import { ExamInterface } from './components/ExamInterface';
import { ResultInterface } from './components/ResultInterface';
import { ReviewSection } from './components/ReviewSection';
import { SettingsModal } from './components/SettingsModal';
import { questions, EXAM_DURATION_MINUTES, DEFAULT_SCRIPT_URL_KEY, DEFAULT_EXAM_MODE_KEY } from './data/questions';
import { StudentData, ExamResult, ExamStatus } from './types/exam';
import { playSubmitChime, playWarningBeep, playSelectTick } from './utils/sound';

export default function App() {
  const [examStatus, setExamStatus] = useState<ExamStatus>('not_started');
  const [examMode, setExamMode] = useState<'live' | 'open'>(() => {
    return (localStorage.getItem(DEFAULT_EXAM_MODE_KEY) as 'live' | 'open') || 'open';
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [scriptUrl, setScriptUrl] = useState(() => {
    return localStorage.getItem(DEFAULT_SCRIPT_URL_KEY) || '';
  });

  const [studentData, setStudentData] = useState<StudentData>({ name: '', roll: '' });
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(EXAM_DURATION_MINUTES * 60);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const [syncStatus, setSyncStatus] = useState<string>('ফলাফল গুগল শিটে প্রেরণের অপেক্ষায়...');
  const [isSyncing, setIsSyncing] = useState(false);

  // Time window state for scheduled exam (8:00 PM to 9:00 PM)
  const [currentTime, setCurrentTime] = useState(new Date());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clock tick to track real-world time for window checks
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const startTime = 20 * 60; // 8:00 PM (20:00)
  const endTime = 21 * 60;   // 9:00 PM (21:00)
  const isBeforeStart = currentMinutes < startTime;
  const isAfterEnd = currentMinutes > endTime;
  const isWithinLiveWindow = currentMinutes >= startTime && currentMinutes <= endTime;

  // Formatted current time string
  const currentTimeString = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  // Countdown timer during in_progress
  useEffect(() => {
    if (examStatus === 'in_progress') {
      timerRef.current = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          // Play warning beeps at 5 mins (300s) and 1 min (60s)
          if (prev === 300 || prev === 60) {
            playWarningBeep(soundEnabled);
          }

          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleAutoSubmit('সময় সমাপ্ত! আপনার পরীক্ষা স্বয়ংক্রিয়ভাবে জমা করা হয়েছে।');
            return 0;
          }

          // Check if live mode exceeded end time
          if (examMode === 'live') {
            const now = new Date();
            const nowMin = now.getHours() * 60 + now.getMinutes();
            if (nowMin > endTime) {
              if (timerRef.current) clearInterval(timerRef.current);
              handleAutoSubmit('রাত ৯:০০ টার নির্ধারিত সময় অতিক্রম করায় পরীক্ষা জমা দেওয়া হয়েছে।');
              return 0;
            }
          }

          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examStatus, examMode, soundEnabled]);

  const handleStartExam = (data: StudentData) => {
    setStudentData(data);
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeLeftSeconds(EXAM_DURATION_MINUTES * 60);
    setExamStatus('in_progress');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAnswer = (qId: number, optIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    playSelectTick(soundEnabled);
  };

  const handleClearAnswer = (qId: number) => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const handleToggleFlag = (qId: number) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const calculateResult = (): ExamResult => {
    let correctCount = 0;
    let incorrectCount = 0;

    questions.forEach((item) => {
      const userChoice = userAnswers[item.id];
      if (userChoice !== undefined) {
        if (userChoice === item.ans) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    });

    const answeredCount = Object.keys(userAnswers).length;
    const unansweredCount = questions.length - answeredCount;
    const negativePenalty = incorrectCount * 0.5;
    const finalScore = correctCount - negativePenalty;
    const accuracy = answeredCount > 0 ? (correctCount / answeredCount) * 100 : 0;
    const timeSpentSeconds = EXAM_DURATION_MINUTES * 60 - timeLeftSeconds;

    return {
      studentName: studentData.name,
      studentRoll: studentData.roll,
      totalQuestions: questions.length,
      answeredCount,
      unansweredCount,
      correctCount,
      incorrectCount,
      negativePenalty,
      finalScore,
      accuracy,
      timeSpentSeconds,
      submittedAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      answers: { ...userAnswers },
    };
  };

  const sendResultToGoogleSheet = async (res: ExamResult) => {
    const url = scriptUrl.trim();
    if (!url) {
      setSyncStatus('গুগল শিট URL কনফিগার করা হয়নি (সেটিংস থেকে যোগ করতে পারেন)।');
      return;
    }

    setIsSyncing(true);
    setSyncStatus('ফলাফল গুগল শিটে রেকর্ড করা হচ্ছে...');

    const payload = {
      name: res.studentName,
      roll: res.studentRoll,
      correct: res.correctCount,
      incorrect: res.incorrectCount,
      score: res.finalScore,
      accuracy: `${res.accuracy.toFixed(1)}%`,
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setSyncStatus('✓ আপনার ফলাফল সফলভাবে গুগল স্প্রেডশিটে রেকর্ড করা হয়েছে!');
    } catch {
      setSyncStatus('গুগল শিটে সংযোগ করা সম্ভব হয়নি। নেটওয়ার্ক চেক করুন।');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSubmitExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const result = calculateResult();
    setExamResult(result);
    setExamStatus('submitted');
    playSubmitChime(soundEnabled);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    sendResultToGoogleSheet(result);
  };

  const handleAutoSubmit = (alertMsg: string) => {
    const result = calculateResult();
    setExamResult(result);
    setExamStatus('submitted');
    playSubmitChime(soundEnabled);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    sendResultToGoogleSheet(result);
    // Display subtle auto-submit notification
    setTimeout(() => {
      alert(alertMsg);
    }, 200);
  };

  const handleRetakeExam = () => {
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeLeftSeconds(EXAM_DURATION_MINUTES * 60);
    setExamResult(null);
    setIsReviewOpen(false);
    setExamStatus('not_started');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateExamMode = (mode: 'live' | 'open') => {
    setExamMode(mode);
    localStorage.setItem(DEFAULT_EXAM_MODE_KEY, mode);
  };

  // Determine whether to display the Time Notice Card:
  // If examMode is 'live' and we are outside the 8:00 PM - 9:00 PM window and exam hasn't started yet
  const shouldShowTimeNotice = examMode === 'live' && !isWithinLiveWindow && examStatus === 'not_started';

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 flex flex-col font-sans">
      {/* Top Application Header */}
      <Header
        status={examStatus}
        timeLeftSeconds={timeLeftSeconds}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        examMode={examMode}
        answeredCount={Object.keys(userAnswers).length}
        totalQuestions={questions.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Step 0: Scheduled Window Notice Card */}
        {shouldShowTimeNotice && (
          <TimeNoticeCard
            isBeforeStart={isBeforeStart}
            isAfterEnd={isAfterEnd}
            currentTimeString={currentTimeString}
            onEnterPracticeMode={() => handleUpdateExamMode('open')}
          />
        )}

        {/* Step 1: Candidate Registration */}
        {!shouldShowTimeNotice && examStatus === 'not_started' && (
          <RegistrationCard
            onStart={handleStartExam}
            examMode={examMode}
          />
        )}

        {/* Step 2: Live Exam Interface */}
        {examStatus === 'in_progress' && (
          <ExamInterface
            studentData={studentData}
            questions={questions}
            userAnswers={userAnswers}
            flaggedQuestions={flaggedQuestions}
            onSelectAnswer={handleSelectAnswer}
            onClearAnswer={handleClearAnswer}
            onToggleFlag={handleToggleFlag}
            onSubmit={handleSubmitExam}
          />
        )}

        {/* Step 3: Result & Review View */}
        {examStatus === 'submitted' && examResult && (
          <div className="space-y-6">
            <ResultInterface
              result={examResult}
              isReviewOpen={isReviewOpen}
              onToggleReview={() => setIsReviewOpen((prev) => !prev)}
              onRetake={handleRetakeExam}
              syncStatus={syncStatus}
              isSyncing={isSyncing}
              onResync={() => sendResultToGoogleSheet(examResult)}
            />

            {/* Answer sheet review section */}
            {isReviewOpen && (
              <ReviewSection
                questions={questions}
                userAnswers={examResult.answers}
              />
            )}
          </div>
        )}
      </main>

      {/* Bottom Footer with Official Academy Address & Contacts */}
      <footer className="bg-white border-t border-slate-200/90 py-5 px-6 text-xs text-slate-600 no-print">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-indigo-950 uppercase english-sans">CPR Medical Academy</span>
              <span className="text-slate-300">·</span>
              <span className="text-indigo-700 font-medium bangla-text">বিসিএস স্পেশাল ক্রিস্টাল ব্যাচ</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <a
                href="https://www.facebook.com/profile.php?id=61574859873464"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-800 font-semibold flex items-center gap-1.5"
              >
                <span>অফিসিয়াল ফেসবুক পেইজ</span>
              </a>
              <span className="text-slate-300">·</span>
              <span className="text-slate-700 font-medium">
                হটলাইন: <strong className="text-slate-900 font-mono">01898-938981 (WhatsApp)</strong> / <strong className="text-slate-900 font-mono">01898-938982</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <p className="bangla-text">
              <strong>ঠিকানা:</strong> মতি টাওয়ার (৫ম তলা), গুলজার মোড়, চকবাজার, চট্টগ্রাম (EBL ব্যাংকের ATM বুথের ডান পাশে লিফটের ৪ তলা)
            </p>
            <p>© {new Date().getFullYear()} CPR Medical Academy · সর্বস্বত্ব সংরক্ষিত</p>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        examMode={examMode}
        onUpdateExamMode={handleUpdateExamMode}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onScriptUrlChange={(url) => setScriptUrl(url)}
      />
    </div>
  );
}
