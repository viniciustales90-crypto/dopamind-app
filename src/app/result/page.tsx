'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import type { QuizAnswers } from '@/lib/types';

interface ResultData {
  focusIssue: string;
  stateLabel: string;
  impulseLabel: string;
}

function mapQuizToResult(quiz: QuizAnswers): ResultData {
  let focusIssue = 'ansiedade';
  let stateLabel = 'estressado';
  let impulseLabel = 'redes-repeticao';

  // depois você pode usar quiz.phoneFreeTime, quiz.mainGoal, etc. pra personalizar
  return { focusIssue, stateLabel, impulseLabel };
}

export default function ResultPage() {
  const [quiz, setQuiz] = useState<QuizAnswers | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);

  useEffect(() => {
    const stored = storage.get<QuizAnswers>('dopamind-quiz');
    if (stored) {
      setQuiz(stored);
      setResult(mapQuizToResult(stored));
    }
  }, []);

  const name = (quiz?.userName || 'Seu').toUpperCase();

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-10">
        {/* Título + descrição */}
        <div className="w-full text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            {name}, seu resultado está pronto.
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-neutral-500 md:text-base">
            Detectamos sinais claros de{' '}
            <span className="font-semibold text-neutral-900">
              desequilíbrio dopaminérgico
            </span>{' '}
            associados a{' '}
            <span className="font-semibold text-neutral-900">
              {result?.focusIssue || 'ansiedade'}
            </span>{' '}
            e impulsos como{' '}
            <span className="font-semibold text-neutral-900">
              {result?.impulseLabel || 'redes-repetição'}
            </span>
            . Criamos um protocolo personalizado para restaurar seu foco e
            disciplina.
          </p>
        </div>

        {/* “Pílulas” */}
        <div className="mt-8 flex w-full flex-col gap-3">
          <div className="mx-auto w-full max-w-lg rounded-full bg-neutral-50 px-4 py-3 text-center text-sm text-neutral-700">
            Seu foco atual está comprometido por:{' '}
            <span className="font-semibold text-neutral-900">
              {result?.focusIssue || 'ansiedade'}
            </span>
          </div>

          <div className="mx-auto w-full max-w-lg rounded-full bg-neutral-50 px-4 py-3 text-center text-sm text-neutral-700">
            Você apresenta sinais de:{' '}
            <span className="font-semibold text-neutral-900">
              {result?.stateLabel || 'estressado'}
            </span>
          </div>

          <div className="mx-auto w-full max-w-lg rounded-full bg-neutral-50 px-4 py-3 text-center text-sm text-neutral-700">
            Impulso dominante:{' '}
            <span className="font-semibold text-neutral-900">
              {result?.impulseLabel || 'redes-repetição'}
            </span>
          </div>
        </div>

        {/* Planos */}
        <div className="mt-10 w-full max-w-lg">
          <h2 className="mb-4 text-center text-sm font-medium uppercase tracking-wide text-neutral-500">
            Escolha seu Protocolo DopaMind Pro
          </h2>

          <div className="flex flex-col gap-3">
            {/* Plano Anual (destaque) */}
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-2xl border border-blue-500 bg-blue-50 px-4 py-3 text-left shadow-sm transition hover:bg-blue-100"
            >
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  Plano Anual
                </p>
                <p className="text-xs text-blue-700">
                  Economize 58% • Mais escolhido
                </p>
              </div>
              <p className="text-sm font-semibold text-neutral-900">
                R$ 14,90/mês
              </p>
            </button>

            {/* Plano Mensal */}
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-neutral-400"
            >
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  Plano Mensal
                </p>
                <p className="text-xs text-neutral-500">
                  Comece sem compromisso
                </p>
              </div>
              <p className="text-sm font-semibold text-neutral-900">
                R$ 29,90
              </p>
            </button>

            {/* Vitalício */}
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-neutral-400"
            >
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  Acesso Vitalício
                </p>
                <p className="text-xs text-neutral-500">
                  Pague uma vez • Acesso para sempre
                </p>
              </div>
              <p className="text-sm font-semibold text-neutral-900">
                R$ 199,00
              </p>
            </button>
          </div>

          <p className="mt-4 text-center text-[11px] text-neutral-400">
            Todos os planos incluem o Protocolo DopaMind completo.
          </p>
        </div>
      </div>
    </div>
  );
}
