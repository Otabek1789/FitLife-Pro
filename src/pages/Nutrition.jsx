import React, { useState } from 'react';
import { initialDietTips, healthyFoodFacts } from '../data/initialDietTips';
import { useLanguage } from '../context/LanguageContext';
import { 
  Activity, 
  Scale, 
  Flame, 
  Droplets, 
  Utensils, 
  Heart, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Nutrition = () => {
  const { t } = useLanguage();

  // BMI Form State
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState(72);
  const [height, setHeight] = useState(176);
  const [age, setAge] = useState(24);
  const [activity, setActivity] = useState(1.55); // 1.2, 1.55, 1.75
  const [bmiResult, setBmiResult] = useState(null);

  const calculateBmi = (e) => {
    e.preventDefault();
    const heightInMeters = height / 100;
    const bmi = +(weight / (heightInMeters * heightInMeters)).toFixed(1);

    // BMR (Harris-Benedict Equation)
    let bmr = 0;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    const tdee = Math.round(bmr * activity);
    const waterLiters = +(weight * 0.035).toFixed(1);

    let status = '';
    let statusClass = '';
    if (bmi < 18.5) {
      status = t('bmi_status_underweight');
      statusClass = 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    } else if (bmi <= 24.9) {
      status = t('bmi_status_normal');
      statusClass = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } else if (bmi <= 29.9) {
      status = t('bmi_status_overweight');
      statusClass = 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    } else {
      status = t('bmi_status_obese');
      statusClass = 'text-rose-500 bg-rose-500/10 border-rose-500/20';
    }

    setBmiResult({
      bmi,
      tdee,
      waterLiters,
      status,
      statusClass
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-teal-600 dark:text-teal-400 bg-teal-500/10 px-3.5 py-1.5 rounded-xl inline-block mb-3">
          Salomatlik & Dieta
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          {t('nutrition_title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          {t('nutrition_subtitle')}
        </p>
      </div>

      {/* INTERACTIVE BMI & TDEE CALCULATOR COMPONENT */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Calculator Input Form */}
          <form onSubmit={calculateBmi} className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-5 h-5 text-teal-500" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                {t('bmi_calc_title')}
              </h3>
            </div>

            {/* Gender Switch */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                {t('bmi_gender')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2.5 rounded-2xl text-xs font-bold border transition ${
                    gender === 'male'
                      ? 'bg-teal-500/10 border-teal-500 text-teal-600 dark:text-teal-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  👨 {t('bmi_male')}
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2.5 rounded-2xl text-xs font-bold border transition ${
                    gender === 'female'
                      ? 'bg-teal-500/10 border-teal-500 text-teal-600 dark:text-teal-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  👩 {t('bmi_female')}
                </button>
              </div>
            </div>

            {/* Numeric Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('bmi_weight')}
                </label>
                <input
                  type="number"
                  min="30"
                  max="200"
                  value={weight}
                  onChange={(e) => setWeight(+e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('bmi_height')}
                </label>
                <input
                  type="number"
                  min="100"
                  max="230"
                  value={height}
                  onChange={(e) => setHeight(+e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {t('bmi_age')}
                </label>
                <input
                  type="number"
                  min="12"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(+e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {t('bmi_activity')}
              </label>
              <select
                value={activity}
                onChange={(e) => setActivity(+e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
              >
                <option value={1.2}>{t('bmi_act_low')}</option>
                <option value={1.55}>{t('bmi_act_mid')}</option>
                <option value={1.75}>{t('bmi_act_high')}</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-black text-xs shadow-lg shadow-teal-500/25 active:scale-95 transition"
            >
              {t('bmi_calc_btn')}
            </button>
          </form>

          {/* Calculator Output Display Card */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col justify-between min-h-[340px]">
            {bmiResult ? (
              <div className="space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t('bmi_result_title')}
                </span>

                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-slate-900 dark:text-white">
                    {bmiResult.bmi}
                  </span>
                  <span className="text-xs font-bold text-slate-400">BMI</span>
                </div>

                <div className={`p-3 rounded-2xl border text-xs font-bold ${bmiResult.statusClass}`}>
                  {bmiResult.status}
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                      <Flame className="w-4 h-4 text-rose-500" />
                      {t('bmi_daily_calories')}
                    </span>
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {bmiResult.tdee} kkal
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      {t('bmi_daily_water')}
                    </span>
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {bmiResult.waterLiters} Litr
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="my-auto text-center py-8">
                <Activity className="w-12 h-12 text-teal-500/40 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  Natijani ko'rish uchun parametrlarini kiriting
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  "Hisoblash" tugmasini bosing va o'z sog'ligingiz bo'yicha to'liq hisobotni oling.
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0 text-teal-500" />
              <span>JS Harris-Benedict formulasiga asoslangan ilmiy hisoblash</span>
            </div>
          </div>

        </div>
      </div>

      {/* HEALTHY DIET PLANS SECTION */}
      <div>
        <div className="text-center mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg">
            Taomnoma Dasturlari
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
            {t('diet_plan_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {initialDietTips.map((diet) => (
            <div
              key={diet.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    {diet.goal}
                  </h3>
                </div>

                <div className="text-xs font-bold text-teal-600 dark:text-teal-400 mb-4 flex items-center gap-1.5">
                  <Flame className="w-4 h-4" />
                  <span>Maqsad: {diet.calorieTarget}</span>
                </div>

                {/* Macro breakdown */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 mb-5 text-center text-xs font-bold">
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">Protein</span>
                    <span className="text-emerald-500">{diet.macros.protein}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">Uglevod</span>
                    <span className="text-amber-500">{diet.macros.carbs}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase">Yog'</span>
                    <span className="text-rose-500">{diet.macros.fat}</span>
                  </div>
                </div>

                {/* Meals */}
                <div className="space-y-3">
                  {diet.meals.map((meal, idx) => (
                    <div key={idx} className="text-xs">
                      <span className="font-extrabold text-slate-900 dark:text-white block">
                        {meal.time}
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {meal.menu}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Dietolog mutaxassis tasdiqlagan reja
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Nutrition;
