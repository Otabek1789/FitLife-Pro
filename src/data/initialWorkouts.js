export const initialWorkouts = [
  {
    id: "wo-1",
    category: "cardio",
    title: {
      uz: "HIIT Intensiv Yog' Yoqish & Chidamlilik",
      ru: "HIIT Интенсивное Жиросжигание & Выносливость",
      en: "HIIT High Intensity Fat Burn & Stamina"
    },
    level: "O'rta / Medium",
    durationMinutes: 25,
    caloriesBurn: 380,
    exercisesCount: 6,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    description: {
      uz: "Yuqori templi intervalli mashqlar majmuasi. Metabolizmni 24 soat davomida tezlashtiradi va qisqa vaqtda maksimal kaloriya yoqadi.",
      ru: "Высокоинтенсивный комплекс интервальных упражнений для ускорения метаболизма и эффективного сжигания жира.",
      en: "Fast-paced interval regimen designed to boost athletic stamina and maintain an elevated calorie burn for 24 hours."
    },
    exercises: [
      { name: "Jumping Jacks (Sakrash)", reps: "45 soniya", rest: "15 soniya" },
      { name: "High Knees (Tizani ko'tarish)", reps: "40 soniya", rest: "20 soniya" },
      { name: "Burpees (Berpi)", reps: "15 marta", rest: "25 soniya" },
      { name: "Mountain Climbers (Tog'chi)", reps: "50 soniya", rest: "20 soniya" }
    ]
  },
  {
    id: "wo-2",
    category: "strength",
    title: {
      uz: "Ko'krak & Qo'l Mushaklarini Shakllantirish",
      ru: "Базовый Комплекс: Грудь и Трицепс",
      en: "Upper Body Hypertrophy: Chest & Arms"
    },
    level: "Ilg'or / Advanced",
    durationMinutes: 45,
    caloriesBurn: 450,
    exercisesCount: 8,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
    description: {
      uz: "Ko'krak va qo'l mushaklariga maksimal yuklama beruvchi gipertrofiya treningi. Gantellar va shtanga bilan mashqlar.",
      ru: "Классическая программа на увеличение объемов грудных мышц и рук с акцентом на прогрессивную перегрузку.",
      en: "Targeted resistance routine focusing on chest thickness, triceps definition, and progressive muscular overload."
    },
    exercises: [
      { name: "Otjimanie (Push-ups)", reps: "4 set x 15-20 marta", rest: "60 soniya" },
      { name: "Gantel bilan yotib press", reps: "4 set x 12 marta", rest: "75 soniya" },
      { name: "Brusda otjimanie (Dips)", reps: "3 set x 12 marta", rest: "60 soniya" },
      { name: "Gantel bilan razvodka", reps: "3 set x 15 marta", rest: "45 soniya" }
    ]
  },
  {
    id: "wo-3",
    category: "home",
    title: {
      uz: "Uy Sharoitida 6-Pack Qorin & Press Kompleksi",
      ru: "Комплекс на Пресс и Кор в Домашних Условиях",
      en: "Core Sculpt & 6-Pack Abs Home Routine"
    },
    level: "Boshlang'ich / Beginner",
    durationMinutes: 18,
    caloriesBurn: 220,
    exercisesCount: 5,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    description: {
      uz: "Hech qanday qo'shimcha anjomlarsiz uyda bajariladigan kuchli qorin mushaklari va umurtqa barqarorlashtiruvchi mashqlar.",
      ru: "Эффективная тренировка мышц пресса и кора без инвентаря. Укрепляет осанку и сжигает висцеральный жир.",
      en: "Equipment-free core circuit designed to tone abdominal walls, strengthen lower back, and improve posture."
    },
    exercises: [
      { name: "Planka (Klassik)", reps: "60 soniya", rest: "20 soniya" },
      { name: "Bicycle Crunches (Velosiped)", reps: "30 marta", rest: "20 soniya" },
      { name: "Oyoqlarni ko'tarish (Leg Raises)", reps: "20 marta", rest: "25 soniya" },
      { name: "Rus burilishi (Russian Twist)", reps: "30 marta", rest: "20 soniya" }
    ]
  },
  {
    id: "wo-4",
    category: "yoga",
    title: {
      uz: "Bo'g'inlar Moslashuvchanligi & Chuqur Yoga",
      ru: "Глубокая Растяжка & Расслабляющая Йога",
      en: "Mobility Flow & Restorative Yoga"
    },
    level: "Barcha darajalar",
    durationMinutes: 30,
    caloriesBurn: 160,
    exercisesCount: 6,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
    description: {
      uz: "Kun bo'yi yig'ilgan stressni yo'qotuvchi, umurtqa pog'onasi egiluvchanligini oshiruvchi tinchlantiruvchi yoga seansi.",
      ru: "Снимает мышечные зажимы, улучшает мобильность суставов и восстанавливает дыхательный баланс после стресса.",
      en: "Gentle mobility sequence to relieve spinal tension, lengthen tight muscle groups, and calm the nervous system."
    },
    exercises: [
      { name: "Pastga qaragan it (Downward Dog)", reps: "60 soniya", rest: "15 soniya" },
      { name: "Kobra holati (Cobra Pose)", reps: "45 soniya", rest: "15 soniya" },
      { name: "Jangchi holati (Warrior Pose)", reps: "45 soniya har tomonga", rest: "20 soniya" }
    ]
  }
];

export const trainers = [
  {
    id: "tr-1",
    name: "Javohir Toshpo'latov",
    role: "CrossFit & Badiiy Gimnastika Bo'yicha Bosh Murabbiy",
    experience: "9 yil tajriba",
    rating: 4.95,
    students: "1,200+",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "tr-2",
    name: "Alina Karimova",
    role: "Xalqaro Sertifikatlangan Fitnes & Yoga Instruktori",
    experience: "7 yil tajriba",
    rating: 4.98,
    students: "1,850+",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "tr-3",
    name: "Bobur Mirzayev",
    role: "Bodibilding & Professional Parhezshunos (Nutritionist)",
    experience: "11 yil tajriba",
    rating: 4.92,
    students: "950+",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  }
];
