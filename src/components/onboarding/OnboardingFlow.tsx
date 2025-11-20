'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);

  const screens = [
    {
      title: 'Sua mente está sobrecarregada de estímulos.',
      description: 'O DopaMind ajuda você a recuperar clareza e controle.',
    },
    {
      title: 'Pequenos passos mudam tudo.',
      description: '5 minutos por dia podem reprogramar sua dopamina.',
    },
    {
      title: 'Comece sua mudança hoje.',
      description: '',
    },
  ];

  const currentScreen = screens[step - 1];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA] dark:bg-[#0D0D0F] px-6 animate-in fade-in duration-500">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo */}
        <div className="mb-12 animate-in slide-in-from-top duration-700">
          <h1 className="text-4xl font-semibold text-[#1D4ED8] dark:text-[#3B82F6] mb-2">DopaMind</h1>
          <div className="flex justify-center gap-2 mt-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? 'w-8 bg-[#1D4ED8] dark:bg-[#3B82F6]' : 'w-1.5 bg-[#E5E7EB] dark:bg-[#1F2937]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 animate-in slide-in-from-bottom duration-700 delay-100">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] leading-tight">
            {currentScreen.title}
          </h2>
          {currentScreen.description && (
            <p className="text-lg text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60">
              {currentScreen.description}
            </p>
          )}
        </div>

        {/* Button */}
        <div className="pt-8 animate-in slide-in-from-bottom duration-700 delay-200">
          <Button
            onClick={handleNext}
            className="w-full bg-[#1D4ED8] hover:bg-[#1D4ED8]/90 dark:bg-[#3B82F6] dark:hover:bg-[#3B82F6]/90 text-white h-[52px] text-base font-semibold rounded-xl shadow-sm transition-all duration-300 hover:scale-105 active:scale-[0.97]"
          >
            {step === 3 ? 'Entrar no DopaMind' : 'Continuar'}
          </Button>
        </div>

        {/* Skip option */}
        {step < 3 && (
          <button
            onClick={onComplete}
            className="text-sm text-[#0B0B0C]/50 dark:text-[#FFFFFF]/50 hover:text-[#0B0B0C]/70 dark:hover:text-[#FFFFFF]/70 transition-colors animate-in fade-in duration-700 delay-300"
          >
            Pular introdução
          </button>
        )}
      </div>
    </div>
  );
}
