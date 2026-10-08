import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { Heart, Star, MapPin, Eye, Calendar, ShieldCheck, Sparkles } from 'lucide-react';

export const ClubCard = ({ club }) => {
  const { t, getLocalized } = useLanguage();
  const { toggleWishlist, isWishlisted, setSelectedBookingClub, setQuickViewClub } = useStore();

  const wishlisted = isWishlisted(club.id);
  const name = getLocalized(club.name);
  const desc = getLocalized(club.description);

  return (
    <div className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 flex flex-col justify-between">
      
      {/* Club Image & Badges */}
      <div>
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3.5">
          <img
            src={club.image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Discount Badge */}
          {club.discount > 0 && (
            <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-xl bg-rose-500 text-white text-[11px] font-extrabold shadow-md shadow-rose-500/30">
              Aksiya -{club.discount}%
            </span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(club.id)}
            className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              wishlisted
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105'
                : 'bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 hover:text-rose-500'
            }`}
            title={t('nav_wishlist')}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
          </button>

          {/* Quick View Button */}
          <button
            onClick={() => setQuickViewClub(club)}
            className="absolute inset-x-4 bottom-3 py-2 px-3 rounded-xl bg-slate-950/80 hover:bg-slate-950 text-white text-xs font-semibold backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1.5 shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t('clubs_quick_view')}</span>
          </button>
        </div>

        {/* Category & Rating */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
            {club.category}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{club.rating}</span>
            <span className="text-[10px] text-slate-400">({club.reviewsCount})</span>
          </div>
        </div>

        {/* Name */}
        <h3
          onClick={() => setQuickViewClub(club)}
          className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-1 hover:text-emerald-500 cursor-pointer transition mb-1"
        >
          {name}
        </h3>

        {/* Address */}
        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mb-2 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>{club.address}</span>
        </p>

        {/* Features Pills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {club.features.slice(0, 3).map((feat, idx) => (
            <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              ✓ {feat}
            </span>
          ))}
        </div>
      </div>

      {/* Pricing & Booking CTA */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <div>
          <div className="text-sm font-black text-slate-900 dark:text-white">
            {club.monthlyPrice.toLocaleString()} <span className="text-xs font-semibold text-emerald-500">{t('currency')}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">/{t('clubs_month')}</span>
        </div>

        <button
          onClick={() => setSelectedBookingClub(club)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 active:scale-95 transition"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{t('clubs_book_btn')}</span>
        </button>
      </div>

    </div>
  );
};
