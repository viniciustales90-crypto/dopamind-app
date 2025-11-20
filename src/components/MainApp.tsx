'use client';

import { useState } from 'react';

import HomePage from '@/src/pages/HomePage';
import ImpulseControlPage from '@/src/pages/ImpulseControlPage';
import LibraryPage from '@/src/pages/LibraryPage';
import StatsPage from '@/src/pages/StatsPage';
import ProfilePage from '@/src/pages/ProfilePage';

export default function MainApp() {
  const [activeTab, setActiveTab] = useState<'home' | 'impulses' | 'library' | 'stats' | 'profile'>('home');

  const renderPage = () => {
    switch (activeTab) {
      case 'home': return <HomePage />;
      case 'impulses': return <ImpulseControlPage />;
      case 'library': return <LibraryPage />;
      case 'stats': return <StatsPage />;
      case 'profile': return <ProfilePage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      
      <div className="flex-1 overflow-y-auto">
        {renderPage()}
      </div>

      {/* Bottom Navigation */}
      <div className="h-16 bg-white border-t border-[#E5E7EB] flex items-center justify-between px-6 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        
        <TabButton icon="🏠" label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <TabButton icon="⚡" label="Impulsos" active={activeTab === 'impulses'} onClick={() => setActiveTab('impulses')} />
        <TabButton icon="📚" label="Biblioteca" active={activeTab === 'library'} onClick={() => setActiveTab('library')} />
        <TabButton icon="📈" label="Stats" active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
        <TabButton icon="👤" label="Perfil" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />

      </div>
    </div>
  );
}

function TabButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center text-xs transition-all ${
        active ? 'text-[#1D4ED8] font-semibold' : 'text-[#6B7280]'
      }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}
