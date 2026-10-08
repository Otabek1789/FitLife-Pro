import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('fitlife_lang') || localStorage.getItem('shop_lang') || 'uz';
  });

  const setLanguage = (lang) => {
    if (['uz', 'ru', 'en'].includes(lang)) {
      setLanguageState(lang);
      localStorage.setItem('fitlife_lang', lang);
      localStorage.setItem('shop_lang', lang);
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Translation helper: handles both flat keys ("hero_title") and dotted keys ("nav.home")
  const t = (key, fallback = '') => {
    const langDict = translations[language] || translations.uz || {};
    const uzDict = translations.uz || {};

    // 1. Direct flat key
    if (langDict[key] !== undefined) return langDict[key];
    if (uzDict[key] !== undefined) return uzDict[key];

    // 2. Dotted key path (e.g. "nav.home")
    if (key.includes('.')) {
      const parts = key.split('.');
      let cur = langDict;
      for (const p of parts) {
        if (cur && cur[p] !== undefined) cur = cur[p];
        else { cur = null; break; }
      }
      if (cur && typeof cur === 'string') return cur;

      // Fallback in uzDict
      let fallbackCur = uzDict;
      for (const p of parts) {
        if (fallbackCur && fallbackCur[p] !== undefined) fallbackCur = fallbackCur[p];
        else { fallbackCur = null; break; }
      }
      if (fallbackCur && typeof fallbackCur === 'string') return fallbackCur;
    }

    // 3. Fallback or key itself
    return typeof fallback === 'string' && fallback.length > 0 ? fallback : key;
  };

  // Helper for localized object fields: { uz: '...', ru: '...', en: '...' }
  const getLocalized = (obj) => {
    if (obj === null || obj === undefined) return '';
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'number') return String(obj);
    if (typeof obj === 'object') {
      return obj[language] || obj.uz || obj.en || obj.ru || Object.values(obj)[0] || '';
    }
    return String(obj);
  };


  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLocalized }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
