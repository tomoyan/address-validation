// Source: Google Maps Platform Code Assist
import React, { useState, useEffect, useMemo } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import {
  Maximize2,
  Minimize2,
  Navigation2,
  ExternalLink,
  Layers,
  Compass,
  Copy,
  Check,
  RotateCcw,
  Plus,
  Minus,
  MapPin,
  Eye,
  Globe
} from 'lucide-react';
import { PlaceMapInfo } from '../types';

interface GoogleMapViewProps {
  place: PlaceMapInfo;
  isSearching?: boolean;
  className?: string;
}

export const GoogleMapView: React.FC<GoogleMapViewProps> = ({ place, isSearching = false, className = '' }) => {
  const [zoom, setZoom] = useState<number>(16);
  const [mapType, setMapType] = useState<'m' | 'k' | 'p'>('m'); // m: roadmap, k: satellite, p: terrain
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copiedCoords, setCopiedCoords] = useState<boolean>(false);

  // Sync zoom when place changes
  useEffect(() => {
    setZoom(place.zoom || 16);
  }, [place.formattedAddress, place.lat, place.lng]);

  const mapsApiKey = typeof import.meta !== 'undefined' && (import.meta as any).env
    ? ((import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY || '')
    : '';

  const lat = place.lat;
  const lng = place.lng;
  const addressQuery = (place.formattedAddress || place.query).trim();

  const handleCopyCoordinates = () => {
    navigator.clipboard.writeText(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 1, 21));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 1, 3));
  const handleResetCenter = () => setZoom(16);

  // Generate standard Google Maps Embed URL (accessible directly with zero billing barriers)
  // output=embed creates an interactive Google Map frame centered with pin on target place
  const embedUrl = useMemo(() => {
    const encoded = encodeURIComponent(addressQuery);
    return `https://www.google.com/maps?q=${encoded}&z=${zoom}&t=${mapType}&output=embed`;
  }, [addressQuery, zoom, mapType]);

  const mapTypeLabels: Record<string, string> = {
    m: 'Map',
    k: 'Satellite',
    p: 'Terrain',
  };

  return (
    <div
      id="google-map-display-container"
      className={`relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 shadow-md transition-all duration-300 flex flex-col ${
        isFullscreen
          ? 'fixed inset-4 z-50 rounded-2xl shadow-2xl h-[calc(100vh-2rem)]'
          : className || 'w-full h-[480px] sm:h-[540px] md:h-[600px]'
      }`}
    >
      {/* Top Map Action Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Place Pill Badge */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2.5 max-w-[80%] sm:max-w-md">
          <div className="w-6 h-6 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs font-bold text-slate-800 truncate" title={place.placeName || addressQuery}>
              {place.placeName || addressQuery.split(',')[0]}
            </h3>
            <p className="text-[10px] text-slate-500 truncate" title={place.formattedAddress}>
              {place.formattedAddress}
            </p>
          </div>
        </div>

        {/* Top-Right Control Buttons */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          {/* Map Type Switcher */}
          <div className="flex items-center gap-1 bg-slate-100/90 p-0.5 rounded-xl text-[11px] font-semibold text-slate-600">
            {(['m', 'k', 'p'] as const).map((type) => (
              <button
                key={type}
                id={`map-layer-btn-${type}`}
                type="button"
                onClick={() => setMapType(type)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  mapType === type
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {mapTypeLabels[type]}
              </button>
            ))}
          </div>

          {/* Fullscreen Toggle */}
          <button
            id="map-fullscreen-toggle-btn"
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="relative flex-1 w-full h-full bg-slate-100 overflow-hidden">
        {mapsApiKey ? (
          /* Official Google Maps Platform React SDK implementation */
          <APIProvider apiKey={mapsApiKey}>
            <Map
              id="google-maps-react-canvas"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              mapId="DEMO_MAP_ID"
              center={{ lat, lng }}
              zoom={zoom}
              gestureHandling="greedy"
              disableDefaultUI={false}
              className="w-full h-full"
            >
              <AdvancedMarker position={{ lat, lng }} title={addressQuery}>
                <Pin background="#ea4335" glyphColor="#ffffff" borderColor="#b31412" scale={1.2} />
              </AdvancedMarker>
            </Map>
          </APIProvider>
        ) : (
          /* High-Resolution Google Maps Embedded View (Always active, interactive, zero API key barrier) */
          <iframe
            id="google-maps-embed-frame"
            title={`Google Map - ${addressQuery}`}
            src={embedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}

        {/* Searching Overlay */}
        {isSearching && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-xs flex items-center justify-center z-30 transition-opacity">
            <div className="bg-white/95 px-5 py-3 rounded-2xl border border-slate-200 shadow-lg flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
              <span className="text-xs font-bold text-slate-700">Locating place on Google Maps...</span>
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Left Controls (Zoom & Reset) */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm p-1 flex flex-col gap-0.5">
          <button
            id="map-zoom-in-btn"
            type="button"
            onClick={handleZoomIn}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="h-px bg-slate-100 mx-1" />
          <button
            id="map-zoom-out-btn"
            type="button"
            onClick={handleZoomOut}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="h-px bg-slate-100 mx-1" />
          <button
            id="map-recenter-btn"
            type="button"
            onClick={handleResetCenter}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Coordinates Pill */}
        <button
          id="map-coords-copy-pill"
          type="button"
          onClick={handleCopyCoordinates}
          className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-1.5 text-[11px] font-mono text-slate-600 hover:text-slate-900 hover:bg-white transition-all group"
          title="Click to copy exact GPS coordinates"
        >
          <Compass className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>{lat.toFixed(4)}°, {lng.toFixed(4)}°</span>
          {copiedCoords ? (
            <Check className="w-3 h-3 text-emerald-600 shrink-0" />
          ) : (
            <Copy className="w-3 h-3 text-slate-400 group-hover:text-slate-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </button>
      </div>

      {/* Floating Bottom Right Quick Action Links */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-wrap items-center gap-2 pointer-events-auto">
        <a
          id="open-google-maps-primary-btn"
          href={place.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white hover:bg-blue-700 px-3.5 py-2 rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all group"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        <a
          id="get-directions-google-maps-btn"
          href={place.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/95 backdrop-blur-md text-slate-700 hover:text-slate-900 hover:bg-white px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 shadow-sm flex items-center gap-1.5 transition-all"
          title="Get turn-by-turn driving, transit, or walking directions"
        >
          <Navigation2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
          <span>Directions</span>
        </a>

        <a
          id="street-view-google-maps-btn"
          href={place.googleStreetViewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex bg-white/95 backdrop-blur-md text-slate-700 hover:text-slate-900 hover:bg-white px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 shadow-sm items-center gap-1.5 transition-all"
          title="Open Google Street View 360° Panorama"
        >
          <Eye className="w-3.5 h-3.5 text-amber-600" />
          <span>Street View</span>
        </a>

        <a
          id="google-earth-btn"
          href={place.googleEarthUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex bg-white/95 backdrop-blur-md text-slate-700 hover:text-slate-900 hover:bg-white px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 shadow-sm items-center gap-1.5 transition-all"
          title="Explore place in Google Earth 3D"
        >
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span>Earth 3D</span>
        </a>
      </div>
    </div>
  );
};
