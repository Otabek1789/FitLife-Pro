import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Dumbbell,
  LayoutDashboard, 
  Building2, 
  ClipboardList, 
  Users, 
  Send, 
  LogOut, 
  ExternalLink, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  Save, 
  X, 
  Menu,
  Sun,
  Moon,
  ShieldCheck,
  Star,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Admin = () => {
  const { t, getLocalized } = useLanguage();
  const { currentUser, isAdmin, logout, quickDemoLogin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { 
    clubs, 
    addClub, 
    updateClub, 
    deleteClub, 
    bookings, 
    updateBookingStatus,
    telegramConfig,
    setTelegramConfig,
    sendTelegramNotification,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'clubs' | 'bookings' | 'users' | 'telegram'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [clubSearch, setClubSearch] = useState('');

  // Add/Edit Club Modal State
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);
  const [editingClubId, setEditingClubId] = useState(null);
  const [clubForm, setClubForm] = useState({
    nameUz: '',
    nameRu: '',
    nameEn: '',
    category: 'gym',
    monthlyPrice: 600000,
    originalPrice: 700000,
    discount: 15,
    address: 'Toshkent sh., Yunusobod tumani',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    featuresStr: 'Sauna, Dush, Shaxsiy murabbiy, Fito-bar',
    descUz: '',
    descRu: '',
    descEn: '',
  });

  // Telegram Settings State
  const [tgToken, setTgToken] = useState(telegramConfig.botToken || '7097812277:AAE_boKr0Tl8ZJTTR95gOPjuqPeVWZRVawc');
  const [tgChat, setTgChat] = useState(telegramConfig.chatId || '7373118052');
  const [tgChannel, setTgChannel] = useState(telegramConfig.channelName || '@Music_finderuzb_bot');

  // Stats Calculations
  const totalPassValue = bookings.reduce((sum, b) => sum + b.finalPrice, 0);
  const totalBookingsCount = bookings.length;
  const activeClubsCount = clubs.length;

  const weeklySalesData = [
    { day: "Dush", val: 3.4 },
    { day: "Sesh", val: 5.1 },
    { day: "Chor", val: 4.8 },
    { day: "Pay", val: 7.2 },
    { day: "Juma", val: 8.6 },
    { day: "Shan", val: 12.4 },
    { day: "Yak", val: 10.9 },
  ];
  const maxSale = Math.max(...weeklySalesData.map(d => d.val));

  // Mock Athletes List for Users Tab
  const mockAthletes = [
    { id: "usr-1", name: "Rustam Qodirov", phone: "+998 90 987 65 43", club: "FitLife Flagship", status: "Faol a'zo", date: "2026-09-12" },
    { id: "usr-2", name: "Malika Karimova", phone: "+998 97 123 45 67", club: "AquaSport Basseyn", status: "Faol a'zo", date: "2026-09-20" },
    { id: "usr-3", name: "Jamshid Aliyev", phone: "+998 93 456 78 90", club: "IronCore CrossFit", status: "Kutilmoqda", date: "2026-10-02" },
    { id: "usr-4", name: "Shaxzod Bekzodov", phone: "+998 94 555 12 34", club: "Champion Boks", status: "Faol a'zo", date: "2026-08-15" },
    { id: "usr-5", name: "Kamola Umarova", phone: "+998 99 777 88 99", club: "Shanti Yoga", status: "Muddati tugagan", date: "2026-07-28" }
  ];

  // Open Modal Helpers
  const handleOpenAddClub = () => {
    setEditingClubId(null);
    setClubForm({
      nameUz: '',
      nameRu: '',
      nameEn: '',
      category: 'gym',
      monthlyPrice: 600000,
      originalPrice: 700000,
      discount: 15,
      address: 'Toshkent sh., Mirobod tumani',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
      featuresStr: 'Sauna, Dush, Shaxsiy murabbiy, Fito-bar',
      descUz: '',
      descRu: '',
      descEn: '',
    });
    setIsClubModalOpen(true);
  };

  const handleOpenEditClub = (club) => {
    setEditingClubId(club.id);
    setClubForm({
      nameUz: typeof club.name === 'string' ? club.name : (club.name.uz || ''),
      nameRu: typeof club.name === 'string' ? club.name : (club.name.ru || ''),
      nameEn: typeof club.name === 'string' ? club.name : (club.name.en || ''),
      category: club.category,
      monthlyPrice: club.monthlyPrice,
      originalPrice: club.originalPrice || club.monthlyPrice,
      discount: club.discount || 0,
      address: club.address,
      image: club.image,
      featuresStr: club.features ? club.features.join(', ') : '',
      descUz: typeof club.description === 'string' ? club.description : (club.description?.uz || ''),
      descRu: typeof club.description === 'string' ? club.description : (club.description?.ru || ''),
      descEn: typeof club.description === 'string' ? club.description : (club.description?.en || ''),
    });
    setIsClubModalOpen(true);
  };

  const handleSaveClub = (e) => {
    e.preventDefault();
    const formattedData = {
      name: {
        uz: clubForm.nameUz || "Yangi sport majmuasi",
        ru: clubForm.nameRu || clubForm.nameUz || "Новый спорткомплекс",
        en: clubForm.nameEn || clubForm.nameUz || "New Sports Hub"
      },
      category: clubForm.category,
      monthlyPrice: Number(clubForm.monthlyPrice),
      originalPrice: Number(clubForm.originalPrice),
      discount: Number(clubForm.discount),
      address: clubForm.address,
      image: clubForm.image,
      features: clubForm.featuresStr.split(',').map(s => s.trim()).filter(Boolean),
      description: {
        uz: clubForm.descUz || "Zamonaviy sport majmuasi va trenajyor zali",
        ru: clubForm.descRu || clubForm.descUz || "Современный спортивный комплекс",
        en: clubForm.descEn || clubForm.descUz || "Modern sports and fitness complex"
      }
    };

    if (editingClubId) {
      updateClub(editingClubId, formattedData);
    } else {
      addClub(formattedData);
    }
    setIsClubModalOpen(false);
  };

  const handleDeleteClub = (id) => {
    if (window.confirm(t('delete_confirm'))) {
      deleteClub(id);
    }
  };

  // Telegram Settings Save
  const handleSaveTelegram = (e) => {
    e.preventDefault();
    setTelegramConfig({
      botToken: tgToken,
      chatId: tgChat,
      channelName: tgChannel
    });
    showToast("Telegram sozlamalari saqlandi!");
  };

  const handleSendTestTelegram = async () => {
    const testMsg = `🔔 <b>TEST XABARI (FitLife Admin):</b>\nTelegram Bot ulanishi muvaffaqiyatli ishlayapti!\nSana: ${new Date().toLocaleString()}`;
    await sendTelegramNotification(testMsg);
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
    showToast("Test xabari Telegram botga muvaffaqiyatli uzatildi!");
  };

  // Filtered clubs in admin
  const filteredAdminClubs = clubs.filter(c => {
    const nameStr = getLocalized(c.name).toLowerCase();
    return nameStr.includes(clubSearch.toLowerCase()) || c.category.includes(clubSearch.toLowerCase());
  });

  const sidebarMenuItems = [
    { id: 'dashboard', label: t('admin_sidebar_dash'), icon: LayoutDashboard },
    { id: 'clubs', label: t('admin_sidebar_clubs'), icon: Building2 },
    { id: 'bookings', label: t('admin_sidebar_bookings'), icon: ClipboardList, badge: bookings.length },
    { id: 'users', label: t('admin_sidebar_users'), icon: Users, badge: 5 },
    { id: 'telegram', label: t('admin_sidebar_telegram'), icon: Send },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex transition-colors">
      
      {/* SIDEBAR COMPONENT (DESKTOP & MOBILE DRAWER) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Top Brand Logo */}
        <div>
          <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                <Dumbbell className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xl font-black bg-gradient-to-r from-purple-600 via-indigo-500 to-emerald-400 bg-clip-text text-transparent">
                  FitLife
                </span>
                <span className="text-[10px] font-bold uppercase block text-purple-600 dark:text-purple-400 tracking-wider">
                  Admin Panel
                </span>
              </div>
            </Link>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Admin User Card */}
          <div className="p-4 mx-4 mt-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Admin"
              className="w-10 h-10 rounded-xl object-cover border border-purple-500 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">
                Bobur Mirzayev
              </h4>
              <span className="inline-block text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">
                Bosh Administrator
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 mt-2">
            {sidebarMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <ExternalLink className="w-4 h-4 text-emerald-500" />
            <span>{t('admin_sidebar_exit')}</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('nav_logout')}</span>
          </button>
        </div>

      </aside>

      {/* BACKDROP FOR MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        
        {/* Top Navbar Header */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-base font-black text-slate-900 dark:text-white capitalize">
              {sidebarMenuItems.find(i => i.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {!isAdmin ? (
              <button
                onClick={() => quickDemoLogin('admin')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Ruxsati</span>
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Admin Rejimi</span>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Main Body */}
        <div className="p-4 sm:p-8 space-y-8 flex-1">
          
          {/* TAB 1: DASHBOARD & ANALYTICS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {t('admin_total_sales')}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      {(totalPassValue / 1000000).toFixed(2)} mln <span className="text-xs font-normal text-emerald-500">{t('currency')}</span>
                    </h3>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {t('admin_total_bookings')}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      {totalBookingsCount} ta
                    </h3>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {t('admin_total_users')}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      1,840 sportchi
                    </h3>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {t('admin_total_clubs')}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      {activeClubsCount} majmua
                    </h3>
                  </div>
                </div>
              </div>

              {/* Weekly Performance SVG Chart */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      {t('admin_sales_chart')}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    Haftalik a'zolik dinamikasi
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-3 sm:gap-6 items-end h-48 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800">
                  {weeklySalesData.map((item, idx) => {
                    const heightPercent = Math.round((item.val / maxSale) * 100);
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                        <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition">
                          {item.val}M
                        </span>
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className="w-full max-w-[42px] rounded-xl bg-gradient-to-t from-purple-600 via-indigo-500 to-emerald-400 shadow-md group-hover:brightness-110 transition-all duration-300"
                        />
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          {item.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Bookings List Widget */}
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl">
                <h4 className="text-sm font-black text-slate-900 dark:text-white mb-4">
                  So'nggi Kelib Tushgan Arizalar
                </h4>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {bookings.slice(0, 3).map((b) => (
                    <div key={b.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">{b.customer}</span>
                        <span className="text-slate-400 text-[11px]">{b.clubName} • {b.phone}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-emerald-500 block">{b.finalPrice.toLocaleString()} {t('currency')}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 uppercase font-bold">
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CLUBS & PROGRAMS CRUD */}
          {activeTab === 'clubs' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Zallarni qidirish..."
                    value={clubSearch}
                    onChange={(e) => setClubSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  onClick={handleOpenAddClub}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('admin_add_club')}</span>
                </button>
              </div>

              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                      <th className="p-4">Rasm & Nomi</th>
                      <th className="p-4">Toifasi</th>
                      <th className="p-4">Oylik Narxi</th>
                      <th className="p-4">Aksiya %</th>
                      <th className="p-4">Manzili</th>
                      <th className="p-4 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {filteredAdminClubs.map((club) => {
                      const cName = getLocalized(club.name);
                      return (
                        <tr key={club.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                          <td className="p-4 flex items-center gap-3">
                            <img src={club.image} alt={cName} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white line-clamp-1 max-w-xs">{cName}</div>
                              <span className="text-[10px] text-slate-400">ID: {club.id}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold uppercase text-[10px]">
                              {club.category}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-slate-900 dark:text-white">
                            {club.monthlyPrice.toLocaleString()} {t('currency')}
                          </td>
                          <td className="p-4">
                            {club.discount ? (
                              <span className="font-bold text-rose-500">-{club.discount}%</span>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="p-4 text-[11px] text-slate-500 dark:text-slate-400 max-w-xs truncate">
                            {club.address}
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditClub(club)}
                              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-500"
                              title={t('admin_edit_club')}
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClub(club.id)}
                              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500"
                              title={t('admin_delete_club')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: BOOKINGS / APPLICATIONS */}
          {activeTab === 'bookings' && (
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-4">{t('admin_booking_id')}</th>
                    <th className="p-4">{t('admin_booking_client')}</th>
                    <th className="p-4">{t('admin_booking_club')}</th>
                    <th className="p-4">{t('admin_booking_total')}</th>
                    <th className="p-4">{t('admin_booking_status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                      <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                        #{b.id}
                        <div className="text-[10px] text-slate-400">{b.date}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900 dark:text-white">{b.customer}</div>
                        <div className="text-[10px] text-slate-500">{b.phone}</div>
                        <div className="text-[10px] text-emerald-500">Boshlanish: {b.startDate}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-800 dark:text-slate-200">{b.clubName}</div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">{b.category}</span>
                      </td>
                      <td className="p-4 font-extrabold text-slate-900 dark:text-white">
                        {b.finalPrice.toLocaleString()} {t('currency')}
                        {b.promoCode && (
                          <span className="block text-[10px] text-emerald-500 font-bold">🏷️ {b.promoCode}</span>
                        )}
                      </td>
                      <td className="p-4">
                        <select
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl border focus:outline-none ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                              : b.status === 'cancelled'
                              ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                              : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          <option value="pending">{t('admin_status_pending')}</option>
                          <option value="confirmed">{t('admin_status_confirmed')}</option>
                          <option value="cancelled">{t('admin_status_cancelled')}</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: USERS / ATHLETES */}
          {activeTab === 'users' && (
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-4">Sportchi</th>
                    <th className="p-4">Telefon</th>
                    <th className="p-4">A'zo bo'lgan majmua</th>
                    <th className="p-4">A'zolik Holati</th>
                    <th className="p-4">Ro'yxatdan o'tgan sana</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {mockAthletes.map((usr) => (
                    <tr key={usr.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                      <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                          {usr.name[0]}
                        </div>
                        <span>{usr.name}</span>
                      </td>
                      <td className="p-4 font-medium">{usr.phone}</td>
                      <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">{usr.club}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          usr.status.includes('Faol')
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : usr.status.includes('Kutilmoqda')
                            ? 'bg-amber-500/10 text-amber-600'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                        }`}>
                          {usr.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400">{usr.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 5: TELEGRAM BOT SETTINGS */}
          {activeTab === 'telegram' && (
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Telegram Bot API Sozlamasi
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Abonement bronlari va arizalar to'g'ridan-to'g'ri Telegram kanal/guruhingizga keladi
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveTelegram} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('admin_tg_token_label')}
                  </label>
                  <input
                    type="text"
                    placeholder="7896541234:AAH_your_bot_token"
                    value={tgToken}
                    onChange={(e) => setTgToken(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('admin_tg_chat_label')}
                  </label>
                  <input
                    type="text"
                    placeholder="-1001234567890 yoki @kanal_username"
                    value={tgChat}
                    onChange={(e) => setTgChat(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition"
                  >
                    <Save className="w-4 h-4" />
                    <span>{t('admin_tg_save_btn')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendTestTelegram}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-500/20 active:scale-95 transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t('admin_tg_test_btn')}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>

      {/* ADD / EDIT CLUB MODAL */}
      {isClubModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div onClick={() => setIsClubModalOpen(false)} className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" />
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsClubModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">
              {editingClubId ? t('admin_edit_club') : t('admin_add_club')}
            </h3>

            <form onSubmit={handleSaveClub} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('admin_club_name')} (O'zbekcha)
                </label>
                <input
                  type="text"
                  required
                  value={clubForm.nameUz}
                  onChange={(e) => setClubForm({ ...clubForm, nameUz: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('admin_club_price')}
                  </label>
                  <input
                    type="number"
                    required
                    value={clubForm.monthlyPrice}
                    onChange={(e) => setClubForm({ ...clubForm, monthlyPrice: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Chegirma foizi (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="90"
                    value={clubForm.discount}
                    onChange={(e) => setClubForm({ ...clubForm, discount: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('admin_club_category')}
                  </label>
                  <select
                    value={clubForm.category}
                    onChange={(e) => setClubForm({ ...clubForm, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="gym">{t('clubs_cat_gym')}</option>
                    <option value="crossfit">{t('clubs_cat_crossfit')}</option>
                    <option value="swim">{t('clubs_cat_swim')}</option>
                    <option value="fight">{t('clubs_cat_fight')}</option>
                    <option value="yoga">{t('clubs_cat_yoga')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('admin_club_address')}
                  </label>
                  <input
                    type="text"
                    required
                    value={clubForm.address}
                    onChange={(e) => setClubForm({ ...clubForm, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('admin_club_image')}
                </label>
                <input
                  type="text"
                  required
                  value={clubForm.image}
                  onChange={(e) => setClubForm({ ...clubForm, image: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Qulayliklar (vergul bilan ajrating)
                </label>
                <input
                  type="text"
                  value={clubForm.featuresStr}
                  onChange={(e) => setClubForm({ ...clubForm, featuresStr: e.target.value })}
                  placeholder="Sauna, Dush, Shaxsiy murabbiy, Basseyn"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('admin_club_desc')}
                </label>
                <textarea
                  rows={3}
                  value={clubForm.descUz}
                  onChange={(e) => setClubForm({ ...clubForm, descUz: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsClubModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100"
                >
                  {t('admin_cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20"
                >
                  {t('admin_save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
