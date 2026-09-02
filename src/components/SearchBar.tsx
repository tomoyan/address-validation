import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2, Navigation, ExternalLink } from 'lucide-react';
import { AddressSuggestion } from '../types';
import { QuickExplore } from './QuickExplore';

interface SearchBarProps {
  onSearch: (query: string, suggestion?: AddressSuggestion) => void;
  isLoading: boolean;
  initialQuery?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLocating, setIsLocating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (initialQuery && initialQuery !== query) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  // Click outside listener to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions with debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (value.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setIsGeocoding(true);
    debounceTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(value.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.results || []);
          setIsOpen((data.results || []).length > 0);
        }
      } catch (err) {
        console.error('Failed to fetch suggestions:', err);
      } finally {
        setIsGeocoding(false);
      }
    }, 280);
  };

  const handleSelectSuggestion = (s: AddressSuggestion) => {
    setQuery(s.displayName);
    setIsOpen(false);
    onSearch(s.displayName, s);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleSelectSuggestion(suggestions[selectedIndex]);
    } else {
      setIsOpen(false);
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          // Reverse geocode
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`, {
            headers: { 'User-Agent': 'GlobalAddressSearch/1.0' },
          });
          if (res.ok) {
            const data = await res.json();
            const addr = data.display_name || `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
            setQuery(addr);
            onSearch(addr, {
              placeId: data.place_id || 'curr-loc',
              displayName: addr,
              lat: latitude,
              lng: longitude,
              addressComponents: {
                city: data.address?.city || data.address?.town,
                country: data.address?.country,
                postcode: data.address?.postcode,
                road: data.address?.road,
                houseNumber: data.address?.house_number,
              },
            });
          }
        } catch (err) {
          const fallbackQuery = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
          setQuery(fallbackQuery);
          onSearch(fallbackQuery);
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

  const openInGoogleMapsDirectly = (e: React.MouseEvent) => {
    e.stopPropagation();
    const searchTarget = query.trim() || 'Global';
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchTarget)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3" ref={containerRef}>
      {/* Search Input Container */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center bg-white rounded-2xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 shadow-sm transition-all h-16">
          {/* Leading Icon */}
          <div className="pl-5 pr-2 text-slate-400 flex items-center shrink-0">
            {isGeocoding ? (
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            ) : (
              <MapPin className="w-5 h-5 text-slate-400" />
            )}
          </div>

          {/* Text Input */}
          <input
            id="global-address-search-input"
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={(e) => {
              const target = e.currentTarget;
              target.select();
              setTimeout(() => {
                if (document.activeElement === target) {
                  target.select();
                }
              }, 15);
              if (suggestions.length > 0) setIsOpen(true);
            }}
            placeholder="Search any global address, building, or landmark..."
            className="w-full h-full py-2 text-base sm:text-lg text-slate-700 placeholder:text-slate-400 bg-transparent outline-none border-none pr-3 selection:bg-blue-600 selection:text-white"
            autoComplete="off"
          />

          {/* Action Icons inside input */}
          <div className="flex items-center gap-2 pr-2 shrink-0">
            {query && (
              <button
                id="clear-search-btn"
                type="button"
                onClick={handleClear}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Quick Google Maps Button */}
            {query.trim() && (
              <button
                id="searchbar-google-maps-btn"
                type="button"
                onClick={openInGoogleMapsDirectly}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all"
                title="Click to open this exact address on Google Maps"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Maps</span>
              </button>
            )}

            {/* Geolocation Button */}
            <button
              id="locate-me-btn"
              type="button"
              onClick={handleGeolocation}
              disabled={isLocating}
              className="p-2.5 text-slate-400 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-50"
              title="Use current location"
            >
              {isLocating ? (
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              ) : (
                <Navigation className="w-4 h-4" />
              )}
            </button>

            {/* Submit Button */}
            <button
              id="submit-address-search-btn"
              type="submit"
              disabled={isLoading || !query.trim()}
              className="h-12 px-6 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="hidden sm:inline">Analyzing...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Autocomplete Dropdown */}
        {isOpen && suggestions.length > 0 && (
          <div
            id="autocomplete-dropdown-list"
            className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 divide-y divide-slate-100 max-h-80 overflow-y-auto"
          >
            <div className="px-4 py-2.5 bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
              <span>Suggested Locations</span>
              <span className="text-[10px] font-normal text-slate-400">Click to load full breakdown</span>
            </div>

            {suggestions.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.placeId || index}
                  onClick={() => handleSelectSuggestion(item)}
                  className={`px-5 py-3.5 cursor-pointer flex items-start justify-between gap-3 transition-colors ${
                    isSelected ? 'bg-blue-50/80 text-blue-900' : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {item.displayName}
                      </p>
                      {item.addressComponents?.country && (
                        <p className="text-xs text-slate-400 mt-0.5">
                          {[item.addressComponents.city, item.addressComponents.state, item.addressComponents.country]
                            .filter(Boolean)
                            .join(' • ')}
                        </p>
                      )}
                    </div>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.displayName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-200/60 transition-colors"
                    title="Open directly in Google Maps"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </form>

      {/* Dynamic & Toggleable Quick Explore Component with Randomizer */}
      <QuickExplore onSelect={(sampleQuery) => onSearch(sampleQuery)} isLoading={isLoading} />
    </div>
  );
};
