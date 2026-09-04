import React, { useState } from 'react';
import {
  MapPin,
  ExternalLink,
  Navigation,
  Eye,
  Layers,
  Compass,
  Maximize2,
  Share2
} from 'lucide-react';
import { AddressReport, CompanyVerificationReport } from '../types';

interface MapPreviewProps {
  report: CompanyVerificationReport | AddressReport;
}

export const MapPreview: React.FC<MapPreviewProps> = ({ report }) => {
  const { addressDetails, propertyBreakdown, googleMapsUrl, googleMapsDirectionsUrl, googleStreetViewUrl } = report;
  const lat = addressDetails.latitude;
  const lng = addressDetails.longitude;

  const targetAddressStr = (addressDetails.formattedAddress || report.inputAddress || '').trim();
  const directAddressMapsUrl = targetAddressStr
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(targetAddressStr)}`
    : googleMapsUrl;
  const directAddressDirectionsUrl = targetAddressStr
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(targetAddressStr)}`
    : googleMapsDirectionsUrl;

  // OpenStreetMap embed URL (safe, robust, interactive iframe without API key requirement)
  const delta = 0.005;
  const bbox = `${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}`;
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div id="interactive-map-preview-panel" className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col space-y-5">
      {/* Map Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
            Spatial Overview
          </span>
          <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">
            {propertyBreakdown.buildingName || addressDetails.city || 'Verified Location'}
          </h3>
          <p className="text-slate-400 text-xs font-medium">
            {propertyBreakdown.propertyType} • {addressDetails.country}
          </p>
        </div>
      </div>

      {/* Interactive Visual Map Container */}
      <div className="relative w-full h-56 sm:h-64 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/80 group">
        <iframe
          title="Address Map Preview"
          src={osmEmbedUrl}
          className="w-full h-full border-0 pointer-events-auto"
          loading="lazy"
        />

        {/* Floating Location Badge */}
        <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-bold text-slate-700 uppercase tracking-wider shadow-sm border border-slate-200/60 pointer-events-none">
          Verified Coordinates
        </div>
      </div>

      {/* Lat/Long and Place ID summary card */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Lat / Long</p>
          <p className="text-slate-900 font-mono text-xs font-bold">{lat.toFixed(4)} / {lng.toFixed(4)}</p>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Country ISO</p>
          <p className="text-slate-900 font-mono text-xs font-bold">{addressDetails.countryCode || 'INT'}</p>
        </div>
      </div>

      {/* Primary Google Maps CTA */}
      <div className="pt-1">
        <a
          id="map-preview-google-maps-btn"
          href={directAddressMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center gap-3 font-bold text-sm text-slate-700 group hover:bg-white hover:shadow-md transition-all"
          title="Open this location in Google Maps"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>Open in Maps</span>
        </a>
      </div>

      {/* Secondary Quick Nav buttons */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <a
          id="map-action-directions"
          href={directAddressDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-slate-50 hover:bg-white hover:shadow-xs text-slate-700 border border-slate-200 flex items-center justify-between transition-all group"
        >
          <div className="flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs">Directions</span>
          </div>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>

        <a
          id="map-action-streetview"
          href={googleStreetViewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-slate-50 hover:bg-white hover:shadow-xs text-slate-700 border border-slate-200 flex items-center justify-between transition-all group"
        >
          <div className="flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs">Street View</span>
          </div>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>
    </div>
  );
};
