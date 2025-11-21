// src/lib/types.ts

export type DailyHabit = {
  id?: string;
  title?: string;
  name?: string;
  label?: string;
  completed?: boolean;
  [key: string]: any;
};


export type Stats = {
  minutesFocused: number;
  sessionsCompleted: number;
  daysStreak: number;
  [key: string]: any;
};

export type UserProfile = {
  name?: string;
  [key: string]: any;
};

// (o QuizAnswers continua igual)
export interface QuizAnswers {
  userName: string;
  ageRange: 'menos-18' | '18-24' | '25-34' | '35-44' | '45-54' | '55+';
  focusDifficulty: 'nao' | 'as-vezes' | 'quase-sempre';
  impulseCycles: string[];
  phoneFreeTime: 'menos-30' | '30-60' | '1-3h' | '3-5h' | '5h+';
  mainGoal:
    | 'produtividade'
    | 'menos-celular'
    | 'parar-procrastinar'
    | 'melhorar-sono'
    | 'controle-impulsos'
    | 'outro';
}
