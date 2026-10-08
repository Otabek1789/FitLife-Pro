import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Heart, 
  Calendar, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

export const QuickViewModal = () => {
  const { t, getLocalized } = useLanguage();
  const { 
    quickViewClub, 
    setQuickViewClub, 
    setSelectedBookingClub, 
    toggleWishlist, 
    isWishlisted 
  } = useStore();

  if (!quickViewClub) return null;

  const wishlisted = isWishlisted(quickViewClub.id);
  const name = getLocalized(quickViewClub.name);
  const desc = getLocalized(quickViewClub.description);

  const handleOpenBooking = () => {
    setSelectedBookingClub(quickViewClub);
    setQuickViewClub(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div 
        onClick={() => setQuickViewClub(null)} 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={() => setQuickViewClub(null)}
          className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Club Photo */}
          <div className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={quickViewClub.image}
              alt={name}
              className="w-full h-full object-cover"
            />
            {quickViewClub.discount > 0 && (
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-rose-500 text-white text-xs font-bold shadow-md">
                -{quickViewClub.discount}%
              </span>
            )}
          </div>

          {/* Club Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                {quickViewClub.category}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{quickViewClub.rating}</span>
                <span className="text-[11px] text-slate-400">({quickViewClub.reviewsCount})</span>
              </div>
            </div>

            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">
              {name}
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-3">
              <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{quickViewClub.address}</span>
            </p>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              {desc}
            </p>

            {/* Features */}
            <div className="space-y-1.5 mb-5">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                Mavjud qulayliklar:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickViewClub.features.map((feat, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold">
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Booking Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-xl font-black text-slate-900 dark:text-white">
                  {quickViewClub.monthlyPrice.toLocaleString()} {t('currency')}
                </span>
                <span className="text-[10px] text-slate-400 block font-medium">/{t('clubs_month')}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWishlist(quickViewClub.id)}
                  className={`p-2.5 rounded-xl border transition ${
                    wishlisted
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
                </button>

                <button
                  onClick={handleOpenBooking}
                  className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t('clubs_book_btn')}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
