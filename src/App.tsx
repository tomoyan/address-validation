/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  MapPin,
  Compass,
  AlertCircle,
  Sparkles,
  Building2,
  ExternalLink,
  ShieldCheck,
  Globe2,
  Languages
} from 'lucide-react';
import { Header } from './components/Header';
import { CompanyVerificationForm } from './components/CompanyVerificationForm';
import { VerificationResultCard } from './components/VerificationResultCard';
import { BusinessDirectory } from './components/BusinessDirectory';
import { PropertyProfile } from './components/PropertyProfile';
import { AddressComponentsBreakdown } from './components/AddressComponentsBreakdown';
import { MapPreview } from './components/MapPreview';
import { VerificationHistory } from './components/VerificationHistory';
import {
  CompanyVerificationReport,
  AddressSuggestion,
  VerificationHistoryItem
} from './types';

const INITIAL_DEFAULT_COMPANY = 'Whole Foods Market';
const INITIAL_DEFAULT_ADDRESS = '1690 S Bascom Ave, Campbell, CA 95008';
const VERIFICATION_HISTORY_KEY = 'company_address_verification_history_v1';

export default function App() {
  const [report, setReport] = useState<CompanyVerificationReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string>(INITIAL_DEFAULT_COMPANY);
  const [companyAddress, setCompanyAddress] = useState<string>(INITIAL_DEFAULT_ADDRESS);
  const [history, setHistory] = useState<VerificationHistoryItem[]>([]);

  // Load history on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(VERIFICATION_HISTORY_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to parse verification history:', e);
    }
  }, []);

  const saveToHistory = (newReport: CompanyVerificationReport) => {
    const item: VerificationHistoryItem = {
      id: `verif-${Date.now()}`,
      companyName: newReport.companyName,
      companyAddress: newReport.inputAddress,
      verificationStatus: newReport.verificationStatus,
      confidenceScore: newReport.confidenceScore,
      localLanguage: newReport.localLanguage.name,
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      const filtered = prev.filter(
        (h) =>
          h.companyName.toLowerCase() !== item.companyName.toLowerCase() ||
          h.companyAddress.toLowerCase() !== item.companyAddress.toLowerCase()
      );
      const updated = [item, ...filtered].slice(0, 10);
      try {
        localStorage.setItem(VERIFICATION_HISTORY_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save verification history:', e);
      }
      return updated;
    });
  };

  // Perform Company Address Verification
  const handleVerify = useCallback(
    async (targetCompany: string, targetAddress: string, suggestion?: AddressSuggestion) => {
      if (!targetCompany.trim() || !targetAddress.trim()) return;

      setIsLoading(true);
      setError(null);
      setCompanyName(targetCompany);
      setCompanyAddress(targetAddress);

      try {
        let lat = suggestion?.lat || 0;
        let lng = suggestion?.lng || 0;
        let displayName = suggestion?.displayName || targetAddress;

        // If coordinates not already supplied from suggestion, attempt geocoding
        if (!lat || !lng) {
          try {
            const geoRes = await fetch(`/api/geocode?q=${encodeURIComponent(targetAddress)}`);
            if (geoRes.ok) {
              const geoData = await geoRes.json();
              if (geoData.results && geoData.results.length > 0) {
                const top = geoData.results[0];
                lat = top.lat;
                lng = top.lng;
                displayName = top.displayName || targetAddress;
              }
            }
          } catch (geoErr) {
            console.warn('Geocoding lookup warning:', geoErr);
          }
        }

        // Call server-side Company Address Verification API
        const res = await fetch('/api/verify-company-address', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyName: targetCompany,
            companyAddress: targetAddress,
            displayName,
            lat,
            lng,
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to verify company address');
        }

        const data: CompanyVerificationReport = await res.json();
        setReport(data);
        saveToHistory(data);
      } catch (err: any) {
        console.error('Verification error:', err);
        setError(err.message || 'An error occurred while verifying the company address.');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Initial load: verify default company & address
  useEffect(() => {
    handleVerify(INITIAL_DEFAULT_COMPANY, INITIAL_DEFAULT_ADDRESS);
  }, [handleVerify]);

  const handleSelectHistoryItem = (item: VerificationHistoryItem) => {
    setCompanyName(item.companyName);
    setCompanyAddress(item.companyAddress);
    handleVerify(item.companyName, item.companyAddress);
  };

  const handleRemoveHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory((prev) => {
      const updated = prev.filter((h) => h.id !== id);
      try {
        localStorage.setItem(VERIFICATION_HISTORY_KEY, JSON.stringify(updated));
      } catch (err) {}
      return updated;
    });
  };

  const handleClearAllHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(VERIFICATION_HISTORY_KEY);
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col text-[#0f172a] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* App Header */}
      <Header
        onSelectSample={(query) => handleVerify('Commercial Enterprise', query)}
        activeQuery={
          report
            ? `${report.companyName}, ${report.addressDetails?.formattedAddress || report.inputAddress}`
            : `${companyName}, ${companyAddress}`
        }
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Verification Form Section */}
        <section className="space-y-4">
          <CompanyVerificationForm
            onVerify={handleVerify}
            isLoading={isLoading}
            initialCompany={companyName}
            initialAddress={companyAddress}
          />
        </section>

        {/* Error Notification */}
        {error && (
          <div
            id="error-alert-banner"
            className="p-5 rounded-[24px] bg-rose-50 border border-rose-200 text-rose-800 flex items-start justify-between gap-3 text-sm shadow-xs"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Verification could not be completed</p>
                <p className="text-xs text-rose-600 mt-0.5">{error}</p>
              </div>
            </div>
            <button
              onClick={() => handleVerify(companyName, companyAddress)}
              className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div
            id="loading-skeleton-container"
            className="bg-white rounded-[32px] border border-slate-200 p-8 sm:p-14 text-center space-y-5 shadow-sm max-w-2xl mx-auto"
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-md shadow-blue-200/50">
              <Compass className="w-7 h-7 animate-spin" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Verifying Business Address Authenticity...
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Checking commercial registries, verifying active physical presence, and generating bilingual local language analysis.
              </p>
            </div>
            <div className="w-48 h-1.5 bg-slate-100 rounded-full mx-auto overflow-hidden">
              <div className="w-full h-full bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}

        {/* Verification Results Presentation */}
        {!isLoading && report && (
          <div className="space-y-8">
            {/* Primary Bilingual Verification Dossier */}
            <VerificationResultCard report={report} />

            {/* Split Layout: Business Breakdown (Left/Main) & Map Preview/History (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Left 2 Columns: Business Directory & Property Insights */}
              <div className="lg:col-span-2 space-y-8">
                {/* Detailed Business Directory at Address */}
                <BusinessDirectory
                  businesses={report.businesses}
                  address={report.addressDetails.formattedAddress}
                />

                {/* Property & Zoning Profile */}
                <PropertyProfile
                  property={report.propertyBreakdown}
                  highlights={report.commercialHighlights}
                />

                {/* Structured Address Breakdown */}
                <AddressComponentsBreakdown
                  details={report.addressDetails}
                  googleMapsUrl={report.googleMapsUrl}
                />
              </div>

              {/* Right 1 Column: Interactive Map Preview & Navigation Tools */}
              <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
                {/* Map Preview with Google Maps Link & Coordinates */}
                <MapPreview report={report} />

                {/* Verification History */}
                <VerificationHistory
                  history={history}
                  onSelect={handleSelectHistoryItem}
                  onRemove={handleRemoveHistoryItem}
                  onClearAll={handleClearAllHistory}
                />

                {/* Bilingual Intelligence Explainer Card */}
                <div className="p-5 rounded-[24px] bg-white border border-slate-200/90 shadow-xs text-xs text-slate-700 space-y-2.5">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Globe2 className="w-4 h-4 text-blue-600" />
                    <span>How Address Verification Works</span>
                  </div>
                  <p className="text-slate-500 leading-relaxed text-[11.5px]">
                    The engine cross-references official global company registration databases, zoning ordinances, and real-time physical store directory markers.
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-[11px] text-blue-700 font-semibold">
                    <Languages className="w-3.5 h-3.5" />
                    <span>Results presented in English & Local Official Language.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            <span>GlobeScan Intelligence</span>
            <span>•</span>
            <span>Corporate Address Verification</span>
            <span>•</span>
            <span>Bilingual Reports</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold text-slate-500">
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 flex items-center gap-1.5 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Google Maps</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
