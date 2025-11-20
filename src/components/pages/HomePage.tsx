'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle2 } from 'lucide-react';
import { storage, calculateDailyProgress } from '@/lib/storage';
import { DailyHabit } from '@/lib/types';

interface HomePageProps {
  onStartFocus: (minutes: number) => void;
}

export default function HomePage({ onStartFocus }: HomePageProps) {
  const [habits, setHabits] = useState<DailyHabit[]>([]);
  const [dailyProgress, setDailyProgress] = useState(0);
  const [todayMinutes, setTodayMinutes] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const loadedHabits = storage.getDailyHabits();
    const stats = storage.getStats();
    setHabits(loadedHabits);
    setTodayMinutes(stats.minutesFocused);
    const progress = calculateDailyProgress(loadedHabits, stats.minutesFocused);
    setDailyProgress(progress);
  };

  const toggleHabit = (habitId: string) => {
    const updatedHabits = habits.map((h) =>
      h.id === habitId ? { ...h, completed: !h.completed } : h
    );
    setHabits(updatedHabits);
    storage.setDailyHabits(updatedHabits);

    // Update stats
    const stats = storage.getStats();
    const completedCount = updatedHabits.filter((h) => h.completed).length;
    stats.habitsCompleted = completedCount;
    storage.setStats(stats);

    // Recalculate progress
    const progress = calculateDailyProgress(updatedHabits, todayMinutes);
    setDailyProgress(progress);
  };

  const focusOptions = [
    { minutes: 5, label: '5 min' },
    { minutes: 10, label: '10 min' },
    { minutes: 15, label: '15 min' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0D0D0F] animate-in fade-in duration-500">
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 pt-6 animate-in slide-in-from-top duration-700">
          <h1 className="text-4xl font-semibold text-[#1D4ED8] dark:text-[#3B82F6] tracking-tight">
            DopaMind
          </h1>
          <p className="text-base text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60 font-medium">
            Recupere seu foco, um passo de cada vez
          </p>
        </div>

        {/* Daily Progress - Barra mais grossa e animada */}
        <div className="bg-[#F2F4F7] dark:bg-[#16181D] rounded-2xl p-6 space-y-4 shadow-sm transition-all duration-300 hover:shadow-md animate-in slide-in-from-top duration-700 delay-100">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
              Seu Dia no DopaMind
            </h3>
            <span className="text-3xl font-semibold text-[#1D4ED8] dark:text-[#3B82F6]">
              {dailyProgress}%
            </span>
          </div>
          <Progress 
            value={dailyProgress} 
            className="h-4 transition-all duration-700 ease-out" 
          />
          <p className="text-sm text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60">
            Continue assim! Cada pequeno passo conta.
          </p>
        </div>

        {/* Focus Timer - Botões maiores e premium */}
        <div className="space-y-5 animate-in slide-in-from-bottom duration-700 delay-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1D4ED8]/10 dark:bg-[#3B82F6]/20 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#1D4ED8] dark:text-[#3B82F6]" />
            </div>
            <h2 className="text-xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
              Timer de Foco
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {focusOptions.map((option, index) => (
              <Button
                key={option.minutes}
                onClick={() => onStartFocus(option.minutes)}
                className="bg-[#1D4ED8] hover:bg-[#1D4ED8]/90 dark:bg-[#3B82F6] dark:hover:bg-[#3B82F6]/90 text-white h-[52px] text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-[0.97] shadow-sm hover:shadow-md animate-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                {option.label}
              </Button>
            ))}
          </div>
          <p className="text-sm text-center text-[#0B0B0C]/50 dark:text-[#FFFFFF]/50">
            Escolha um tempo e comece seu foco
          </p>
        </div>

        {/* Daily Habits - Cards premium com sombra suave */}
        <div className="space-y-5 animate-in slide-in-from-bottom duration-700 delay-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#22C55E]/10 dark:bg-[#4ADE80]/20 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#22C55E] dark:text-[#4ADE80]" />
            </div>
            <h2 className="text-xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
              Hábitos do DopaMind
            </h2>
          </div>
          <div className="space-y-3">
            {habits.map((habit, index) => (
              <button
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-xl transition-all duration-300 ease-in-out shadow-sm hover:shadow-md animate-in slide-in-from-bottom duration-700 ${
                  habit.completed
                    ? 'bg-[#1D4ED8] dark:bg-[#3B82F6] text-white scale-[0.98]'
                    : 'bg-[#F2F4F7] dark:bg-[#16181D] text-[#0B0B0C] dark:text-[#FFFFFF] hover:scale-[1.02]'
                }`}
                style={{ animationDelay: `${400 + index * 80}ms` }}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    habit.completed
                      ? 'bg-white/20 scale-110 animate-in zoom-in duration-300'
                      : 'bg-[#0B0B0C]/5 dark:bg-[#FFFFFF]/5'
                  }`}
                >
                  {habit.completed && (
                    <CheckCircle2 className="w-5 h-5 text-white animate-in zoom-in duration-300" />
                  )}
                </div>
                <span className="flex-1 text-left font-medium text-base">{habit.label}</span>
              </button>
            ))}
          </div>
          <p className="text-sm text-center text-[#0B0B0C]/50 dark:text-[#FFFFFF]/50">
            Reseta automaticamente todo dia
          </p>
        </div>
      </div>
    </div>
  );
}
