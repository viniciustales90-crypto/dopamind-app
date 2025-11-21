// src/lib/storage.ts

import type { DailyHabit, Stats, UserProfile, QuizAnswers } from './types';

// chaves usadas no localStorage
const USER_PROFILE_KEY = 'dopamind-user-profile';
const QUIZ_ANSWERS_KEY = 'dopamind-quiz';
const DAILY_HABITS_KEY = 'dopamind-daily-habits';
const STATS_KEY = 'dopamind-stats';

// ---------- helpers base genéricos ----------

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

// ---------- objeto storage usado no app inteiro ----------

export const storage = {
  // genéricos
  get: baseGet,
  set: baseSet,
  remove: baseRemove,

  // helpers antigos (pra não quebrar nada do template)
  getUserProfile(): UserProfile | null {
    return baseGet<UserProfile>(USER_PROFILE_KEY);
  },

  setUserProfile(profile: UserProfile) {
    baseSet(USER_PROFILE_KEY, profile);
  },

  getQuizAnswers(): QuizAnswers | null {
    return baseGet<QuizAnswers>(QUIZ_ANSWERS_KEY);
  },

  setQuizAnswers(answers: QuizAnswers) {
    baseSet(QUIZ_ANSWERS_KEY, answers);
  },

  getDailyHabits(): DailyHabit[] {
    return baseGet<DailyHabit[]>(DAILY_HABITS_KEY) ?? [];
  },

  setDailyHabits(habits: DailyHabit[]) {
    baseSet(DAILY_HABITS_KEY, habits);
  },

  getStats(): Stats | null {
    return baseGet<Stats>(STATS_KEY);
  },

  setStats(stats: Stats) {
    baseSet(STATS_KEY, stats);
  },
};

// ---------- cálculo de progresso diário ----------

export function calculateDailyProgress(habits: DailyHabit[]): number {
  if (!habits || habits.length === 0) return 0;

  const completed = habits.filter((h: any) => {
    if (!h) return false;
    if (typeof h.completed === 'boolean') return h.completed;
    if (typeof h.done === 'boolean') return h.done;
    if (typeof h.isCompleted === 'boolean') return h.isCompleted;
    return false;
  }).length;

  return Math.round((completed / habits.length) * 100);
}
