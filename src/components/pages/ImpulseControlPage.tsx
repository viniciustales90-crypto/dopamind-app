'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  Wind,
  Droplet,
  Move,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { storage } from '@/lib/storage';
import { triggers } from '@/lib/content';
interface PlanSection {
  title: string;
  items: string[];
}

const planSections: PlanSection[] = [
  {
    title: 'Manhã (6h–12h)',
    items: [
      'Acorde sem olhar o celular nos primeiros 30 minutos',
      'Beba água e faça 5 respirações profundas',
      'Defina 1 tarefa importante para hoje',
      'Faça 15 minutos de foco profundo',
    ],
  },
  {
    title: 'Tarde (12h–18h)',
    items: [
      'Almoce sem telas',
      'Caminhe por 5 minutos após comer',
      'Identifique seus gatilhos de impulso',
      'Pratique a técnica dos 60 segundos quando sentir impulso',
    ],
  },
  {
    title: 'Noite (18h–22h)',
    items: [
      'Desligue notificações 2h antes de dormir',
      'Substitua telas por leitura ou conversa',
      'Organize o ambiente para amanhã',
      'Reflita: “O que controlei hoje?”',
    ],
  },
  {
    title: 'Regras gerais',
    items: [
      'Celular no modo avião durante tarefas importantes',
      'Sem redes sociais antes de completar 1 tarefa',
      'Água sempre por perto',
      'Ambiente organizado = mente organizada',
    ],
  },
];


export default function ImpulseControlPage() {
  const [showBreathing, setShowBreathing] = useState(false);
  const [showPlan, setShowPlan] = useState(false);

  const handleControlImpulse = () => {
    setShowBreathing(true);

    // Update stats
    const stats = storage.getStats();
    // garante que a chave exista
    (stats as any).impulsesControlled = (stats as any).impulsesControlled ?? 0;
    (stats as any).impulsesControlled += 1;
    storage.setStats(stats);
  };

  if (showBreathing) {
    return <BreathingExercise onComplete={() => setShowBreathing(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0D0D0F] animate-in fade-in duration-500">
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 pt-6 animate-in slide-in-from-top duration-700">
          <h1 className="text-3xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
            Controle de Impulsos
          </h1>
          <p className="text-base text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60">
            Ferramentas para quando você mais precisa
          </p>
        </div>

        {/* Emergency Button - Laranja premium com gradiente suave */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/10 dark:to-amber-950/10 rounded-2xl p-8 space-y-5 shadow-sm hover:shadow-md transition-all duration-300 animate-in slide-in-from-top duration-700 delay-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#F97316]/10 dark:bg-[#F97316]/20 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-[#F97316]" />
            </div>
            <h2 className="text-xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
              Botão de Emergência
            </h2>
          </div>
          <p className="text-[#0B0B0C]/70 dark:text-[#FFFFFF]/70 text-base">
            Sentindo um impulso forte? Use esta ferramenta agora.
          </p>
          <Button
            onClick={handleControlImpulse}
            className="w-full bg-gradient-to-r from-[#F97316] to-[#FBBF24] hover:from-[#F97316]/90 hover:to-[#FBBF24]/90 text-white h-[52px] text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-[0.97] shadow-sm hover:shadow-lg"
          >
            Controlar Impulso Agora
          </Button>
        </div>

        {/* Quick Actions - Cards minimalistas com ícones outline */}
        <div className="space-y-5 animate-in slide-in-from-bottom duration-700 delay-200">
          <h3 className="font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] text-lg">
            3 Ações Rápidas
          </h3>
          <div className="grid gap-3">
            {[
              {
                icon: Move,
                label: 'Caminhar 30 segundos',
                color: 'text-[#22C55E] dark:text-[#4ADE80]',
                bg: 'bg-[#22C55E]/10 dark:bg-[#4ADE80]/20',
              },
              {
                icon: Droplet,
                label: 'Beber água',
                color: 'text-[#1D4ED8] dark:text-[#3B82F6]',
                bg: 'bg-[#1D4ED8]/10 dark:bg-[#3B82F6]/20',
              },
              {
                icon: Wind,
                label: 'Trocar de ambiente',
                color: 'text-[#22C55E] dark:text-[#4ADE80]',
                bg: 'bg-[#22C55E]/10 dark:bg-[#4ADE80]/20',
              },
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-5 bg-[#F2F4F7] dark:bg-[#16181D] rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md animate-in slide-in-from-bottom duration-700"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div
                    className={`w-12 h-12 ${action.bg} rounded-xl flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 ${action.color}`} strokeWidth={1.5} />
                  </div>
                  <span className="text-[#0B0B0C] dark:text-[#FFFFFF] font-medium text-base">
                    {action.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Common Triggers - Chips compactos */}
        <div className="space-y-5 animate-in slide-in-from-bottom duration-700 delay-300">
          <h3 className="font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] text-lg">
            Gatilhos Comuns
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {triggers.map((trigger, index) => (
              <span
                key={trigger}
                className="px-4 py-2 bg-[#F2F4F7] dark:bg-[#16181D] text-[#0B0B0C] dark:text-[#FFFFFF] rounded-full text-sm font-medium shadow-sm animate-in zoom-in duration-500"
                style={{ animationDelay: `${400 + index * 50}ms` }}
              >
                {trigger}
              </span>
            ))}
          </div>
          <p className="text-sm text-[#0B0B0C]/50 dark:text-[#FFFFFF]/50">
            Identifique seus gatilhos para prevenir impulsos
          </p>
        </div>

        {/* 24h Control Plan */}
        <div className="space-y-5 animate-in slide-in-from-bottom duration-700 delay-400">
          <h3 className="font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] text-lg">
            Plano de 24h de Controle
          </h3>

          <div className="w-full rounded-2xl bg-[#F2F4F7] dark:bg-[#16181D] border border-[#E5E7EB] dark:border-[#16181D] p-4 shadow-sm">
            <Button
              type="button"
              onClick={() => setShowPlan((prev) => !prev)}
              variant="ghost"
              className="w-full h-[52px] text-base font-semibold rounded-xl bg-transparent text-[#0B0B0C] dark:text-[#FFFFFF] flex items-center justify-between px-4 hover:bg-[#E5E7EB] dark:hover:bg-[#1F2937] transition-all duration-300"
            >
              <span>{showPlan ? 'Esconder plano' : 'Ver Plano Completo'}</span>
              {showPlan ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </Button>

            {showPlan && (
  <div className="mt-4 border-t border-[#E5E7EB] dark:border-[#1F2937] pt-4 space-y-4">
    {planSections.map((section) => (
      <div
        key={section.title}
        className="rounded-2xl bg-[#F9FAFB] dark:bg-[#111827] p-3 md:p-4"
      >
        <p className="text-sm font-semibold text-[#111827] dark:text-white mb-2">
          {section.title}
        </p>
        <ul className="space-y-1.5">
          {section.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-xs md:text-sm text-[#4B5563] dark:text-[#D1D5DB]"
            >
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#1D4ED8]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}

    <p className="text-xs md:text-sm text-[#6B7280] dark:text-[#9CA3AF]">
      Lembre-se: cada impulso controlado fortalece sua disciplina.
      Use este plano como experimento por um dia — depois ajuste para a sua rotina.
    </p>
  </div>
)}

          </div>
        </div>
      </div>
    </div>
  );
}

function BreathingExercise({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(60);

  useState(() => {
    const phaseTimer = setInterval(() => {
      setPhase((prev) => {
        if (prev === 'inhale') return 'hold';
        if (prev === 'hold') return 'exhale';
        return 'inhale';
      });
    }, 4000);

    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          clearInterval(phaseTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(phaseTimer);
      clearInterval(countdown);
    };
  });

  const phaseText = {
    inhale: 'Inspire profundamente',
    hold: 'Segure',
    exhale: 'Expire lentamente',
  };

  if (timeLeft === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA] dark:bg-[#0D0D0F] px-6">
        <div className="text-center space-y-8 max-w-md animate-in fade-in duration-500">
          <div className="w-24 h-24 bg-[#22C55E] dark:bg-[#4ADE80] rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-500 shadow-lg">
            <CheckCircle2 className="w-14 h-14 text-white" />
          </div>
          <h2 className="text-3xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
            Você controlou o impulso
          </h2>
          <p className="text-lg text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60">
            Parabéns! Você criou um espaço entre o impulso e a ação.
          </p>
          <Button
            onClick={onComplete}
            className="bg-[#1D4ED8] hover:bg-[#1D4ED8]/90 dark:bg-[#3B82F6] dark:hover:bg-[#3B82F6]/90 text-white h-[52px] px-10 text-base font-semibold rounded-xl shadow-sm transition-all duration-300 hover:scale-105 active:scale-[0.97]"
          >
            Continuar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA] dark:bg-[#0D0D0F] px-6">
      <div className="text-center space-y-16 max-w-md">
        {/* Timer */}
        <div className="text-4xl font-semibold text-[#0B0B0C]/40 dark:text-[#FFFFFF]/40 animate-pulse">
          {timeLeft}s
        </div>

        {/* Breathing Circle - Animação suave com pulsação */}
        <div className="relative w-56 h-56 mx-auto">
          <div
            className={`absolute inset-0 bg-[#1D4ED8] dark:bg-[#3B82F6] rounded-full transition-all ease-in-out ${
              phase === 'inhale'
                ? 'scale-100'
                : phase === 'hold'
                ? 'scale-100'
                : 'scale-50'
            }`}
            style={{
              transitionDuration: '4000ms',
              opacity: 0.15,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Wind className="w-20 h-20 text-[#1D4ED8] dark:text-[#3B82F6]" />
          </div>
        </div>

        {/* Phase Text */}
        <div className="space-y-5">
          <p className="text-3xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
            {phaseText[phase]}
          </p>
          <p className="text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60 text-lg">
            Espere. Sua mente quer um alívio rápido, não uma decisão sua.
          </p>
        </div>
      </div>
    </div>
  );
}
