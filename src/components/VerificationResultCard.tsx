import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Building2,
  MapPin,
  ExternalLink,
  Navigation,
  Globe2,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Copy,
  Check,
  Languages,
  Store,
  Info,
  Building,
  Compass
} from 'lucide-react';
import { CompanyVerificationReport } from '../types';
import { RegisteredAgentSection } from './RegisteredAgentSection';

interface VerificationResultCardProps {
  report: CompanyVerificationReport;
}

type ViewMode = 'bilingual' | 'local' | 'english';

export const VerificationResultCard: React.FC<VerificationResultCardProps> = ({ report }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('bilingual');
  const [copied, setCopied] = useState(false);

  const {
    companyName,
    inputAddress,
    verificationStatus,
    verdictTitle,
    verdictSummary,
    confidenceScore,
    matchType,
    isRealBusinessAddress,
    locationType,
    localLanguage,
    bilingualData,
    addressDetails,
    googleMapsUrl,
    googleMapsDirectionsUrl,
    googleStreetViewUrl,
  } = report;

  const isHQ = verificationStatus === 'VERIFIED_OFFICIAL_ADDRESS';
  const isBranch = verificationStatus === 'VERIFIED_BRANCH_LOCATION';
  const isMismatch = verificationStatus === 'MISMATCH_UNVERIFIED';
  const isPartial = verificationStatus === 'PARTIAL_MATCH';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(bilingualData.formattedAddressEnglish || inputAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Status Styling Archetypes
  const statusBadge = isHQ ? (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/80 font-bold text-xs">
      <ShieldCheck className="w-4 h-4 text-emerald-600" />
      <span>VERIFIED REAL BUSINESS ADDRESS • OFFICIAL HEADQUARTERS</span>
    </div>
  ) : isBranch ? (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300/80 font-bold text-xs">
      <Store className="w-4 h-4 text-blue-600" />
      <span>VERIFIED REAL BUSINESS ADDRESS • OPERATING BRANCH / STORE</span>
    </div>
  ) : isPartial ? (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300/80 font-bold text-xs">
      <AlertTriangle className="w-4 h-4 text-amber-600" />
      <span>PARTIAL MATCH • AFFILIATE OR REGISTERED AGENT</span>
    </div>
  ) : (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300/80 font-bold text-xs">
      <ShieldAlert className="w-4 h-4 text-rose-600" />
      <span>UNVERIFIED ADDRESS • BUSINESS ADDRESS MISMATCH</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Main Verification Dossier Card */}
      <div
        id="company-verification-dossier"
        className={`bg-white rounded-[32px] border shadow-md p-6 sm:p-8 space-y-6 transition-all ${
          isMismatch
            ? 'border-rose-200/90 shadow-rose-100/40'
            : isHQ || isBranch
            ? 'border-emerald-200/80 shadow-emerald-100/30'
            : 'border-amber-200/90 shadow-amber-100/30'
        }`}
      >
        {/* Top Header: Verdict & Confidence Score */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            {statusBadge}
            <div className="flex items-center gap-2 pt-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {companyName}
              </h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {locationType}
              </span>
            </div>

            {/* Top Physical Address with Google Maps link */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                Physical Address:
              </span>
              <a
                id="header-physical-address-maps-link"
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-900 underline decoration-blue-300 hover:decoration-blue-600 transition-colors"
                title="View physical address on Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="break-words font-mono text-[11.5px] sm:text-xs">
                  {bilingualData.formattedAddressEnglish || inputAddress}
                </span>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200/80 shrink-0 ml-1">
                  <span>Google Maps</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </a>
            </div>
          </div>

          {/* Confidence Meter & Language Badge */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200/80">
              <div className="text-right">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Verification Score
                </div>
                <div className="text-lg font-black text-slate-900 leading-none">
                  {confidenceScore}%
                </div>
              </div>
              <div
                className={`w-3.5 h-3.5 rounded-full ${
                  confidenceScore >= 90
                    ? 'bg-emerald-500 ring-4 ring-emerald-100'
                    : confidenceScore >= 70
                    ? 'bg-amber-500 ring-4 ring-amber-100'
                    : 'bg-rose-500 ring-4 ring-rose-100'
                }`}
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Globe2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Local Language:</span>
              <strong className="text-slate-800">{localLanguage.name}</strong>
            </div>
          </div>
        </div>

        {/* Verdict Summary Box in Local Language & English */}
        <div
          className={`rounded-2xl p-5 border ${
            isMismatch
              ? 'bg-rose-50/60 border-rose-200 text-rose-900'
              : isHQ || isBranch
              ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950'
              : 'bg-amber-50/50 border-amber-200 text-amber-950'
          }`}
        >
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-white shadow-xs shrink-0 mt-0.5">
              {isMismatch ? (
                <ShieldAlert className="w-5 h-5 text-rose-600" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              )}
            </div>

            <div className="space-y-2 flex-1">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {verdictTitle.english}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {verdictSummary.english}
              </p>

              {/* Local Language Translation of Verdict */}
              {localLanguage.code !== 'en-US' && (
                <div className="pt-2 mt-2 border-t border-slate-200/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-800 uppercase tracking-wider">
                    <Languages className="w-3.5 h-3.5" />
                    <span>{localLanguage.nativeName} Official Verdict</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 italic leading-relaxed">
                    "{verdictSummary.local}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* View Mode Switcher: Bilingual / Local / English */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-700">Display Language Mode:</span>
          </div>

          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setViewMode('bilingual')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'bilingual'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🔀 Bilingual Side-by-Side
            </button>
            <button
              onClick={() => setViewMode('local')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'local'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🌐 {localLanguage.nativeName} First
            </button>
            <button
              onClick={() => setViewMode('english')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'english'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇺🇸 English Standard
            </button>
          </div>
        </div>

        {/* Bilingual Comparison Matrix */}
        <div className="space-y-4">
          {/* View Mode: Bilingual Side-by-Side */}
          {viewMode === 'bilingual' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column: English Version */}
              <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-700 uppercase tracking-wide">
                    <span>🇺🇸 Standard English Analysis</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white font-semibold text-slate-500 border border-slate-200">
                    International
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block text-[10px] uppercase">
                      Company Legal Entity Name
                    </span>
                    <span className="font-bold text-slate-900 text-sm">
                      {bilingualData.companyNameEnglish}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-400 font-medium block text-[10px] uppercase">
                        Physical Address (English Format)
                      </span>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          bilingualData.formattedAddressEnglish || inputAddress
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline"
                        title="Open Physical Address in Google Maps"
                      >
                        <span>Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        bilingualData.formattedAddressEnglish || inputAddress
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2 p-2.5 rounded-xl bg-white hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer"
                      title="Open physical address on Google Maps"
                    >
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-slate-800 group-hover:text-blue-700 leading-relaxed font-mono text-xs flex-1 underline decoration-slate-300 group-hover:decoration-blue-500 underline-offset-2">
                        {bilingualData.formattedAddressEnglish}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
                    </a>
                  </div>

                  <div>
                    <span className="text-slate-400 font-medium block text-[10px] uppercase">
                      Operational Role / Relationship
                    </span>
                    <span className="text-slate-700 leading-relaxed">
                      {bilingualData.relationshipToCompanyEnglish}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-slate-400 font-medium block text-[10px] uppercase">
                        Industry / Category
                      </span>
                      <span className="font-semibold text-slate-800">
                        {bilingualData.businessCategoryEnglish}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block text-[10px] uppercase">
                        Operating Status
                      </span>
                      <span className="font-semibold text-slate-800">
                        {bilingualData.operatingStatusEnglish}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/70">
                    <span className="text-slate-400 font-medium block text-[10px] uppercase">
                      Commercial & Corporate Registry Notes
                    </span>
                    <p className="text-slate-600 text-[11px] leading-relaxed mt-0.5">
                      {bilingualData.officialRegistryNotesEnglish}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Local Language Version */}
              <div className="bg-blue-50/40 rounded-2xl p-5 border border-blue-200/70 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-blue-200/70">
                  <div className="flex items-center gap-2 font-bold text-xs text-blue-950 uppercase tracking-wide">
                    <span>🌐 {localLanguage.name} Analysis</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white font-semibold text-blue-700 border border-blue-200">
                    {localLanguage.country}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-blue-500 font-medium block text-[10px] uppercase">
                      現地登記商号 / Legal Entity (Local)
                    </span>
                    <span className="font-bold text-slate-900 text-sm">
                      {bilingualData.companyNameLocal}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-blue-500 font-medium block text-[10px] uppercase">
                        現地公認表記住所 / Domestic Address Convention
                      </span>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          bilingualData.formattedAddressLocal || bilingualData.formattedAddressEnglish || inputAddress
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 hover:underline"
                        title="Open Physical Address in Google Maps"
                      >
                        <span>Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        bilingualData.formattedAddressLocal || bilingualData.formattedAddressEnglish || inputAddress
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2 p-2.5 rounded-xl bg-white hover:bg-blue-100/40 border border-blue-200/80 hover:border-blue-300 transition-all cursor-pointer"
                      title="Open physical address on Google Maps"
                    >
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-slate-800 group-hover:text-blue-800 leading-relaxed font-mono text-xs flex-1 underline decoration-blue-200 group-hover:decoration-blue-600 underline-offset-2">
                        {bilingualData.formattedAddressLocal}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
                    </a>
                  </div>

                  <div>
                    <span className="text-blue-500 font-medium block text-[10px] uppercase">
                      拠点区分・企業との関係性 / Relationship to Company
                    </span>
                    <span className="text-slate-700 leading-relaxed font-medium">
                      {bilingualData.relationshipToCompanyLocal}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-blue-500 font-medium block text-[10px] uppercase">
                        業種・営業分類 / Category
                      </span>
                      <span className="font-semibold text-slate-800">
                        {bilingualData.businessCategoryLocal}
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-500 font-medium block text-[10px] uppercase">
                        稼働状態 / Status
                      </span>
                      <span className="font-semibold text-slate-800">
                        {bilingualData.operatingStatusLocal}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-blue-200/70">
                    <span className="text-blue-500 font-medium block text-[10px] uppercase">
                      公的商業登記・許認可情報 / Official Registry
                    </span>
                    <p className="text-slate-700 text-[11px] leading-relaxed mt-0.5">
                      {bilingualData.officialRegistryNotesLocal}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* View Mode: Local Language Only */}
          {viewMode === 'local' && (
            <div className="bg-blue-50/40 rounded-2xl p-6 border border-blue-200/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-blue-700" />
                  <span className="font-bold text-sm text-blue-950">
                    {localLanguage.name} Domestic Verification Record
                  </span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold">
                  Official Domestic Convention
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-4">
                  <div>
                    <span className="text-blue-500 font-bold uppercase text-[10px]">
                      正式企業名 / Registered Legal Name
                    </span>
                    <p className="text-base font-extrabold text-slate-900 mt-0.5">
                      {bilingualData.companyNameLocal}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-blue-500 font-bold uppercase text-[10px]">
                        国内規格住所 / Domestic Formatted Address
                      </span>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          bilingualData.formattedAddressLocal || inputAddress
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 hover:underline"
                        title="Open in Google Maps"
                      >
                        <span>Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        bilingualData.formattedAddressLocal || inputAddress
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2 p-2.5 rounded-xl bg-white hover:bg-blue-100/40 border border-blue-200/80 hover:border-blue-300 transition-all cursor-pointer mt-0.5"
                    >
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-800 font-mono flex-1 underline decoration-blue-200 group-hover:decoration-blue-600 underline-offset-2">
                        {bilingualData.formattedAddressLocal}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
                    </a>
                  </div>

                  <div>
                    <span className="text-blue-500 font-bold uppercase text-[10px]">
                      業種・取扱事業 / Industry
                    </span>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">
                      {bilingualData.businessCategoryLocal}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-blue-500 font-bold uppercase text-[10px]">
                      拠点役割・企業における位置づけ / Location Role
                    </span>
                    <p className="text-xs font-medium text-slate-800 leading-relaxed mt-0.5">
                      {bilingualData.relationshipToCompanyLocal}
                    </p>
                  </div>

                  <div>
                    <span className="text-blue-500 font-bold uppercase text-[10px]">
                      商業登記・管轄機関認可状況 / Official Registry Evidence
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed mt-0.5">
                      {bilingualData.officialRegistryNotesLocal}
                    </p>
                  </div>

                  <div>
                    <span className="text-blue-500 font-bold uppercase text-[10px]">
                      営業稼働ステータス / Operating Status
                    </span>
                    <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                      {bilingualData.operatingStatusLocal}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* View Mode: English Standard Only */}
          {viewMode === 'english' && (
            <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-700" />
                  <span className="font-bold text-sm text-slate-900">
                    Standardized International English Verification Record
                  </span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-200 text-slate-800 font-semibold">
                  English Standard
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-4">
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px]">
                      Company Legal Name
                    </span>
                    <p className="text-base font-extrabold text-slate-900 mt-0.5">
                      {bilingualData.companyNameEnglish}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">
                        Physical Address (English Format)
                      </span>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          bilingualData.formattedAddressEnglish || inputAddress
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline"
                        title="Open in Google Maps"
                      >
                        <span>Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        bilingualData.formattedAddressEnglish || inputAddress
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2 p-2.5 rounded-xl bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer mt-0.5"
                      title="Open physical address on Google Maps"
                    >
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 font-mono flex-1 underline decoration-slate-300 group-hover:decoration-blue-500 underline-offset-2">
                        {bilingualData.formattedAddressEnglish}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
                    </a>
                  </div>

                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px]">
                      Industry Classification
                    </span>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">
                      {bilingualData.businessCategoryEnglish}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px]">
                      Operational Relationship to Company
                    </span>
                    <p className="text-xs font-medium text-slate-800 leading-relaxed mt-0.5">
                      {bilingualData.relationshipToCompanyEnglish}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px]">
                      Regulatory & Commercial Register Records
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed mt-0.5">
                      {bilingualData.officialRegistryNotesEnglish}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px]">
                      Operating Status
                    </span>
                    <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                      {bilingualData.operatingStatusEnglish}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Key Verification Findings (Bilingual Cards) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Verification Findings & Evidence (Bilingual)</span>
            </h4>
            <span className="text-[11px] text-slate-400">
              {bilingualData.keyFindings.length} verified checkpoints
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {bilingualData.keyFindings.map((finding, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                  finding.isPositive
                    ? 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-50'
                    : 'bg-rose-50/50 border-rose-200'
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                    finding.isPositive
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {finding.isPositive ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5" />
                  )}
                </div>

                <div className="space-y-1.5 text-xs flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-slate-900">
                      {finding.titleEnglish}
                    </span>
                    <span className="text-[10px] font-semibold text-blue-600 italic">
                      {finding.titleLocal}
                    </span>
                  </div>

                  <p className="text-slate-600 text-[11.5px] leading-relaxed">
                    {finding.detailEnglish}
                  </p>

                  {localLanguage.code !== 'en-US' && (
                    <p className="text-slate-500 text-[11px] italic leading-relaxed border-t border-slate-100 pt-1">
                      {finding.detailLocal}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warnings or Discrepancies (if any) */}
        {bilingualData.warningsOrDiscrepancies && bilingualData.warningsOrDiscrepancies.length > 0 && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Address Discrepancies & Disclaimers</span>
            </div>
            {bilingualData.warningsOrDiscrepancies.map((w, i) => (
              <div key={i} className="text-xs space-y-0.5">
                <p className="font-semibold text-rose-900">{w.english}</p>
                <p className="text-rose-700 italic text-[11px]">{w.local}</p>
              </div>
            ))}
          </div>
        )}

        {/* Global Headquarters Reference (If this address is an operating branch or retail store) */}
        {bilingualData.headquartersInfoIfBranch && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/40 border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white text-blue-600 shadow-xs mt-0.5">
                <Building className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    {bilingualData.headquartersInfoIfBranch.name}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    Parent Global HQ
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono">
                  {bilingualData.headquartersInfoIfBranch.addressEnglish}
                </p>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${bilingualData.headquartersInfoIfBranch.name}, ${bilingualData.headquartersInfoIfBranch.addressEnglish}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-200 font-semibold text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
            >
              <span>View HQ in Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Quick External Map & Direction Action Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>GPS: {addressDetails.latitude.toFixed(4)}, {addressDetails.longitude.toFixed(4)}</span>
            <button
              onClick={handleCopyAddress}
              className="ml-2 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-medium text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy Address'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              id="verification-google-maps-link"
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Directions</span>
            </a>
          </div>
        </div>
      </div>

      {/* Registered Agent or Virtual Office Address Section */}
      <RegisteredAgentSection
        info={report.registeredAgentOrVirtualOffice}
        companyName={companyName}
        inputAddress={inputAddress}
      />
    </div>
  );
};
