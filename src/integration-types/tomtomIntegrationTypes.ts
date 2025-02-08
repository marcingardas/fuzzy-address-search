export type TomTomAddress = {
  streetNumber: string;
  streetName: string;
  municipalitySubdivision: string;
  municipality: string;
  countrySecondarySubdivision: string;
  countrySubdivision: string;
  countrySubdivisionName: string;
  countrySubdivisionCode: string;
  postalCode: string;
  countryCode: string;
  country: string;
  countryCodeISO3: string;
  freeformAddress: string;
  localName: string;
};

export type TomTomResult = {
  address: TomTomAddress;
};

export type TomTomFuzzySearchAddressResponse = {
  results: TomTomResult[];
};
