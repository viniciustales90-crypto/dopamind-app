'use client';

import { useState } from 'react';
import { Lock, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LibraryPage() {
  const [openArticle, setOpenArticle] = useState<any>(null);

  // ---------------------------
  // CONTEÚDO DO APP
  // ---------------------------

  const freeContent = [
    {
      id: 1,
      title: 'O que é Dopamina?',
      description: 'Entenda como seu cérebro cria impulsos e busca estímulos rápidos.',
      content: `A dopamina é um neurotransmissor que controla motivação, foco e impulsos...`,
    },
    {
      id: 2,
      title: 'Como recuperar foco em 5 minutos',
      description: 'Técnica simples para resetar sua atenção.',
      content: `Quando seu cérebro está saturado de estímulos, a técnica dos 5 minutos ajuda a...`,
    },
    {
      id: 3,
      title: 'Ciclos de distração: como quebrar',
      description: 'Por que você abre o celular sem perceber.',
      content: `O cérebro cria loops automáticos de busca por prazer imediato...`,
    },
    {
      id: 4,
      title: 'Por que você procrastina?',
      description: 'Entenda o mecanismo biológico por trás da procrastinação.',
      content: `Procrastinação não é preguiça — é sobre busca por alívio rápido...`,
    },
    {
      id: 5,
      title: 'Seu ambiente está te sabotando',
      description: 'Pequenos ajustes aumentam foco instantaneamente.',
      content: `Ambientes saturados de estímulos elevam sua impulsividade...`,
    },
  ];

  const premiumContent = [
    {
      id: 101,
      title: 'Protocolo DopaMind de 7 Dias',
      description: 'O método completo para resetar a dopamina.',
    },
    {
      id: 102,
      title: 'Guia Antiansiedade Dopaminérgica',
      description: 'Reduza impulsos e ansiedade mental.',
    },
    {
      id: 103,
      title: 'Método Anti-Procrastinação',
      description: 'Sistema avançado para recuperar disciplina.',
    },
  ];

  // ---------------------------
  // ARTIGO ABERTO (FREE)
  // ---------------------------
  if (openArticle) {
    return (
      <div className="p-6 space-y-6">
        <Button
          onClick={() => setOpenArticle(null)}
          variant="ghost"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>

        <h1 className="text-2xl font-semibold tracking-tight">{openArticle.title}</h1>

        <p className="text-[#4B5563] leading-relaxed whitespace-pre-line">
          {openArticle.content}
        </p>
      </div>
    );
  }

  // ---------------------------
  // TELA PRINCIPAL DA BIBLIOTECA
  // ---------------------------
  return (
    <div className="p-6 space-y-10">

      {/* TÍTULO */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Biblioteca</h1>
        <p className="text-sm text-[#6B7280]">
          Aprenda sobre foco, dopamina e controle de impulsos
        </p>
      </div>

      {/* ================================== */}
      {/* CONTEÚDO GRATUITO */}
      {/* ================================== */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Conteúdo Gratuito</h2>

        <div className="space-y-3">
          {freeContent.map((article) => (
            <button
              key={article.id}
              onClick={() => setOpenArticle(article)}
              className="w-full text-left bg-white rounded-2xl p-5 shadow border border-[#E5E7EB] hover:border-[#1D4ED8]/40 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#EFF6FF] rounded-xl">
                  <FileText className="w-6 h-6 text-[#1D4ED8]" />
                </div>

                <div>
                  <h3 className="text-base font-semibold">{article.title}</h3>
                  <p className="text-sm text-[#6B7280]">{article.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ================================== */}
      {/* CONTEÚDO PREMIUM */}
      {/* ================================== */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Conteúdo Premium</h2>

        <div className="space-y-3">
          {premiumContent.map((article) => (
            <button
              key={article.id}
              onClick={() => {
                window.location.href = '/pages/PremiumLocked';
              }}
              className="w-full text-left p-5 rounded-2xl bg-gradient-to-br from-[#FBBF24]/15 to-[#F59E0B]/15 border border-[#FBBF24]/40 shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] rounded-xl shadow">
                  <Lock className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h3 className="text-base font-semibold">{article.title}</h3>
                  <p className="text-sm text-[#B45309]">{article.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
