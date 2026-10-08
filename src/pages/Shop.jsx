import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Search, 
  ShoppingBag, 
  Sparkles, 
  Heart, 
  Star, 
  Tag, 
  ArrowUpDown, 
  Filter, 
  Check, 
  RotateCcw,
  Zap,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const Shop = () => {
  const { products, setQuickBuyProduct, toggleWishlist, isWishlisted } = useStore();
  const { t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [maxPrice, setMaxPrice] = useState(3000000);

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'nutrition', label: 'Protein & Ozuqa' },
    { id: 'equipment', label: 'Trenajyor & Anjomlar' },
    { id: 'vitamins', label: 'Vitaminlar & Sog‘liq' },
    { id: 'apparel', label: 'Sport Kiyimlari' }
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchName && !matchCat) return false;
        }

        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        const price = p.discountPrice || p.price;
        if (price > maxPrice) {
          return false;
        }

        if (onlyDiscount && (!p.discountPrice || p.discountPrice >= p.price)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;

        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  }, [products, searchTerm, selectedCategory, maxPrice, onlyDiscount, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('featured');
    setOnlyDiscount(false);
    setMaxPrice(3000000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 sm:p-12 text-white shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FitLife Pro Rasmiy Sport Do'koni</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Premium Sport Ozuqalari & Professional Anjomlar
          </h1>

          <p className="text-sm sm:text-base text-emerald-50 leading-relaxed font-normal">
            100% original sertifikatlangan sport ozuqalari, zardob oqsillari, regulyativ gantellar, vitaminlar va sport kiyimlari. Toshkent bo'yicha 24 soatda tezkor yetkazib berish!
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-bold text-white/90">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-200" />
              <span>100% Original Sifat</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-200" />
              <span>Bepul Yetkazib Berish</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-200" />
              <span>Telegram Tezkor Buyurtma</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-sm ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/25 scale-105'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Mahsulot nomi yoki toifasi bo'yicha qidiruv..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Sort By */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2.5 px-3 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="featured">Tavsiya etilgan</option>
                <option value="price-asc">Narx: Arzondan qimmatga</option>
                <option value="price-desc">Narx: Qimmatdan arzonga</option>
                <option value="rating">Yuqori reyting bo'yicha</option>
              </select>
            </div>
          </div>

          {/* Discount checkbox */}
          <div className="md:col-span-2 flex items-center">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyDiscount}
                onChange={(e) => setOnlyDiscount(e.target.checked)}
                className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-400"
              />
              <span>Faqat aksiyadagilar</span>
            </label>
          </div>

          {/* Reset Filters */}
          <div className="md:col-span-2 flex justify-end">
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tozalash</span>
            </button>
          </div>

        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 px-1">
          <span>Topilgan mahsulotlar: {filteredProducts.length} ta</span>
          <span>FitLife Pro Original Kafolati</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Hech qanday mahsulot topilmadi</h3>
            <p className="text-xs text-slate-500 mt-1">Boshqa so'z bilan qidirib ko'ring yoki filtrlarni tozalang.</p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold"
            >
              Filtrlarni tozalash
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => {
              const wishlisted = isWishlisted(prod.id);
              const displayPrice = prod.discountPrice || prod.price;
              const hasDiscount = prod.discountPrice && prod.discountPrice < prod.price;

              return (
                <div
                  key={prod.id}
                  className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {hasDiscount && (
                          <span className="px-2.5 py-1 rounded-xl bg-rose-500 text-white font-black text-[10px] uppercase shadow-md shadow-rose-500/30">
                            Aksiya
                          </span>
                        )}
                        {prod.isNew && (
                          <span className="px-2.5 py-1 rounded-xl bg-emerald-500 text-white font-black text-[10px] uppercase shadow-md shadow-emerald-500/30">
                            Yangi
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className={`absolute top-3 right-3 p-2.5 rounded-2xl backdrop-blur-md transition shadow-md ${
                          wishlisted
                            ? 'bg-rose-500 text-white'
                            : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-rose-500'
                        }`}
                        title="Sevimlilarga qo'shish"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          {prod.categoryName?.uz || prod.category}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{prod.rating || 5.0}</span>
                          <span className="text-slate-400">({prod.reviewsCount || 10})</span>
                        </div>
                      </div>

                      <h3 className="text-sm font-black text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-emerald-500 transition-colors">
                        {prod.name}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 font-normal leading-relaxed">
                        {typeof prod.description === 'string' ? prod.description : prod.description?.uz}
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="p-5 pt-0 space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-slate-900 dark:text-white">
                        {displayPrice.toLocaleString()} so'm
                      </span>
                      {hasDiscount && (
                        <span className="text-xs font-bold text-slate-400 line-through">
                          {prod.price.toLocaleString()} so'm
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setQuickBuyProduct(prod)}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 group-hover:shadow-emerald-500/40"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Xarid Qilish (Telegram)</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
