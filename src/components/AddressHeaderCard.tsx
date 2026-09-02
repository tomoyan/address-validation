import React, { useState } from 'react';
import {
  MapPin,
  ExternalLink,
  Navigation,
  Eye,
  Copy,
  Check,
  Building2,
  Clock,
  Compass,
  Layers,
  Sparkles
} from 'lucide-react';
import { AddressReport } from '../types';

interface AddressHeaderCardProps {
  report: AddressReport;
}

export const AddressHeaderCard: React.FC<AddressHeaderCardProps> = ({ report }) => {
  const [copiedAddr, setCopiedAddr] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);

  const { addressDetails, propertyBreakdown, googleMapsUrl, googleMapsDirectionsUrl, googleStreetViewUrl } = report;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressDetails.formattedAddress);
    setCopiedAddr(true);
    setTimeout(() => setCopiedAddr(false), 2000);
  };

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${addressDetails.latitude.toFixed(6)}, ${addressDetails.longitude.toFixed(6)}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  return (
    <div
      id="address-primary-header-card"
      className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6 sm:p-9 space-y-6 transition-all"
    >
      {/* Top Meta Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/70">
            <Building2 className="w-3.5 h-3.5" />
            {propertyBreakdown.propertyType}
          </span>

          {propertyBreakdown.buildingName && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700">
              {propertyBreakdown.buildingName}
            </span>
          )}

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Density: {propertyBreakdown.commercialDensity}
          </span>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span className="uppercase tracking-widest text-[10px]">Verified Location Intelligence</span>
        </div>
      </div>

      {/* Main Address Title & Highlights */}
      <div className="space-y-3">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-xs mt-1">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                Physical Address
              </span>
              <a
                id="address-card-google-maps-link"
                href={googleMapsUrl}
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
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              title="Open physical address in Google Maps"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 tracking-tight leading-snug break-words transition-colors">
                {addressDetails.formattedAddress}
              </h2>
            </a>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
              {addressDetails.city && <span className="text-slate-700 font-semibold">{addressDetails.city}</span>}
              {addressDetails.stateOrProvince && <span>• {addressDetails.stateOrProvince}</span>}
              {addressDetails.postalCode && <span>• {addressDetails.postalCode}</span>}
              {addressDetails.country && <span className="text-slate-800 font-bold">• {addressDetails.country}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Spatial Metadata & Zoning Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Lat / Long</p>
          <p className="text-slate-900 font-mono text-xs sm:text-sm font-bold truncate">
            {addressDetails.latitude.toFixed(4)} / {addressDetails.longitude.toFixed(4)}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Zoning Code</p>
          <p className="text-slate-900 text-xs sm:text-sm font-bold truncate">
            {propertyBreakdown.zoningCategory || 'Commercial'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Stories / Floors</p>
          <p className="text-slate-900 text-xs sm:text-sm font-bold truncate">
            {propertyBreakdown.estimatedFloors || 'Multi-Story'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Timezone</p>
          <p className="text-slate-900 text-xs sm:text-sm font-bold truncate">
            {addressDetails.timezone || 'Local Standard'}
          </p>
        </div>
      </div>

      {/* Google Maps Actions Suite */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        {/* Main Google Maps Links */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Primary Map Link */}
          <a
            id="main-open-google-maps-btn"
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-5 bg-slate-50 border border-slate-200 rounded-2xl inline-flex items-center justify-center gap-2.5 font-bold text-xs sm:text-sm text-slate-700 group hover:bg-white hover:shadow-md transition-all"
            title="Open exact location on Google Maps in a new tab"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>Open in Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          {/* Directions Link */}
          <a
            id="google-maps-directions-btn"
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-4 bg-white border border-slate-200 rounded-2xl inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
            title="Get turn-by-turn navigation in Google Maps"
          >
            <Navigation className="w-4 h-4 text-blue-600" />
            <span>Directions</span>
          </a>

          {/* Street View Link */}
          <a
            id="google-street-view-btn"
            href={googleStreetViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-4 bg-white border border-slate-200 rounded-2xl inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
            title="Open Google Maps Street View 360° panorama"
          >
            <Eye className="w-4 h-4 text-amber-600" />
            <span>Street View</span>
          </a>
        </div>

        {/* Clipboard Actions */}
        <div className="flex items-center gap-2">
          <button
            id="copy-address-btn"
            onClick={handleCopyAddress}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-white border border-slate-200 transition-all"
            title="Copy address to clipboard"
          >
            {copiedAddr ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold">
                <Check className="w-3.5 h-3.5" /> Copied
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <Copy className="w-3.5 h-3.5 text-slate-400" /> Copy Address
              </span>
            )}
          </button>

          <button
            id="copy-coords-btn"
            onClick={handleCopyCoords}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-white border border-slate-200 transition-all"
            title="Copy lat/lng coordinates"
          >
            {copiedCoords ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold">
                <Check className="w-3.5 h-3.5" /> Copied
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <Copy className="w-3.5 h-3.5 text-slate-400" /> Copy Coordinates
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

