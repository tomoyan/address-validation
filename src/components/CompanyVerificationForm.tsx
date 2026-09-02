import React, { useState, useEffect, useRef } from 'react';
import { Building2, MapPin, Search, CheckCircle2, AlertCircle, X, Sparkles, Navigation, Globe2, ArrowRight, RotateCcw } from 'lucide-react';
import { AddressSuggestion, SampleVerificationCase } from '../types';
import { SAMPLE_VERIFICATION_CASES } from '../data/sampleVerificationCases';

interface CompanyVerificationFormProps {
  onVerify: (companyName: string, companyAddress: string, suggestion?: AddressSuggestion) => void;
  isLoading: boolean;
  initialCompany?: string;
  initialAddress?: string;
}

export const CompanyVerificationForm: React.FC<CompanyVerificationFormProps> = ({
  onVerify,
  isLoading,
  initialCompany = '',
  initialAddress = '',
}) => {
  const [companyName, setCompanyName] = useState(initialCompany);
  const [companyAddress, setCompanyAddress] = useState(initialAddress);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSamplesModal, setShowSamplesModal] = useState(false);

  const addressContainerRef = useRef<HTMLDivElement>(null);
  const companyNameInputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const prevCompanyProp = useRef(initialCompany);
  useEffect(() => {
    if (initialCompany !== prevCompanyProp.current) {
      prevCompanyProp.current = initialCompany;
      setCompanyName(initialCompany);
    }
  }, [initialCompany]);

  const prevAddressProp = useRef(initialAddress);
  useEffect(() => {
    if (initialAddress !== prevAddressProp.current) {
      prevAddressProp.current = initialAddress;
      setCompanyAddress(initialAddress);
    }
  }, [initialAddress]);

  // Click outside to dismiss address autocomplete
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addressContainerRef.current && !addressContainerRef.current.contains(event.target as Node)) {
        setIsAddressOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced address geocoding suggestions
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCompanyAddress(value);
    setSelectedIndex(-1);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (value.trim().length < 3) {
      setSuggestions([]);
      setIsAddressOpen(false);
      return;
    }

    setIsGeocoding(true);
    debounceTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(value.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.results || []);
          setIsAddressOpen((data.results || []).length > 0);
        }
      } catch (err) {
        console.warn('Geocoding suggestions error:', err);
      } finally {
        setIsGeocoding(false);
      }
    }, 250);
  };

  const handleSelectSuggestion = (s: AddressSuggestion) => {
    setCompanyAddress(s.displayName);
    setIsAddressOpen(false);
    if (companyName.trim()) {
      onVerify(companyName.trim(), s.displayName, s);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !companyAddress.trim() || isLoading) return;

    setIsAddressOpen(false);
    onVerify(companyName.trim(), companyAddress.trim());
  };

  const handleSelectSample = (sample: SampleVerificationCase) => {
    setCompanyName(sample.companyName);
    setCompanyAddress(sample.companyAddress);
    setIsAddressOpen(false);
    setShowSamplesModal(false);
    onVerify(sample.companyName, sample.companyAddress);
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    target.select();
    setTimeout(() => {
      if (document.activeElement === target) {
        target.select();
      }
    }, 15);
  };

  const handleClearFields = () => {
    setCompanyName('');
    setCompanyAddress('');
    setSuggestions([]);
    setIsAddressOpen(false);
    // Clear field values and immediately put focus on the company name
    setTimeout(() => {
      companyNameInputRef.current?.focus();
    }, 10);
  };

  return (
    <div className="w-full space-y-4">
      {/* Dual-Field Verification Card */}
      <div className="bg-white rounded-[28px] border border-slate-200/90 shadow-lg shadow-slate-200/40 p-5 sm:p-7 relative transition-all">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Header instructions & badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
                <Building2 className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  Business Address Verification
                </h2>
                <p className="text-xs text-slate-500">
                  Cross-reference company records and verify physical business address authenticity bilingually.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                <Globe2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Bilingual Analysis (Local + English)</span>
              </span>
            </div>
          </div>

          {/* 2 Input Fields Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* Field 1: Company Name */}
            <div className="lg:col-span-5 space-y-1.5">
              <label htmlFor="company-name-input" className="block text-xs font-bold text-slate-700 tracking-wide uppercase">
                1. Company Name
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 pointer-events-none text-slate-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <input
                  ref={companyNameInputRef}
                  id="company-name-input"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  onFocus={handleInputFocus}
                  placeholder="e.g. Whole Foods Market, Nintendo, Apple"
                  required
                  className="w-full pl-10 pr-9 py-3 text-sm font-medium bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 selection:bg-blue-600 selection:text-white transition-all outline-none"
                />
                {companyName && (
                  <button
                    type="button"
                    onClick={() => {
                      setCompanyName('');
                      companyNameInputRef.current?.focus();
                    }}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                    title="Clear company name"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Field 2: Company Address (with Autocomplete) */}
            <div ref={addressContainerRef} className="lg:col-span-4 space-y-1.5 relative">
              <label htmlFor="company-address-input" className="block text-xs font-bold text-slate-700 tracking-wide uppercase">
                2. Company Address
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  id="company-address-input"
                  type="text"
                  value={companyAddress}
                  onChange={handleAddressChange}
                  onFocus={(e) => {
                    handleInputFocus(e);
                    if (suggestions.length > 0) setIsAddressOpen(true);
                  }}
                  placeholder="e.g. 1690 S Bascom Ave, Campbell, CA 95008"
                  required
                  className="w-full pl-10 pr-9 py-3 text-sm font-medium bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 selection:bg-blue-600 selection:text-white transition-all outline-none"
                />
                {isGeocoding ? (
                  <div className="absolute right-3 text-blue-500 animate-spin">
                    <span className="w-3.5 h-3.5 block border-2 border-blue-500 border-t-transparent rounded-full" />
                  </div>
                ) : companyAddress ? (
                  <button
                    type="button"
                    onClick={() => {
                      setCompanyAddress('');
                      setSuggestions([]);
                    }}
                    className="absolute right-3 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                    title="Clear address"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : null}
              </div>

              {/* Autocomplete Dropdown */}
              {isAddressOpen && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden max-h-64 overflow-y-auto">
                  <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Suggested Global Addresses
                  </div>
                  {suggestions.map((s, idx) => (
                    <button
                      key={`${s.placeId}-${idx}`}
                      type="button"
                      onClick={() => handleSelectSuggestion(s)}
                      className={`w-full px-3.5 py-2.5 text-left text-xs flex items-start gap-2.5 transition-colors cursor-pointer ${
                        idx === selectedIndex ? 'bg-blue-50 text-blue-900' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-2 leading-relaxed font-medium">{s.displayName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons: Verify Address & Clear */}
            <div className="lg:col-span-3 pt-0 lg:pt-[22px] flex items-center gap-2">
              <button
                id="verify-address-button"
                type="submit"
                disabled={isLoading || !companyName.trim() || !companyAddress.trim()}
                className="flex-1 h-11 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Verify Address</span>
                  </>
                )}
              </button>

              <button
                id="clear-fields-button"
                type="button"
                onClick={handleClearFields}
                disabled={isLoading || (!companyName && !companyAddress)}
                className="h-11 px-3 sm:px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-700 hover:text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-slate-200/90 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer whitespace-nowrap shrink-0"
                title="Clear field values and focus Company Name"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </form>

        {/* Quick Presets & Test Scenarios Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 font-semibold text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Try 1-Click Verification Cases:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {SAMPLE_VERIFICATION_CASES.slice(0, 4).map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium text-[11px] border border-slate-200/80 hover:border-blue-200 transition-all flex items-center gap-1.5 cursor-pointer"
                title={`${sample.companyName} at ${sample.companyAddress}`}
              >
                <span>{sample.flag}</span>
                <span className="font-semibold">{sample.companyName}</span>
                <span className="text-slate-400 hidden md:inline">({sample.language.split(' ')[0]})</span>
              </button>
            ))}

            <button
              type="button"
              onClick={() => setShowSamplesModal(true)}
              className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-200 hover:bg-blue-100 transition-all cursor-pointer flex items-center gap-1"
            >
              <span>More Cases...</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Sample Cases Modal */}
      {showSamplesModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Select a Real-World Company & Address Scenario
                </h3>
                <p className="text-xs text-slate-500">
                  Explore verified headquarters, retail branches, and bilingual responses across languages.
                </p>
              </div>
              <button
                onClick={() => setShowSamplesModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2.5 divide-y divide-slate-100">
              {SAMPLE_VERIFICATION_CASES.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleSelectSample(item)}
                  className="pt-2.5 first:pt-0 p-3 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.flag}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700">
                        {item.companyName}
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                        {item.language}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.expectedStatus === 'VERIFIED_OFFICIAL_ADDRESS'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : item.expectedStatus === 'VERIFIED_BRANCH_LOCATION'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {item.expectedStatus === 'VERIFIED_OFFICIAL_ADDRESS'
                        ? 'Official HQ'
                        : item.expectedStatus === 'VERIFIED_BRANCH_LOCATION'
                        ? 'Retail Store / Branch'
                        : 'Mismatch Test'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-mono mt-1 line-clamp-1">
                    {item.companyAddress}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 italic">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
