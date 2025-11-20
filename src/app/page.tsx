'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import QuizFlow from '@/components/quiz/QuizFlow';
import MainApp from '@/components/MainApp';

export default function Home() {
  const [currentView, setCurrentView] = useState<'loading' | 'quiz' | 'app'>('loading');

  useEffect(() => {
    const quizAnswers = storage.getQuizAnswers();

    // Se o quiz NÃO foi feito → mostrar quiz
    if (!quizAnswers) {
      setCurrentView('quiz');
    } else {
      // Se já tem respostas → mostrar o app
      setCurrentView('app');
    }
  }, []);

  const handleQuizComplete = () => {
    setCurrentView('app');
  };

  if (currentView === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-xl font-semibold text-[#1D4ED8]">Carregando…</div>
      </div>
    );
  }

  if (currentView === 'quiz') {
    return <QuizFlow onComplete={handleQuizComplete} />;
  }

  return <MainApp />;
}
