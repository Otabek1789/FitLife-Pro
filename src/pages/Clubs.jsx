import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { ClubCard } from '../components/ClubCard';
import { 
  Search, 
  X, 
  Heart, 
  Sparkles, 
  ArrowUpDown, 
  Percent, 
  RotateCcw,
  Building2,
  Calendar
} from 'lucide-react';

export const Clubs = () => {
  const { t, getLocalized } = useLanguage();
  const { clubs, wishlist } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [onlyWishlist, setOnlyWishlist] = useState(
    searchParams.get('filter') === 'wishlist'
  );
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'all', label: t('clubs_all_categories') },
    { id: 'gym', label: t('clubs_cat_gym') },
    { id: 'crossfit', label: t('clubs_cat_crossfit') },
    { id: 'swim', label: t('clubs_cat_swim') },
    { id: 'fight', label: t('clubs_cat_fight') },
    { id: 'yoga', label: t('clubs_cat_yoga') }
  ];

  // Filter & Sort Logic
  const filteredClubs = useMemo(() => {
    return clubs
      .filter((club) => {
        // Search
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const clubName = getLocalized(club.name).toLowerCase();
          const clubAddress = club.address.toLowerCase();
          if (!clubName.includes(query) && !clubAddress.includes(query) && !club.category.includes(query)) {
            return false;
          }
        }

        // Category
        if (selectedCategory !== 'all' && club.category !== selectedCategory) {
          return false;
        }

        // Price
        if (club.monthlyPrice > maxPrice) {
          return false;
        }

        // Discount only
        if (onlyDiscount && (!club.discount || club.discount <= 0)) {
          return false;
        }

        // Wishlist only
        if (onlyWishlist && !wishlist.includes(club.id)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.monthlyPrice - b.monthlyPrice;
        if (sortBy === 'price-desc') return b.monthlyPrice - a.monthlyPrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [clubs, searchTerm, selectedCategory, maxPrice, onlyDiscount, onlyWishlist, sortBy, wishlist, getLocalized]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setMaxPrice(1000000);
    setOnlyDiscount(false);
    setOnlyWishlist(false);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-xl inline-block mb-3">
          Sport Zallari & Markazlar
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          {t('clubs_title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          {t('clubs_subtitle')}
        </p>
      </div>

      {/* FILTER & SEARCH CONTROL BAR */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        {/* Top Search Bar & Sort Dropdown */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder={t('clubs_search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-xs rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="w-full md:w-auto flex items-center justify-between sm:justify-end gap-3">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {t('clubs_sort_by')}:
              </span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="featured">{t('clubs_sort_featured')}</option>
              <option value="price-asc">{t('clubs_sort_price_asc')}</option>
              <option value="price-desc">{t('clubs_sort_price_desc')}</option>
              <option value="rating">{t('clubs_sort_rating')}</option>
            </select>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Filters: Price Slider, Discount checkbox, Wishlist toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          
          {/* Price Slider */}
          <div className="w-full sm:w-72">
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              <span>{t('clubs_filter_price')}:</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {maxPrice.toLocaleString()} {t('currency')} gacha
              </span>
            </div>
            <input
              type="range"
              min="400000"
              max="1000000"
              step="50000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(+e.target.value)}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Quick Filter Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setOnlyDiscount(!onlyDiscount)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                onlyDiscount
                  ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Percent className="w-3.5 h-3.5" />
              <span>{t('clubs_filter_discount_only')}</span>
            </button>

            <button
              onClick={() => setOnlyWishlist(!onlyWishlist)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                onlyWishlist
                  ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${onlyWishlist ? 'fill-white' : ''}`} />
              <span>Sevimlilar ({wishlist.length})</span>
            </button>

            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Filtrlarni tozalash"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Filtrni tozalash</span>
            </button>
          </div>

        </div>

      </div>

      {/* CLUBS COUNT & GRID */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            <b>{filteredClubs.length}</b> {t('clubs_found_count')}
          </span>
        </div>

        {filteredClubs.length === 0 ? (
          <div className="p-16 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center shadow-lg">
            <Building2 className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Hech qanday sport zali topilmadi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Qidiruv so'zini yoki narx parametrlarini o'zgartirib ko'ring.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
            >
              Barcha zallarni ko'rsatish
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
