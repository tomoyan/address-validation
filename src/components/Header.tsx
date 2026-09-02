import React from 'react';
import { Globe, Navigation, Compass, Sparkles } from 'lucide-react';

interface HeaderProps {
  onSelectSample: (query: string) => void;
  activeQuery?: string;
}

export const Header: React.FC<HeaderProps> = ({ activeQuery }) => {
  return (
    <nav className="h-20 border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 lg:px-10 shrink-0 shadow-xs">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200/80 shrink-0">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-slate-800 italic">
                GlobeScan
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/70">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                Company Address Verifier
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
              Official company address validation & bilingual registry intelligence
            </p>
          </div>
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {activeQuery && (
            <a
              id="header-google-maps-quick-link"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-white hover:shadow-md border border-slate-200 transition-all group"
              title="Open current search on Google Maps"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span className="hidden md:inline">Open in Maps</span>
            </a>
          )}

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 border border-slate-200 flex items-center justify-center text-blue-600 font-bold text-xs shadow-xs">
              AI
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

