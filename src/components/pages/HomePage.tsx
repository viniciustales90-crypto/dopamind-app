'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, 
  Wind, 
  Droplet, 
  ClipboardList, 
  BookOpen 
} from 'lucide-react';

export default function HomePage() {
  const [focusTime, setFocusTime] = useState<number | null>(null);
  const [progress, setProgress] = useState(30); // Exemplo: 30% do dia completo

  const habits = [
    {
      label: '5 minutos sem celular',
      icon: <Smartphone className="w-5 h-5 text-[#1D4ED8]" />,
    },
    {
      label: '1 respiração profunda',
      icon: <Wind className="w-5 h-5 text-[#1D4ED8]" />,
    },
    {
      label: 'Beber água',
      icon: <Droplet className="w-5 h-5 text-[#1D4ED8]" />,
    },
    {
      label: 'Organizar o ambiente',
      icon: <ClipboardList className="w-5 h-5 text-[#1D4ED8]" />,
    },
    {
      label: 'Estudar/Trabalhar por 5 min',
      icon: <BookOpen className="w-5 h-5 text-[#1D4ED8]" />,
    },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* Título */}
      <h1 className="text-2xl font-semibold tracking-tight">
        Bem-vindo ao DopaMind 👋
      </h1>

      {/* ============================ */}
      {/* PROGRESSO DO DIA */}
      {/* ============================ */}
      <div className="bg-white rounded-3xl p-6 shadow border border-[#E5E7EB]">
        <p className="text-sm text-[#6B7280]">Seu Dia no DopaMind</p>

        <div className="w-full mt-4 h-3 bg-[#E5E7EB] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1D4ED8] transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-sm text-[#1D4ED8] font-medium mt-2">
          {progress}% concluído
        </p>
      </div>

      {/* ============================ */}
      {/* TIMER DE FOCO */}
      {/* ============================ */}
      <div className="bg-white rounded-3xl shadow border border-[#E5E7EB] p-6 space-y-4">
        <h2 className="text-lg font-semibold">Timer de Foco</h2>

        <div className="grid grid-cols-3 gap-3">
          {[5, 10, 15].map((min) => (
            <button
              key={min}
              onClick={() => setFocusTime(min)}
              className={`h-12 rounded-2xl border transition-all font-medium text-sm ${
                focusTime === min
                  ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                  : 'bg-white text-black border-[#E5E7EB] hover:border-[#1D4ED8]'
              }`}
            >
              {min} min
            </button>
          ))}
        </div>

        {focusTime && (
          <Button className="w-full h-12 rounded-2xl bg-[#111827] hover:bg-[#020617] text-white font-semibold">
            Iniciar {focusTime} min de foco
          </Button>
        )}
      </div>

      {/* ============================ */}
      {/* HÁBITOS DIÁRIOS */}
      {/* ============================ */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Hábitos Diários</h2>

        <div className="grid gap-3">
          {habits.map((habit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow border border-[#E5E7EB] hover:border-[#1D4ED8]/40 transition-all"
            >
              <div className="p-2 bg-[#EFF6FF] rounded-xl">{habit.icon}</div>
              <p className="text-sm font-medium">{habit.label}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
