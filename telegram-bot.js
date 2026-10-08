/**
 * FirLife Pro — Telegram Bot & Mini App Server
 * Token: 7097812277:AAE_boKr0Tl8ZJTTR95gOPjuqPeVWZRVawc
 * Chat ID: 7373118052
 * Bot: @Music_finderuzb_bot
 * Title: FirLife Pro
 */

const BOT_TOKEN = process.env.BOT_TOKEN || '7097812277:AAE_boKr0Tl8ZJTTR95gOPjuqPeVWZRVawc';
const ADMIN_CHAT_ID = process.env.CHAT_ID || '7373118052';
// Default WebApp URL deployed on Vercel / Live
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://moderno-three.vercel.app';

const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function tgCall(method, body = {}) {
  try {
    const res = await fetch(`${API_BASE}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return await res.json();
  } catch (err) {
    console.error(`Error in ${method}:`, err.message);
    return { ok: false, error: err.message };
  }
}

// Set Menu Button [🏆 FirLife Pro]
async function configureMenuButton(url) {
  const targetUrl = url || WEB_APP_URL;
  console.log(`Setting Telegram Chat Menu Button to: ${targetUrl}...`);
  const res = await tgCall('setChatMenuButton', {
    menu_button: {
      type: 'web_app',
      text: "🏆 FirLife Pro",
      web_app: { url: targetUrl }
    }
  });
  console.log('Menu Button Response:', res);
  return res;
}

let lastUpdateId = 0;

async function pollUpdates() {
  try {
    const res = await tgCall('getUpdates', {
      offset: lastUpdateId + 1,
      timeout: 30
    });

    if (res.ok && res.result && res.result.length > 0) {
      for (const update of res.result) {
        lastUpdateId = update.update_id;

        if (update.message && update.message.text) {
          const chatId = update.message.chat.id;
          const text = update.message.text.trim();
          const firstName = update.message.from.first_name || 'Sportchi';

          console.log(`[Message from ${chatId}] ${text}`);

          if (text.startsWith('/start') || text.startsWith('/shop') || text === "🏆 FirLife Pro ni ochish" || text === "🛍 Do'konni ochish") {
            const welcomeText = `
Assalomu alaykum, <b>${firstName}</b>! 👋

🏆 <b>FirLife Pro</b> — Sog'liq va Sport rasmiy platformasiga xush kelibsiz!
Bu yerda siz professional sport ozuqalari (Protein, BCAA, Kreatin), trenajyorlar, FitLife zal abonementlari, interaktiv mashg'ulotlar va BMI kalkulyatoridan to'liq foydalanishingiz mumkin.

👇 Ilovani ochish uchun quyidagi <b>"🏆 FirLife Pro ni ochish"</b> tugmasini bosing:
`;

            await tgCall('sendMessage', {
              chat_id: chatId,
              text: welcomeText,
              parse_mode: 'HTML',
              reply_markup: {
                keyboard: [
                  [
                    {
                      text: "🏆 FirLife Pro ni ochish",
                      web_app: { url: WEB_APP_URL }
                    }
                  ]
                ],
                resize_keyboard: true
              }
            });

            // Also send inline button
            await tgCall('sendMessage', {
              chat_id: chatId,
              text: "Ilovachani to'liq ekranda ochish:",
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "🚀 FirLife Pro Mini Appni Ochish",
                      web_app: { url: WEB_APP_URL }
                    }
                  ]
                ]
              }
            });
          } else if (text === '/help') {
            await tgCall('sendMessage', {
              chat_id: chatId,
              text: `ℹ️ <b>Yordam bo'limi:</b>\n\nBuyurtma berish yoki zallarni bron qilish uchun /start bosing yoki quyidagi <b>"🏆 FirLife Pro"</b> menyu tugmasidan foydalaning.\n\n📞 Call-markaz: +998 71 200 44 44`,
              parse_mode: 'HTML'
            });
          } else if (text === '/admin') {
            await tgCall('sendMessage', {
              chat_id: chatId,
              text: `🔐 <b>Admin boshqaruv paneli:</b>\n\nAdmin kabinetiga kirish uchun:\n<a href="${WEB_APP_URL}/admin">Admin Dashboardni Ochish</a>`,
              parse_mode: 'HTML'
            });
          }
        }
      }
    }
  } catch (err) {
    console.error('Polling error:', err.message);
  }

  // Continue long polling
  setTimeout(pollUpdates, 1000);
}

// Startup
async function startBot() {
  console.log('🤖 FirLife Pro Telegram Bot ishga tushmoqda...');
  console.log(`Bot Token: ${BOT_TOKEN.substring(0, 10)}...`);
  console.log(`Admin Chat ID: ${ADMIN_CHAT_ID}`);
  console.log(`Web App URL: ${WEB_APP_URL}`);

  const me = await tgCall('getMe');
  if (me.ok) {
    console.log(`✅ Bot muvaffaqiyatli ulandi: @${me.result.username} (${me.result.first_name})`);
  } else {
    console.error('❌ Bot token noto‘g‘ri yoki tarmoq xatosi:', me);
  }

  // Configure WebApp Menu Button
  await configureMenuButton();

  // Send admin notification
  if (ADMIN_CHAT_ID) {
    await tgCall('sendMessage', {
      chat_id: ADMIN_CHAT_ID,
      text: `🚀 <b>FirLife Pro Telegram Bot va Mini App faollashtirildi!</b>\n\nBot: @${me.result?.username || 'Music_finderuzb_bot'}\nAdmin ID: <code>${ADMIN_CHAT_ID}</code>\nMini App: ${WEB_APP_URL}`,
      parse_mode: 'HTML'
    });
  }

  console.log('👂 Yangi xabarlar kutilmoqda (Long Polling)...');
  pollUpdates();
}

startBot();
