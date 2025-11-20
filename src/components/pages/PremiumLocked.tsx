'use client';

import { Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PremiumLocked() {
  return (
    <div className="p-6 space-y-8 text-center">

      <Button
        variant="ghost"
        onClick={() => history.back()}
        className="flex items-center gap-2 mx-auto"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Button>

      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] flex items-center justify-center shadow">
        <Lock className="w-10 h-10 text-white" />
      </div>

      <h1 className="text-2xl font-semibold">Conteúdo Premium</h1>

      <p className="text-[#6B7280]">
        Este conteúdo é exclusivo para membros do <strong>DopaMind Pro</strong>.
      </p>

      <Button
        className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-white font-semibold shadow hover:opacity-90"
        onClick={() => {
          window.location.href = 'SEU_LINK_DE_CHECKOUT_AQUI';
        }}
      >
        Ver Planos Premium
      </Button>
    </div>
  );
}
