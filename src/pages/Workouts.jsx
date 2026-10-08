import React, { useState, useEffect } from 'react';
import { initialWorkouts, trainers } from '../data/initialWorkouts';
import { useLanguage } from '../context/LanguageContext';
import { 
  Dumbbell, 
  Flame, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  CheckCircle, 
  Star, 
  UserCheck, 
  Filter, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Workouts = () => {
  const { t, getLocalized } = useLanguage();

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedWorkout, setSelectedWorkout] = useState(initialWorkouts[0]);
  
  // Interactive Workout Timer & Rep Tracker
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedReps, setCompletedReps] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleStartPause = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setSeconds(0);
    setCompletedReps(0);
  };

  const handleAddRep = () => {
    setCompletedReps(prev => {
      const next = prev + 1;
      if (next % 10 === 0) {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.8 } });
      }
      return next;
    });
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${remSecs < 10 ? '0' : ''}${remSecs}`;
  };

  const filteredWorkouts = activeCategory === 'all'
    ? initialWorkouts
    : initialWorkouts.filter(w => w.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-xl inline-block mb-3">
          Mashg'ulotlar & Fitnes
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          {t('workouts_title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          {t('workouts_subtitle')}
        </p>
      </div>

      {/* INTERACTIVE WORKOUT TIMER & REP TRACKER COMPONENT */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white p-6 sm:p-10 shadow-2xl border border-emerald-500/20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Active Routine Info */}
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Hozirgi mashq kompleksi</span>
            </div>
            <h3 className="text-2xl font-black mb-2 text-white">
              {getLocalized(selectedWorkout.title)}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {getLocalized(selectedWorkout.description)}
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-300 font-bold">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedWorkout.durationMinutes} daqiqa
              </span>
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                {selectedWorkout.caloriesBurn} kkal
              </span>
            </div>
          </div>

          {/* Stopwatch Display */}
          <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Mashg'ulot Taymeri
            </span>
            <div className="text-5xl sm:text-6xl font-mono font-black text-emerald-400 tracking-tight my-2">
              {formatTime(seconds)}
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleStartPause}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg transition active:scale-95 ${
                  isTimerRunning
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25'
                }`}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isTimerRunning ? t('workouts_timer_pause') : t('workouts_timer_start')}</span>
              </button>

              <button
                onClick={handleResetTimer}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
                title={t('workouts_timer_reset')}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Repetition Tracker */}
          <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              {t('workouts_reps_completed')}
            </span>
            <div className="text-5xl sm:text-6xl font-black text-cyan-400 tracking-tight my-2">
              {completedReps}
            </div>

            <button
              onClick={handleAddRep}
              className="mt-4 flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition"
            >
              <Plus className="w-4 h-4" />
              <span>+1 Takrorlash (Rep)</span>
            </button>
          </div>

        </div>
      </div>

      {/* WORKOUT FILTER TABS */}
      <div>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'all', label: t('workouts_all') },
            { id: 'cardio', label: t('workouts_cardio') },
            { id: 'strength', label: t('workouts_strength') },
            { id: 'home', label: t('workouts_home') },
            { id: 'yoga', label: t('workouts_yoga') }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* WORKOUT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredWorkouts.map((workout) => {
            const isSelected = selectedWorkout.id === workout.id;
            return (
              <div
                key={workout.id}
                className={`rounded-3xl bg-white dark:bg-slate-900 border p-6 transition-all duration-300 flex flex-col justify-between shadow-xl ${
                  isSelected
                    ? 'border-emerald-500 shadow-emerald-500/10 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                <div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
                    <img
                      src={workout.image}
                      alt={getLocalized(workout.title)}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-emerald-400 text-xs font-extrabold uppercase">
                      {workout.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
                    {getLocalized(workout.title)}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {getLocalized(workout.description)}
                  </p>

                  {/* Exercises list in this workout */}
                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Mashqlar tarkibi:
                    </span>
                    {workout.exercises.map((ex, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs"
                      >
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {i + 1}. {ex.name}
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          {ex.reps}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <Clock className="w-4 h-4" />
                      {workout.durationMinutes} min
                    </span>
                    <span className="flex items-center gap-1 text-rose-500">
                      <Flame className="w-4 h-4" />
                      {workout.caloriesBurn} kkal
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedWorkout(workout);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition"
                  >
                    Taymerga Yuklash
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PROFESSIONAL TRAINERS SECTION */}
      <div className="pt-8">
        <div className="text-center mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-1 rounded-lg">
            Sertifikatlangan Murabbiylar
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
            Bizning Tajribali Sport Ustozlarimiz
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trainers.map((tr) => (
            <div
              key={tr.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-4"
            >
              <img
                src={tr.image}
                alt={tr.name}
                className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-purple-500/30"
              />
              <div className="min-w-0">
                <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">
                  {tr.name}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                  {tr.role}
                </p>
                <div className="flex items-center gap-3 mt-2 text-[11px] font-bold">
                  <span className="text-amber-500 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {tr.rating}
                  </span>
                  <span className="text-emerald-500">{tr.students} shogird</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
