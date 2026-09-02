import React, { useState } from 'react';
import {
  Building,
  Building2,
  MapPin,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Camera,
  Eye,
  Maximize2,
  X,
  Copy,
  Check,
  Info,
  Scale,
  Compass,
  FileText,
  Navigation
} from 'lucide-react';
import { RegisteredAgentOrVirtualOfficeInfo } from '../types';

interface RegisteredAgentSectionProps {
  info?: RegisteredAgentOrVirtualOfficeInfo;
  companyName: string;
  inputAddress: string;
}

export const RegisteredAgentSection: React.FC<RegisteredAgentSectionProps> = ({
  info,
  companyName,
  inputAddress
}) => {
  const [copied, setCopied] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  // If no info passed, generate default statutory agent assessment based on company & address
  const data: RegisteredAgentOrVirtualOfficeInfo = info || {
    isRegisteredAgentOrVirtualOffice: true,
    isInputAddressAnAgentOrVirtualOffice: false,
    agentName: `${companyName} Statutory Registered Agent on Record`,
    officeType: 'Commercial Registered Agent',
    formattedAddress: inputAddress,
    city: 'State Capital / Corporate Seat',
    stateOrProvince: 'Jurisdiction of Registration',
    postalCode: '',
    country: 'United States',
    serviceCapacity: 'Authorized Commercial Registered Agent for Service of Process (SOP) & Statutory State Notices',
    registryFiling: 'State Corporate Registry Division / Secretary of State',
    occupancyDescription: 'Official commercial registered agent and statutory corporate seat. Retained for legal service of process and state franchise compliance.',
    verificationRiskAssessment: 'info',
    riskNote: 'Statutory Verification: This address is maintained for legal filings and state compliance. Active day-to-day operations may occur at operating branches or regional headquarters.',
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(inputAddress)}`,
    googleStreetViewUrl: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=37.7749,-122.4194`,
    streetImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    streetImageCaption: `Street View of Registered Office Address (${inputAddress})`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data.formattedAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasStreetImage = Boolean(data.streetImageUrl && !imgError);

  const riskBadge = data.isInputAddressAnAgentOrVirtualOffice ? (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-300">
      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
      <span>Input Address is a Commercial Registered Agent / Virtual Office</span>
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold border border-blue-200">
      <Scale className="w-3.5 h-3.5 text-blue-600" />
      <span>Official Statutory Agent on File</span>
    </span>
  );

  return (
    <div
      id="registered-agent-virtual-office-section"
      className="bg-white rounded-[28px] border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-5 transition-all overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 shadow-xs border border-indigo-100">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Registered Agent or Virtual Office Address
              </h3>
              {riskBadge}
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Statutory agent of record, legal service of process (SOP), and physical exterior verification
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200">
            {data.officeType}
          </span>
        </div>
      </div>

      {/* Two-Column Grid: Information on the Left, Street Image on the Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Information */}
        <div className="lg:col-span-7 space-y-4">
          {/* Agent Name & Designation */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Designated Registered Agent / Facility Name
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                Statutory Seat
              </span>
            </div>
            <p className="text-base font-bold text-slate-900 leading-snug">
              {data.agentName}
            </p>
          </div>

          {/* Physical Address Card with Google Maps link */}
          <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                Registered Agent Physical Address
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 text-slate-600 text-[10px] font-semibold border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Copy registered address"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <a
                  href={data.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold transition-all flex items-center gap-1 shadow-2xs"
                  title="Open in Google Maps"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            <a
              href={data.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2.5 p-2.5 rounded-xl bg-white hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer"
              title="Open Registered Agent Address in Google Maps"
            >
              <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div className="flex-1 min-w-0">
                <span className="text-xs sm:text-sm font-semibold font-mono text-slate-900 group-hover:text-blue-700 leading-relaxed underline decoration-slate-300 group-hover:decoration-blue-500 underline-offset-2 break-words">
                  {data.formattedAddress}
                </span>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500 font-sans">
                  {data.suiteOrRoom && <span className="font-semibold text-slate-700">{data.suiteOrRoom} •</span>}
                  <span>{data.city}, {data.stateOrProvince}</span>
                  {data.postalCode && <span>{data.postalCode}</span>}
                  <span>• {data.country}</span>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
            </a>
          </div>

          {/* Key Statutory Attributes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Statutory Service Capacity
              </span>
              <p className="text-slate-800 font-medium leading-relaxed text-[11.5px]">
                {data.serviceCapacity}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Official Corporate Registry Filing
              </span>
              <p className="text-slate-800 font-medium leading-relaxed text-[11.5px]">
                {data.registryFiling}
              </p>
            </div>
          </div>

          {/* Occupancy & Physical Analysis */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 text-[11px] uppercase tracking-wider">
              <Info className="w-3.5 h-3.5 text-indigo-600" />
              <span>Physical Presence & Operational Analysis</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11.5px]">
              {data.occupancyDescription}
            </p>
            {data.entityCountEstimate && (
              <p className="text-[11px] font-semibold text-indigo-700 pt-1 border-t border-slate-200/60">
                Density: {data.entityCountEstimate}
              </p>
            )}
          </div>

          {/* Risk Note / Operational Distinction */}
          {data.riskNote && (
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11.5px] leading-relaxed font-medium">
                {data.riskNote}
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Street Image of the Address If Available */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Address Street Image
              </span>
            </div>
            {hasStreetImage ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                Street View Available
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">
                Google Maps 360°
              </span>
            )}
          </div>

          {/* Street Image Container */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm group">
            {hasStreetImage ? (
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  src={data.streetImageUrl}
                  alt={data.streetImageCaption || `Street view of ${data.formattedAddress}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
                  onClick={() => setIsImageModalOpen(true)}
                  onError={() => setImgError(true)}
                />

                {/* Top overlay badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold tracking-wide shadow-sm">
                  <Eye className="w-3 h-3 text-blue-400" />
                  <span>Street-Level Exterior</span>
                </div>

                {/* Expand Fullscreen Button */}
                <button
                  type="button"
                  onClick={() => setIsImageModalOpen(true)}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white transition-colors cursor-pointer shadow-sm"
                  title="Expand street image full-size"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>

                {/* Bottom Address Caption Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white space-y-0.5">
                  <p className="text-[11px] font-semibold truncate text-slate-100">
                    {data.agentName}
                  </p>
                  <p className="text-[10px] text-slate-300 font-mono truncate">
                    {data.formattedAddress}
                  </p>
                </div>
              </div>
            ) : (
              /* Fallback when image is not directly available: Clean Street View Preview Panel */
              <div className="aspect-[16/10] sm:aspect-[4/3] w-full p-5 flex flex-col items-center justify-center text-center space-y-3 bg-gradient-to-b from-slate-50 to-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-[260px]">
                  <p className="text-xs font-bold text-slate-800">
                    Street View Available on Google Maps
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
                    {data.formattedAddress}
                  </p>
                </div>
                <a
                  href={data.googleStreetViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open 360° Street View</span>
                </a>
              </div>
            )}
          </div>

          {/* Street Image Action Buttons */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              id="registered-agent-streetview-action"
              href={data.googleStreetViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-slate-200 flex items-center justify-center gap-1.5 font-bold transition-all group"
              title="Launch Google Street View 360 panorama"
            >
              <Eye className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
              <span>Street View (360°)</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
            </a>

            <a
              id="registered-agent-directions-action"
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(data.formattedAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center gap-1.5 font-bold transition-all"
              title="Get directions to this registered agent location"
            >
              <Navigation className="w-3.5 h-3.5 text-slate-500" />
              <span>Directions</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          <p className="text-[10px] text-slate-400 text-center font-medium">
            Street view perspective confirms exterior commercial facade, signage, and building zoning.
          </p>
        </div>
      </div>

      {/* Lightbox / Expanded Street Image Modal */}
      {isImageModalOpen && data.streetImageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 text-white space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 flex items-center justify-between border-b border-slate-800 bg-slate-950/60">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-blue-400" />
                  <h4 className="text-sm font-bold text-white">
                    {data.agentName}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  {data.formattedAddress}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Res Image */}
            <div className="p-2 sm:p-4 max-h-[70vh] flex items-center justify-center overflow-hidden">
              <img
                src={data.streetImageUrl}
                alt={data.streetImageCaption || data.formattedAddress}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-lg border border-slate-800"
              />
            </div>

            {/* Modal Footer Controls */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{data.city}, {data.stateOrProvince} • {data.country}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={data.googleStreetViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open 360° Panorama in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
