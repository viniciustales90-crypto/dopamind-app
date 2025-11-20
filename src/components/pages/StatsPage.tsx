'use client';

import { useState, useEffect } from 'react';
import { Flame, Clock, CheckCircle2, Brain, TrendingUp, Award } from 'lucide-react';
import { storage } from '@/lib/storage';
import { Stats } from '@/lib/types';

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const loadedStats = storage.getStats();
    setStats(loadedStats);
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA] dark:bg-[#0D0D0F]">
        <div className="text-[#0B0B0C]/40 dark:text-[#FFFFFF]/40">Carregando...</div>
      </div>
    );
  }

  const statCards = [
    {
      icon: Clock,
      label: 'Minutos Focados',
      value: `${stats.minutesFocused}`,
      unit: 'min',
      color: 'text-[#1D4ED8] dark:text-[#3B82F6]',
      bgColor: 'bg-[#1D4ED8]/10 dark:bg-[#3B82F6]/20',
      cardBg: 'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
    },
    {
      icon: CheckCircle2,
      label: 'Hábitos Concluídos',
      value: stats.habitsCompleted,
      unit: '/5',
      color: 'text-[#22C55E] dark:text-[#4ADE80]',
      bgColor: 'bg-[#22C55E]/10 dark:bg-[#4ADE80]/20',
      cardBg: 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20',
    },
    {
      icon: Brain,
      label: 'Impulsos Controlados',
      value: stats.impulsesControlled,
      unit: '',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10 dark:bg-purple-500/20',
      cardBg: 'from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0D0D0F] animate-in fade-in duration-500">
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 pt-6 animate-in slide-in-from-top duration-700">
          <h1 className="text-3xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
            Estatísticas
          </h1>
          <p className="text-base text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60">
            Acompanhe sua evolução
          </p>
        </div>

        {/* Streak Highlight - Grande, visual e premium */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-2xl p-8 text-center space-y-6 border border-orange-100 dark:border-orange-900/20 shadow-sm hover:shadow-md transition-all duration-300 animate-in slide-in-from-top duration-700 delay-100">
          <div className="w-20 h-20 bg-orange-500/10 dark:bg-orange-500/20 rounded-full flex items-center justify-center mx-auto">
            <Flame className="w-12 h-12 text-orange-500" />
          </div>
          <div>
            <div className="text-7xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] mb-3">
              {stats.streak}
            </div>
            <div className="text-xl text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60 font-semibold">
              dias seguidos
            </div>
          </div>
          <p className="text-base text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60">
            {stats.streak === 0
              ? 'Comece sua jornada hoje!'
              : stats.streak === 1
              ? 'Primeiro dia! Continue assim.'
              : `Incrível! Você está ${stats.streak} dias no controle.`}
          </p>
        </div>

        {/* Stats Grid - Visual limpo com sombras suaves */}
        <div className="grid grid-cols-1 gap-4 animate-in slide-in-from-bottom duration-700 delay-200">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`bg-gradient-to-br ${stat.cardBg} rounded-2xl p-6 space-y-4 border border-transparent shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-bottom duration-700`}
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 ${stat.color}`} strokeWidth={2} />
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
                      {stat.value}
                      <span className="text-2xl text-[#0B0B0C]/40 dark:text-[#FFFFFF]/40 ml-1">
                        {stat.unit}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-base text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Chart - Gráfico simples minimalista */}
        <div className="bg-[#F2F4F7] dark:bg-[#16181D] rounded-2xl p-6 space-y-6 shadow-sm animate-in slide-in-from-bottom duration-700 delay-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1D4ED8]/10 dark:bg-[#3B82F6]/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#1D4ED8] dark:text-[#3B82F6]" />
            </div>
            <h3 className="font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] text-lg">
              Resumo de Progresso
            </h3>
          </div>
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60 text-base">
                Total de minutos focados
              </span>
              <span className="font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] text-xl">
                {stats.minutesFocused} min
              </span>
            </div>
            <div className="h-px bg-[#E5E7EB] dark:bg-[#1F2937]" />
            <div className="flex justify-between items-center">
              <span className="text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60 text-base">
                Hábitos completados hoje
              </span>
              <span className="font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] text-xl">
                {stats.habitsCompleted}/5
              </span>
            </div>
            <div className="h-px bg-[#E5E7EB] dark:bg-[#1F2937]" />
            <div className="flex justify-between items-center">
              <span className="text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60 text-base">
                Impulsos controlados
              </span>
              <span className="font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] text-xl">
                {stats.impulsesControlled}
              </span>
            </div>
          </div>
        </div>

        {/* Motivational Message - Card premium */}
        <div className="bg-[#1D4ED8] dark:bg-[#3B82F6] rounded-2xl p-6 text-center shadow-sm animate-in slide-in-from-bottom duration-700 delay-600">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-7 h-7 text-white" />
          </div>
          <p className="text-white text-lg font-semibold">
            {stats.minutesFocused === 0
              ? 'Comece com 5 minutos de foco hoje!'
              : stats.minutesFocused < 15
              ? 'Você está no caminho certo. Continue!'
              : 'Incrível! Você está dominando seu foco.'}
          </p>
        </div>
      </div>
    </div>
  );
}
