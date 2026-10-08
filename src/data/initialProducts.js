export const initialProducts = [
  {
    id: 1,
    name: "Optimum Nutrition Gold Standard 100% Whey Protein (2.27 kg)",
    category: "nutrition",
    categoryName: {
      uz: "Protein & Ozuqa",
      ru: "Спортпит & Протеин",
      en: "Sports Nutrition"
    },
    price: 1150000,
    discountPrice: 980000,
    rating: 4.9,
    reviewsCount: 148,
    stock: 24,
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80"
    ],
    isNew: true,
    isFeatured: true,
    isFlashSale: true,
    description: {
      uz: "Dunyoning 1-raqamli zardob oqsili. Mushak massasini tezkor oshirish va mashg'ulotdan keyin organizmni tiklash uchun 24g toza oqsil va 5.5g BCAA o'z ichiga oladi.",
      ru: "Сывороточный протеин №1 в мире. 24г чистейшего белка и 5.5г BCAA для максимального роста сухой мышечной массы и ускоренного восстановления.",
      en: "World's #1 selling whey protein. Packed with 24g pure whey protein and 5.5g BCAAs per scoop to support muscle growth and recovery."
    },
    specs: {
      "Oqsil miqdori": "24 g har bir porsiyada (79%)",
      "BCAA aminokislotalari": "5.5 g tabiiy BCAA",
      "Vazni": "2.27 kg (5 Lbs) — 74 porsiya",
      "Ishlab chiqaruvchi": "Optimum Nutrition (AQSH)",
      "Sertifikat": "100% Original, Halol sertifikatlangan"
    }
  },
  {
    id: 2,
    name: "Creapure Mikronizatsiyalangan Kreatin Monogidrat (300 g)",
    category: "nutrition",
    categoryName: {
      uz: "Protein & Ozuqa",
      ru: "Спортпит & Протеин",
      en: "Sports Nutrition"
    },
    price: 380000,
    discountPrice: 320000,
    rating: 4.8,
    reviewsCount: 92,
    stock: 35,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80"
    ],
    isNew: false,
    isFeatured: true,
    isFlashSale: false,
    description: {
      uz: "Kuch va portlovchi quvvat ko'rsatkichlarini sezilarli darajada oshiruvchi 100% toza nemis texnologiyasi asosidagi Creapure kreatini.",
      ru: "100% чистый немецкий микронизированный креатин для колоссального роста силовых показателей и энергии.",
      en: "100% pure micronized creatine monohydrate to supercharge explosive athletic strength and muscle endurance."
    },
    specs: {
      "Tarkibi": "100% Creapure Kreatin Monogidrat",
      "Porsiyalar soni": "60 porsiya (har biri 5g)",
      "Shakli": "Mikron kukuni, hidsiz",
      "Ishlab chiqaruvchi": "BioTech USA"
    }
  },
  {
    id: 3,
    name: "Smart Professional Tezkor Regulyativ Gantellar To'plami (2.5 - 24 kg)",
    category: "equipment",
    categoryName: {
      uz: "Trenajyor & Anjomlar",
      ru: "Тренажеры & Инвентарь",
      en: "Gym Equipment"
    },
    price: 2900000,
    discountPrice: 2450000,
    rating: 5.0,
    reviewsCount: 64,
    stock: 12,
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80"
    ],
    isNew: true,
    isFeatured: true,
    isFlashSale: true,
    description: {
      uz: "2.5 kg dan 24 kg gacha oson o'zgaruvchan tezkor mexanizmli smart gantellar. Uy va professional zal sharoitida mashq qilish uchun mukammal yechim.",
      ru: "Быстро регулируемый вес от 2.5 до 24 кг поворотом диска. Заменяет целую стойку гантелей и экономит место.",
      en: "Fast-dial adjustable dumbbell system from 2.5 to 24 kg. Premium engineering engineered for home workouts."
    },
    specs: {
      "Vazn oralig'i": "2.5 - 24 kg (15 xil pog'ona)",
      "Material": "Kauchuk qoplamali quyma po'lat",
      "Mexanizm": "Smart Dial aylanuvchi qulf",
      "Kafolat": "2 yil rasmiy servis kafolati"
    }
  },
  {
    id: 4,
    name: "FitPro Kompression Sport Kiyimi (3-in-1 Rashguard To'plami)",
    category: "apparel",
    categoryName: {
      uz: "Sport Kiyimlari",
      ru: "Спортивная Одежда",
      en: "Sport Apparel"
    },
    price: 650000,
    discountPrice: 520000,
    rating: 4.7,
    reviewsCount: 88,
    stock: 18,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
    ],
    isNew: false,
    isFeatured: true,
    isFlashSale: false,
    description: {
      uz: "Quick-Dry nafas oluvchi elastik matodan tayyorlangan, qon aylanishini rag'batlantiruvchi va jarohatlardan asrovchi sport kiyimi.",
      ru: "Дышащий быстросохнущий комплект компрессионной одежды Quick-Dry для тренировок любой интенсивности.",
      en: "Breathable moisture-wicking compression workout set. Elevates muscular stability and thermoregulation."
    },
    specs: {
      "Tarkibi": "Rashguard ko'ylak, leggins, shortik",
      "Material": "88% Poliester, 12% Spandeks Quick-Dry",
      "O'lchamlar": "S, M, L, XL, XXL",
      "Qo'llanilishi": "Zal, Yugurish, CrossFit, MMA"
    }
  },
  {
    id: 5,
    name: "Daily Athlete Multivitamin & Mineral Kompleksi (150 tabs)",
    category: "vitamins",
    categoryName: {
      uz: "Vitaminlar & Salomatlik",
      ru: "Витамины & Здоровье",
      en: "Vitamins & Health"
    },
    price: 480000,
    discountPrice: 410000,
    rating: 4.9,
    reviewsCount: 110,
    stock: 40,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    ],
    isNew: true,
    isFeatured: true,
    isFlashSale: false,
    description: {
      uz: "Sportchilar va faol hayot tarzi uchun 75 dan ortiq vitamin, mineral va antioksidantlarni birlashtirgan super formula.",
      ru: "Специальный витаминно-минеральный комплекс для атлетов: свыше 75 активных нутриентов для бодрости и иммунитета.",
      en: "High-potency daily nutrient optimization formula packed with 75+ active ingredients and antioxidants."
    },
    specs: {
      "Faol moddalar": "75+ vitamin va mikroelementlar",
      "Qadoq": "150 tabletka (50 kunlik kurs)",
      "Ishlab chiqaruvchi": "Opti-Health USA"
    }
  },
  {
    id: 6,
    name: "Ultra Pure Omega-3 Fish Oil EPA/DHA (1200 mg, 120 kapsula)",
    category: "vitamins",
    categoryName: {
      uz: "Vitaminlar & Salomatlik",
      ru: "Витамины & Здоровье",
      en: "Vitamins & Health"
    },
    price: 390000,
    discountPrice: 330000,
    rating: 4.95,
    reviewsCount: 96,
    stock: 28,
    image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=800&q=80"
    ],
    isNew: false,
    isFeatured: true,
    isFlashSale: false,
    description: {
      uz: "Yurak-qon tomir tizimi, bo'g'imlar va miya faoliyatini qo'llab-quvvatlovchi yovvoyi dengiz balig'idan olingan toza Omega-3 yog' kislotalari.",
      ru: "Омега-3 высокой концентрации из диких морских рыб для поддержки сердца, сосудов и суставов.",
      en: "High-grade wild caught molecularly distilled Omega-3 fish oil for heart, joint, and cognitive health."
    },
    specs: {
      "EPA / DHA miqdori": "EPA 720 mg / DHA 480 mg har porsiyada",
      "Qadoq": "120 yumshoq jel kapsula",
      "Tozalik darajasi": "Molekulyar distillangan, og'ir metallarsiz"
    }
  },
  {
    id: 7,
    name: "Professional TPE Ekologik Yoga va Fitnes Mat (10 mm)",
    category: "equipment",
    categoryName: {
      uz: "Trenajyor & Anjomlar",
      ru: "Тренажеры & Инвентарь",
      en: "Gym Equipment"
    },
    price: 350000,
    discountPrice: 290000,
    rating: 4.9,
    reviewsCount: 79,
    stock: 22,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80"
    ],
    isNew: false,
    isFeatured: false,
    isFlashSale: false,
    description: {
      uz: "Sirpanmaydigan ekologik TPE material, bo'g'imlarni to'liq himoya qiluvchi 10 mm qalinlik va oson tashish kamari.",
      ru: "Двусторонний гипоаллергенный коврик TPE толщиной 10 мм с противоскользящей текстурой для комфортных занятий.",
      en: "High-density cushioned eco TPE exercise mat with laser alignment lines and non-slip textured grip."
    },
    specs: {
      "Qalinligi": "10 mm bo'g'im amortizatsiyasi",
      "O'lchamlari": "183 sm x 61 sm",
      "Material": "100% Ekologik TPE, toksinsiz",
      "Qo'shimcha": "Elkaga osish kamari bilan"
    }
  },
  {
    id: 8,
    name: "FitLife Smart Fitnes Tracker & Pulsometr (AOD AMOLED)",
    category: "apparel",
    categoryName: {
      uz: "Sport Kiyimlari",
      ru: "Спортивная Одежда",
      en: "Sport Apparel"
    },
    price: 720000,
    discountPrice: 590000,
    rating: 4.85,
    reviewsCount: 135,
    stock: 19,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80"
    ],
    isNew: true,
    isFeatured: true,
    isFlashSale: true,
    description: {
      uz: "Puls, qondagi kislorod (SpO2), sarflangan kaloriyalar va 120 dan ortiq sport rejimlarini aniq o'lchovchi suv o'tkazmaydigan smart braslet.",
      ru: "Водонепроницаемый умный фитнес-трекер с ярким AMOLED-экраном: мониторинг пульса 24/7, SpO2 и 120+ спорт-режимов.",
      en: "Waterproof smart fitness tracker band featuring vibrant AMOLED display, 24/7 heart rate, SpO2, and workout analytics."
    },
    specs: {
      "Ekran": "1.62 dyuymli HD AMOLED",
      "Batareya": "14 kungacha avtonom ishlash",
      "Suvga chidamlilik": "5 ATM (50 metr chuqurlikda suzish mumkin)",
      "Sensorlar": "BioTracker PPG, SpO2, 3-o'qli akselerometr"
    }
  },
  {
    id: 9,
    name: "BCAA 2:1:1 Energy Amino Acids Powder (500 g, Green Apple)",
    category: "nutrition",
    categoryName: {
      uz: "Protein & Ozuqa",
      ru: "Спортпит & Протеин",
      en: "Sports Nutrition"
    },
    price: 420000,
    discountPrice: 360000,
    rating: 4.88,
    reviewsCount: 84,
    stock: 31,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
    ],
    isNew: false,
    isFeatured: false,
    isFlashSale: false,
    description: {
      uz: "L-Leucine, L-Isoleucine va L-Valine ning klassik 2:1:1 nisbati. Mashg'ulot paytida katabolizmni to'xtatadi va mushaklarni himoya qiladi.",
      ru: "Незаменимые аминокислоты BCAA 2:1:1 для быстрого восстановления, защиты мышц от разрушения и энергии на тренировке.",
      en: "Instantized BCAA 2:1:1 branched-chain amino acids engineered to combat muscle breakdown and preserve lean mass."
    },
    specs: {
      "Nisbat": "2:1:1 (Leucine, Isoleucine, Valine)",
      "Vazni": "500 g (70 porsiya)",
      "Ta'mi": "Yashil olma (shakarsiz)"
    }
  },
  {
    id: 10,
    name: "Lateks Elastik Fitnes Rezinkalar To'plami (5 xil qarshilik)",
    category: "equipment",
    categoryName: {
      uz: "Trenajyor & Anjomlar",
      ru: "Тренажеры & Инвентарь",
      en: "Gym Equipment"
    },
    price: 210000,
    discountPrice: 175000,
    rating: 4.75,
    reviewsCount: 112,
    stock: 45,
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80"
    ],
    isNew: false,
    isFeatured: false,
    isFlashSale: false,
    description: {
      uz: "100% tabiiy Malayziya lateksidan tayyorlangan 5 ta har xil og'irlikdagi rezinka to'plami. Oyoq, bel va qo'l mushaklarini kuchaytirish uchun ideal.",
      ru: "Комплект из 5 фитнес-резинок разного уровня сопротивления от легкого до супер-тяжелого для домашних тренировок.",
      en: "Set of 5 natural latex loop resistance bands varying from extra-light to extra-heavy with travel pouch."
    },
    specs: {
      "Qarshilik darajalari": "4.5 kg dan 23 kg gacha (5 xil)",
      "Material": "100% Tabiiy lateks",
      "To'plamda": "5 ta rezinka + maxsus chexol"
    }
  },
  {
    id: 11,
    name: "Smart Rulmanli Kardio Sakrash Arqoni (Raqamli Tracker bilan)",
    category: "equipment",
    categoryName: {
      uz: "Trenajyor & Anjomlar",
      ru: "Тренажеры & Инвентарь",
      en: "Gym Equipment"
    },
    price: 240000,
    discountPrice: 195000,
    rating: 4.9,
    reviewsCount: 71,
    stock: 26,
    image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=800&q=80"
    ],
    isNew: true,
    isFeatured: false,
    isFlashSale: false,
    description: {
      uz: "Sekundiga 5 marta aylanish imkonini beruvchi podshipnikli tezkor arqon. Sakrashlar soni va yondirilgan kaloriyani hisoblab beruvchi LCD ekranga ega.",
      ru: "Скоростная скакалка с двойными подшипниками и встроенным цифровым счетчиком прыжков и калорий.",
      en: "Speed cardio jump rope with 360-degree ball bearings and digital LCD jump and calorie counter."
    },
    specs: {
      "Arqon uzunligi": "3 metr (bo'yga qarab sozlanadi)",
      "Podshipnik": "360° tezkor zanglamas podshipnik",
      "Funksiyalari": "Sakrash hisobi, Kaloriya, Sekundomer"
    }
  },
  {
    id: 12,
    name: "Pro-Grade Izolyatsiyalangan Zanglamas Shaker & Termos (750 ml)",
    category: "apparel",
    categoryName: {
      uz: "Sport Kiyimlari",
      ru: "Спортивная Одежда",
      en: "Sport Apparel"
    },
    price: 260000,
    discountPrice: 220000,
    rating: 4.85,
    reviewsCount: 93,
    stock: 38,
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80"
    ],
    isNew: false,
    isFeatured: false,
    isFlashSale: false,
    description: {
      uz: "Ikki qavatli zanglamas po'latdan ishlangan, ichimlikni 24 soat sovuq va 12 soat issiq saqlovchi professional protein shakeri.",
      ru: "Вакуумный шейкер из нержавеющей стали 18/8. Сохраняет холод 24 часа, герметичная крышка с сеточкой.",
      en: "Double-walled vacuum insulated stainless steel shaker bottle keeping fluids cold for up to 24 hours."
    },
    specs: {
      "Hajmi": "750 ml (25 oz)",
      "Material": "Oziq-ovqat toifasidagi 18/8 zanglamas po'lat",
      "Xususiyati": "100% Oqishga qarshi qulf va aralashtiruvchi to'pcha"
    }
  }
];
