'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Lock, ArrowLeft, FileText } from 'lucide-react';
import { libraryContent, premiumContent } from '@/lib/content';

export default function LibraryPage() {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  // Extend the type to include optional readingTime
  type Article = {
    id: string;
    title: string;
    content: string;
    isPremium: boolean;
    readingTime?: string;
  };

  const allContent: Article[] = [...libraryContent, ...premiumContent];
  const article = allContent.find((a) => a.id === selectedArticle);

  // ==========================
  //  ARTIGO ABERTO
  // ==========================
  if (article) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0D0D0F]">
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
          {/* Voltar */}
          <Button
            onClick={() => setSelectedArticle(null)}
            variant="ghost"
            className="text-[#0B0B0C] dark:text-[#FFFFFF] hover:bg-[#F2F4F7] dark:hover:bg-[#16181D] h-10 rounded-xl inline-flex items-center px-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          {/* Se for PREMIUM, mantém a tela de bloqueio */}
          {article.isPremium ? (
            <div className="text-center space-y-8 py-16 animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] rounded-full flex items-center justify-center mx-auto shadow-lg animate-in zoom-in duration-500">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
                Conteúdo Premium
              </h2>
              <p className="text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60 text-lg max-w-md mx-auto">
                Desbloqueie este e outros conteúdos exclusivos com o DopaMind Pro
              </p>
              <Button className="bg-[#1D4ED8] hover:bg-[#1D4ED8]/90 dark:bg-[#3B82F6] dark:hover:bg-[#3B82F6]/90 text-white h-[52px] px-10 text-base font-semibold rounded-xl shadow-sm transition-all duration-300 hover:scale-105 active:scale-[0.97]">
                Ver Planos Premium
              </Button>
            </div>
          ) : (
            // ARTIGO GRATUITO — layout mais premium
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Cabeçalho do artigo */}
              <header className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF2FF] dark:bg-[#111827] px-3 py-1 text-xs font-medium text-[#4338CA] dark:text-[#A5B4FC]">
                  <BookOpen className="w-3.5 h-3.5" />
                  Biblioteca · Artigo
                </div>

                <h1 className="text-3xl md:text-4xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] leading-tight">
                  {article.title}
                </h1>

                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                  Leitura de {article.readingTime ?? '3–5 minutos'} ·
                  {' '}Conteúdo para entender melhor sua dopamina e foco
                </p>
              </header>

              {/* Card de conteúdo */}
              <main className="rounded-3xl bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] px-6 py-6 md:px-8 md:py-8 shadow-sm">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-line text-base leading-relaxed text-[#111827] dark:text-[#E5E7EB]">
                    {article.content}
                  </p>
                </div>
              </main>

              {/* Nota/fechamento */}
              <footer>
                <p className="text-xs text-[#9CA3AF] dark:text-[#6B7280]">
                  Use o que você aprendeu aqui para ajustar seu foco hoje.
                  Volte à biblioteca sempre que quiser revisar ou aprender algo novo.
                </p>
              </footer>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================
  //  LISTA DA BIBLIOTECA
  // ==========================
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0D0D0F] animate-in fade-in duration-500">
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 pt-6 animate-in slide-in-from-top duration-700">
          <h1 className="text-3xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
            Biblioteca
          </h1>
          <p className="text-base text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60">
            Aprenda sobre dopamina, foco e controle
          </p>
        </div>

        {/* Free Content */}
        <div className="space-y-5 animate-in slide-in-from-bottom duration-700 delay-100">
          <h2 className="text-xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
            Conteúdo Gratuito
          </h2>
          <div className="space-y-3">
            {libraryContent.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setSelectedArticle(item.id)}
                className="w-full flex items-center gap-4 p-6 bg-[#F2F4F7] dark:bg-[#16181D] rounded-xl hover:bg-[#E5E7EB] dark:hover:bg-[#1F2937] transition-all duration-300 hover:scale-[1.02] text-left shadow-sm hover:shadow-md animate-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-[#1D4ED8]/10 dark:bg-[#3B82F6]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-7 h-7 text-[#1D4ED8] dark:text-[#3B82F6]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] mb-1 text-base">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#0B0B0C]/50 dark:text-[#FFFFFF]/50">
                    Leitura de 3-5 minutos
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Premium Content */}
        <div className="space-y-5 animate-in slide-in-from-bottom duration-700 delay-300">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
              Conteúdo Premium
            </h2>
            <div className="w-10 h-10 bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] rounded-full flex items-center justify-center shadow-sm">
              <Lock className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="space-y-3">
            {premiumContent.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setSelectedArticle(item.id)}
                className="w-full flex items-center gap-4 p-6 bg-gradient-to-br from-[#FBBF24]/10 to-[#F59E0B]/10 dark:from-[#FBBF24]/5 dark:to-[#F59E0B]/5 rounded-xl hover:from-[#FBBF24]/20 hover:to-[#F59E0B]/20 dark:hover:from-[#FBBF24]/10 dark:hover:to-[#F59E0B]/10 transition-all duration-300 hover:scale-[1.02] text-left border border-[#FBBF24]/20 dark:border-[#FBBF24]/10 shadow-sm hover:shadow-md animate-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] mb-1 text-base">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#F59E0B] dark:text-[#FBBF24] font-medium">
                    Exclusivo para membros Pro
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
