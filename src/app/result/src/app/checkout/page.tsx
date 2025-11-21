'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';

type PlanId = 'annual' | 'monthly' | 'lifetime';

const PLAN_INFO: Record<
  PlanId,
  { title: string; price: string; description: string }
> = {
  annual: {
    title: 'Plano Anual',
    price: 'R$ 14,90/mês',
    description: 'Economize 58% • Mais escolhido',
  },
  monthly: {
    title: 'Plano Mensal',
    price: 'R$ 29,90',
    description: 'Comece sem compromisso',
  },
  lifetime: {
    title: 'Acesso Vitalício',
    price: 'R$ 199,00',
    description: 'Pague uma vez • Acesso para sempre',
  },
};

export default function CheckoutPage() {
  const [plan, setPlan] = useState<PlanId | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = storage.get<PlanId>('dopamind-plan');
    if (stored) {
      setPlan(stored);
    } else {
      // se não tiver plano salvo, volta pro resultado
      router.replace('/result');
    }
  }, [router]);

  if (!plan) {
    return null;
  }

  const info = PLAN_INFO[plan];

  function handleAccessApp() {
    // aqui no futuro você só troca pra URL de "sucesso" do pagamento
    router.push('/app');
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 py-10">
        <h1 className="mb-4 text-xl font-semibold text-neutral-900">
          Finalize seu acesso
        </h1>

        <p className="mb-6 text-sm text-neutral-500 text-center">
          Você escolheu o <span className="font-semibold">{info.title}</span>.
          {' '}Por enquanto esta é uma tela de checkout simulada apenas para
          testes do fluxo do DopaMind.
        </p>

        <div className="mb-6 w-full rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          <p className="text-sm font-semibold text-neutral-900">{info.title}</p>
          <p className="text-xs text-neutral-500">{info.description}</p>
          <p className="mt-2 text-lg font-semibold text-neutral-900">
            {info.price}
          </p>
        </div>

        <Button
          className="w-full rounded-full"
          onClick={handleAccessApp}
        >
          Acessar aplicativo DopaMind
        </Button>

        <p className="mt-3 text-[11px] text-center text-neutral-400">
          Depois que você integrar o pagamento real, esta tela pode ser usada
          como página de sucesso.
        </p>
      </div>
    </div>
  );
}
