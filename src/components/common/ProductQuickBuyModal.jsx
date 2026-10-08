import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  X, 
  ShoppingBag, 
  Phone, 
  User, 
  MapPin, 
  Sparkles, 
  Tag, 
  CheckCircle2, 
  Truck,
  ShieldCheck
} from 'lucide-react';

export const ProductQuickBuyModal = () => {
  const { 
    quickBuyProduct, 
    setQuickBuyProduct, 
    orderProduct, 
    appliedPromo, 
    applyPromo, 
    promoPercent,
    showToast 
  } = useStore();
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [address, setAddress] = useState('Toshkent sh., ');
  const [promoInput, setPromoInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!quickBuyProduct) return null;

  const basePrice = quickBuyProduct.discountPrice || quickBuyProduct.price;
  const discountAmount = Math.round((basePrice * promoPercent) / 100);
  const finalPrice = Math.max(0, basePrice - discountAmount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 9) {
      showToast("Iltimos, ismingiz va to'liq telefon raqamingizni kiriting!", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      await orderProduct({
        product: quickBuyProduct,
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim()
      });
      setName('');
      setPhone('+998 ');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromo(promoInput);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div 
        onClick={() => setQuickBuyProduct(null)} 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200" 
      />

      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={() => setQuickBuyProduct(null)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
              Tezkor Buyurtma
            </span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
              Sport Mahsulotini Xarid Qilish
            </h3>
          </div>
        </div>

        {/* Selected Product Preview */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center gap-4 mb-6">
          <img 
            src={quickBuyProduct.image} 
            alt={quickBuyProduct.name}
            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700" 
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
              {quickBuyProduct.name}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                {basePrice.toLocaleString()} so'm
              </span>
              {quickBuyProduct.discountPrice && (
                <span className="text-[10px] text-slate-400 line-through">
                  {quickBuyProduct.price.toLocaleString()} so'm
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Ismingiz & Familiyangiz *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="Aziz Rahimov"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Telefon raqamingiz *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                required
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Yetkazib berish manzili
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Toshkent sh., Yunusobod 14-mavze, 12-uy"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Promocode section */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Promokod (Chegirma uchun)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="HACKATHON2026 yoki FITLIFE"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs uppercase rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyPromo}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white text-slate-700 dark:text-slate-200 font-bold text-xs transition"
              >
                Qo'llash
              </button>
            </div>
            {appliedPromo && (
              <span className="inline-block mt-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                ✅ Promokod "{appliedPromo}" faol! (-{promoPercent}% chegirma)
              </span>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-slate-800/80 border border-emerald-500/20 dark:border-slate-700 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Mahsulot narxi:</span>
              <span>{basePrice.toLocaleString()} so'm</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                <span>Promokod chegirmasi:</span>
                <span>-{discountAmount.toLocaleString()} so'm</span>
              </div>
            )}
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Yetkazib berish (Toshkent):</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">BEPUL 🚀</span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm font-black text-slate-900 dark:text-white">
              <span>To'lov summasi:</span>
              <span className="text-base text-emerald-600 dark:text-emerald-400 font-black">
                {finalPrice.toLocaleString()} so'm
              </span>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-around py-2 text-[10px] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Original</span>
            </div>
            <div className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Tezkor yetkazish</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Ko'rib to'lash</span>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSubmitting ? "Yuborilmoqda..." : "Buyurtmani Tasdiqlash (Telegram)"}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
