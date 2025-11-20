'use client';

import { useState, useEffect } from 'react';
import { storage } from '@/lib/storage';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { User, Sun, Moon, Bell, Crown } from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    dailyGoal: 15,
    theme: 'light',
    notifications: true,
  });

  const [showPremium, setShowPremium] = useState(false);

  useEffect(() => {
    const data = storage.getUserProfile();
    if (data) setProfile(data);
  }, []);

  const applyTheme = (theme: 'light' | 'dark') => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSave = () => {
    storage.setUserProfile(profile);
    applyTheme(profile.theme as 'light' | 'dark');
    alert('Perfil atualizado!');
  };

  if (showPremium) {
    return (
      <div className="p-6">
        <Button onClick={() => setShowPremium(false)} variant="ghost">
          Voltar
        </Button>

        <div className="text-center mt-10 space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
            <Crown className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl font-semibold">DopaMind Pro</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Desbloqueie recursos avançados para acelerar sua transformação mental.
          </p>

          <Button className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-lg rounded-xl shadow-md">
            Ver Planos Pro
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0D0D0F] p-6 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 pt-6">
        <h1 className="text-3xl font-semibold text-[#0B0B0C] dark:text-white">
          Perfil
        </h1>
        <p className="text-base text-[#6B7280] dark:text-[#A1A1AA]">
          Personalize sua experiência
        </p>
      </div>

      {/* Avatar */}
      <div className="flex justify-center">
        <div className="w-28 h-28 bg-[#1D4ED8] dark:bg-[#3B82F6] rounded-full flex items-center justify-center shadow-lg">
          <User className="w-14 h-14 text-white" />
        </div>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label className="font-semibold text-[#0B0B0C] dark:text-white">
          Nome
        </Label>
        <Input
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          placeholder="Digite seu nome"
          className="h-[48px] rounded-xl"
        />
      </div>

      {/* Daily Goal */}
      <div className="space-y-2">
        <Label className="font-semibold text-[#0B0B0C] dark:text-white">
          Meta diária de foco (minutos)
        </Label>
        <Input
          type="number"
          value={profile.dailyGoal}
          onChange={(e) =>
            setProfile({ ...profile, dailyGoal: parseInt(e.target.value) || 15 })
          }
          className="h-[48px] rounded-xl"
        />
      </div>

      {/* Theme Toggle */}
      <div className="flex items-center justify-between bg-[#F2F4F7] dark:bg-[#16181D] p-5 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#1D4ED8]/10 dark:bg-[#3B82F6]/20">
            {profile.theme === 'light' ? (
              <Sun className="w-6 h-6 text-[#1D4ED8]" />
            ) : (
              <Moon className="w-6 h-6 text-[#3B82F6]" />
            )}
          </div>
          <div>
            <p className="text-base font-semibold text-[#0B0B0C] dark:text-white">
              Tema {profile.theme === 'light' ? 'Claro' : 'Escuro'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Alternar aparência
            </p>
          </div>
        </div>

        <Switch
          checked={profile.theme === 'dark'}
          onCheckedChange={() =>
            setProfile({
              ...profile,
              theme: profile.theme === 'light' ? 'dark' : 'light',
            })
          }
        />
      </div>

      {/* Notifications */}
      <div className="flex items-center justify-between bg-[#F2F4F7] dark:bg-[#16181D] p-5 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#1D4ED8]/10 dark:bg-[#3B82F6]/20">
            <Bell className="w-6 h-6 text-[#1D4ED8]" />
          </div>
          <div>
            <p className="text-base font-semibold text-[#0B0B0C] dark:text-white">
              Notificações
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Lembretes diários
            </p>
          </div>
        </div>

        <Switch
          checked={profile.notifications}
          onCheckedChange={(checked) =>
            setProfile({ ...profile, notifications: checked })
          }
        />
      </div>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        className="w-full h-[52px] text-base font-semibold rounded-xl bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white"
      >
        Salvar Alterações
      </Button>

      {/* Premium Section */}
      <div className="bg-gradient-to-br from-yellow-200/20 to-yellow-500/20 dark:from-yellow-500/10 dark:to-yellow-700/10 p-6 rounded-2xl border border-yellow-400/20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
            <Crown className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[#0B0B0C] dark:text-white">
            DopaMind Pro
          </h3>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Desbloqueie recursos avançados e acelere sua evolução.
        </p>

        <Button
          onClick={() => setShowPremium(true)}
          className="w-full h-[50px] mt-4 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold"
        >
          Ver Planos Pro
        </Button>
      </div>

      <p className="text-center text-sm text-gray-400 dark:text-gray-600 pb-4">
        DopaMind v1.0 — O foco começa aqui.
      </p>
    </div>
  );
}
