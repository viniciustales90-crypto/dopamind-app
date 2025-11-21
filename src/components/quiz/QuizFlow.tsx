'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/storage';
import type { QuizAnswers } from '@/lib/types';

interface QuizFlowProps {
  onComplete: () => void;
}

type QuestionType = 'text' | 'single' | 'multi';

interface QuizQuestion {
  question: string;
  key: keyof QuizAnswers;
  type: QuestionType;
  placeholder?: string;
  helperText?: string;
  options?: {
    value: string;
    label: string;
  }[];
}

export default function QuizFlow({ onComplete }: QuizFlowProps) {
  const [step, setStep] = useState(0); // 0-based
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [submitting, setSubmitting] = useState(false);

  // ===============================
  //          NOVO QUIZ
  // ===============================
  const questions: QuizQuestion[] = [
    // 1 — Nome
    {
      question: 'Como você gostaria de ser chamado?',
      type: 'text',
      key: 'userName',
      placeholder: 'Ex: Vinícius',
      helperText: 'Usaremos esse nome nas suas rotinas e mensagens.',
    },

    // 2 — Idade (faixas)
    {
      question: 'Qual é sua idade?',
      type: 'single',
      key: 'ageRange',
      options: [
        { value: 'menos-18', label: 'Menos de 18' },
        { value: '18-24', label: '18 a 24' },
        { value: '25-34', label: '25 a 34' },
        { value: '35-44', label: '35 a 44' },
        { value: '45-54', label: '45 a 54' },
        { value: '55+', label: '55 ou mais' },
      ],
    },

    // 3 — Dificuldade de foco
    {
      question: 'Você sente dificuldade de focar no dia a dia?',
      type: 'single',
      key: 'focusDifficulty',
      options: [
        { value: 'nao', label: 'Não' },
        { value: 'as-vezes', label: 'Às vezes' },
        { value: 'quase-sempre', label: 'Quase sempre' },
      ],
    },

    // 4 — Ciclos de impulsos
    {
      question:
        'Você sente que está preso em ciclos de impulsos (celular, redes sociais, procrastinação)?',
      type: 'multi',
      key: 'impulseCycles',
      helperText: 'Pode marcar mais de uma opção.',
      options: [
        { value: 'scroll-infinito', label: 'Scroll infinito em redes sociais' },
        { value: 'videos-curtos', label: 'Vídeos curtos (Reels, TikTok, Shorts)' },
        { value: 'procrastinacao', label: 'Procrastinação para estudar/trabalhar' },
        { value: 'games-excesso', label: 'Jogar em excesso' },
        { value: 'outros-impulsos', label: 'Outros impulsos digitais' },
      ],
    },

    // 5 — Tempo longe do celular
    {
      question: 'Quanto tempo por dia você consegue ficar longe do celular?',
      type: 'single',
      key: 'phoneFreeTime',
      options: [
        { value: 'menos-30', label: 'Menos de 30 minutos' },
        { value: '30-60', label: '30 min a 1 hora' },
        { value: '1-3h', label: '1 a 3 horas' },
        { value: '3-5h', label: '3 a 5 horas' },
        { value: '5h+', label: 'Mais de 5 horas' },
      ],
    },

    // 6 — Objetivo principal
    {
      question: 'Qual é o seu principal objetivo com o DopaMind agora?',
      type: 'single',
      key: 'mainGoal',
      options: [
        { value: 'produtividade', label: 'Aumentar minha produtividade' },
        { value: 'menos-celular', label: 'Ficar menos no celular' },
        { value: 'parar-procrastinar', label: 'Parar de procrastinar' },
        { value: 'melhorar-sono', label: 'Melhorar meu sono' },
        { value: 'controle-impulsos', label: 'Controlar melhor impulsos/dopamina' },
        { value: 'outro', label: 'Outro objetivo' },
      ],
    },
  ];

  const totalSteps = questions.length;
  const currentQuestion = questions[step];

  function updateAnswer(key: keyof QuizAnswers, value: any) {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function toggleMultiValue(key: keyof QuizAnswers, value: string) {
    const current = (answers[key] as string[]) || [];
    const exists = current.includes(value);

    const next = exists ? current.filter((v) => v !== value) : [...current, value];

    setAnswers((prev) => ({
      ...prev,
      [key]: next,
    }));
  }

  function canGoNext() {
    if (!currentQuestion) return false;
    const key = currentQuestion.key;
    const value = answers[key];

    if (currentQuestion.type === 'multi') {
      return Array.isArray(value) && (value as string[]).length > 0;
    }

    if (currentQuestion.type === 'text') {
      return typeof value === 'string' && value.trim().length > 1;
    }

    // single
    return value !== undefined && value !== null && value !== '';
  }

  async function handleNext() {
    if (!canGoNext()) return;

    // se não é a última pergunta, só avança
    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
      return;
    }

    // última pergunta → salvar e finalizar
    try {
      setSubmitting(true);
      storage.set('dopamind-quiz', answers); // salva no localStorage
      onComplete();
    } finally {
      setSubmitting(false);
    }
  }

  function handlePrev() {
    if (step === 0) return;
    setStep((prev) => prev - 1);
  }

  if (!currentQuestion) return null;

  const progress = Math.round(((step + 1) / totalSteps) * 100);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        {/* Progress */}
        <div className="mb-4 flex items-center justify-between text-xs text-neutral-500">
          <span>
            Passo {step + 1} de {totalSteps}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full rounded-full bg-black transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Pergunta */}
        <h1 className="mb-2 text-xl font-semibold text-neutral-900">
          {currentQuestion.question}
        </h1>
        {currentQuestion.helperText && (
          <p className="mb-4 text-sm text-neutral-500">{currentQuestion.helperText}</p>
        )}

        {/* Campo */}
        <div className="mb-6">
          {currentQuestion.type === 'text' && (
            <input
              type="text"
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm outline-none transition focus:border-neutral-900 focus:bg-white"
              placeholder={currentQuestion.placeholder}
              value={(answers[currentQuestion.key] as string) || ''}
              onChange={(e) => updateAnswer(currentQuestion.key, e.target.value)}
            />
          )}

          {currentQuestion.type === 'single' && currentQuestion.options && (
            <div className="flex flex-col gap-2">
              {currentQuestion.options.map((opt) => {
                const selected = answers[currentQuestion.key] === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => updateAnswer(currentQuestion.key, opt.value)}
                    className={[
                      'w-full rounded-2xl border px-3 py-2 text-left text-sm transition',
                      selected
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-800 hover:border-neutral-400',
                    ].join(' ')}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}

          {currentQuestion.type === 'multi' && currentQuestion.options && (
            <div className="flex flex-col gap-2">
              {currentQuestion.options.map((opt) => {
                const current = (answers[currentQuestion.key] as string[]) || [];
                const selected = current.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleMultiValue(currentQuestion.key, opt.value)}
                    className={[
                      'w-full rounded-2xl border px-3 py-2 text-left text-sm transition',
                      selected
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-800 hover:border-neutral-400',
                    ].join(' ')}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Navegação */}
        <div className="flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={handlePrev}
            disabled={step === 0 || submitting}
          >
            Voltar
          </Button>

          <Button
            type="button"
            className="flex-1"
            onClick={handleNext}
            disabled={!canGoNext() || submitting}
          >
            {step === totalSteps - 1 ? 'Começar jornada' : 'Continuar'}
          </Button>
        </div>
      </div>
    </div>
  );
}
