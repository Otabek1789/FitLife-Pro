import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { ClubCard } from '../components/ClubCard';
import { initialWorkouts } from '../data/initialWorkouts';
import { 
  Dumbbell, 
  Flame, 
  Heart, 
  Activity, 
  ArrowRight, 
  Users, 
  Trophy, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Droplets, 
  Moon, 
  Zap, 
  ChevronRight,
  HelpCircle,
  Plus,
  Minus,
  CheckCircle2,
  Calendar,
  ShoppingBag,
  Star,
  Truck
} from 'lucide-react';

export const Home = () => {
  const { t, getLocalized } = useLanguage();
  const { clubs, products, setQuickBuyProduct, toggleWishlist, isWishlisted } = useStore();

  // Water intake tracker
  const [waterGlasses, setWaterGlasses] = useState(4);
  const [openFaq, setOpenFaq] = useState(null);

  // Featured sports clubs & products
  const featuredClubs = clubs.filter(c => c.isFeatured).slice(0, 3);
  const featuredProducts = products.slice(0, 4);

  const faqs = [
    {
      q: "FitLife Pro ekotizimida qanday sport turlari va zallari mavjud?",
      a: "Bizning katalogimizda Toshkent shahridagi eng ilg'or trenajyor zallari, CrossFit maydonlari, 50-metrlik olimpiya suzish havzalari, professional boks va yoga studiyalari mavjud."
    },
    {
      q: "Sport mahsulotlari va ozuqalari qanday yetkazib beriladi?",
      a: "Barcha sport ozuqalari va inventarlari 100% original kafolatlangan bo'lib, Toshkent shahri bo'ylab 24 soat ichida mutlaqo bepul yetkazib beriladi."
    },
    {
      q: "Abonementni bron qilish va Telegram orqali tasdiqlash qanday ishlaydi?",
      a: "O'zingizga ma'qul sport majmuasini tanlab, 'A'zo bo'lish' tugmasini bosasiz. Ma'lumotlar va promokodingiz kiritilgach, ariza to'g'ridan-to'g'ri Telegram botga kelib tushadi va operator sizga darhol javob beradi."
    },
    {
      q: "Mashg'ulotlar yangi boshlovchilar uchun ham to'g'ri keladimi?",
      a: "Albatta! Mashg'ulotlar bo'limida boshlang'ich, o'rta va ilg'or darajalar mavjud bo'lib, har bir mashq uchun interaktiv sekundomer va rep tracker o'rnatilgan."
    },
    {
      q: "Promokod orqali qanday chegirma olish mumkin?",
      a: "Bron qilish yoki mahsulot xaridi oynasida 'HACKATHON2026' yoki 'FITLIFE' promokodini kiritish orqali 25% gacha maxsus chegirmaga ega bo'lasiz."
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-6 animate-pulse-subtle shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('hero_badge')}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1] mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-emerald-800 to-teal-700 dark:from-white dark:via-slate-100 dark:to-emerald-300 bg-clip-text text-transparent">
              {t('hero_title')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            {t('hero_desc')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/clubs"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 active:scale-95 transition-all group"
            >
              <Building2 className="w-4 h-4" />
              <span>{t('hero_btn_explore')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/shop"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-sm shadow-xl active:scale-95 transition-all group"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Sport Mahsulotlari Do'koni</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/workouts"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl glass hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-900 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-700 active:scale-95 transition-all"
            >
              <Dumbbell className="w-4 h-4" />
              <span>{t('hero_btn_workouts')}</span>
            </Link>
          </div>

          {/* Stats Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-3xl glass border border-slate-200/80 dark:border-slate-800/80 shadow-md">
              <div className="flex items-center justify-center gap-2 text-emerald-500 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">15K+</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Faol sportchilar</span>
            </div>

            <div className="p-5 rounded-3xl glass border border-slate-200/80 dark:border-slate-800/80 shadow-md">
              <div className="flex items-center justify-center gap-2 text-teal-500 mb-1">
                <Building2 className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">24+</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sport majmualari</span>
            </div>

            <div className="p-5 rounded-3xl glass border border-slate-200/80 dark:border-slate-800/80 shadow-md">
              <div className="flex items-center justify-center gap-2 text-cyan-500 mb-1">
                <ShoppingBag className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">100+</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Original mahsulotlar</span>
            </div>

            <div className="p-5 rounded-3xl glass border border-slate-200/80 dark:border-slate-800/80 shadow-md">
              <div className="flex items-center justify-center gap-2 text-indigo-500 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">100%</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Rasmiy kafolat</span>
            </div>
          </div>

        </div>
      </section>

      {/* DAILY HEALTH WIDGET & WATER INTAKE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Water Intake */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/20 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-wider">
                  <Droplets className="w-4 h-4" />
                  <span>Kunlik Suv Balansi</span>
                </div>
                <span className="text-xs font-bold text-slate-400">{waterGlasses * 250} / 2500 ml</span>
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                Bugun {waterGlasses} stakan suv ichdingiz
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Yetarli miqdorda toza suv ichish tanadagi energiya almashinuvini oshiradi va charchoqni ketkazadi.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <button
                onClick={() => setWaterGlasses(Math.max(0, waterGlasses - 1))}
                className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="flex-1 h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div 
                  style={{ width: `${Math.min(100, (waterGlasses / 10) * 100)}%` }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                />
              </div>
              <button
                onClick={() => setWaterGlasses(waterGlasses + 1)}
                className="p-2.5 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 shadow-md shadow-cyan-500/20 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Sleep & Recovery */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-4">
                <Moon className="w-4 h-4" />
                <span>Uyqu & Regeneratsiya</span>
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                8 Soatlik Sifatli Uyqu
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Mushaklarning 80% o'sishi va tiklanishi chuqur uyqu davomida sodir bo'ladi. Mashg'ulotdan keyin organizmga to'liq dam bering.
              </p>
            </div>
            <div className="pt-6">
              <span className="text-[11px] font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1.5 rounded-xl inline-block">
                Tavsiya: 22:30 — 06:30
              </span>
            </div>
          </div>

          {/* Card 3: Motivation */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-4">
                <Flame className="w-4 h-4" />
                <span>Kunlik Motivatsiya</span>
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                "Kichik qadamlar buyuk natijalarga olib boradi"
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Har kuni 20 daqiqa mashg'ulot — yiliga 120 soatlik sog'lom sport faoliyati degani! Bugun yangi odatni boshlang.
              </p>
            </div>
            <div className="pt-6">
              <Link
                to="/workouts"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <span>Dasturlarga o'tish</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURED SPORTS PRODUCTS & NUTRITION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              <ShoppingBag className="w-4 h-4" />
              <span>FitLife Sport Do'koni</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Tavsiya Etilgan Sport Ozuqalari & Anjomlar
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <span>Barcha mahsulotlarni ko'rish</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => {
            const wishlisted = isWishlisted(prod.id);
            const displayPrice = prod.discountPrice || prod.price;
            const hasDiscount = prod.discountPrice && prod.discountPrice < prod.price;

            return (
              <div
                key={prod.id}
                className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {hasDiscount && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-rose-500 text-white font-black text-[10px] uppercase shadow-md">
                        Aksiya
                      </span>
                    )}

                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition shadow ${
                        wishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                        {prod.categoryName?.uz || prod.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{prod.rating || 4.9}</span>
                      </div>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                      {prod.name}
                    </h4>
                  </div>
                </div>

                <div className="p-4 pt-0 space-y-2.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      {displayPrice.toLocaleString()} so'm
                    </span>
                    {hasDiscount && (
                      <span className="text-[10px] text-slate-400 line-through">
                        {prod.price.toLocaleString()} so'm
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setQuickBuyProduct(prod)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Xarid Qilish</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED CLUBS LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              <Building2 className="w-4 h-4" />
              <span>Sport Majmualari Tarmog'i</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Tavsiya Etilgan Sport Majmualari & Zallar
            </h2>
          </div>
          <Link
            to="/clubs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <span>Barcha zallarni ko'rish</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </section>

      {/* WORKOUTS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950 text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-lg">
              Trening Dasturlari
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-4 mb-4">
              O'z Maqsadingizga Mos Mashq Dasturini Tanlang
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-8">
              Kardio, qorin pressi, kuch mashqlari va yoga. Har bir dastur uchun soniya hisoblovchi interaktiv taymer va rep tracker o'rnatilgan!
            </p>

            <Link
              to="/workouts"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 active:scale-95 transition"
            >
              <Dumbbell className="w-4 h-4" />
              <span>Dasturlarni Ko'rish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4 absolute right-8 top-1/2 -translate-y-1/2 w-96 opacity-90">
            {initialWorkouts.slice(0, 2).map((wo) => (
              <div key={wo.id} className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <img src={wo.image} alt="wo" className="w-full h-24 object-cover rounded-xl mb-2" />
                <h5 className="text-xs font-bold text-white line-clamp-1">{wo.title.uz}</h5>
                <span className="text-[10px] text-emerald-300 font-semibold">{wo.caloriesBurn} kkal • {wo.durationMinutes} daq</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BMI CALCULATOR TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-3xl p-8 sm:p-12 glass-card border border-slate-200 dark:border-slate-800 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-500/10 px-3 py-1 rounded-lg mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>Smart BMI & TDEE Kalkulyator</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
              Tana Massasi Indeksingizni Aniqlang
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Bo'yingiz, vazningiz va mashg'ulot darajangizni kiriting. Tizim siz uchun zarur kunlik kaloriya va suv me'yorini aniqlab beradi.
            </p>

            <Link
              to="/nutrition"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-600/20 active:scale-95 transition"
            >
              <span>BMI Kalkulyatoriga o'tish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">&lt; 18.5 BMI</span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold">Kam vazn</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-emerald-500/30">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">18.5 — 24.9 BMI</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">Ideal normal vazn</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">25.0 — 29.9 BMI</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">Ortiqcha vazn</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
              <span className="font-bold text-slate-700 dark:text-slate-300">30.0+ BMI</span>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold">Semizlik</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Ko'p Beriladigan Savollar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            FitLife Pro Haqida Savollarga Javoblar
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-white hover:text-emerald-500 transition"
                >
                  <span>{faq.q}</span>
                  <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
