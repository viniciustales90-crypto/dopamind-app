import { DailyHabit, Stats, UserProfile, QuizAnswers } from './types';

const STORAGE_KEYS = {
  USER_PROFILE: 'dopamind_user_profile',
  QUIZ_ANSWERS: 'dopamind_quiz_answers',
  DAILY_HABITS: 'dopamind_daily_habits',
  STATS: 'dopamind_stats',
  ONBOARDING_COMPLETE: 'dopamind_onboarding_complete',
  LAST_RESET_DATE: 'dopamind_last_reset_date',
};

export const storage = {
  // User Profile
  getUserProfile: (): UserProfile | null => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : null;
  },
  setUserProfile: (profile: UserProfile) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  // Quiz Answers
  getQuizAnswers: (): QuizAnswers | null => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.QUIZ_ANSWERS);
    return data ? JSON.parse(data) : null;
  },
  setQuizAnswers: (answers: QuizAnswers) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.QUIZ_ANSWERS, JSON.stringify(answers));
  },

  // Daily Habits
  getDailyHabits: (): DailyHabit[] => {
    if (typeof window === 'undefined') return getDefaultHabits();
    const data = localStorage.getItem(STORAGE_KEYS.DAILY_HABITS);
    return data ? JSON.parse(data) : getDefaultHabits();
  },
  setDailyHabits: (habits: DailyHabit[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.DAILY_HABITS, JSON.stringify(habits));
  },

  // Stats
  getStats: (): Stats => {
    if (typeof window === 'undefined') return getDefaultStats();
    const data = localStorage.getItem(STORAGE_KEYS.STATS);
    return data ? JSON.parse(data) : getDefaultStats();
  },
  setStats: (stats: Stats) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  },

  // Onboarding
  isOnboardingComplete: (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE) === 'true';
  },
  setOnboardingComplete: () => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');
  },

  // Last Reset Date
  getLastResetDate: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.LAST_RESET_DATE);
  },
  setLastResetDate: (date: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.LAST_RESET_DATE, date);
  },
};

export const getDefaultHabits = (): DailyHabit[] => [
  { id: '1', label: '5 minutos sem celular', completed: false },
  { id: '2', label: '1 respiração profunda', completed: false },
  { id: '3', label: 'Beber água', completed: false },
  { id: '4', label: 'Organizar o ambiente', completed: false },
  { id: '5', label: 'Estudar/Trabalhar por 5 min', completed: false },
];

export const getDefaultStats = (): Stats => ({
  streak: 0,
  minutesFocused: 0,
  habitsCompleted: 0,
  impulsesControlled: 0,
  averageProgress: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
});

export const checkAndResetDailyHabits = () => {
  const today = new Date().toISOString().split('T')[0];
  const lastReset = storage.getLastResetDate();

  if (lastReset !== today) {
    // Reset habits
    storage.setDailyHabits(getDefaultHabits());
    storage.setLastResetDate(today);

    // Update streak
    const stats = storage.getStats();
    const lastActiveDate = stats.lastActiveDate;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastActiveDate === yesterdayStr) {
      // Continue streak
      stats.streak += 1;
    } else if (lastActiveDate !== today) {
      // Reset streak
      stats.streak = 0;
    }

    stats.lastActiveDate = today;
    storage.setStats(stats);
  }
};

export const calculateDailyProgress = (habits: DailyHabit[], minutesFocused: number): number => {
  const habitsCompleted = habits.filter(h => h.completed).length;
  const habitsProgress = (habitsCompleted / habits.length) * 70; // 70% weight
  const focusProgress = Math.min((minutesFocused / 15) * 30, 30); // 30% weight, max 15 min
  return Math.round(habitsProgress + focusProgress);
};
