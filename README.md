# 🏆 FitLife Pro — Sog‘liq va Sport Ekotizimi
> **IT Olimpiada & Hackathon 2026 uchun maxsus ishlab chiqilgan Senior darajadagi platforma**

![FitLife Banner](https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80)

---

## 🌟 Loyiha Haqida
**FitLife Pro** — sog'lom turmush tarzini targ'ib qiluvchi, aholi va yoshlarning jismoniy faolligini oshirishga yo'naltirilgan kompleks veb-ekotizim. Platforma orqali foydalanuvchilar individual mashg'ulot rejalarini tuzishlari, tana massasi indeksini (BMI) va kunlik kaloriya me'yorini hisoblashlari, eng yaxshi fitnes zallari va sport majmualariga a'zo bo'lishlari hamda Toshkent shahridagi barcha sport markazlarini interaktiv xaritada topishlari mumkin.

---

## 🚀 17 Asosiy Imkoniyatlar (Barcha talablarning to'liq bajarilishi)

| № | Talab | Amalga oshirilgan yechim |
|---|---|---|
| **1** | **UZ / RU / EN** | To'liq 3 tilli reaktiv til tizimi (`LanguageContext`). Barcha matnlar, kategoriyalar va modallar soniyada o'zgaradi. |
| **2** | **Dark / Light Mode** | Zamonaviy qorong'i va yorug' rejim almashinuvi (`ThemeContext`), holat `localStorage`da saqlanadi. |
| **3** | **React + Routes** | React Router v6 orqali SPA navigatsiyasi, tebranmas sahifa almashinuvlari va `ScrollToTop`. |
| **4** | **Tailwind CSS** | Eng so'nggi Tailwind CSS v4, neon gradientlar, glassmorphism (`backdrop-blur`) va mikromobil animatsiyalar. |
| **5** | **5 Asosiy Sahifa** | 1. Bosh sahifa, 2. Mashg'ulotlar & Taymer, 3. Sog'lom Oziqlanish & BMI, 4. Zallar & Dasturlar, 5. Filiallar & Xarita. |
| **6** | **Admin Panel + Sidebar** | Professional **Sidebar** boshqaruvi, haftalik a'zolik dinamikasi SVG grafigi, real statistika kartalari. |
| **7** | **Telegram Bot** | Real Telegram Bot API (`sendMessage`) integratsiyasi. Abonement bronlari va murojaatlar to'g'ridan-to'g'ri botga yuboriladi. |
| **8** | **LocalStorage** | Barcha ma'lumotlar (zallar, arizalar, sevimlilar, promokodlar, auth, til, tema) doimiy saqlanadi. |
| **9** | **CRUD Boshqaruvi** | Admin panel orqali sport zallarini qo'shish, tahrirlash (Edit) va o'chirish (Delete) imkoniyati. |
| **10** | **Sevimlilar (Wishlist)** | Yoqqan sport majmualarini yurakcha bilan saqlash, badge hisoblagich va alohida filtr. |
| **11** | **A'zolik & Promokod** | `HACKATHON2026` (-25%), `FITLIFE` (-15%), `OLYMP` (-30%) promokodlari orqali chegirmali bron qilish + Confetti effekti. |
| **12** | **Autentifikatsiya & Demo** | Telefon/Login orqali kirish. Hakamlar uchun 1-bosishda **Demo Admin** va **Demo User** rejimi mavjud! |
| **13** | **Zallar & Klublar Katalogi** | Trenajyor, CrossFit, Suzish havzalari, Boks akademiyalari va Yoga studiyalari katalogi. |
| **14** | **GitHub + Vercel** | `vercel.json` SPA rewrite qoidalari, optimallashtirilgan build konfiguratsiyasi. |
| **15** | **Qidiruv (Live Search)** | Harflar terilishi bilan real-vaqtda qidiruvchi aqlli qidiruv mexanizmi. |
| **16** | **Saralash & Filtrlar** | Toifalar bo'yicha saralash, narx slayderi (range), reyting va chegirma filtrlari. |
| **17** | **Interaktiv Xarita** | Leaflet OpenStreetMap xaritasi, Toshkentdagi 3 ta asosiy filial markerlari, ish vaqti va yo'nalish havolasi. |

---

## 🛠️ Texnologiyalar Steki
- **Frontend Core:** React 19, JavaScript (ES6+), Vite 8
- **Styling & Dizayn:** Tailwind CSS v4, Glassmorphism, Google Fonts (Plus Jakarta Sans & Outfit)
- **Ikonkalar:** Lucide React (Zamonaviy vektor grafikalar)
- **Xarita Tizimi:** Leaflet Maps (OpenStreetMap qatlamlari bilan)
- **Animatsiyalar & Bayram Effekti:** Canvas Confetti
- **Davlat Boshqaruvi (State Management):** React Context API + LocalStorage Persistence

---

## ⚡ Loyihani Ishga Tushirish (Local Run)

1. **Repozitoriyani klonlash yoki papkaga o'tish:**
```bash
cd "d:\Ishchi stol\Sog‘liq va sport"
```

2. **Kutubxonalarni o'rnatish:**
```bash
npm install
```

3. **Dasturni ishga tushirish (Development server):**
```bash
npm run dev
```
Brauzerda oching: `http://localhost:5173/`

4. **Production Build yaratish:**
```bash
npm run build
```

---

## 🚀 Vercel ga Deploy Qilish
Loyiha ichida `vercel.json` fayli allaqachon sozlangan:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Vercel CLI orqali bir martalik buyruq:
```bash
npx vercel
```
Yoki GitHub repozitoriyangizni Vercel dashboardiga ulasangiz, avtomatik ravishda build bo'ladi.

---

## 👑 Hakamlar uchun Demo Rejimi
Saytdagi `Kirish` (Sign In) yoki `Admin Panel` tugmasini bosganingizda:
- **⚡ Demo Foydalanuvchi** — oddiy sportchi sifatida ko'rish va a'zoliklarni bron qilish.
- **👑 Demo Administrator** — Boshqaruv paneli (Sidebar, statistika grafigi, CRUD, Telegram bot sozlamalari)ga to'liq kirish.

**Sinov uchun Promokodlar:**
- `HACKATHON2026` — **25% chegirma**
- `FITLIFE` — **15% chegirma**
- `OLYMP` — **30% chegirma**

---

## 👨‍💻 Muallif
IT Olimpiada / Hackathon 2026 ishtirokchisi. Senior arxitektura va yuqori estetik standartlar asosida yaratildi.
