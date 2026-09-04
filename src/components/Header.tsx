import React from 'react';
import { MapPin, Navigation, Compass, Sparkles, ExternalLink } from 'lucide-react';

interface HeaderProps {
  onSelectSample?: (query: string) => void;
  activeQuery?: string;
  activePlaceTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ activeQuery, activePlaceTitle }) => {
  return (
    <nav className="h-20 border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 lg:px-10 shrink-0 shadow-xs">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200/80 shrink-0">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-slate-900">
                Address Search
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/70">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                Google Maps
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
              Search any address or place input and display it live in Google Maps
            </p>
          </div>
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {activeQuery && (
            <a
              id="header-google-maps-quick-link"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-white hover:shadow-sm border border-slate-200 transition-all group"
              title="Open current search on Google Maps"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span className="hidden md:inline">Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </a>
          )}

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="hidden sm:inline">Ready</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

