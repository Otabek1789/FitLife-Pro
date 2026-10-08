// Google Gemini AI integratsiyasi
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

/**
 * Haqiqiy Google Gemini API orqali javob olish funksiyasi
 * @param {Object} params
 * @param {string} params.message - Foydalanuvchi savoli
 * @param {Array} params.history - Oldingi suhbatlar tarixi
 * @param {Array} params.products - Saytdagi mahsulotlar ro'yxati
 * @returns {Promise<string>}
 */
export async function askGemini({ message, history = [], products = [] }) {
  const apiKey = GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey.length < 10) {
    return null; // API kalit berilmagan bo'lsa fallback ishlaydi
  }

  // Saytdagi mahsulotlar haqida qisqacha ma'lumot tayyorlash
  const productSummary = (products || []).slice(0, 30).map(p => {
    const price = p.discountPrice || p.price;
    return `- ${p.name} (${p.category}): ${new Intl.NumberFormat('uz-UZ').format(price)} so'm [Omborda: ${p.stock > 0 ? `${p.stock} dona` : 'mavjud'}]`;
  }).join('\n');

  const systemInstruction = `Siz FitLife Pro Sog‘liq va Sport ekotizimining rasmiy va juda aqlli, xushmuomala Google Gemini AI yordamchisisiz.
Loyihani yaratuvchi va bosh dasturchi: Otabek.

Siz quyidagi barcha ma'lumotlarni mukammal bilasiz:
1. SPORT MAHSULOTLARI & OZUQALARI:
${productSummary || 'Optimum Nutrition Gold Standard Whey Protein, Creapure Kreatin, Smart Regulyativ Gantellar, FitPro 3-in-1 Rashguard, Multivitaminlar, Omega-3 baliq moyi va boshqa ko\'plab sport anjomlari.'}

2. SPORT MAJMUASI VA ZALLARI:
- FitLife Flagship Mega Arena (Amir Temur ko'chasi 107-B) — 1500m² zali, sauna, fito-bar.
- AquaSport 50m Olimpiya Suzish Havzasi (Mustaqillik 88).
- IronCore CrossFit & Kuch Markazi (Bunyodkor 42).
- Champion Boks & MMA Akademiyasi (Shota Rustaveli 55).
- Shanti Yoga & Pilates Studiyasi.

3. AKSIYALAR VA PROMOKODLAR:
- "HACKATHON2026" — 25% maxsus chegirma! (Eng zo'r promokod)
- "FITLIFE" — 15% barcha xizmatlar va mahsulotlar uchun
- "OLYMP" — 30% VIP sportchi chegirmasi
- "SPORT10" — 10% birinchi xarid uchun

4. YETKAZIB BERISH VA TO'LOV:
- Toshkent: barcha sport tovarlari 24 soatda eshikkacha BEPUL yetkaziladi.
- Viloyatlar: 24-48 soat ichida.
- To'lov turlari: Click, Payme, Naqd pul va qabul qilganda ko'rib to'lash.

5. SALOMATLIK & MASHG'ULOTLAR:
- Individual BMI va kunlik kaloriya/suv kalkulyatori mavjud.
- Boshlang'ich, o'rta va ilg'or darajadagi trening dasturlari taymer va rep tracker bilan ta'minlangan.

6. BOG'LANISH:
- Telegram bot: @nekitekibeki_bot
- Bosh ofis: Toshkent sh., Amir Temur shox ko'chasi 107-B
- Telefon: +998 90 123 45 67

MUHIM QOIDALAR:
- Foydalanuvchi qaysi tilda yozsa, o'sha tilda (asosan o'zbek tilida) javob qaytaring.
- Sport, fitnes, mashqlar texnikasi va sog'lom turmush tarzi bo'yicha maslahatlarni professional va dalda beruvchi ohangda bering!`;

  try {
    const formattedContents = [];

    // Oldingi suhbat tarixini qo'shish
    if (Array.isArray(history) && history.length > 0) {
      history.slice(-8).forEach(item => {
        if (item.sender === 'user') {
          formattedContents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'bot') {
          formattedContents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      });
    }

    // Joriy yangi savolni qo'shish
    formattedContents.push({ role: 'user', parts: [{ text: message }] });

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: formattedContents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 600,
        }
      })
    });

    if (!response.ok) {
      console.warn("Gemini API xatoligi:", response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const replyText = candidate?.content?.parts?.[0]?.text;

    return replyText || null;
  } catch (error) {
    console.warn("Gemini API so'rovida xatolik:", error);
    return null;
  }
}
