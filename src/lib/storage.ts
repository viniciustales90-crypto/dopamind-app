// src/lib/storage.ts

import type { DailyHabit, Stats, UserProfile, QuizAnswers } from './types';

// chaves no localStorage
const USER_PROFILE_KEY = 'dopamind-user-profile';
const QUIZ_ANSWERS_KEY = 'dopamind-quiz';
const DAILY_HABITS_KEY = 'dopamind-daily-habits';
const STATS_KEY = 'dopamind-stats';
const LAST_RESET_KEY = 'dopamind-last-reset-date';

// ----------------- helpers base -----------------

function baseGet<T = unknown>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error('storage.get error', error);
    return null;
  }
}

function baseSet(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('storage.set error', error);
  }
}

function baseRemove(key: string) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error('storage.remove error', error);
  }
}

// ----------------- objeto storage -----------------

export const storage = {
  // genéricos (usados no quiz / result)
  get: baseGet,
  set: baseSet,
  remove: baseRemove,

  // perfil
  getUserProfile(): UserProfile | null {
    return baseGet<UserProfile>(USER_PROFILE_KEY);
  },

  setUserProfile(profile: UserProfile) {
    baseSet(USER_PROFILE_KEY, profile);
  },

  // quiz dopamind
  getQuizAnswers(): QuizAnswers | null {
    return baseGet<QuizAnswers>(QUIZ_ANSWERS_KEY);
  },

  setQuizAnswers(answers: QuizAnswers) {
    baseSet(QUIZ_ANSWERS_KEY, answers);
  },

  // hábitos diários
  getDailyHabits(): DailyHabit[] {
    return baseGet<DailyHabit[]>(DAILY_HABITS_KEY) ?? [];
  },

  setDailyHabits(habits: DailyHabit[]) {
    baseSet(DAILY_HABITS_KEY, habits);
  },

  // stats
  getStats(): Stats {
    return (
      baseGet<Stats>(STATS_KEY) ?? {
        minutesFocused: 0,
        sessionsCompleted: 0,
        daysStreak: 0,
      }
    );
  },

  setStats(stats: Stats) {
    baseSet(STATS_KEY, stats);
  },
};

// ----------------- progresso diário -----------------

export function calculateDailyProgress(habits: DailyHabit[]): number {
  if (!habits || habits.length === 0) return 0;

  const completed = habits.filter((h: DailyHabit) => {
    if (!h) return false;
    if (typeof h.completed === 'boolean') return h.completed;
    if (typeof h.done === 'boolean') return h.done;
    if (typeof h.isCompleted === 'boolean') return h.isCompleted;
    return false;
  }).length;

  return Math.round((completed / habits.length) * 100);
}

// ----------------- reset diário dos hábitos -----------------

export function checkAndResetDailyHabits(): DailyHabit[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const lastReset = baseGet<string>(LAST_RESET_KEY);

  let habits = storage.getDailyHabits();

  // se nunca resetou ou o dia mudou, zera os "completed"
  if (!lastReset || lastReset !== today) {
    habits = habits.map((h: DailyHabit) => ({
      ...h,
      completed: false,
      done: false,
      isCompleted: false,
    }));

    storage.setDailyHabits(habits);
    baseSet(LAST_RESET_KEY, today);
  }

  return habits;
}
