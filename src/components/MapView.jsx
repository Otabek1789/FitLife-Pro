import React, { useEffect, useRef, useState } from 'react';
import { branchLocations } from '../data/branchLocations';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Clock, ExternalLink, Star, Compass } from 'lucide-react';

export const MapView = () => {
  const { t } = useLanguage();
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef([]);

  const [activeBranch, setActiveBranch] = useState(branchLocations[0]);

  useEffect(() => {
    // If Leaflet script is loaded on window
    if (window.L && mapContainerRef.current && !leafletMapRef.current) {
      const map = window.L.map(mapContainerRef.current).setView([41.311081, 69.240562], 12);
      leafletMapRef.current = map;

      // Add OpenStreetMap Tile Layer
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Custom marker icon
      const customIcon = window.L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="background: linear-gradient(135deg, #10b981, #06b6d4); width: 36px; height: 36px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.3); color: white;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
      });

      // Add markers
      branchLocations.forEach((branch) => {
        const marker = window.L.marker([branch.lat, branch.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family: inherit; padding: 4px; max-width: 200px;">
              <b style="font-size: 13px; color: #0f172a;">${branch.name}</b>
              <p style="font-size: 11px; color: #64748b; margin: 4px 0 6px;">${branch.address}</p>
              <div style="font-size: 11px; font-weight: bold; color: #10b981;">${branch.phone}</div>
            </div>
          `);

        marker.on('click', () => {
          setActiveBranch(branch);
        });

        markersRef.current.push({ id: branch.id, marker });
      });
    }

    return () => {
      // Clean up map on unmount if needed
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  const handleSelectBranch = (branch) => {
    setActiveBranch(branch);
    if (leafletMapRef.current) {
      leafletMapRef.current.flyTo([branch.lat, branch.lng], 14, { duration: 1.5 });
      const found = markersRef.current.find(m => m.id === branch.id);
      if (found) {
        found.marker.openPopup();
      }
    }
  };

  return (
    <div className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        
        {/* Branches Selection List */}
        <div className="p-6 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {t('map_select_branch')}
            </h3>
          </div>

          <div className="space-y-3">
            {branchLocations.map((branch) => {
              const isSelected = activeBranch.id === branch.id;
              return (
                <div
                  key={branch.id}
                  onClick={() => handleSelectBranch(branch)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500/40 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/70 dark:border-slate-800 hover:border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {branch.name}
                    </h4>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-amber-500 shrink-0">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {branch.rating}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-emerald-500" />
                      {branch.phone}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      {branch.hours.split(' ')[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Branch Highlight Card */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${activeBranch.lat},${activeBranch.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition shadow-md"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t('map_open_route')}</span>
            </a>
          </div>
        </div>

        {/* Map Canvas */}
        <div className="lg:col-span-2 relative min-h-[380px] sm:min-h-[480px]">
          <div 
            ref={mapContainerRef} 
            className="w-full h-full min-h-[380px] sm:min-h-[480px] z-0"
          />

          {/* Floating Branch Badge */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm glass-card p-4 rounded-2xl shadow-xl border border-white/40 dark:border-slate-700/50 z-10 pointer-events-none">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              Tanlangan Filial
            </span>
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">
              {activeBranch.name}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              {activeBranch.landmark}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {activeBranch.features.map((feat, idx) => (
                <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                  {feat}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
