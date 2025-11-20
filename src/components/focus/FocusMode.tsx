'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, CheckCircle2 } from 'lucide-react';
import { storage } from '@/lib/storage';

interface FocusModeProps {
  duration: number;
  onExit: () => void;
}

export default function FocusMode({ duration, onExit }: FocusModeProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleComplete = () => {
    // Update stats
    const stats = storage.getStats();
    stats.minutesFocused += duration;
    storage.setStats(stats);
    
    setIsRunning(false);
  };

  const handleGiveUp = () => {
    if (confirm('Tem certeza que deseja desistir?')) {
      onExit();
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  const phrases = [
    'Sua mente precisa disso.',
    'Você está no controle.',
    'Cada segundo conta.',
    'Foco é um superpoder.',
    'Você está vencendo.',
  ];

  const currentPhrase = phrases[Math.floor((progress / 100) * phrases.length)] || phrases[0];

  if (timeLeft === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA] dark:bg-[#0D0D0F] px-6">
        <div className="text-center space-y-8 max-w-md animate-in fade-in duration-500">
          <div className="w-24 h-24 bg-[#22C55E] dark:bg-[#4ADE80] rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-500 shadow-lg">
            <CheckCircle2 className="w-14 h-14 text-white" />
          </div>
          <h2 className="text-3xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
            Você venceu um ciclo de dopamina.
          </h2>
          <p className="text-lg text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60">
            Parabéns! Você completou {duration} minutos de foco profundo.
          </p>
          <Button
            onClick={onExit}
            className="bg-[#1D4ED8] hover:bg-[#1D4ED8]/90 dark:bg-[#3B82F6] dark:hover:bg-[#3B82F6]/90 text-white h-[52px] px-10 text-base font-semibold rounded-xl shadow-sm transition-all duration-300 hover:scale-105 active:scale-[0.97]"
          >
            Voltar para Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA] dark:bg-[#0D0D0F] px-6 relative">
      <div className="text-center space-y-16 max-w-md">
        {/* Timer gigante no centro - Estilo Apple com pulsação leve */}
        <div className="space-y-8">
          <div className="text-8xl sm:text-9xl font-semibold text-[#1D4ED8] dark:text-[#3B82F6] tabular-nums tracking-tight animate-pulse">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          
          {/* Progress bar minimalista animada */}
          <div className="w-full h-2 bg-[#E5E7EB] dark:bg-[#1F2937] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1D4ED8] dark:bg-[#3B82F6] transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Frase curta abaixo */}
        <p className="text-xl text-[#0B0B0C]/70 dark:text-[#FFFFFF]/70 font-medium">
          {currentPhrase}
        </p>

        {/* Botões: Desistir (esquerda) e Concluir (direita) - Estilo Apple */}
        <div className="flex items-center justify-between w-full pt-8">
          <button
            onClick={handleGiveUp}
            className="text-[#0B0B0C]/50 dark:text-[#FFFFFF]/50 hover:text-[#0B0B0C]/70 dark:hover:text-[#FFFFFF]/70 transition-colors text-base font-medium"
          >
            Desistir
          </button>
          
          <button
            onClick={() => {
              handleComplete();
              onExit();
            }}
            className="bg-[#1D4ED8] hover:bg-[#1D4ED8]/90 dark:bg-[#3B82F6] dark:hover:bg-[#3B82F6]/90 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-[0.97] shadow-sm"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
}
