'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/storage';
import { QuizAnswers } from '@/lib/types';

interface QuizFlowProps {
  onComplete: () => void;
}

export default function QuizFlow({ onComplete }: QuizFlowProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [finished, setFinished] = useState(false);

  // ===============================
  //          NOVO QUIZ
  // ===============================
  const questions = [
    // 1 — Nome
    {
      question: 'Como você gostaria de ser chamado?',
      type: 'text',
      key: 'userName' as keyof QuizAnswers,
    },

    // 2 — Idade
    {
      question: 'Qual é sua idade?',
      options: [
        { value: 'menos-18', label: 'Menos de 18' },
        { value: '18-24', label: '18 a 24' },
        { value: '25-34', label: '25 a 34' },
        { value: '35-44', label: '35 a 44' },
        { value: '45+', label: '45+' },
      ],
      key: 'age' as keyof QuizAnswers,
    },

    // 3 — Dor mental principal
    {
      question: 'O que mais está te atrapalhando hoje?',
      options: [
        { value: 'falta-foco', label: 'Falta de foco' },
        { value: 'ansiedade', label: 'Ansiedade' },
        { value: 'procrastinacao', label: 'Procrastinação' },
        { value: 'muito-celular', label: 'Muito tempo no celular' },
        { value: 'estimulos-demais', label: 'Estímulos demais' },
        { value: 'falta-disciplina', label: 'Falta de disciplina' },
      ],
      key: 'mainPain' as keyof QuizAnswers,
    },

    // 4 — Nível de foco
    {
      question: 'Por quanto tempo você consegue focar sem distrações?',
      options: [
        { value: 'menos-5', label: 'Menos de 5 min' },
        { value: '5-10', label: '5 a 10 min' },
        { value: '10-20', label: '10 a 20 min' },
        { value: 'mais-20', label: 'Mais de 20 min' },
      ],
      key: 'focusLevel' as keyof QuizAnswers,
    },

    // 5 — Impulso dominante
    {
      question: 'Qual desses impulsos você sente com mais frequência?',
      options: [
        { value: 'abrir-celular', label: 'Abrir o celular sem motivo' },
        { value: 'redes-repeticao', label: 'Checar redes sociais repetidamente' },
        { value: 'dopamina-rapida', label: 'Vídeos curtos (dopamina rápida)' },
        { value: 'pular-tarefas', label: 'Pular tarefas importantes' },
        { value: 'inquietacao', label: 'Inquietação' },
        { value: 'compulsao', label: 'Comportamentos impulsivos' },
      ],
      key: 'impulseType' as keyof QuizAnswers,
    },

    // 6 — Sintoma dominante
    {
      question: 'Como você tem se sentido nos últimos dias?',
      options: [
        { value: 'sem-foco', label: 'Sem foco' },
        { value: 'ansioso', label: 'Ansioso' },
        { value: 'cansado-mente', label: 'Cansado mentalmente' },
        { value: 'estressado', label: 'Estressado' },
        { value: 'desmotivado', label: 'Desmotivado' },
        { value: 'sobrecarregado', label: 'Sobrecarregado' },
      ],
      key: 'feeling' as keyof QuizAnswers,
    },

    // 7 — Objetivo
    {
      question: 'Qual é seu objetivo agora?',
      options: [
        { value: 'melhorar-foco', label: 'Melhorar o foco' },
        { value: 'reduzir-impulsos', label: 'Reduzir impulsos' },
        { value: 'aumentar-disciplina', label: 'Aumentar disciplina' },
        { value: 'organizar-mente', label: 'Organizar a mente' },
        { value: 'render-estudo', label: 'Render mais no estudo' },
        { value: 'render-trabalho', label: 'Render mais no trabalho' },
      ],
      key: 'goal' as keyof QuizAnswers,
    },
  ];

  const totalSteps = questions.length;
  const currentQuestion = questions[step - 1];

  // HANDLE respostas
  const handleAnswer = (value: any) => {
    const newAnswers = { ...answers, [currentQuestion.key]: value };
    setAnswers(newAnswers);

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      storage.setQuizAnswers(newAnswers as QuizAnswers);
      setFinished(true);
    }
  };

  // ========================================
  //           TELA FINAL (CHECKOUT)
  // ========================================
  if (finished) {
    const name = answers.userName || "Você";

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
        
        <h1 className="text-3xl font-bold text-[#0B0B0C] mb-4">
          {name}, seu resultado está pronto.
        </h1>

        <p className="text-[#6B7280] max-w-md mb-8 text-lg leading-relaxed">
          Detectamos sinais claros de <strong>desequilíbrio dopaminérgico</strong> associados a
          <strong> {answers.mainPain}</strong> e impulsos como
          <strong> {answers.impulseType}</strong>.  
          Criamos um protocolo personalizado para restaurar seu foco e disciplina.
        </p>

        {/* Caixa de Diagnóstico */}
        <div className="w-full max-w-md space-y-3 mb-10">
          <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl shadow-sm text-sm">
            Seu foco atual está comprometido por: <strong>{answers.mainPain}</strong>
          </div>

          <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl shadow-sm text-sm">
            Você apresenta sinais de: <strong>{answers.feeling}</strong>
          </div>

          <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl shadow-sm text-sm">
            Impulso dominante: <strong>{answers.impulseType}</strong>
          </div>
        </div>

        {/* TÍTULO DOS PLANOS */}
        <h2 className="text-xl font-semibold text-[#0B0B0C] mb-4">
          Escolha seu Protocolo DopaMind Pro
        </h2>

        {/* PLANOS PREMIUM */}
        <div className="w-full max-w-md space-y-4">

          {/* PLANO 1 - MAIS VENDIDO */}
          <button
            onClick={() => window.location.href = "https://checkout-plano-anual.com"}
            className="w-full p-5 rounded-2xl border-2 border-[#1D4ED8] bg-[#1D4ED8]/10 hover:bg-[#1D4ED8]/20 transition-all shadow-sm"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-lg font-semibold text-[#1D4ED8]">Plano Anual</span>
              <span className="text-[#1D4ED8] font-bold text-lg">R$ 14,90/mês</span>
            </div>
            <p className="text-sm text-[#0B0B0C]/70">Economize 58% · Mais escolhido</p>
          </button>

          {/* PLANO 2 */}
          <button
            onClick={() => window.location.href = "https://checkout-plano-mensal.com"}
            className="w-full p-5 rounded-2xl border border-[#E5E7EB] hover:bg-[#F3F4F6] transition-all shadow-sm"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-lg font-semibold">Plano Mensal</span>
              <span className="font-bold text-lg">R$ 29,90</span>
            </div>
            <p className="text-sm text-[#0B0B0C]/70">Comece sem compromisso</p>
          </button>

          {/* PLANO 3 */}
          <button
            onClick={() => window.location.href = "https://checkout-plano-vitalicio.com"}
            className="w-full p-5 rounded-2xl border border-[#E5E7EB] hover:bg-[#F3F4F6] transition-all shadow-sm"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-lg font-semibold">Acesso Vitalício</span>
              <span className="font-bold text-lg">R$ 199,00</span>
            </div>
            <p className="text-sm text-[#0B0B0C]/70">Pague uma vez · Acesso para sempre</p>
          </button>
        </div>

        {/* Rodapé */}
        <p className="text-xs text-[#9CA3AF] mt-6">
          Todos os planos incluem o Protocolo DopaMind completo.
        </p>

      </div>
    );
  }

  // Render quiz steps if not finished
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <div className="text-sm text-[#6B7280] mb-2">
            Pergunta {step} de {totalSteps}
          </div>
          <div className="text-2xl font-bold text-[#0B0B0C] mb-4">
            {currentQuestion.question}
          </div>
          {currentQuestion.type === 'text' ? (
            <form
              onSubmit={e => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem('input') as HTMLInputElement;
                if (input.value.trim()) {
                  handleAnswer(input.value.trim());
                }
              }}
            >
              <input
                name="input"
                type="text"
                className="w-full p-3 border border-[#E5E7EB] rounded-xl mb-4"
                autoFocus
                required
              />
              <Button type="submit" className="w-full">
                Avançar
              </Button>
            </form>
          ) : (
            <div className="flex flex-col gap-3">
              {currentQuestion.options?.map(option => (
                <Button
                  key={option.value}
                  className="w-full"
                  variant="outline"
                  onClick={() => handleAnswer(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}