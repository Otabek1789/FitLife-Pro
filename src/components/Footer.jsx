import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { 
  Dumbbell, 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Heart, 
  ShieldCheck, 
  Award,
  Sparkles
} from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();
  const { showToast, sendTelegramNotification } = useStore();
  const [subscribePhone, setSubscribePhone] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subscribePhone.trim()) return;

    await sendTelegramNotification(
      `🔔 <b>YANGI OBUNA (Telegram Kanal):</b>\nFoydalanuvchi telefoni: ${subscribePhone}\nVaqt: ${new Date().toLocaleString()}`
    );

    showToast("Telegram kanalimizga obuna bo'ldingiz! Rahmat!");
    setSubscribePhone('');
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 backdrop-blur-md pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                FitLife Pro
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              O'zbekistondagi eng ilg'or sport va sog'liq platformasi. Shaxsiy mashg'ulotlar, BMI hisoblagich, premium sport ozuqalari va rasmiy zallar tarmog'i.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl w-fit">
              <Award className="w-4 h-4" />
              <span>IT Olimpiada 2026 Nomzodi</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Asosiy Bo'limlar
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition">
                  {t('nav_home')}
                </Link>
              </li>
              <li>
                <Link to="/workouts" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition">
                  {t('nav_workouts')}
                </Link>
              </li>
              <li>
                <Link to="/nutrition" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition">
                  {t('nav_nutrition')} (BMI)
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition">
                  {t('nav_shop')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition">
                  {t('nav_contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contacts */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Aloqa & Filiallar
            </h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Toshkent sh., Amir Temur shoh ko'chasi 107-B</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="tel:+998712004411" className="hover:text-emerald-500 transition">
                  +998 (71) 200-44-11
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>info@fitlife.uz</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Send className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="font-semibold text-teal-500">@FitLife_Official_Bot</span>
              </li>
            </ul>
          </div>

          {/* Telegram Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
              Telegram Bot Yangiliklari
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Yangi aksiyalar, chegirma promokodlari va mashqlar qo'llanmasini Telegram orqali qabul qiling.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="+998 90 123 45 67"
                  value={subscribePhone}
                  onChange={(e) => setSubscribePhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white text-xs font-bold shadow-md shadow-teal-500/20 active:scale-95 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Botga Ulanish</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 FitLife Pro. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-2">
            <span>Designed for</span>
            <span className="font-bold text-emerald-500">IT Olimpiada / Hackathon 2026</span>
            <span>with Senior Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
