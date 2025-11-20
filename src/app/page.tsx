'use client';

import { useEffect, useState } from 'react';
import MainApp from '@/components/MainApp';
import OnboardingFlow, { OnboardingAnswers } from '@/components/onboarding/OnboardingFlow';








export default function RootPage() {
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const completed = window.localStorage.getItem('dopamind_onboarding_completed') === '1';
    setHasOnboarded(completed);
  }, []);

  const handleOnboardingComplete = (answers: OnboardingAnswers) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('dopamind_onboarding_completed', '1');
      window.localStorage.setItem('dopamind_userName', answers.name);
      window.localStorage.setItem('dopamind_birthDate', answers.birthDate);
    }

    setHasOnboarded(true);
  };

  if (hasOnboarded === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[#0B7280]">
        Carregando...
      </div>
    );
  }

  if (hasOnboarded) {
    return <MainApp />;
  }

  return <OnboardingFlow onComplete={handleOnboardingComplete} />;
}
