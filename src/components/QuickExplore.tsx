import React, { useState, useEffect } from 'react';
import {
  Compass,
  Shuffle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Globe2,
  ExternalLink,
  MapPin,
  Building,
  Layers,
} from 'lucide-react';
import { SAMPLE_GLOBAL_ADDRESSES, SAMPLE_CATEGORIES, SampleAddress } from '../data/sampleAddresses';

interface QuickExploreProps {
  onSelect: (query: string) => void;
  isLoading?: boolean;
}

export const QuickExplore: React.FC<QuickExploreProps> = ({ onSelect, isLoading = false }) => {
  // State for show / hide
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    const saved = localStorage.getItem('globescan_quick_explore_visible');
    return saved !== null ? saved === 'true' : true;
  });

  // State for expanded full catalog
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  // Selected category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Currently displayed randomized batch (8 items)
  const [visibleItems, setVisibleItems] = useState<SampleAddress[]>([]);

  // Function to pick a random slice or shuffle
  const shuffleVisibleItems = (cat = selectedCategory) => {
    const pool = cat === 'all'
      ? [...SAMPLE_GLOBAL_ADDRESSES]
      : SAMPLE_GLOBAL_ADDRESSES.filter((item) => item.iconType === cat);

    // Fisher-Yates shuffle
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setVisibleItems(shuffled.slice(0, 8));
  };

  // Initial random selection
  useEffect(() => {
    shuffleVisibleItems(selectedCategory);
  }, [selectedCategory]);

  // Persist show/hide preference
  const toggleVisibility = () => {
    const next = !isVisible;
    setIsVisible(next);
    localStorage.setItem('globescan_quick_explore_visible', String(next));
  };

  // "Surprise Me" instant search: picks 1 random place and executes search immediately
  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * SAMPLE_GLOBAL_ADDRESSES.length);
    const randomPlace = SAMPLE_GLOBAL_ADDRESSES[randomIndex];
    onSelect(randomPlace.query);
  };

  return (
    <div id="quick-explore-container" className="w-full space-y-3 pt-1">
      {/* Header bar with controls */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            Quick Explore ({SAMPLE_GLOBAL_ADDRESSES.length} Curated Places)
          </span>

          {/* Easy Show / Hide Toggle Button */}
          <button
            id="toggle-quick-explore-btn"
            type="button"
            onClick={toggleVisibility}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            title={isVisible ? 'Hide Quick Explore recommendations' : 'Show Quick Explore recommendations'}
          >
            {isVisible ? (
              <>
                <EyeOff className="w-3 h-3 text-slate-400" />
                <span>Hide</span>
              </>
            ) : (
              <>
                <Eye className="w-3 h-3 text-blue-600" />
                <span>Show Places</span>
              </>
            )}
          </button>
        </div>

        {/* Action Controls: Shuffle & Surprise Me */}
        <div className="flex items-center gap-2">
          <button
            id="surprise-me-random-btn"
            type="button"
            onClick={handleSurpriseMe}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 hover:shadow-xs border border-blue-200 transition-all cursor-pointer disabled:opacity-50"
            title="Pick a completely random famous place from around the world and search it immediately"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Surprise Me</span>
          </button>

          {isVisible && (
            <>
              <button
                id="shuffle-places-btn"
                type="button"
                onClick={() => shuffleVisibleItems()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 hover:text-slate-900 border border-slate-200 transition-all cursor-pointer shadow-2xs"
                title="Shuffle and discover new interesting places"
              >
                <Shuffle className="w-3 h-3 text-slate-400" />
                <span>Shuffle</span>
              </button>

              <button
                id="expand-catalog-modal-btn"
                type="button"
                onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isCatalogOpen
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200 shadow-2xs'
                }`}
                title="Browse all 45+ places categorized"
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>{isCatalogOpen ? 'Close Catalog' : 'Browse All'}</span>
                {isCatalogOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Visible Content */}
      {isVisible && (
        <div className="space-y-3">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {SAMPLE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer border text-xs ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-slate-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Preset Pills */}
          <div className="flex items-center flex-wrap gap-2">
            {visibleItems.map((sample: SampleAddress) => (
              <button
                key={sample.label}
                id={`preset-btn-${sample.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                type="button"
                onClick={() => onSelect(sample.query)}
                className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:text-blue-600 hover:border-blue-300 border border-slate-200 transition-all cursor-pointer shadow-xs"
                title={`${sample.category} • ${sample.city}, ${sample.country}`}
              >
                <span className="text-sm">{sample.flag}</span>
                <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {sample.label}
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  ({sample.city})
                </span>
              </button>
            ))}
          </div>

          {/* Expanded Full Catalog Grid */}
          {isCatalogOpen && (
            <div
              id="full-sample-catalog-panel"
              className="mt-4 p-5 sm:p-6 bg-white rounded-[28px] border border-slate-200 shadow-lg space-y-4 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      Explore Global Address Catalog ({SAMPLE_GLOBAL_ADDRESSES.length} Locations)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Click any destination to run comprehensive address, zoning, tenant, and Google Maps verification.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCatalogOpen(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
              </div>

              {/* Grid of catalog cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
                {(selectedCategory === 'all'
                  ? SAMPLE_GLOBAL_ADDRESSES
                  : SAMPLE_GLOBAL_ADDRESSES.filter((item) => item.iconType === selectedCategory)
                ).map((item) => (
                  <div
                    key={item.label}
                    onClick={() => {
                      setIsCatalogOpen(false);
                      onSelect(item.query);
                    }}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-base">{item.flag}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                          {item.iconType}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {item.label}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {item.city}, {item.country}
                        </p>
                      </div>
                      {item.description && (
                        <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-blue-600">
                      <span>Click to verify</span>
                      <span className="text-xs">→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
