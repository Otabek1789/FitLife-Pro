import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Truck,
  ShieldCheck,
  Headphones,
  CreditCard,
  Smartphone,
  Laptop,
  Watch,
  Tv,
  ChevronRight,
  Star,
  CheckCircle2,
  Gamepad2,
  Gift,
  RefreshCw,
  Swords,
  Rocket,
  Dumbbell,
  Activity,
  Heart,
  Scale
} from 'lucide-react';
import sound from '../utils/soundFX';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/common/ProductCard';
import QuickViewModal from '../components/common/QuickViewModal';
import TelegramStories from '../components/telegram/TelegramStories';
import { useTelegramWebApp } from '../hooks/useTelegramWebApp';

export default function Home() {
  const { products } = useStore();
  const { language, t } = useLanguage();
  const { isTelegram, tgUser } = useTelegramWebApp();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Live Flash Sale Countdown Timer (Hours, Minutes, Seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = products.filter((p) => p.isFlashSale).slice(0, 4);
  const topProducts = products.filter((p) => p.isFeatured || p.rating >= 4.8).slice(0, 8);

  const categories = [
    {
      id: 'nutrition',
      name: { uz: 'Protein & Ozuqa', ru: 'Спортпит & Протеин', en: 'Sports Nutrition' },
      icon: Flame,
      count: '42+ tovarlar',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'equipment',
      name: { uz: 'Trenajyor & Anjomlar', ru: 'Тренажеры & Инвентарь', en: 'Gym Equipment' },
      icon: Dumbbell,
      count: '35+ anjomlar',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'passes',
      name: { uz: 'Zallarga Abonementlar', ru: 'Абонементы в Залы', en: 'Gym Passes & Clubs' },
      icon: Star,
      count: '28+ zallar',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'smartwatches',
      name: { uz: 'Aqlli soatlar', ru: 'Смарт-часы', en: 'Fitness Watches' },
      icon: Watch,
      count: '24+ model',
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 'apparel',
      name: { uz: 'Sport Kiyimlari', ru: 'Спортивная Одежда', en: 'Sport Apparel' },
      icon: ShieldCheck,
      count: '60+ tovarlar',
      color: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <div className={isTelegram ? "space-y-8 pb-12" : "space-y-16 sm:space-y-24 pb-16"}>
      
      {/* Telegram Mini App Top Stories & Compact Banner */}
      {isTelegram ? (
        <div className="space-y-3 pt-2">
          <TelegramStories />
          <div className="px-4">
            <div className="p-4 rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-800 text-white shadow-xl shadow-indigo-600/25 border border-indigo-400/20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                  🔥 Telegram Aksiya
                </span>
                <span className="text-[10px] font-mono bg-white text-indigo-900 px-2 py-0.5 rounded-lg font-bold shadow-xs">
                  KOD: UZBEK2026
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold mt-2 leading-snug">
                Sog'liq, Sport va Fitnes Ekotizimi — 1 klikda buyurtma!
              </h2>
              <p className="text-xs text-indigo-200 mt-1">
                Toshkent bo'ylab 24 soatda, viloyatlarga 2 kunda tezkor yetkazib beramiz.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Standard Web Desktop Hero Section */
        <section className="relative overflow-hidden pt-6 sm:pt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white shadow-2xl border border-indigo-500/30 p-8 sm:p-14 lg:p-20">
            {/* Ambient rotating glowing orbs */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none animate-spin-slow" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl pointer-events-none animate-spin-slow-reverse" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-indigo-300 border border-white/20 backdrop-blur-md animate-glow">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-wiggle" />
                  Sog'liq, Sport & Fitnes Ekotizimi
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] animate-gradient-text">
                  Sog'lom Hayot, Sport & Mukammal Natija
                </h1>
                <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Dunyoning yetakchi brendlaridan original sport ozuqalari, zamonaviy trenajyorlar, FitLife zal abonementlari va interaktiv mashg'ulotlar platformasi.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <Link
                    to="/shop"
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-base shadow-xl shadow-indigo-600/35 flex items-center justify-center gap-2 transition-all transform active:scale-95 btn-shimmer animate-glow hover:scale-105"
                  >
                    Katalog & Do'kon
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/workouts"
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 backdrop-blur-md flex items-center justify-center gap-2 transition-all btn-shimmer hover:scale-105"
                  >
                    <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                    Mashg'ulotlar & Taymer
                  </Link>
                </div>

                {/* Hero Badges */}
                <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-center lg:text-left">
                  <div className="group cursor-default">
                    <p className="text-2xl font-black text-white group-hover:text-indigo-300 transition-colors">100%</p>
                    <p className="text-xs text-slate-400">Original tovarlar</p>
                  </div>
                  <div className="group cursor-default">
                    <p className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">24 soat</p>
                    <p className="text-xs text-slate-400">Yetkazib berish</p>
                  </div>
                  <div className="group cursor-default">
                    <p className="text-2xl font-black text-white group-hover:text-amber-300 transition-colors">15 000+</p>
                    <p className="text-xs text-slate-400">Faol sportchilar</p>
                  </div>
                </div>
              </div>

              {/* Hero Image Showcase with 3D Float */}
              <div className="lg:col-span-5 relative flex justify-center animate-float">
                <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border border-white/20 group hover:border-indigo-400/50 transition-all duration-500 hover:shadow-indigo-500/30">
                  <img
                    src="https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80"
                    alt="Optimum Nutrition Gold Standard Whey"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                      Hafta Tanlovi
                    </span>
                    <h3 className="text-lg font-bold text-white">ON Gold Standard 100% Whey Protein</h3>
                    <p className="text-sm font-extrabold text-indigo-400 mt-1">980 000 so'm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )}

      {/* 2. Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {t('home.popularCategories')}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              O'zingizga kerakli sport va sog'liq yo'nalishini tanlang
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:gap-2.5 transition-all"
          >
            {t('home.viewAll')} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const catTitle = cat.name[language] || cat.name['uz'];
            return (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                className="group relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 card-interactive text-center flex flex-col items-center"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${cat.color} text-white flex items-center justify-center shadow-lg mb-4 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {catTitle}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{cat.count}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Flash Sale / Kunning maxsus chegirmalari */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-rose-500/10 via-amber-500/10 to-indigo-500/10 dark:from-rose-950/30 dark:to-indigo-950/30 border border-rose-500/20 rounded-3xl p-6 sm:p-10 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 animate-pulse">
                <Flame className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  {t('home.flashDeals')}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {t('home.flashDealsSub')}
                </p>
              </div>
            </div>

            {/* Countdown Badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 hidden sm:inline">
                {t('home.endsIn')}
              </span>
              <div className="flex items-center gap-1.5 font-mono text-sm sm:text-base font-extrabold">
                <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-white shadow">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-rose-500">:</span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-white shadow">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-rose-500">:</span>
                <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-white shadow">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Flash Sale Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={(prod) => setQuickViewProduct(prod)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Health, Workout & Entertainment Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-white">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>Moderno Sport & Fitnes Hub</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Interaktiv Asboblar & <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 bg-clip-text text-transparent">Sport Maydoni</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Sekundomer va rep tracker bilan shug'ullaning, BMI va kaloriyangizni hisoblang, sovrinlar yuting va yangiliklardan bahramand bo'ling!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {/* 1. Workouts Trainer */}
            <Link
              to="/workouts"
              onClick={() => sound.playClick()}
              className="card-interactive p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/60 hover:bg-white/10 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-115 group-hover:rotate-6 group-hover:shadow-emerald-500/40 transition-all duration-300">
                  <Activity className="w-6 h-6 animate-pulse" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors">Mashg'ulotlar & Taymer</h3>
                  <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">PRO 💪</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interaktiv taymer, rep sanash, dam olish oraliqlari va video mashqlar.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
                <span>Mashqni boshlash</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </Link>

            {/* 2. BMI & Nutrition Calculator */}
            <Link
              to="/nutrition"
              onClick={() => sound.playClick()}
              className="card-interactive p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/60 hover:bg-white/10 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-115 group-hover:-rotate-6 group-hover:shadow-cyan-500/40 transition-all duration-300">
                  <Scale className="w-6 h-6 animate-wiggle" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">BMI & Kaloriya Hisoblagich</h3>
                  <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse">AI 🥗</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Tana vazn indeksi, kunlik TDEE kaloriya ehtiyoji va taomnoma rejalari.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                <span>Hisoblab ko'rish</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </Link>

            {/* 3. Mystery Box */}
            <Link
              to="/mystery-box"
              onClick={() => sound.playClick()}
              className="card-interactive p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/60 hover:bg-white/10 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-115 group-hover:-rotate-6 group-hover:shadow-amber-500/40 transition-all duration-300">
                  <Gift className="w-6 h-6 animate-wiggle" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">Mystery Box</h3>
                  <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">Sovrin 🎁</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Kunlik bepul quti, iPhone 15 Pro, protein va sport anjomlari yutib olish imkoni.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                <span>Qutini ochish</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </Link>

            {/* 4. Battle Arena */}
            <Link
              to="/battle"
              onClick={() => sound.playClick()}
              className="card-interactive p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-rose-500/60 hover:bg-white/10 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 to-purple-600 flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-115 group-hover:rotate-12 group-hover:shadow-rose-500/40 transition-all duration-300">
                  <Swords className="w-6 h-6 animate-pulse" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-base text-white group-hover:text-rose-300 transition-colors">Gadget & Gear Battle</h3>
                  <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse">VS ⚔️</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Flagmanlar yakkama-yak jangi: Tarkib, Quvvat, Samaradorlik va Baholar.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-rose-400 group-hover:text-rose-300">
                <span>Jang maydoniga</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Top Selling Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              {t('home.topProducts')}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Eng yuqori baholangan sport ozuqalari va mashq anjomlari
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:gap-2 transition-all"
          >
            {t('home.viewAll')} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onQuickView={(prod) => setQuickViewProduct(prod)}
            />
          ))}
        </div>
      </section>

      {/* 5. Why Choose Us (Value Proposition) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {t('home.whyUsTitle')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Mijozlarimizga xaridning har bir bosqichida mukammal xizmat va kafolat beramiz
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-interactive p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center group">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-120 group-hover:rotate-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <Truck className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {t('home.freeDelivery')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('home.freeDeliveryDesc')}
            </p>
          </div>

          <div className="card-interactive p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-120 group-hover:-rotate-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {t('home.guarantee')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('home.guaranteeDesc')}
            </p>
          </div>

          <div className="card-interactive p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center group">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-120 group-hover:rotate-6 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <Headphones className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {t('home.support24')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('home.support24Desc')}
            </p>
          </div>

          <div className="card-interactive p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center group">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-120 group-hover:-rotate-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <CreditCard className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {t('home.safePayment')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('home.safePaymentDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {t('home.testimonialsTitle')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            10 000 dan ortiq mamnun mijozlarimizning samimiy fikrlari
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-interactive p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm group">
            <div className="flex items-center gap-1 text-amber-400 mb-3 group-hover:scale-105 transition-transform origin-left">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 italic mb-4 leading-relaxed">
              "Optimum Nutrition Whey oqsili buyurtma berdim. 100% original, ta'mi ajoyib. Toshkent ichida atigi 3 soatda yetkazib berishdi. Rahmat!"
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
                alt=""
                className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/30 group-hover:ring-indigo-500 transition-all"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Bobur Mirzayev</h4>
                <p className="text-xs text-slate-400">Toshkent sh., Fitnes Havaskori</p>
              </div>
            </div>
          </div>

          <div className="card-interactive p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm group">
            <div className="flex items-center gap-1 text-amber-400 mb-3 group-hover:scale-105 transition-transform origin-left">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 italic mb-4 leading-relaxed">
              "FitLife Flagship zaliga oylik cheksiz abonement oldim. Promokod orqali 15% chegirma va Telegram orqali darhol tasdiqlandi. Super servis!"
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                alt=""
                className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/30 group-hover:ring-indigo-500 transition-all"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Zarina Karimova</h4>
                <p className="text-xs text-slate-400">Samarqand sh., Yoga Instruktor</p>
              </div>
            </div>
          </div>

          <div className="card-interactive p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm group">
            <div className="flex items-center gap-1 text-amber-400 mb-3 group-hover:scale-105 transition-transform origin-left">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 italic mb-4 leading-relaxed">
              "Regulyativ gantellar to'plami uyda shug'ullanish uchun eng zo'r topilma bo'ldi. Sifati 10/10, og'irlikni bir harakatda o'zgartirish mumkin!"
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80"
                alt=""
                className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/30 group-hover:ring-indigo-500 transition-all"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Jamshid Aliyev</h4>
                <p className="text-xs text-slate-400">Toshkent sh., CrossFit Atlet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
