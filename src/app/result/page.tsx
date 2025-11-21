'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import type { QuizAnswers } from '@/lib/types';

type PlanId = 'annual' | 'monthly' | 'lifetime';

interface ResultData {
  focusIssue: string;
  stateLabel: string;
  impulseLabel: string;
}

function mapQuizToResult(quiz: QuizAnswers): ResultData {
  // ==========================
  // 1) Foco comprometido
  // ==========================
  let focusIssue = 'oscilações de foco';

  if (quiz.focusDifficulty === 'nao') {
    focusIssue = 'distrações pontuais';
  } else if (quiz.focusDifficulty === 'as-vezes') {
    focusIssue = 'dificuldade moderada de foco';
  } else if (quiz.focusDifficulty === 'quase-sempre') {
    focusIssue = 'ansiedade e dificuldade intensa de foco';
  }

  // refina pelo objetivo principal
  switch (quiz.mainGoal) {
    case 'produtividade':
      focusIssue = 'queda de produtividade por falta de foco';
      break;
    case 'menos-celular':
      focusIssue = 'excesso de estímulos no celular';
      break;
    case 'parar-procrastinar':
      focusIssue = 'procrastinação ligada à dopamina';
      break;
    case 'melhorar-sono':
      focusIssue = 'alterações no sono ligadas à dopamina';
      break;
    case 'controle-impulsos':
      focusIssue = 'impulsos digitais fora de controle';
      break;
    // "outro" mantém o que já veio
  }

  // ==========================
  // 2) Estado geral (estresse / sobrecarga)
  // ==========================
  let stateLabel = 'estresse moderado';

  switch (quiz.phoneFreeTime) {
    case 'menos-30':
    case '30-60':
      stateLabel = 'estresse elevado';
      break;
    case '1-3h':
      stateLabel = 'sobrecarga mental';
      break;
    case '3-5h':
      stateLabel = 'em processo de ajuste';
      break;
    case '5h+':
      stateLabel = 'equilíbrio em construção';
      break;
  }

  // ==========================
  // 3) Impulso dominante
  // ==========================
  const impulses = quiz.impulseCycles || [];
  const first = impulses[0];

  let impulseLabel = 'redes-repetição';

  switch (first) {
    case 'scroll-infinito':
      impulseLabel = 'scroll infinito em redes sociais';
      break;
    case 'videos-curtos':
      impulseLabel = 'vídeos curtos em excesso';
      break;
    case 'procrastinacao':
      impulseLabel = 'procrastinação recorrente';
      break;
    case 'games-excesso':
      impulseLabel = 'jogos eletrônicos em excesso';
      break;
    case 'outros-impulsos':
      impulseLabel = 'impulsos digitais variados';
      break;
    // se não tiver nada, mantém "redes-repetição"
  }

  return { focusIssue, stateLabel, impulseLabel };
}

export default function ResultPage() {
  const router = useRouter();
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

  function handleChoosePlan(plan: PlanId) {
    // guarda plano escolhido para usar no checkout
    storage.set('dopamind-plan', plan);
    router.push('/checkout');
  }

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
              {result?.focusIssue || 'oscilações de foco'}
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
              {result?.focusIssue || 'oscilações de foco'}
            </span>
          </div>

          <div className="mx-auto w-full max-w-lg rounded-full bg-neutral-50 px-4 py-3 text-center text-sm text-neutral-700">
            Você apresenta sinais de:{' '}
            <span className="font-semibold text-neutral-900">
              {result?.stateLabel || 'estresse moderado'}
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
              onClick={() => handleChoosePlan('annual')}
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
              onClick={() => handleChoosePlan('monthly')}
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
              onClick={() => handleChoosePlan('lifetime')}
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
