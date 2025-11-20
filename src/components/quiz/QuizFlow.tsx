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

  const questions = [
    {
      question: 'Qual é sua maior distração hoje?',
      options: [
        { value: 'celular', label: 'Celular' },
        { value: 'redes-sociais', label: 'Redes sociais' },
        { value: 'videos-curtos', label: 'Vídeos curtos' },
        { value: 'procrastinacao', label: 'Procrastinação' },
        { value: 'impulsos-fortes', label: 'Impulsos fortes' },
        { value: 'ansiedade', label: 'Ansiedade' },
      ],
      key: 'distraction' as keyof QuizAnswers,
    },
    {
      question: 'Quanto tempo você consegue focar agora?',
      options: [
        { value: 5, label: '5 minutos' },
        { value: 10, label: '10 minutos' },
        { value: 15, label: '15 minutos' },
      ],
      key: 'focusTime' as keyof QuizAnswers,
    },
    {
      question: 'Qual é seu objetivo principal?',
      options: [
        { value: 'estudar', label: 'Estudar' },
        { value: 'trabalhar', label: 'Trabalhar' },
        { value: 'controlar-impulsos', label: 'Controlar impulsos' },
        { value: 'reduzir-estimulos', label: 'Reduzir estímulos' },
        { value: 'melhorar-disciplina', label: 'Melhorar disciplina' },
      ],
      key: 'goal' as keyof QuizAnswers,
    },
    {
      question: 'Como você se sente ultimamente?',
      options: [
        { value: 'sem-foco', label: 'Sem foco' },
        { value: 'ansioso', label: 'Ansioso' },
        { value: 'preso-recompensas', label: 'Preso a recompensas rápidas' },
        { value: 'cansado', label: 'Cansado' },
        { value: 'desmotivado', label: 'Desmotivado' },
      ],
      key: 'feeling' as keyof QuizAnswers,
    },
  ];

  const currentQuestion = questions[step - 1];

  const handleAnswer = (value: string | number) => {
    const newAnswers = { ...answers, [currentQuestion.key]: value };
    setAnswers(newAnswers);

    if (step < 4) {
      setStep(step + 1);
    } else {
      // Save answers and complete
      storage.setQuizAnswers(newAnswers as QuizAnswers);
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFFFFF] dark:bg-[#0C0C0D] px-6">
      <div className="max-w-md w-full space-y-8">
        {/* Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60">
            <span>Pergunta {step} de 4</span>
            <span>{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="h-2 bg-[#E5E7EB] dark:bg-[#1F2937] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1D4ED8] dark:bg-[#3B82F6] transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="space-y-6 pt-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] leading-tight">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 pt-4">
            {currentQuestion.options.map((option) => (
              <Button
                key={option.value.toString()}
                onClick={() => handleAnswer(option.value)}
                variant="outline"
                className="w-full h-14 text-left justify-start text-base hover:bg-[#1D4ED8] hover:text-white hover:border-[#1D4ED8] dark:hover:bg-[#3B82F6] dark:hover:border-[#3B82F6] transition-all duration-200 rounded-xl border-2 border-[#E5E7EB] dark:border-[#1F2937] text-[#0B0B0C] dark:text-[#FFFFFF]"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
