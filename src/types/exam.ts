export interface Question {
  id: number;
  q: string;
  opts: string[];
  ans: number; // 0-based index: 0 = a, 1 = b, 2 = c, 3 = d
  explanation?: string;
  category?: string;
}

export interface StudentData {
  name: string;
  roll: string;
}

export type ExamStatus = 'not_started' | 'registered' | 'in_progress' | 'submitted';

export interface ExamResult {
  studentName: string;
  studentRoll: string;
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
  correctCount: number;
  incorrectCount: number;
  negativePenalty: number;
  finalScore: number;
  accuracy: number;
  timeSpentSeconds: number;
  submittedAt: string;
  answers: Record<number, number>;
}
