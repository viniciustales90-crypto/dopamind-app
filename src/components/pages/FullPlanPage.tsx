'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { controlPlan24h } from '@/lib/content';

interface FullPlanPageProps {
  onBack: () => void;
}

export default function FullPlanPage({ onBack }: FullPlanPageProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0D0D0F]">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-[#0B0B0C] dark:text-[#FFFFFF] hover:bg-[#F2F4F7] dark:hover:bg-[#16181D] h-12 rounded-xl mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div className="bg-[#F2F4F7] dark:bg-[#16181D] rounded-2xl p-6 shadow-sm">
          <div className="whitespace-pre-line leading-relaxed text-[#0B0B0C] dark:text-[#FFFFFF]">
            {controlPlan24h}
          </div>
        </div>
      </div>
    </div>
  );
}