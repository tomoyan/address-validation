import React, { useState, useMemo } from 'react';
import {
  Building,
  MapPin,
  ExternalLink,
  Phone,
  Globe,
  Clock,
  Star,
  ShieldCheck,
  Search,
  Tag,
  Briefcase,
  Sparkles,
  Compass
} from 'lucide-react';
import { BusinessEntity } from '../types';

interface BusinessDirectoryProps {
  businesses: BusinessEntity[];
  address: string;
  isLoading?: boolean;
  className?: string;
}

export const BusinessDirectory: React.FC<BusinessDirectoryProps> = ({
  businesses,
  address,
  isLoading = false,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');

  // Extract unique industry groups
  const industryGroups = useMemo(() => {
    const groups = new Set<string>();
    businesses.forEach((b) => {
      if (b.industryGroup) groups.add(b.industryGroup);
      else if (b.category) groups.add(b.category);
    });
    return ['All', ...Array.from(groups)];
  }, [businesses]);

  // Filtered businesses
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((b) => {
      const matchesSearch =
        !searchTerm ||
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.suiteOrFloor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesGroup =
        selectedGroup === 'All' ||
        b.industryGroup === selectedGroup ||
        b.category === selectedGroup;

      return matchesSearch && matchesGroup;
    });
  }, [businesses, searchTerm, selectedGroup]);

  return (
    <div
      id="business-information-directory-section"
      className={`bg-white rounded-3xl border border-slate-200/80 shadow-md p-5 sm:p-6 space-y-5 flex flex-col ${className}`}
    >
      {/* Section Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Businesses On & Around Address
              </h3>
              {!isLoading && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/70">
                  {businesses.length} {businesses.length === 1 ? 'Business' : 'Businesses'}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Commercial occupants, stores, suites, and surrounding establishments
            </p>
          </div>
        </div>

        {/* In-Directory Search */}
        {!isLoading && businesses.length > 0 && (
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="business-filter-search-input"
              type="text"
              placeholder="Search businesses or suites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all placeholder:text-slate-400 font-medium text-slate-700"
            />
          </div>
        )}
      </div>

      {/* Filter Category Chips */}
      {!isLoading && industryGroups.length > 2 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {industryGroups.map((group) => {
            const count =
              group === 'All'
                ? businesses.length
                : businesses.filter((b) => b.industryGroup === group || b.category === group).length;

            return (
              <button
                key={group}
                id={`filter-group-${group.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedGroup(group)}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedGroup === group
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200'
                }`}
              >
                <span>{group}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    selectedGroup === group ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="space-y-4 py-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 rounded-2xl border border-slate-200 animate-pulse space-y-3 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-slate-200 rounded-md w-1/3"></div>
                <div className="h-6 w-6 bg-slate-200 rounded-lg"></div>
              </div>
              <div className="h-3 bg-slate-200 rounded-md w-1/4"></div>
              <div className="h-3 bg-slate-200 rounded-md w-3/4"></div>
            </div>
          ))}
        </div>
      ) : filteredBusinesses.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 p-8 text-center space-y-2 bg-slate-50/60">
          <p className="text-sm font-bold text-slate-700">No businesses found matching this filter</p>
          <p className="text-xs text-slate-400">Try clearing your search query or selecting 'All' categories.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedGroup('All');
            }}
            className="mt-2 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3.5 overflow-y-auto max-h-[540px] pr-1">
          {filteredBusinesses.map((biz) => {
            const mapLink =
              biz.googleMapsUrl ||
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${biz.name}, ${address}`)}`;

            return (
              <div
                key={biz.id}
                id={`business-card-${biz.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all p-4 flex flex-col justify-between space-y-3 group"
              >
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-700">
                          {biz.category}
                        </span>

                        {biz.isAnchorTenant && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            Anchor Tenant
                          </span>
                        )}

                        {biz.status === 'headquarters' && (
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200/70">
                            HQ
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {biz.name}
                      </h4>
                    </div>

                    {/* Quick Map Pin Link */}
                    <a
                      id={`map-link-btn-${biz.id}`}
                      href={mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-slate-500 bg-slate-50 hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600 transition-all shrink-0"
                      title="Open this business location on Google Maps"
                    >
                      <MapPin className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Suite / Location Badge */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg w-fit border border-slate-100">
                    <Briefcase className="w-3 h-3 text-slate-400" />
                    <span>Suite / Floor: {biz.suiteOrFloor}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {biz.description}
                  </p>
                </div>

                {/* Meta details & Actions */}
                <div className="space-y-2.5 pt-2.5 border-t border-slate-100 text-xs">
                  {/* Stats / Details */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-slate-500">
                    {biz.rating ? (
                      <div className="flex items-center gap-1 text-slate-800 font-bold">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{biz.rating.toFixed(1)}</span>
                        {biz.reviewCount && (
                          <span className="text-slate-400 font-normal">({biz.reviewCount})</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-400 font-medium">Verified Tenant</span>
                    )}

                    {biz.openingHours && (
                      <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="truncate max-w-[170px]">{biz.openingHours}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {biz.tags && biz.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {biz.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links & Map Button */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-3">
                      {biz.phone && (
                        <a
                          href={`tel:${biz.phone}`}
                          className="inline-flex items-center gap-1 text-slate-600 hover:text-blue-600 font-medium transition-colors"
                          title="Call business"
                        >
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span className="text-[11px]">{biz.phone}</span>
                        </a>
                      )}

                      {biz.website && (
                        <a
                          href={biz.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-slate-600 hover:text-blue-600 font-medium transition-colors"
                          title="Visit official website"
                        >
                          <Globe className="w-3 h-3 text-slate-400" />
                          <span className="text-[11px]">Website</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>

                    {/* Google Maps link button */}
                    <a
                      id={`google-maps-btn-direct-${biz.id}`}
                      href={mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-white hover:shadow-xs border border-slate-200 transition-all ml-auto group/btn"
                      title="Open this business directly in Google Maps"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>Maps</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 group-hover/btn:text-slate-600" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
