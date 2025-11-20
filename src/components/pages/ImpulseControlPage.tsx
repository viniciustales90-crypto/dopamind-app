'use client';

import { Flame, Walk, Droplet, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ImpulseControlPage() {
  const quickActions = [
    {
      label: 'Caminhar 30s',
      icon: <Walk className="w-5 h-5 text-[#1D4ED8]" />,
    },
    {
      label: 'Beber água',
      icon: <Droplet className="w-5 h-5 text-[#1D4ED8]" />,
    },
    {
      label: 'Trocar de ambiente',
      icon: <ArrowRightLeft className="w-5 h-5 text-[#1D4ED8]" />,
    },
  ];

  const tags = [
    'Tédio',
    'Ansiedade',
    'Procrastinação',
    'Celular à vista',
    'Estímulos exagerados',
  ];

  return (
    <div className="p-6 space-y-6">

      {/* Título */}
      <h1 className="text-2xl font-semibold tracking-tight">Controle de Impulsos</h1>

      {/* ====================================== */}
      {/* BOTÃO DE EMERGÊNCIA */}
      {/* ====================================== */}
      <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl p-6 shadow-lg text-white">
        <div className="flex items-center gap-3">
          <Flame className="w-7 h-7" />
          <h2 className="text-xl font-semibold">Impulso Emergente</h2>
        </div>

        <p className="text-sm mt-2 text-white/90">
          Se você está prestes a ceder a um impulso, use este modo agora.
        </p>

        <Button
          className="w-full h-12 rounded-2xl bg-white text-[#D97706] font-semibold mt-4 hover:bg-white/90"
        >
          Controlar Impulso Agora
        </Button>
      </div>

      {/* ====================================== */}
      {/* AÇÕES RÁPIDAS */}
      {/* ====================================== */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Ações Rápidas</h2>
        <div className="grid gap-3">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow border border-[#E5E7EB] hover:border-[#1D4ED8]/40 transition-all"
            >
              <div className="p-2 bg-[#EFF6FF] rounded-xl">{action.icon}</div>
              <p className="text-sm font-medium">{action.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================== */}
      {/* GATILHOS COMUNS */}
      {/* ====================================== */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Gatilhos Comuns</h2>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 text-sm bg-white border border-[#E5E7EB] rounded-full shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ====================================== */}
      {/* VER PLANO COMPLETO */}
      {/* ====================================== */}
      <Link href="/pages/FullPlanPage">
        <Button className="w-full h-12 rounded-2xl bg-[#111827] hover:bg-[#020617] text-white font-semibold mt-6">
          Ver plano completo
        </Button>
      </Link>

    </div>
  );
}
