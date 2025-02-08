import { TomTomFuzzySearchAddressResponse } from "../integration-types/tomtomIntegrationTypes";
import { Address } from "../types/addressTypes";
import { BaseIntegrationParser } from "./baseIntegrationParser";

export class TomTomIntegrationParser extends BaseIntegrationParser {
  parseFuzzySearchAddressResponse(
    response: TomTomFuzzySearchAddressResponse
  ): Address[] {
    return response.results.map(
      (result): Address => ({
        streetNumber: result.address.streetNumber,
        streetName: result.address.streetName,
        municipalitySubdivision: result.address.municipalitySubdivision,
        municipality: result.address.municipality,
        countrySubdivision: result.address.countrySubdivision,
        postalCode: result.address.postalCode,
        countryCode: result.address.countryCode,
        country: result.address.country,
        freeformAddress: result.address.freeformAddress,
      })
    );
  }
}
