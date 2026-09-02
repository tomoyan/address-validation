export interface AddressSuggestion {
  placeId: string | number;
  displayName: string;
  lat: number;
  lng: number;
  type?: string;
  category?: string;
  addressComponents?: {
    houseNumber?: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
    countryCode?: string;
  };
}

export interface BusinessEntity {
  id: string;
  name: string;
  category: string;
  industryGroup?: string;
  suiteOrFloor: string;
  description: string;
  status: 'active' | 'headquarters' | 'branch' | 'anchor' | 'verified';
  phone?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  priceLevel?: string;
  openingHours?: string;
  isAnchorTenant?: boolean;
  tags?: string[];
  googleMapsUrl?: string;
}

export interface PropertyBreakdown {
  buildingName?: string;
  propertyType: string;
  zoningCategory: string;
  estimatedFloors?: string;
  commercialDensity: 'High' | 'Medium' | 'Low' | 'Residential with Retail';
  walkabilityScore?: number;
  transitAccess?: string;
  neighborhoodProfile: string;
  estimatedOccupancy?: string;
  keyAmenities?: string[];
}

export interface AddressDetails {
  formattedAddress: string;
  streetNumber: string;
  streetName: string;
  subpremise?: string;
  neighborhood?: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  plusCode?: string;
  timezone?: string;
}

export type VerificationStatus =
  | 'VERIFIED_OFFICIAL_ADDRESS'
  | 'VERIFIED_BRANCH_LOCATION'
  | 'PARTIAL_MATCH'
  | 'MISMATCH_UNVERIFIED';

export interface LocalLanguageInfo {
  name: string;
  code: string;
  country: string;
  nativeName: string;
}

export interface BilingualFinding {
  titleEnglish: string;
  titleLocal: string;
  detailEnglish: string;
  detailLocal: string;
  isPositive: boolean;
}

export interface BilingualText {
  english: string;
  local: string;
}

export interface RegisteredAgentOrVirtualOfficeInfo {
  isRegisteredAgentOrVirtualOffice: boolean;
  isInputAddressAnAgentOrVirtualOffice: boolean;
  agentName: string;
  officeType: 'Commercial Registered Agent' | 'Virtual Office' | 'Statutory Registered Office' | 'Corporate Service Provider' | 'Mail Drop / CMRA' | 'Branch / Subsidiary Seat';
  formattedAddress: string;
  streetNumber?: string;
  streetName?: string;
  suiteOrRoom?: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  country: string;
  serviceCapacity: string;
  registryFiling: string;
  entityCountEstimate?: string;
  occupancyDescription: string;
  verificationRiskAssessment?: 'low' | 'medium' | 'high' | 'info';
  riskNote: string;
  googleMapsUrl: string;
  googleStreetViewUrl: string;
  streetImageUrl?: string;
  streetImageCaption?: string;
}

export interface CompanyVerificationReport {
  companyName: string;
  inputAddress: string;
  verificationStatus: VerificationStatus;
  verdictTitle: BilingualText;
  verdictSummary: BilingualText;
  confidenceScore: number;
  matchType: string;
  isRealBusinessAddress: boolean;
  locationType: string;
  localLanguage: LocalLanguageInfo;
  registeredAgentOrVirtualOffice?: RegisteredAgentOrVirtualOfficeInfo;
  bilingualData: {
    companyNameEnglish: string;
    companyNameLocal: string;
    formattedAddressEnglish: string;
    formattedAddressLocal: string;
    relationshipToCompanyEnglish: string;
    relationshipToCompanyLocal: string;
    businessCategoryEnglish: string;
    businessCategoryLocal: string;
    operatingStatusEnglish: string;
    operatingStatusLocal: string;
    officialRegistryNotesEnglish: string;
    officialRegistryNotesLocal: string;
    keyFindings: BilingualFinding[];
    warningsOrDiscrepancies?: BilingualText[];
    headquartersInfoIfBranch?: {
      name: string;
      addressEnglish: string;
      addressLocal?: string;
      city: string;
      country: string;
    };
  };
  addressDetails: AddressDetails;
  propertyBreakdown: PropertyBreakdown;
  businesses: BusinessEntity[];
  commercialHighlights: string[];
  googleMapsUrl: string;
  googleMapsDirectionsUrl: string;
  googleStreetViewUrl: string;
  verifiedAt: string;
  sourceConfidence?: string;
}

export interface VerificationHistoryItem {
  id: string;
  companyName: string;
  companyAddress: string;
  verificationStatus: VerificationStatus;
  confidenceScore: number;
  country?: string;
  localLanguage: string;
  timestamp: number;
}

export interface SearchHistoryItem {
  id: string;
  address: string;
  displayName: string;
  lat: number;
  lng: number;
  timestamp: number;
  businessCount: number;
}

export interface AddressReport {
  query: string;
  displayName: string;
  sourceConfidence: string;
  verifiedAt: string;
  addressDetails: AddressDetails;
  propertyBreakdown: PropertyBreakdown;
  businesses: BusinessEntity[];
  commercialHighlights: string[];
  googleMapsUrl: string;
  googleMapsDirectionsUrl: string;
  googleStreetViewUrl: string;
}

export interface SampleVerificationCase {
  label: string;
  companyName: string;
  companyAddress: string;
  country: string;
  flag: string;
  language: string;
  expectedStatus: VerificationStatus;
  category: string;
  note: string;
}

