'use client';

export default function FullPlanPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Plano Avançado de 24h</h1>

      <div className="bg-white rounded-3xl p-6 shadow border border-[#E5E7EB] space-y-3">
        <p className="text-sm text-[#6B7280]">
          Este plano foi criado para reduzir impulsos ao longo de 24h.
        </p>

        <ul className="list-disc pl-5 text-sm text-[#374151] space-y-2">
          <li>Bloqueio de gatilhos principais</li>
          <li>Micro-hábitos de foco</li>
          <li>Redução de estímulos rápidos</li>
          <li>Controle de ansiedade dopaminérgica</li>
        </ul>
      </div>
    </div>
  );
}
