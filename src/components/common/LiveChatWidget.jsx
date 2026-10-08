import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  Phone,
  HelpCircle,
  CheckCircle2,
  Dumbbell
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useStore } from '../../context/StoreContext';

export default function LiveChatWidget() {
  const { t } = useLanguage();
  const { telegramConfig, products, clubs, sendTelegramNotification } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Assalomu alaykum! 👋 Men FitLife Pro AI sport va sog'liq bo'yicha aqlli yordamchisiman.\nSizga sport zallari a'zoligi, mashg'ulot dasturlari, BMI / kaloriya, sport ozuqalari (protein, kreatin, vitaminlar) va promokodlar bo'yicha yordam bera olaman. Hohlagan savolingizni bering!",
      time: "Hozir"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const quickFaqs = [
    { q: "🔥 Qanday promokodlar bor?", short: "🔥 Promokodlar" },
    { q: "🏟️ Qanday sport zallari bor?", short: "🏟️ Zallar" },
    { q: "💊 Sport ozuqalari narxi qancha?", short: "💊 Ozuqalar" },
    { q: "🏃 Mashg'ulot dasturlari qanday?", short: "🏃 Mashqlar" },
    { q: "⚖️ BMI kalkulyatori nima?", short: "⚖️ BMI" },
    { q: "🚚 Yetkazib berish qanday?", short: "🚚 Yetkazish" },
    { q: "📍 Zallar manzillari qayerda?", short: "📍 Manzillar" },
    { q: "📞 Operator bilan bog'lanish", short: "📞 Bog'lanish" }
  ];

  const generateAIResponse = (rawQuery) => {
    const query = rawQuery.toLowerCase().trim();

    // 1. Greetings
    if (/^(salom|assalom|qalaysiz|qaleysiz|privet|hello|hi|qandaysiz|ahvollar|charchamang)/i.test(query)) {
      return "Assalomu alaykum! 👋 Men FitLife Pro AI yordamchisiman.\nSizga sog'liq, mashg'ulotlar, sport zallariga abonementlar va sport ozuqalari bo'yicha yordam bera olaman. Sizni qaysi sport turi yoki mahsulot qiziqtiradi?";
    }

    // 2. Platform info
    if (/(kim yaratgan|muallif|dasturchi|avtor|fitlife|fitlife pro|platforma haqida|sayt haqida)/i.test(query)) {
      return "FitLife Pro — O'zbekistondagi eng zamonaviy Sog‘liq va Sport ekotizimi! Loyihada professional trening dasturlari, smart BMI kalkulyatori, Toshkentdagi premium sport majmualari a'zoligi va original sport ozuqalari onlayn do'koni jamlangan.";
    }

    // 3. Promocodes & Discounts
    if (/(promokod|promocode|kupon|chegirma|skidka|aksiya|hackathon2026|fitlife|olymp|sport10)/i.test(query)) {
      return "FitLife Pro faol promokodlari:\n🔥 HACKATHON2026 — 25% maxsus chegirma!\n⚡ FITLIFE — 15% barcha abonement va mahsulotlarga;\n🏆 OLYMP — 30% VIP sportchi chegirmasi;\n💪 SPORT10 — 10% birinchi xarid uchun.\n\n💡 Bron qilish yoki mahsulot xaridida promokod maydoniga 'HACKATHON2026' deb yozing va darhol chegirmaga ega bo'ling!";
    }

    // 4. Clubs / Gyms
    if (/(zal|sportzal|fitnes klub|klub|trenajyor|basseyn|crossfit|boks|yoga|abonement)/i.test(query)) {
      return "Bizning platformamizda quyidagi eng mashhur sport majmualari mavjud:\n1. FitLife Flagship Mega Arena (Amir Temur ko'chasi 107-B) — 1500m² zal, sauna, fito-bar\n2. AquaSport 50m Olimpiya Suzish Havzasi (Mustaqillik 88)\n3. IronCore CrossFit & Kuch Markazi (Bunyodkor 42)\n4. Champion Boks & MMA Akademiyasi (Shota Rustaveli 55)\n5. Shanti Yoga & Pilates Studiyasi\n\nBarcha zallarga saytimiz orqali 25% gacha chegirma bilan abonement bron qilishingiz mumkin!";
    }

    // 5. Sports Nutrition & Supplements
    if (/(protein|kreatin|bcaa|vitamin|sportpit|ozuq|gantel|kiyim|tovar|mahsulot|do'kon|shop)/i.test(query)) {
      return "FitLife Pro Sport Do'konida 100% original sertifikatlangan mahsulotlar mavjud:\n• Optimum Nutrition Gold Standard 100% Whey Protein (2.27 kg)\n• Creapure Mikronizatsiyalangan Kreatin (300 g)\n• Smart Tezkor Regulyativ Gantellar (2.5 - 24 kg)\n• FitPro Kompression 3-in-1 Rashguard kiyimi\n• Daily Athlete Multivitamin kompleksi (150 tabs)\n• Ultra Pure Omega-3 Fish Oil (1200 mg)\n\nYetkazib berish Toshkent bo'yicha 24 soatda BEPUL amalga oshiriladi!";
    }

    // 6. Delivery
    if (/(yetkaz|dostavka|yetkazib berish|pochta|kuryer|qancha vaqtda|qachon keladi|viloyat|toshkent)/i.test(query)) {
      return "Yetkazib berish shartlari:\n🚀 Toshkent shahri bo'ylab barcha sport mahsulotlari 24 soat ichida eshikkacha BEPUL yetkaziladi!\n📦 Viloyatlarga tezkor kuryer xizmati orqali 24-48 soatda yetkazib beramiz.\n💵 To'lovni mahsulotni ko'rib olganingizdan so'ng naqd yoki karta orqali amalga oshirishingiz mumkin.";
    }

    // 7. BMI & Nutrition
    if (/(bmi|kaloriya|tdee|vazn|bo'y|ozish|semirish|semiz|ozg'in|ovqatlanish|dieta)/i.test(query)) {
      return "Saytimizdagi 'Ovqatlanish (BMI)' bo'limida siz bir necha soniyada o'z tana massasi indeksingizni, kunlik zarur kaloriya va suv me'yorini aniqlashingiz mumkin. Tizim sizning vazningiz va maqsadingizga qarab individual tavsiyalar beradi!";
    }

    // 8. Workouts
    if (/(mashg'ulot|trening|mashq|programma|dastur|kardio|press|taymer|sekundomer)/i.test(query)) {
      return "FitLife Pro 'Mashg'ulotlar' bo'limida boshlang'ich va professional sportchilar uchun maxsus dasturlar mavjud. Har bir mashq uchun interaktiv soniya taymeri va rep-tracker o'rnatilgan!";
    }

    // 9. Contacts
    if (/(telefon|aloqa|kontakt|nomer|bog'lanish|operator|call center|admin bilan)/i.test(query)) {
      const botUser = telegramConfig?.channelName || '@nekitekibeki_bot';
      return `Biz bilan bog'lanish:\n📞 Telefon: +998 (90) 123-45-67\n🤖 Telegram bot: ${botUser}\n📍 Bosh ofis: Toshkent sh., Amir Temur shox ko'chasi 107-B`;
    }

    // Default
    return `Savolingiz uchun tashakkur! 😊\nFitLife Pro AI sifatida sizga quyidagilar bo'yicha yordam bera olaman:\n• Sport zallari va oylik abonementlar;\n• Sport ozuqalari (Protein, Kreatin, Vitaminlar);\n• 'HACKATHON2026' (-25%) promokodi;\n• Shaxsiy BMI kalkulyatori va mashqlar dasturi.\n\nAgar savolingiz maxsus bo'lsa, operatorimiz bilan bog'laning: +998 (90) 123-45-67 yoki Telegram: ${telegramConfig?.channelName || '@nekitekibeki_bot'}.`;
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const replyText = generateAIResponse(currentInput);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickQuestion = (questionText) => {
    setInputText(questionText);
    setTimeout(() => {
      const userMsg = {
        id: Date.now(),
        sender: 'user',
        text: questionText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      setTimeout(() => {
        const replyText = generateAIResponse(questionText);
        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 500);
    }, 50);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
          title="FitLife AI Sport Yordamchisi"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          {hasUnread && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-white animate-ping" />
          )}
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-bold text-xs ml-0 group-hover:ml-2">
            FitLife AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[550px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black flex items-center gap-1.5">
                  FitLife Pro AI
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                </h4>
                <p className="text-[10px] text-emerald-100 font-medium">
                  Sport & Salomatlik Bo'yicha Maslahatchi
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick FAQ Pills */}
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickFaqs.map((faq, i) => (
              <button
                key={i}
                onClick={() => handleQuickQuestion(faq.q)}
                className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-500 whitespace-nowrap transition shrink-0"
              >
                {faq.short}
              </button>
            ))}
          </div>

          {/* Message History */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none border border-slate-200/50 dark:border-slate-700/50'
                  }`}
                >
                  {msg.text}
                  <span className={`block text-[9px] mt-1 text-right ${
                    msg.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'
                  }`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-slate-400 p-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] ml-1">FitLife AI javob yozmoqda...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Savolingizni yozing..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white transition shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
