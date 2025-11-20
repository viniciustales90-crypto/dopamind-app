'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import QuizFlow from '@/components/quiz/QuizFlow';
import MainApp from '@/components/MainApp';

export default function Home() {
  const [currentView, setCurrentView] = useState<'loading' | 'onboarding' | 'quiz' | 'app'>('loading');

  useEffect(() => {
    // Check onboarding status
    const isOnboardingComplete = storage.isOnboardingComplete();
    const quizAnswers = storage.getQuizAnswers();

    if (!isOnboardingComplete) {
      setCurrentView('onboarding');
    } else if (!quizAnswers) {
      setCurrentView('quiz');
    } else {
      setCurrentView('app');
    }
  }, []);

  const handleOnboardingComplete = () => {
    storage.setOnboardingComplete();
    setCurrentView('quiz');
  };

  const handleQuizComplete = () => {
    setCurrentView('app');
  };

  if (currentView === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FFFFFF] dark:bg-[#0C0C0D]">
        <div className="text-3xl font-semibold text-[#1D4ED8] dark:text-[#3B82F6] animate-pulse">
          DopaMind
        </div>
      </div>
    );
  }

  if (currentView === 'onboarding') {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  if (currentView === 'quiz') {
    return <QuizFlow onComplete={handleQuizComplete} />;
  }

  return <MainApp />;
}
