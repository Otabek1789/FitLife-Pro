import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Sparkles, Dumbbell } from 'lucide-react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const isDismissed = sessionStorage.getItem('fitlife_install_dismissed');
      if (!isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If browser doesn't fire beforeinstallprompt within 2s and user hasn't dismissed, show install helper
    const timer = setTimeout(() => {
      const isDismissed = sessionStorage.getItem('fitlife_install_dismissed');
      if (!isDismissed && !window.matchMedia('(display-mode: standalone)').matches) {
        setIsVisible(true);
      }
    }, 3000);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    } else {
      alert("FitLife Pro Ilovasini o'rnatish uchun:\n1. Brauzer menyusini oching (yuqoridagi 3 nuqta ⋮ yoki Share)\n2. 'Ilovani o'rnatish' yoki 'Bosh ekranga qo'shish' (Add to Home Screen) tugmasini bosing!");
      setIsVisible(false);
      sessionStorage.setItem('fitlife_install_dismissed', 'true');
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('fitlife_install_dismissed', 'true');
  };

  if (isInstalled || !isVisible) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 max-w-sm w-[calc(100%-2rem)] sm:w-auto animate-fadeIn">
      <div className="p-3.5 sm:p-4 rounded-3xl bg-slate-900/95 text-white border border-emerald-500/30 shadow-2xl shadow-emerald-950 flex items-center justify-between gap-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs sm:text-sm font-extrabold text-white">
                FitLife Pro Ilovasi
              </h4>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              Telefon ekraniga tezkor o'rnatish
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleInstallClick}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-xs shadow-md shadow-emerald-500/25 active:scale-95 transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>O'rnatish</span>
          </button>
          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
