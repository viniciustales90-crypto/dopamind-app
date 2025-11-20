'use client';

import { useState, useEffect } from 'react';
import { Home, Brain, BookOpen, BarChart3, User } from 'lucide-react';
import HomePage from './pages/HomePage';
import ImpulseControlPage from './pages/ImpulseControlPage';
import LibraryPage from './pages/LibraryPage';
import StatsPage from './pages/StatsPage';
import ProfilePage from './pages/ProfilePage';
import FocusMode from './focus/FocusMode';
import { checkAndResetDailyHabits } from '@/lib/storage';

type Tab = 'home' | 'impulse' | 'library' | 'stats' | 'profile';

export default function MainApp() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [focusMode, setFocusMode] = useState<number | null>(null);

  useEffect(() => {
    // Check and reset daily habits on mount
    checkAndResetDailyHabits();
  }, []);

  const handleStartFocus = (minutes: number) => {
    setFocusMode(minutes);
  };

  const handleExitFocus = () => {
    setFocusMode(null);
  };

  if (focusMode) {
    return <FocusMode duration={focusMode} onExit={handleExitFocus} />;
  }

  const tabs = [
    { id: 'home' as Tab, label: 'Home', icon: Home },
    { id: 'impulse' as Tab, label: 'Impulsos', icon: Brain },
    { id: 'library' as Tab, label: 'Biblioteca', icon: BookOpen },
    { id: 'stats' as Tab, label: 'Stats', icon: BarChart3 },
    { id: 'profile' as Tab, label: 'Perfil', icon: User },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#FAFAFA] dark:bg-[#0D0D0F]">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'home' && <HomePage onStartFocus={handleStartFocus} />}
        {activeTab === 'impulse' && <ImpulseControlPage />}
        {activeTab === 'library' && <LibraryPage />}
        {activeTab === 'stats' && <StatsPage />}
        {activeTab === 'profile' && <ProfilePage />}
      </div>

      {/* Bottom Navigation - Otimizado estilo iOS 16/17 */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#FAFAFA]/95 dark:bg-[#0D0D0F]/95 backdrop-blur-lg border-t border-[#E5E7EB] dark:border-[#16181D] shadow-[0_-2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_-2px_8px_rgba(0,0,0,0.2)]">
        <div className="flex justify-around items-center h-20 max-w-2xl mx-auto px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-300 ease-in-out ${
                  isActive
                    ? 'text-[#1D4ED8] dark:text-[#3B82F6] scale-105'
                    : 'text-[#0B0B0C]/40 dark:text-[#FFFFFF]/40 hover:text-[#0B0B0C]/60 dark:hover:text-[#FFFFFF]/60'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
