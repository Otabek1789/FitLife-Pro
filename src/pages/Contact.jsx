import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { MapView } from '../components/MapView';
import { branchLocations } from '../data/branchLocations';
import { 
  MapPin, 
  Phone, 
  Send, 
  Mail, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact = () => {
  const { t } = useLanguage();
  const { sendTelegramNotification, showToast } = useStore();

  const [contactName, setContactName] = useState('');
  const [contactContact, setContactContact] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    if (!contactName || !contactContact || !contactMessage) return;

    setIsSubmitting(true);
    try {
      const tgText = `📬 <b>YANGI ALOQA XABARI (FitLife Pro):</b>\n\n` +
        `👤 <b>Mijoz:</b> ${contactName}\n` +
        `📞 <b>Aloqa:</b> ${contactContact}\n` +
        `💬 <b>Xabar:</b> ${contactMessage}\n` +
        `🕒 <b>Vaqt:</b> ${new Date().toLocaleString()}`;

      await sendTelegramNotification(tgText);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      showToast(t('contact_sent_success'));
      setContactName('');
      setContactContact('');
      setContactMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-xl inline-block mb-3">
          Filiallar & Aloqa
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          {t('map_title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          {t('map_subtitle')}
        </p>
      </div>

      {/* INTERACTIVE MAP COMPONENT */}
      <MapView />

      {/* CONTACT FORM & TELEGRAM DISPATCHER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Info & Features */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Yordam & Konsultatsiya
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1 mb-3">
              Savollaringiz Bormi? Biz Sizga Yordam Beramiz!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Sport anjomlari, ozuqalar tanlash yoki individual trening rejasi bo'yicha maslahat olish uchun formani to'ldiring. Xabar zudlik bilan bizning rasmiy Telegram Botimizga yuboriladi.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Yagona Call-Markaz</span>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">+998 (71) 200-44-11</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Telegram Bot & Kanal</span>
                <p className="text-sm font-extrabold text-teal-600 dark:text-teal-400">@FitLife_Official_Bot</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Ish Tartibi</span>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">Dushanba — Yakshanba: 07:00 - 23:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Telegram Form */}
        <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {t('contact_title')}
            </h3>
          </div>

          <form onSubmit={handleSubmitContact} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('contact_name')}
              </label>
              <input
                type="text"
                required
                placeholder="Azizbek Olimov"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('contact_phone')}
              </label>
              <input
                type="text"
                required
                placeholder="+998 90 123 45 67 yoki @telegram_username"
                value={contactContact}
                onChange={(e) => setContactContact(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('contact_message')}
              </label>
              <textarea
                rows={4}
                required
                placeholder="Salom, men qaysi sport ozuqasi yaxshiroq ekanligini bilmoqchi edim..."
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs shadow-lg shadow-emerald-500/25 active:scale-95 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Yuborilmoqda..." : t('contact_send_btn')}</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
