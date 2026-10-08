import React from 'react';
import { AlertTriangle, RefreshCw, Trash2, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('FitLife Pro ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetCache = () => {
    try {
      localStorage.removeItem('fitlife_clubs');
      localStorage.removeItem('fitlife_wishlist');
      localStorage.removeItem('fitlife_bookings');
      localStorage.removeItem('fitlife_applied_promo');
    } catch (e) {
      console.error(e);
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6 font-sans">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">Xatolik yuz berdi</h2>
              <p className="text-sm text-slate-400 mt-2">
                Ilovada kutilmagan holat yuz berdi. Sahifani yangilash orqali buni bartaraf etishingiz mumkin.
              </p>
              {this.state.error?.message && (
                <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-rose-400 text-left overflow-auto max-h-24">
                  {this.state.error.message}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-bold text-sm text-white flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20"
              >
                <RefreshCw className="w-4 h-4" />
                Qayta yuklash
              </button>

              <button
                onClick={this.handleResetCache}
                className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 font-semibold text-sm text-slate-300 flex items-center justify-center gap-2 transition"
                title="Keshni tozalab bosh sahifaga qaytish"
              >
                <Trash2 className="w-4 h-4 text-slate-400" />
                Tozalash
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
