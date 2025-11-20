'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { User, Moon, Sun, Bell, Crown, ArrowLeft, Check } from 'lucide-react';
import { storage } from '@/lib/storage';
import { UserProfile } from '@/lib/types';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    dailyGoal: 15,
    theme: 'light',
    notifications: true,
    isPremium: false,
  });
  const [showPremium, setShowPremium] = useState(false);

  useEffect(() => {
    const savedProfile = storage.getUserProfile();
    if (savedProfile) {
      setProfile(savedProfile);
      applyTheme(savedProfile.theme);
    }
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
    applyTheme(profile.theme);
    alert('Perfil salvo com sucesso!');
  };

  const toggleTheme = () => {
    const newTheme = profile.theme === 'light' ? 'dark' : 'light';
    setProfile({ ...profile, theme: newTheme });
  };

  if (showPremium) {
    return <PremiumPaywall onClose={() => setShowPremium(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0D0D0F] animate-in fade-in duration-500">
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 pt-6 animate-in slide-in-from-top duration-700">
          <h1 className="text-3xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">Perfil</h1>
          <p className="text-base text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60">
            Personalize sua experiência
          </p>
        </div>

        {/* Profile Picture - Avatar circular maior */}
        <div className="flex justify-center animate-in zoom-in duration-700 delay-100">
          <div className="w-28 h-28 bg-[#1D4ED8] dark:bg-[#3B82F6] rounded-full flex items-center justify-center shadow-lg">
            <User className="w-14 h-14 text-white" />
          </div>
        </div>

        {/* Form - Espaçamento generoso */}
        <div className="space-y-6 animate-in slide-in-from-bottom duration-700 delay-200">
          {/* Name */}
          <div className="space-y-3">
            <Label htmlFor="name" className="text-[#0B0B0C] dark:text-[#FFFFFF] font-semibold text-base">Nome</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Seu nome"
              className="h-[52px] rounded-xl border-[#E5E7EB] dark:border-[#16181D] bg-[#F2F4F7] dark:bg-[#16181D] text-[#0B0B0C] dark:text-[#FFFFFF] text-base focus:ring-2 focus:ring-[#1D4ED8] dark:focus:ring-[#3B82F6] transition-all"
            />
          </div>

          {/* Daily Goal */}
          <div className="space-y-3">
            <Label htmlFor="goal" className="text-[#0B0B0C] dark:text-[#FFFFFF] font-semibold text-base">Meta diária de foco (minutos)</Label>
            <Input
              id="goal"
              type="number"
              value={profile.dailyGoal}
              onChange={(e) =>
                setProfile({ ...profile, dailyGoal: parseInt(e.target.value) || 15 })
              }
              className="h-[52px] rounded-xl border-[#E5E7EB] dark:border-[#16181D] bg-[#F2F4F7] dark:bg-[#16181D] text-[#0B0B0C] dark:text-[#FFFFFF] text-base focus:ring-2 focus:ring-[#1D4ED8] dark:focus:ring-[#3B82F6] transition-all"
            />
          </div>

          {/* Theme Toggle - Switch estilo iOS */}
          <div className="flex items-center justify-between p-5 bg-[#F2F4F7] dark:bg-[#16181D] rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
              {profile.theme === 'light' ? (
                <div className="w-12 h-12 bg-[#1D4ED8]/10 dark:bg-[#3B82F6]/20 rounded-xl flex items-center justify-center">
                  <Sun className="w-6 h-6 text-[#1D4ED8] dark:text-[#3B82F6]" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-[#1D4ED8]/10 dark:bg-[#3B82F6]/20 rounded-xl flex items-center justify-center">
                  <Moon className="w-6 h-6 text-[#1D4ED8] dark:text-[#3B82F6]" />
                </div>
              )}
              <div>
                <div className="font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] text-base">
                  Tema {profile.theme === 'light' ? 'Claro' : 'Escuro'}
                </div>
                <div className="text-sm text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60">
                  Alternar aparência
                </div>
              </div>
            </div>
            <Switch checked={profile.theme === 'dark'} onCheckedChange={toggleTheme} />
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between p-5 bg-[#F2F4F7] dark:bg-[#16181D] rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1D4ED8]/10 dark:bg-[#3B82F6]/20 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-[#1D4ED8] dark:text-[#3B82F6]" />
              </div>
              <div>
                <div className="font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] text-base">
                  Notificações
                </div>
                <div className="text-sm text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60">
                  Lembretes diários
                </div>
              </div>
            </div>
            <Switch
              checked={profile.notifications}
              onCheckedChange={(checked) =>
                setProfile({ ...profile, notifications: checked })
              }
            />
          </div>

          {/* Save Button - Menor e mais elegante */}
          <Button
            onClick={handleSave}
            className="w-full bg-[#1D4ED8] hover:bg-[#1D4ED8]/90 dark:bg-[#3B82F6] dark:hover:bg-[#3B82F6]/90 text-white h-[52px] text-base font-semibold rounded-xl shadow-sm transition-all duration-300 hover:scale-105 active:scale-[0.97]"
          >
            Salvar Alterações
          </Button>
        </div>

        {/* Premium Section - Gradiente dourado suave */}
        <div className="bg-gradient-to-br from-[#FBBF24]/10 to-[#F59E0B]/10 dark:from-[#FBBF24]/5 dark:to-[#F59E0B]/5 rounded-2xl p-6 space-y-5 border border-[#FBBF24]/20 dark:border-[#FBBF24]/10 shadow-sm hover:shadow-md transition-all duration-300 animate-in slide-in-from-bottom duration-700 delay-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] rounded-xl flex items-center justify-center shadow-sm">
              <Crown className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
              DopaMind Pro
            </h3>
          </div>
          <p className="text-[#0B0B0C]/70 dark:text-[#FFFFFF]/70 text-base">
            Desbloqueie recursos avançados e acelere sua transformação
          </p>
          <Button
            onClick={() => setShowPremium(true)}
            className="w-full bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] hover:from-[#FBBF24]/90 hover:to-[#F59E0B]/90 text-white h-[52px] text-base font-semibold rounded-xl shadow-sm transition-all duration-300 hover:scale-105 active:scale-[0.97]"
          >
            Ver Planos Premium
          </Button>
        </div>

        {/* App Info */}
        <div className="text-center text-sm text-[#0B0B0C]/40 dark:text-[#FFFFFF]/40 space-y-1 pb-4">
          <p>DopaMind v1.0</p>
          <p>Recupere seu foco, um passo de cada vez</p>
        </div>
      </div>
    </div>
  );
}

function PremiumPaywall({ onClose }: { onClose: () => void }) {
  const plans = [
    {
      name: 'Mensal',
      price: 'R$ 19,90',
      period: '/mês',
      popular: false,
    },
    {
      name: 'Trimestral',
      price: 'R$ 49,90',
      period: '/3 meses',
      popular: true,
      savings: 'Economize 16%',
    },
    {
      name: 'Anual',
      price: 'R$ 149,90',
      period: '/ano',
      popular: false,
      savings: 'Economize 37%',
    },
  ];

  const benefits = [
    'Timers de 20 e 30 minutos',
    'Textos exclusivos sobre neurociência',
    'Hábitos avançados personalizados',
    'Estatísticas completas e gráficos',
    'Plano avançado de controle de impulsos',
    'Temas exclusivos',
    'Suporte prioritário',
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0D0D0F] animate-in fade-in duration-500">
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        <Button 
          onClick={onClose} 
          variant="ghost"
          className="text-[#0B0B0C] dark:text-[#FFFFFF] hover:bg-[#F2F4F7] dark:hover:bg-[#16181D] h-12 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        {/* Header */}
        <div className="text-center space-y-5 animate-in slide-in-from-top duration-700">
          <div className="w-24 h-24 bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] rounded-full flex items-center justify-center mx-auto shadow-lg animate-in zoom-in duration-500">
            <Crown className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
            Desbloqueie o DopaMind Pro
          </h1>
          <p className="text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60 text-base">
            Acelere sua transformação com recursos avançados
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-[#F2F4F7] dark:bg-[#16181D] rounded-2xl p-6 space-y-4 shadow-sm animate-in slide-in-from-bottom duration-700 delay-100">
          <h3 className="font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] mb-4 text-lg">
            O que você ganha:
          </h3>
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 animate-in slide-in-from-left duration-500"
              style={{ animationDelay: `${200 + index * 80}ms` }}
            >
              <div className="w-8 h-8 bg-[#1D4ED8] dark:bg-[#3B82F6] rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <span className="text-[#0B0B0C] dark:text-[#FFFFFF] font-medium text-base">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Plans */}
        <div className="space-y-4 animate-in slide-in-from-bottom duration-700 delay-300">
          {plans.map((plan, index) => (
            <button
              key={plan.name}
              className={`w-full p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] shadow-sm hover:shadow-md animate-in slide-in-from-bottom duration-700 ${
                plan.popular
                  ? 'bg-gradient-to-br from-[#FBBF24]/10 to-[#F59E0B]/10 dark:from-[#FBBF24]/5 dark:to-[#F59E0B]/5 border-[#FBBF24]'
                  : 'bg-[#F2F4F7] dark:bg-[#16181D] border-[#E5E7EB] dark:border-[#16181D]'
              }`}
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#0B0B0C] dark:text-[#FFFFFF] text-lg">
                      {plan.name}
                    </span>
                    {plan.popular && (
                      <span className="px-3 py-1 bg-[#FBBF24] text-white text-xs rounded-full font-semibold">
                        Popular
                      </span>
                    )}
                  </div>
                  {plan.savings && (
                    <div className="text-sm text-[#F59E0B] dark:text-[#FBBF24] mt-2 font-medium">
                      {plan.savings}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-semibold text-[#0B0B0C] dark:text-[#FFFFFF]">
                    {plan.price}
                  </div>
                  <div className="text-sm text-[#0B0B0C]/60 dark:text-[#FFFFFF]/60">
                    {plan.period}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        <Button className="w-full bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] hover:from-[#FBBF24]/90 hover:to-[#F59E0B]/90 text-white h-[52px] text-base font-semibold rounded-xl shadow-sm transition-all duration-300 hover:scale-105 active:scale-[0.97] animate-in slide-in-from-bottom duration-700 delay-600">
          Ativar DopaMind Pro
        </Button>

        <p className="text-center text-sm text-[#0B0B0C]/50 dark:text-[#FFFFFF]/50">
          Cancele quando quiser. Sem compromisso.
        </p>
      </div>
    </div>
  );
}
