import { TomTomIntegrationParser } from "./tomtomIntegrationParser";
import { TomTomFuzzySearchAddressResponse } from "../integration-types/tomtomIntegrationTypes";
import { Address } from "../types/addressTypes";
import { ParsingError } from "../errors";

describe("TomTomIntegrationParser", () => {
  let parser: TomTomIntegrationParser;

  beforeEach(() => {
    parser = new TomTomIntegrationParser();
  });

  it("should parse a valid fuzzy search address response", () => {
    const mockResponse: TomTomFuzzySearchAddressResponse = {
      results: [
        {
          address: {
            streetNumber: "1",
            streetName: "George St",
            municipalitySubdivision: "Sydney",
            municipality: "Sydney",
            countrySecondarySubdivision: "Sydney Metro",
            countrySubdivision: "NSW",
            countrySubdivisionName: "New South Wales",
            countrySubdivisionCode: "NSW",
            postalCode: "2000",
            countryCode: "AU",
            country: "Australia",
            countryCodeISO3: "AUS",
            freeformAddress: "1 George St, Sydney, NSW 2000, Australia",
            localName: "Sydney",
          },
        },
      ],
    };

    const expectedAddresses: Address[] = [
      {
        streetNumber: "1",
        streetName: "George St",
        municipalitySubdivision: "Sydney",
        municipality: "Sydney",
        countrySubdivision: "NSW",
        postalCode: "2000",
        countryCode: "AU",
        country: "Australia",
        freeformAddress: "1 George St, Sydney, NSW 2000, Australia",
      },
    ];

    const result = parser.parseFuzzySearchAddressResponse(mockResponse);
    expect(result).toEqual(expectedAddresses);
  });

  it("should throw an error when parsing an invalid response", () => {
    const invalidResponse = {
      results: null,
    } as unknown as TomTomFuzzySearchAddressResponse;

    expect(() => {
      parser.parseFuzzySearchAddressResponse(invalidResponse);
    }).toThrow(new ParsingError("Error parsing TomTom Integration response"));
  });
});
