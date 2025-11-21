// lib/types.ts

export interface QuizAnswers {
  userName: string;
  ageRange: 'menos-18' | '18-24' | '25-34' | '35-44' | '45-54' | '55+';
  focusDifficulty: 'nao' | 'as-vezes' | 'quase-sempre';
  impulseCycles: string[]; // multi-select
  phoneFreeTime: 'menos-30' | '30-60' | '1-3h' | '3-5h' | '5h+';
  mainGoal:
    | 'produtividade'
    | 'menos-celular'
    | 'parar-procrastinar'
    | 'melhorar-sono'
    | 'controle-impulsos'
    | 'outro';
}
