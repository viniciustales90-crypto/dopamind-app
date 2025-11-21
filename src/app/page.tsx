'use client';

import { useEffect, useState } from 'react';
import QuizFlow from '@/components/quiz/QuizFlow';
import MainApp from '@/components/MainApp';
import { storage } from '@/lib/storage';
import type { QuizAnswers } from '@/lib/types';
import { Button } from '@/components/ui/button';

type View = 'quiz' | 'result' | 'checkout' | 'app';
type PlanId = 'annual' | 'monthly' | 'lifetime';

interface ResultData {
  focusIssue: string;
  stateLabel: string;
  impulseLabel: string;
}

const PLAN_INFO: Record<
  PlanId,
  { title: string; price: string; description: string }
> = {
  annual: {
    title: 'Plano Anual',
    price: 'R$ 14,90/mês',
    description: 'Economize 58% • Mais escolhido',
  },
  monthly: {
    title: 'Plano Mensal',
    price: 'R$ 29,90',
    description: 'Comece sem compromisso',
  },
  lifetime: {
    title: 'Acesso Vitalício',
    price: 'R$ 199,00',
    description: 'Pague uma vez • Acesso para sempre',
  },
};

// ==========================
// Mapeia respostas do quiz → diagnóstico
// ==========================
function mapQuizToResult(quiz: QuizAnswers): ResultData {
  // 1) Foco comprometido
  let focusIssue = 'oscilações de foco';

  if (quiz.focusDifficulty === 'nao') {
    focusIssue = 'distrações pontuais';
  } else if (quiz.focusDifficulty === 'as-vezes') {
    focusIssue = 'dificuldade moderada de foco';
  } else if (quiz.focusDifficulty === 'quase-sempre') {
    focusIssue = 'ansiedade e dificuldade intensa de foco';
  }

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
  }

  // 2) Estado geral (estresse / sobrecarga)
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

  // 3) Impulso dominante
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
  }

  return { focusIssue, stateLabel, impulseLabel };
}

export default function Page() {
  const [view, setView] = useState<View>('quiz');
  const [quiz, setQuiz] = useState<QuizAnswers | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);
  const [plan, setPlan] = useState<PlanId | null>(null);

  // Sempre que entrar em RESULT ou CHECKOUT, carrega o quiz do storage
  useEffect(() => {
    if (view === 'result' || view === 'checkout') {
      const storedQuiz = storage.get<QuizAnswers>('dopamind-quiz');
      if (storedQuiz) {
        setQuiz(storedQuiz);
        setResult(mapQuizToResult(storedQuiz));
      }
    }
  }, [view]);

  const name = (quiz?.userName || 'Seu').toUpperCase();

  // =======================
  // RENDER: QUIZ
  // =======================
  if (view === 'quiz') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <QuizFlow onComplete={() => setView('result')} />
      </div>
    );
  }

  // =======================
  // RENDER: APP (MainApp)
  // =======================
  if (view === 'app') {
    return <MainApp />;
  }

  // =======================
  // RENDER: CHECKOUT FAKE
  // =======================
  if (view === 'checkout') {
    // se não tiver plano (refresh), volta pro resultado
    const currentPlan: PlanId = plan ?? 'annual';
    const info = PLAN_INFO[currentPlan];

    return (
      <div className="min-h-screen w-full bg-white">
        <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 py-10">
          <h1 className="mb-4 text-xl font-semibold text-neutral-900">
            Finalize seu acesso
          </h1>

          <p className="mb-6 text-sm text-neutral-500 text-center">
            Você escolheu o{' '}
            <span className="font-semibold">{info.title}</span>.{' '}
            Por enquanto esta é uma tela de checkout simulada apenas para
            testes do fluxo do DopaMind.
          </p>

          <div className="mb-6 w-full rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
            <p className="text-sm font-semibold text-neutral-900">
              {info.title}
            </p>
            <p className="text-xs text-neutral-500">{info.description}</p>
            <p className="mt-2 text-lg font-semibold text-neutral-900">
              {info.price}
            </p>
          </div>

          <Button
            className="w-full rounded-full"
            onClick={() => setView('app')}
          >
            Acessar aplicativo DopaMind
          </Button>

          <p className="mt-3 text-[11px] text-center text-neutral-400">
            Depois que você integrar o pagamento real, esta tela pode ser usada
            como página de sucesso.
          </p>
        </div>
      </div>
    );
  }

  // =======================
  // RENDER: RESULTADO
  // (view === 'result')
  // =======================
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
              onClick={() => {
                setPlan('annual');
                setView('checkout');
              }}
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
              onClick={() => {
                setPlan('monthly');
                setView('checkout');
              }}
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
              onClick={() => {
                setPlan('lifetime');
                setView('checkout');
              }}
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
