import React, { useState } from 'react';
import { Layers, Copy, Check, MapPin, Globe2, Compass } from 'lucide-react';
import { AddressDetails } from '../types';

interface AddressComponentsBreakdownProps {
  details: AddressDetails;
  googleMapsUrl: string;
}

export const AddressComponentsBreakdown: React.FC<AddressComponentsBreakdownProps> = ({
  details,
  googleMapsUrl,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyItem = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const fields = [
    { label: 'Street Number', value: details.streetNumber || 'N/A', key: 'streetNumber' },
    { label: 'Street / Route Name', value: details.streetName || details.formattedAddress.split(',')[0] || 'N/A', key: 'streetName' },
    { label: 'Subpremise / Suite', value: details.subpremise || 'Main Building', key: 'subpremise' },
    { label: 'Neighborhood / Suburb', value: details.neighborhood || details.city || 'Central District', key: 'neighborhood' },
    { label: 'City / Locality', value: details.city || 'N/A', key: 'city' },
    { label: 'State / Region', value: details.stateOrProvince || 'N/A', key: 'state' },
    { label: 'Postal / ZIP Code', value: details.postalCode || 'N/A', key: 'postalCode' },
    { label: 'Country / Territory', value: details.country || 'N/A', key: 'country' },
    { label: 'Country ISO Code', value: details.countryCode || 'INT', key: 'countryCode' },
    { label: 'Latitude Coordinate', value: details.latitude ? details.latitude.toFixed(6) : '0.000000', key: 'lat' },
    { label: 'Longitude Coordinate', value: details.longitude ? details.longitude.toFixed(6) : '0.000000', key: 'lng' },
    { label: 'Plus Code / OLC', value: details.plusCode || `${details.latitude.toFixed(2)}°N, ${details.longitude.toFixed(2)}°E`, key: 'plusCode' },
  ];

  const addressToMap = (details.formattedAddress || '').trim();
  const directMapsUrl = addressToMap
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressToMap)}`
    : googleMapsUrl;

  return (
    <div id="address-breakdown-section" className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 shadow-xs">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Granular Location Breakdown
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Standardized geospatial fields, administrative boundaries, and geocoded indices
            </p>
          </div>
        </div>

        <a
          id="address-breakdown-maps-link"
          href={directMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-white hover:shadow-xs rounded-xl transition-all border border-slate-200"
          title="Verify address breakdown on Google Maps"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>Verify on Maps</span>
        </a>
      </div>

      {/* Grid of Components */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {fields.map((f) => (
          <div
            key={f.key}
            onClick={() => f.value !== 'N/A' && copyItem(f.key, f.value)}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group flex flex-col justify-between"
            title="Click to copy field value"
          >
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                {f.label}
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-800 break-words mt-1.5 group-hover:text-blue-700 transition-colors">
                {f.value}
              </p>
            </div>

            <div className="flex items-center justify-end pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {copiedKey === f.key ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                  <Check className="w-3 h-3" /> Copied
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                  <Copy className="w-3 h-3" /> Copy
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
