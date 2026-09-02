import React from 'react';
import {
  Building2,
  Layers,
  Sparkles,
  Footprints,
  Bus,
  CheckCircle2,
  TrendingUp,
  Map,
  ShieldAlert
} from 'lucide-react';
import { PropertyBreakdown } from '../types';

interface PropertyProfileProps {
  property: PropertyBreakdown;
  highlights: string[];
}

export const PropertyProfile: React.FC<PropertyProfileProps> = ({ property, highlights }) => {
  const walkScore = property.walkabilityScore || 88;

  return (
    <div id="property-profile-section" className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Property Profile & Zoning
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Real estate classification, accessibility ratings, and structural features
            </p>
          </div>
        </div>

        {property.estimatedOccupancy && (
          <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            Occupancy: {property.estimatedOccupancy}
          </span>
        )}
      </div>

      {/* Grid of Key Property Attributes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Property Type</span>
          <p className="text-sm font-bold text-slate-900">{property.propertyType}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Zoning Code</span>
          <p className="text-sm font-bold text-slate-900">{property.zoningCategory}</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Commercial Density</span>
          <p className="text-sm font-bold text-slate-900">{property.commercialDensity}</p>
        </div>
      </div>

      {/* Neighborhood & Transit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Neighborhood Profile */}
        <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100/80 space-y-2.5">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>Neighborhood & District Profile</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            {property.neighborhoodProfile}
          </p>
        </div>

        {/* Transit & Walkability */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider">
              <Bus className="w-4 h-4 text-slate-600" />
              <span>Transit & Accessibility</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-100/80 text-emerald-900 text-xs font-bold">
              <Footprints className="w-3.5 h-3.5 text-emerald-700" />
              <span>Walk Score: {walkScore}/100</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {property.transitAccess || 'Connected to municipal transit networks, main vehicular corridors, and pedestrian thoroughfares.'}
          </p>
        </div>
      </div>

      {/* Key Commercial Highlights */}
      {highlights && highlights.length > 0 && (
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Commercial Significance & Economic Highlights</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Amenities */}
      {property.keyAmenities && property.keyAmenities.length > 0 && (
        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Building & Parcel Amenities</span>
          <div className="flex flex-wrap gap-1.5">
            {property.keyAmenities.map((amenity, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

