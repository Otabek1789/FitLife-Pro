import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { 
  Dumbbell, 
  Sun, 
  Moon, 
  Heart, 
  Calendar, 
  User, 
  ShieldCheck, 
  Menu, 
  X, 
  Globe, 
  LogOut,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { currentUser, isAdmin, logout, openAuthModal } = useAuth();
  const { wishlistCount, clubs, setSelectedBookingClub } = useStore();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t('nav_home') },
    { path: '/workouts', label: t('nav_workouts') },
    { path: '/nutrition', label: t('nav_nutrition') },
    { path: '/clubs', label: t('nav_clubs') },
    { path: '/contact', label: t('nav_contact') },
  ];

  const languages = [
    { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
            <Dumbbell className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
                FitLife
              </span>
              <span className="text-xs font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                PRO
              </span>
            </div>
            <span className="text-[10px] font-medium tracking-wide text-slate-500 dark:text-slate-400">
              Sog‘liq & Sport Ekotizimi
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                    : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
                )}
              </Link>
            );
          })}

          {/* Admin Panel Direct Link */}
          <Link
            to="/admin"
            className={`flex items-center gap-1.5 ml-2 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
              isActive('/admin')
                ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20'
                : 'text-purple-600 dark:text-purple-400 border-purple-500/30 hover:bg-purple-500/10'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t('nav_admin')}</span>
          </Link>
        </nav>

        {/* Right Tools & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              title="Tilni tanlash"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span className="uppercase">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-36 rounded-2xl glass-card shadow-xl border border-slate-200 dark:border-slate-800 py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setIsLangDropdownOpen(false)}
              >
                {languages.map((lng) => (
                  <button
                    key={lng.code}
                    onClick={() => setLanguage(lng.code)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-left transition ${
                      language === lng.code
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{lng.flag}</span>
                    <span>{lng.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition active:scale-95"
            aria-label="Rejimni o'zgartirish"
            title={theme === 'dark' ? "Yorug' rejim" : "Tungi rejim"}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Wishlist Link */}
          <Link
            to="/clubs?filter=wishlist"
            className="relative p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition active:scale-95"
            title={t('nav_wishlist')}
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center animate-bounce">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Fast Booking CTA Button */}
          <button
            onClick={() => setSelectedBookingClub(clubs[0])}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition"
            title={t('nav_booking')}
          >
            <Calendar className="w-4 h-4" />
            <span>{t('nav_booking')}</span>
          </button>

          {/* Auth Button or User Menu */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg object-cover border border-emerald-500"
                />
                <span className="text-xs font-semibold max-w-[90px] truncate hidden sm:inline text-slate-800 dark:text-slate-200">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 rounded-2xl glass-card shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {currentUser.name}
                    </p>
                    <span className="inline-block mt-0.5 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {currentUser.role}
                    </span>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      {t('nav_admin')}
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  >
                    <LogOut className="w-4 h-4" />
                    {t('nav_logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{t('nav_login')}</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-1.5 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive(link.path)
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              {t('nav_admin')}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500 text-white">PRO</span>
          </Link>
        </div>
      )}
    </header>
  );
};
