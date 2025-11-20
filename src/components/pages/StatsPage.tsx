'use client';

import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import { Flame, Clock, CheckCircle2, Brain, TrendingUp } from "lucide-react";

export default function StatsPage() {
  const [stats, setStats] = useState({
    minutesFocused: 0,
    habitsCompleted: 0,
    impulsesControlled: 0,
    streak: 0,
  });

  const [weeklyFocus, setWeeklyFocus] = useState<number[]>([]);

  useEffect(() => {
    const loadedStats = storage.getStats();
    setStats(loadedStats);

    // histórico fake por enquanto (pode ligar com seu banco depois)
    const history = storage.getWeeklyFocus();
    setWeeklyFocus(history);
  }, []);

  const maxValue = Math.max(...weeklyFocus, 1);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0D0D0F] p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="text-center space-y-2 pt-6">
        <h1 className="text-3xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
          Estatísticas
        </h1>
        <p className="text-base text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60">
          Acompanhe sua evolução no DopaMind
        </p>
      </div>

      {/* Streak */}
      <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-2xl p-8 text-center space-y-6 border border-orange-100 dark:border-orange-900/20 shadow-sm">
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
            : `Você está ${stats.streak} dias no controle. Continue assim!`}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4">
        <StatCard
          label="Minutos focados"
          value={stats.minutesFocused}
          icon={Clock}
          color="text-[#1D4ED8] dark:text-[#3B82F6]"
          bgColor="bg-[#1D4ED8]/10 dark:bg-[#3B82F6]/20"
        />

        <StatCard
          label="Hábitos concluídos hoje"
          value={stats.habitsCompleted}
          icon={CheckCircle2}
          color="text-[#22C55E] dark:text-[#4ADE80]"
          bgColor="bg-[#22C55E]/10 dark:bg-[#4ADE80]/20"
        />

        <StatCard
          label="Impulsos controlados"
          value={stats.impulsesControlled}
          icon={Brain}
          color="text-purple-500"
          bgColor="bg-purple-500/10 dark:bg-purple-500/20"
        />
      </div>

      {/* Minimalist Chart */}
      <div className="bg-[#F2F4F7] dark:bg-[#16181D] rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1D4ED8]/10 dark:bg-[#3B82F6]/20 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#1D4ED8] dark:text-[#3B82F6]" />
          </div>
          <h3 className="font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] text-lg">
            Foco nos últimos 7 dias
          </h3>
        </div>

        <div className="mt-4 h-40 flex items-end justify-between gap-3">
          {weeklyFocus.map((value, index) => {
            const heightPercent = (value / maxValue) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full max-w-[22px] bg-[#DBEAFE] rounded-full flex items-end" style={{ height: '100%' }}>
                  <div
                    className="w-full bg-[#1D4ED8] rounded-full"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#6B7280]">D{index + 1}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  bgColor,
}: {
  label: string;
  value: number;
  icon: any;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-[#111] dark:to-[#0D0D0F] rounded-2xl p-6 shadow-sm border border-[#E5E7EB] dark:border-[#16181D] transition-all">
      <div className="flex items-center justify-between">
        <div className={`w-14 h-14 ${bgColor} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>

        <div className="text-right">
          <div className="text-4xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
            {value}
          </div>
        </div>
      </div>

      <p className="text-base text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60 font-medium mt-4">
        {label}
      </p>
    </div>
  );
}
