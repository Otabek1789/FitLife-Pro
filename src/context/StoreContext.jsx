import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialClubs } from '../data/initialClubs';
import confetti from 'canvas-confetti';

const StoreContext = createContext();

const PROMO_CODES = {
  HACKATHON2026: 25,
  FITLIFE: 15,
  OLYMP: 30,
  SPORT10: 10
};

const INITIAL_BOOKINGS = [
  {
    id: "PASS-7821",
    customer: "Rustam Qodirov",
    phone: "+998 90 987 65 43",
    clubName: "FitLife Flagship — Amir Temur Mega Arena",
    category: "gym",
    startDate: "2026-10-15",
    originalPrice: 650000,
    discountAmount: 162500,
    finalPrice: 487500,
    promoCode: "HACKATHON2026",
    status: "confirmed",
    date: "2026-10-07 14:30"
  },
  {
    id: "PASS-7820",
    customer: "Malika Karimova",
    phone: "+998 97 123 45 67",
    clubName: "AquaSport Olimpiya Suzish Havzasi & Spa",
    category: "swim",
    startDate: "2026-10-12",
    originalPrice: 750000,
    discountAmount: 112500,
    finalPrice: 637500,
    promoCode: "FITLIFE",
    status: "confirmed",
    date: "2026-10-06 18:20"
  },
  {
    id: "PASS-7819",
    customer: "Jamshid Aliyev",
    phone: "+998 93 456 78 90",
    clubName: "IronCore CrossFit & Kuch Markazi",
    category: "crossfit",
    startDate: "2026-10-10",
    originalPrice: 580000,
    discountAmount: 0,
    finalPrice: 580000,
    promoCode: null,
    status: "pending",
    date: "2026-10-05 11:15"
  }
];

export const StoreProvider = ({ children }) => {
  // Sports Clubs & Complexes
  const [clubs, setClubs] = useState(() => {
    try {
      const saved = localStorage.getItem('fitlife_clubs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.id) {
          return parsed;
        }
      }
      return initialClubs;
    } catch {
      return initialClubs;
    }
  });

  // Saved Favorites / Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('fitlife_wishlist');
      return saved ? JSON.parse(saved) : ["club-1", "club-3"];
    } catch {
      return ["club-1", "club-3"];
    }
  });

  // Bookings / Membership Applications
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('fitlife_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // Promocode state
  const [appliedPromo, setAppliedPromo] = useState(() => {
    return localStorage.getItem('fitlife_applied_promo') || '';
  });

  // Telegram Config
  const [telegramConfig, setTelegramConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('fitlife_tg_config');
      return saved ? JSON.parse(saved) : {
        botToken: "8682232515:AAE_r0XFh0SyhJ7ec3w0JItfAgJCAB8OL-4",
        chatId: "7373118052",
        channelName: "@nekitekibeki_bot"
      };
    } catch {
      return {
        botToken: "8682232515:AAE_r0XFh0SyhJ7ec3w0JItfAgJCAB8OL-4",
        chatId: "7373118052",
        channelName: "@nekitekibeki_bot"
      };
    }
  });

  // UI States
  const [selectedBookingClub, setSelectedBookingClub] = useState(null);
  const [quickViewClub, setQuickViewClub] = useState(null);
  const [toast, setToast] = useState(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('fitlife_clubs', JSON.stringify(clubs));
  }, [clubs]);

  useEffect(() => {
    localStorage.setItem('fitlife_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('fitlife_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (appliedPromo) {
      localStorage.setItem('fitlife_applied_promo', appliedPromo);
    } else {
      localStorage.removeItem('fitlife_applied_promo');
    }
  }, [appliedPromo]);

  useEffect(() => {
    localStorage.setItem('fitlife_tg_config', JSON.stringify(telegramConfig));
  }, [telegramConfig]);

  // Toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Club CRUD
  const addClub = (newClub) => {
    const club = {
      ...newClub,
      id: 'club-' + Date.now(),
      rating: newClub.rating || 5.0,
      reviewsCount: 1,
      isFeatured: !!newClub.isFeatured
    };
    setClubs(prev => [club, ...prev]);
    showToast("Yangi sport markazi muvaffaqiyatli qo'shildi!");
    return club;
  };

  const updateClub = (id, updatedFields) => {
    setClubs(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updatedFields } : c))
    );
    showToast("Sport markazi ma'lumotlari yangilandi!");
  };

  const deleteClub = (id) => {
    setClubs(prev => prev.filter(c => c.id !== id));
    setWishlist(prev => prev.filter(wId => wId !== id));
    showToast("Sport markazi o'chirildi", "info");
  };

  // Wishlist toggle
  const toggleWishlist = (clubId) => {
    setWishlist(prev => {
      const exists = prev.includes(clubId);
      if (exists) {
        showToast("Sevimlilardan olib tashlandi", "info");
        return prev.filter(id => id !== clubId);
      } else {
        showToast("Sevimlilar ro'yxatiga saqlandi! ❤️");
        return [...prev, clubId];
      }
    });
  };

  const isWishlisted = (clubId) => wishlist.includes(clubId);

  // Promo code operations
  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (PROMO_CODES[clean]) {
      setAppliedPromo(clean);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
      showToast(`Promokod "${clean}" faollashtirildi! -${PROMO_CODES[clean]}% chegirma!`);
      return { success: true, discount: PROMO_CODES[clean] };
    }
    showToast("Noto'g'ri promokod!", "error");
    return { success: false };
  };

  const removePromo = () => {
    setAppliedPromo('');
  };

  const promoPercent = appliedPromo ? PROMO_CODES[appliedPromo] || 0 : 0;

  // Telegram Notification Dispatcher
  const sendTelegramNotification = async (messageText) => {
    console.log("✈️ Telegram Dispatching Message:\n", messageText);
    const { botToken, chatId } = telegramConfig;

    if (botToken && chatId && !botToken.includes('DEMO')) {
      try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: messageText,
            parse_mode: 'HTML'
          })
        });
        const data = await res.json();
        return { success: data.ok, data };
      } catch (err) {
        console.warn("Telegram direct API fetch fallback:", err);
        return { success: true, simulated: true };
      }
    }
    return { success: true, simulated: true };
  };

  // Create Booking / Membership Pass
  const createBooking = async (bookingData) => {
    const club = bookingData.club;
    const basePrice = club.monthlyPrice;
    const discountAmount = Math.round((basePrice * promoPercent) / 100);
    const finalPrice = Math.max(0, basePrice - discountAmount);

    const newBooking = {
      id: "PASS-" + Math.floor(1000 + Math.random() * 9000),
      customer: bookingData.name,
      phone: bookingData.phone,
      clubName: typeof club.name === 'string' ? club.name : club.name.uz,
      category: club.category,
      startDate: bookingData.startDate || new Date().toISOString().split('T')[0],
      originalPrice: basePrice,
      discountAmount,
      finalPrice,
      promoCode: appliedPromo || null,
      status: "pending",
      date: new Date().toLocaleString()
    };

    setBookings(prev => [newBooking, ...prev]);

    // Format Telegram message
    const tgMessage = `🏋️ <b>YANGI SPORT ABONEMENTI BRONI!</b>\n\n` +
      `🎫 <b>Bron ID:</b> #${newBooking.id}\n` +
      `👤 <b>Sportchi:</b> ${newBooking.customer}\n` +
      `📞 <b>Telefon:</b> ${newBooking.phone}\n` +
      `🏟️ <b>Sport Markazi:</b> ${newBooking.clubName}\n` +
      `📅 <b>Boshlanish sanasi:</b> ${newBooking.startDate}\n` +
      `🏷️ <b>Promokod:</b> ${newBooking.promoCode || 'Yo\'q'}\n` +
      `💰 <b>Abonement to'lovi:</b> <b>${newBooking.finalPrice.toLocaleString()} so'm</b>\n` +
      `🕒 <b>Vaqt:</b> ${newBooking.date}\n\n` +
      `✅ <i>FitLife Pro — IT Olimpiada 2026 Sog‘liq va Sport Ekotizimi</i>`;

    await sendTelegramNotification(tgMessage);

    confetti({
      particleCount: 110,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSelectedBookingClub(null);
    showToast("Abonement muvaffaqiyatli bron qilindi va Telegram botga yuborildi!");
    return newBooking;
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    showToast(`Ariza #${bookingId} holati yangilandi: ${newStatus}`);
  };

  return (
    <StoreContext.Provider
      value={{
        clubs,
        addClub,
        updateClub,
        deleteClub,
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount: wishlist.length,
        bookings,
        createBooking,
        updateBookingStatus,
        appliedPromo,
        applyPromo,
        removePromo,
        promoPercent,
        selectedBookingClub,
        setSelectedBookingClub,
        quickViewClub,
        setQuickViewClub,
        telegramConfig,
        setTelegramConfig,
        sendTelegramNotification,
        toast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
