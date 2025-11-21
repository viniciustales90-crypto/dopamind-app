'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full w-full bg-[#FAFAFA] dark:bg-[#0D0D0F]">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Título da página */}
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-[#0B0B0C] dark:text-white">
            Controle de Impulsos
          </h1>
          <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
            Use este plano de 24 horas para testar um dia inteiro sob controle.
          </p>
        </div>

        {/* Card do plano + botão */}
        <div className="rounded-3xl bg-white dark:bg-[#111118] border border-[#E5E7EB] dark:border-[#1F2937] shadow-sm p-4 md:p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#111827] dark:text-white">
                Plano de 24h de Controle
              </p>
              <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                Um roteiro simples para passar um dia inteiro com menos impulsos.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-medium bg-[#1D4ED8] text-white hover:bg-[#1E40AF] transition-colors"
            >
              {open ? 'Esconder plano' : 'Ver plano completo'}
              {open ? (
                <ChevronUp className="w-4 h-4 ml-2" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-2" />
              )}
            </button>
          </div>

          {/* Conteúdo expandido */}
          {open && (
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
                Lembre-se: cada impulso controlado fortalece sua disciplina. Use
                este plano como experimento por um dia — depois ajuste para a sua
                rotina.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
