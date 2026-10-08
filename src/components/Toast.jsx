import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toast } = useStore();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md text-xs font-bold ${
        isSuccess
          ? 'bg-emerald-950/90 text-emerald-100 border-emerald-500/40 shadow-emerald-500/20'
          : isError
          ? 'bg-rose-950/90 text-rose-100 border-rose-500/40 shadow-rose-500/20'
          : 'bg-slate-900/90 text-slate-100 border-slate-700 shadow-slate-950/30'
      }`}>
        {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
        {isError && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-4 h-4 text-teal-400 shrink-0" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
