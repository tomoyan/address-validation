/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  AlertCircle,
  ExternalLink,
  Layers,
  Building,
  Sparkles
} from 'lucide-react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { GoogleMapView } from './components/GoogleMapView';
import { BusinessDirectory } from './components/BusinessDirectory';
import { PlaceMapInfo, AddressSuggestion, BusinessEntity } from './types';

const INITIAL_DEFAULT_ADDRESS = '1600 Amphitheatre Pkwy, Mountain View, CA 94043';

const INITIAL_DEFAULT_PLACE: PlaceMapInfo = {
  query: INITIAL_DEFAULT_ADDRESS,
  formattedAddress: '1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA',
  placeName: 'Googleplex (Google Headquarters)',
  lat: 37.4220041,
  lng: -122.0841298,
  zoom: 16,
  addressComponents: {
    streetNumber: '1600',
    street: 'Amphitheatre Pkwy',
    neighborhood: 'North Bayshore',
    city: 'Mountain View',
    state: 'California',
    postalCode: '94043',
    country: 'United States',
    countryCode: 'US',
  },
  placeType: 'commercial',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=1600+Amphitheatre+Pkwy%2C+Mountain+View%2C+CA+94043',
  googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=1600+Amphitheatre+Pkwy%2C+Mountain+View%2C+CA+94043',
  googleStreetViewUrl: 'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=37.4220041,-122.0841298',
  googleEarthUrl: 'https://earth.google.com/web/search/1600+Amphitheatre+Pkwy%2C+Mountain+View%2C+CA+94043',
  searchedAt: new Date().toISOString(),
};

export default function App() {
  const [currentPlace, setCurrentPlace] = useState<PlaceMapInfo>(INITIAL_DEFAULT_PLACE);
  const [currentQuery, setCurrentQuery] = useState<string>(INITIAL_DEFAULT_ADDRESS);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [businesses, setBusinesses] = useState<BusinessEntity[]>([]);
  const [isLoadingBusinesses, setIsLoadingBusinesses] = useState<boolean>(false);

  // Fetch businesses on and around the current address/coordinates
  const fetchBusinessesForLocation = useCallback(async (address: string, lat: number, lng: number, displayName?: string) => {
    setIsLoadingBusinesses(true);
    try {
      const res = await fetch('/api/business-intel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          lat,
          lng,
          displayName: displayName || address,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.businesses)) {
          setBusinesses(data.businesses);
        } else {
          setBusinesses([]);
        }
      }
    } catch (err) {
      console.warn('Failed to load businesses:', err);
    } finally {
      setIsLoadingBusinesses(false);
    }
  }, []);

  // Fetch businesses for initial default address on mount
  useEffect(() => {
    fetchBusinessesForLocation(
      INITIAL_DEFAULT_PLACE.formattedAddress || INITIAL_DEFAULT_PLACE.query,
      INITIAL_DEFAULT_PLACE.lat,
      INITIAL_DEFAULT_PLACE.lng,
      INITIAL_DEFAULT_PLACE.placeName
    );
  }, [fetchBusinessesForLocation]);

  // Perform Address Search and Resolve Place for Google Maps display
  const handleSearchAddress = useCallback(
    async (query: string, suggestion?: AddressSuggestion) => {
      const trimmed = query.trim();
      if (!trimmed) return;

      setIsSearching(true);
      setSearchError(null);
      setCurrentQuery(trimmed);

      // If user selected an autocomplete suggestion with valid coordinates, use it right away for instant feedback
      if (suggestion && suggestion.lat && suggestion.lng) {
        const enc = encodeURIComponent(suggestion.displayName || trimmed);
        const optimisticPlace: PlaceMapInfo = {
          query: trimmed,
          formattedAddress: suggestion.displayName || trimmed,
          placeName: trimmed.split(',')[0],
          lat: suggestion.lat,
          lng: suggestion.lng,
          zoom: 16,
          addressComponents: {
            streetNumber: suggestion.addressComponents?.houseNumber,
            street: suggestion.addressComponents?.road,
            neighborhood: suggestion.addressComponents?.neighbourhood || suggestion.addressComponents?.suburb,
            city: suggestion.addressComponents?.city,
            state: suggestion.addressComponents?.state,
            postalCode: suggestion.addressComponents?.postcode,
            country: suggestion.addressComponents?.country,
            countryCode: suggestion.addressComponents?.countryCode,
          },
          placeType: suggestion.type || 'place',
          googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${enc}`,
          googleMapsDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${enc}`,
          googleStreetViewUrl: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${suggestion.lat},${suggestion.lng}`,
          googleEarthUrl: `https://earth.google.com/web/search/${enc}`,
          searchedAt: new Date().toISOString(),
        };

        setCurrentPlace(optimisticPlace);
        setIsSearching(false);
        fetchBusinessesForLocation(
          optimisticPlace.formattedAddress,
          optimisticPlace.lat,
          optimisticPlace.lng,
          optimisticPlace.placeName
        );
        return;
      }

      // Query server endpoint for thorough address search and geocoding
      try {
        const res = await fetch(`/api/search-place?q=${encodeURIComponent(trimmed)}`);
        if (!res.ok) {
          throw new Error('Could not resolve location. Please verify the address.');
        }

        const data = await res.json();
        if (data.success && data.place) {
          setCurrentPlace(data.place);
          fetchBusinessesForLocation(
            data.place.formattedAddress,
            data.place.lat,
            data.place.lng,
            data.place.placeName
          );
        } else {
          // Fallback place when server returns empty
          const enc = encodeURIComponent(trimmed);
          const fallbackPlace: PlaceMapInfo = {
            query: trimmed,
            formattedAddress: trimmed,
            placeName: trimmed.split(',')[0],
            lat: currentPlace.lat,
            lng: currentPlace.lng,
            zoom: 15,
            addressComponents: {},
            googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${enc}`,
            googleMapsDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${enc}`,
            googleStreetViewUrl: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${currentPlace.lat},${currentPlace.lng}`,
            googleEarthUrl: `https://earth.google.com/web/search/${enc}`,
            searchedAt: new Date().toISOString(),
          };
          setCurrentPlace(fallbackPlace);
          fetchBusinessesForLocation(
            fallbackPlace.formattedAddress,
            fallbackPlace.lat,
            fallbackPlace.lng,
            fallbackPlace.placeName
          );
        }
      } catch (err: any) {
        console.warn('Search error:', err);
        // Even on network error, ensure Google Maps embed can display the searched text directly
        const enc = encodeURIComponent(trimmed);
        const fallbackPlace: PlaceMapInfo = {
          query: trimmed,
          formattedAddress: trimmed,
          placeName: trimmed.split(',')[0],
          lat: 0,
          lng: 0,
          zoom: 15,
          addressComponents: {},
          googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${enc}`,
          googleMapsDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${enc}`,
          googleStreetViewUrl: `https://www.google.com/maps/search/?api=1&query=${enc}`,
          googleEarthUrl: `https://earth.google.com/web/search/${enc}`,
          searchedAt: new Date().toISOString(),
        };
        setCurrentPlace(fallbackPlace);
        fetchBusinessesForLocation(
          fallbackPlace.formattedAddress,
          fallbackPlace.lat,
          fallbackPlace.lng,
          fallbackPlace.placeName
        );
      } finally {
        setIsSearching(false);
      }
    },
    [currentPlace.lat, currentPlace.lng, fetchBusinessesForLocation]
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col text-[#0f172a] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation Bar */}
      <Header
        activeQuery={currentPlace.formattedAddress || currentQuery}
        activePlaceTitle={currentPlace.placeName}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Search Header Banner */}
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Search Address & View Businesses
          </h1>
        </section>

        {/* Search Bar Input */}
        <section id="address-search-section">
          <SearchBar
            onSearch={handleSearchAddress}
            isLoading={isSearching}
            initialQuery={currentQuery}
          />
        </section>

        {/* Error Notification if any */}
        {searchError && (
          <div
            id="search-error-alert"
            className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-between text-xs sm:text-sm shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{searchError}</span>
            </div>
            <button
              onClick={() => handleSearchAddress(currentQuery)}
              className="font-bold underline hover:text-rose-900 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Split-pane Result Layout: Businesses on the Left, Half-size Map on the Right */}
        <section id="address-result-split-container" className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Building className="w-3.5 h-3.5 text-blue-600" />
              <span>Location Results & Nearby Businesses</span>
            </div>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Left: Businesses on & around address • Right: Interactive Google Map
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Left Column: Businesses on and around the address */}
            <div className="order-2 lg:order-1">
              <BusinessDirectory
                businesses={businesses}
                address={currentPlace.formattedAddress || currentPlace.query}
                isLoading={isLoadingBusinesses}
              />
            </div>

            {/* Right Column: Google Map (Half Size) */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-20">
              <GoogleMapView
                place={currentPlace}
                isSearching={isSearching}
                className="w-full h-[420px] sm:h-[480px] lg:h-[580px]"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="font-bold text-slate-700">Global Address Search</span>
            <span>•</span>
            <span>Google Maps & Business Intelligence</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
            <a
              id="footer-google-maps-link"
              href={currentPlace.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 flex items-center gap-1.5 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>View in Google Maps</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
