export interface UserProfile {
  name: string;
  photo?: string;
  dailyGoal: number;
  theme: 'light' | 'dark';
  notifications: boolean;
  isPremium: boolean;
}

export interface QuizAnswers {
  distraction: string;
  focusTime: number;
  goal: string;
  feeling: string;
}

export interface DailyHabit {
  id: string;
  label: string;
  completed: boolean;
}

export interface Stats {
  streak: number;
  minutesFocused: number;
  habitsCompleted: number;
  impulsesControlled: number;
  averageProgress: number;
  lastActiveDate: string;
}

export interface FocusSession {
  duration: number;
  startTime: Date;
  completed: boolean;
}
