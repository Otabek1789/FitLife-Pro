import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { X, ShieldCheck, User, Lock, Phone, Sparkles } from 'lucide-react';

export const AuthModal = () => {
  const { t } = useLanguage();
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalTab, 
    setAuthModalTab, 
    login, 
    register, 
    quickDemoLogin 
  } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authModalTab === 'login') {
      login(identifier || 'demo_user', password || '123456');
    } else {
      register(fullName || 'Yangi Foydalanuvchi', identifier || '+998901234567', password || '123456');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={closeAuthModal} 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tabs */}
        <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-6">
          <button
            type="button"
            onClick={() => setAuthModalTab('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              authModalTab === 'login'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t('nav_login')}
          </button>
          <button
            type="button"
            onClick={() => setAuthModalTab('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              authModalTab === 'register'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t('nav_register')}
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {authModalTab === 'login' ? t('auth_login_title') : t('auth_register_title')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            FitLife Pro ekotizimiga xush kelibsiz
          </p>
        </div>

        {/* Quick Demo Buttons for Judges */}
        <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-purple-500/10 border border-emerald-500/20">
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Hakamlar uchun 1-bosishda tezkor kirish:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => quickDemoLogin('user')}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold text-[11px] transition"
            >
              <User className="w-3.5 h-3.5" />
              <span>Foydalanuvchi</span>
            </button>
            <button
              type="button"
              onClick={() => quickDemoLogin('admin')}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-700 dark:text-purple-300 font-bold text-[11px] transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin (PRO)</span>
            </button>
          </div>
        </div>

        {/* Regular Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authModalTab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                To'liq Ismingiz
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Azizbek Olimov"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('auth_username_phone')}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="+998 90 123 45 67 yoki login"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('auth_password')}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 active:scale-95 transition mt-2"
          >
            {authModalTab === 'login' ? t('nav_login') : t('nav_register')}
          </button>
        </form>
      </div>
    </div>
  );
};
