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
    const name = answers.userName || 'Você';

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
        <h1 className="text-3xl font-semibold text-[#0B0B0C] mb-4">
          {name}, analisamos seu perfil.
        </h1>

        <p className="text-[#6B7280] max-w-md mb-8">
          Você apresentou sinais de desequilíbrio dopaminérgico que explicam sua dificuldade em focar,
          manter disciplina e controlar impulsos. Criamos um plano personalizado para sua mente.
        </p>

        <div className="w-full max-w-md space-y-3">
          <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-sm shadow-sm">
            Seu foco está sendo afetado por: <strong>{answers.mainPain}</strong>
          </div>

          <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-sm shadow-sm">
            Você apresenta sinais de: <strong>{answers.impulseType}</strong>
          </div>

          <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-sm shadow-sm">
            Seu melhor caminho agora é o <strong>DopaMind Pro</strong>.
          </div>
        </div>

        <Button
          onClick={() => window.location.href = "https://seu-checkout.com"}
          className="w-full max-w-md h-12 mt-8 rounded-full bg-[#111827] text-white text-base font-semibold"
        >
          Ativar DopaMind Pro agora
        </Button>
      </div>
    );
  }

  // ========================================
  //              TELA DAS PERGUNTAS
  // ========================================
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <div className="max-w-md w-full space-y-8">

        {/* progresso */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-[#0B0B0C]/60">
            <span>Pergunta {step} de {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1D4ED8] transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* pergunta */}
        <div className="space-y-6 pt-4">
          <h2 className="text-2xl font-semibold text-[#0B0B0C] leading-tight">
            {currentQuestion.question}
          </h2>

          {/* campo de texto */}
          {currentQuestion.type === 'text' && (
            <input
              type="text"
              placeholder="Digite aqui…"
              onBlur={(e) => handleAnswer(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-[#E5E7EB] text-base"
            />
          )}

          {/* opções */}
          {currentQuestion.options && (
            <div className="space-y-3 pt-4">
              {currentQuestion.options.map((option) => (
                <Button
                  key={option.value.toString()}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full h-14 text-left justify-start rounded-xl border-2 border-[#E5E7EB] text-base hover:bg-[#1D4ED8] hover:text-white hover:border-[#1D4ED8] transition-all"
                  variant="outline"
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
