export const initialDietTips = [
  {
    id: "diet-1",
    goal: "Vazn Yo'qotish & Relyef (Yog' yoqish)",
    calorieTarget: "1800 - 2100 kkal",
    macros: { protein: "40%", carbs: "35%", fat: "25%" },
    meals: [
      { time: "08:00 - Nonushta", menu: "Suli yormasi (ovsyanka) mevalar bilan + 3 dona qaynatilgan tuxum oqi + ko'k choy" },
      { time: "11:30 - Ikkinchi nonushta", menu: "1 dona yashil olma + 30g bodom yoki yong'oq" },
      { time: "14:00 - Tushlik", menu: "Bug'da pishirilgan tovuq filesi (200g) + grechka yoki jigarrang guruch + yangi sabzavotli salat" },
      { time: "17:00 - Mashqdan oldin", menu: "1 porsiya zardob oqsili (Whey Protein) yoki 1 dona banan" },
      { time: "19:30 - Kechki ovqat", menu: "Oq baliq filesi yoki tvorog (kam yog'li) + bodring va ko'katlar" }
    ]
  },
  {
    id: "diet-2",
    goal: "Sifatli Mushak Massasi Olish (Bulking)",
    calorieTarget: "2800 - 3200 kkal",
    macros: { protein: "30%", carbs: "50%", fat: "20%" },
    meals: [
      { time: "08:00 - Nonushta", menu: "4 dona tuxum omleti + suli bo'tqasi banan va asal bilan + tabiiy apelsin sharbati" },
      { time: "11:00 - Tamaddi", menu: "Tvorog (200g) smetana va yong'oqlar bilan + bug'doy noni" },
      { time: "14:00 - Tushlik", menu: "Mol go'shti steyki (250g) + guruch yoki kartoshka pyuresi + zaytun moyli salat" },
      { time: "17:30 - Mashg'ulotdan so'ng", menu: "Gainer yoki Protein kokteyli + 5g Kreatin" },
      { time: "20:00 - Kechki ovqat", menu: "Tovuq filesi + grechka + brokkoli va sabzi dimlamasi" }
    ]
  },
  {
    id: "diet-3",
    goal: "Sog'lom Immunitet & Tana Balansi (Maintenance)",
    calorieTarget: "2200 - 2400 kkal",
    macros: { protein: "30%", carbs: "40%", fat: "30%" },
    meals: [
      { time: "08:00 - Nonushta", menu: "Avokado tosti + qaynatilgan tuxum + yong'oqlar va qahva" },
      { time: "13:30 - Tushlik", menu: "Sabzavotli sho'rva + kurka filesi va rang-barang vitaminli salat" },
      { time: "19:00 - Kechki ovqat", menu: "Dengiz mahsulotlari yoki losos balig'i + zaytun moyli ko'katlar" }
    ]
  }
];

export const healthyFoodFacts = [
  {
    title: "Tuxum Oqsili — Oltin Standart",
    text: "Tuxum oqsili inson organizmi tomonidan 98% o'zlashtiriladi va barcha muhim aminokislotalarga ega.",
    icon: "Egg"
  },
  {
    title: "Suv va Elektrolit Balansi",
    text: "Hatto 2% suv yo'qotilishi jismoniy kuch va aqliy diqqatni 20% ga pasaytirishi mumkin.",
    icon: "Droplets"
  },
  {
    title: "Omega-3 Yog' Kislotalari",
    text: "Muntazam Omega-3 qabul qilish yurak faoliyatini va bo'g'imlar elastikligini 40% yaxshilaydi.",
    icon: "Heart"
  }
];
