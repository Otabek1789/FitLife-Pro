import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Send, 
  Calendar, 
  Phone, 
  User, 
  Tag, 
  Check, 
  MapPin, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

export const BookingModal = () => {
  const { t, getLocalized } = useLanguage();
  const { currentUser } = useAuth();
  const { 
    selectedBookingClub, 
    setSelectedBookingClub, 
    appliedPromo, 
    applyPromo, 
    removePromo, 
    promoPercent,
    createBooking 
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.usernameOrPhone || '+998 90 123 45 67');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!selectedBookingClub) return null;

  const clubName = getLocalized(selectedBookingClub.name);
  const basePrice = selectedBookingClub.monthlyPrice;
  const discountAmount = Math.round((basePrice * promoPercent) / 100);
  const finalPrice = Math.max(0, basePrice - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromo(promoInput);
    setPromoInput('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    setIsSubmitting(true);
    try {
      await createBooking({
        club: selectedBookingClub,
        name: customerName,
        phone: customerPhone,
        startDate
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={() => setSelectedBookingClub(null)} 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedBookingClub(null)}
          className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <img
            src={selectedBookingClub.image}
            alt={clubName}
            className="w-14 h-14 rounded-2xl object-cover shrink-0"
          />
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              Abonement Bron
            </span>
            <h3 className="text-base font-black text-slate-900 dark:text-white line-clamp-1 mt-0.5">
              {clubName}
            </h3>
            <p className="text-[11px] text-slate-500 line-clamp-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-500 shrink-0" />
              <span>{selectedBookingClub.address}</span>
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {t('booking_name')}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="Azizbek Olimov"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('booking_phone')}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="+998 90 123 45 67"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('booking_date')}
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Promocode section */}
          <div className="p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-1.5">
              <span className="flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                Promokod tizimi
              </span>
              <span className="text-[10px] text-slate-400">
                Masalan: <b>HACKATHON2026</b> (-25%)
              </span>
            </div>

            {appliedPromo ? (
              <div className="flex items-center justify-between bg-emerald-500/20 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>🏷️ {appliedPromo} (-{promoPercent}%)</span>
                <button
                  type="button"
                  onClick={removePromo}
                  className="text-xs text-rose-500 hover:underline"
                >
                  Bekor qilish
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="HACKATHON2026"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 uppercase text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500"
                >
                  {t('booking_apply_promo')}
                </button>
              </div>
            )}
          </div>

          {/* Price Summary */}
          <div className="space-y-1.5 pt-2 text-xs border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between text-slate-500">
              <span>{t('booking_total')}</span>
              <span>{basePrice.toLocaleString()} {t('currency')}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-rose-500 font-bold">
                <span>{t('booking_discount')} ({promoPercent}%)</span>
                <span>-{discountAmount.toLocaleString()} {t('currency')}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-1">
              <span>{t('booking_final_total')}</span>
              <span className="text-emerald-500">
                {finalPrice.toLocaleString()} {t('currency')}
              </span>
            </div>
          </div>

          {/* Dispatch CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/25 active:scale-95 transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? "Yuborilmoqda..." : t('booking_submit_btn')}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
