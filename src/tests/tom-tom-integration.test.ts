import { initialise, fuzzySearchAddress } from "../index";
import { IntegrationType } from "../types/integrationTypes";
import { CountryType } from "../types/countryTypes";

global.fetch = jest.fn();

describe("Tom Tom Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return addresses for a valid fuzzy address search", async () => {
    const mockResponse = {
      results: [
        {
          address: {
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
        },
      ],
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
      new Response(JSON.stringify(mockResponse))
    );

    initialise(IntegrationType.TOMTOM, "test-api-key");

    const result = await fuzzySearchAddress("1 George St, Sydney");

    expect(result).toEqual([
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
    ]);
  });

  it("should throw an error for unsupported country type", async () => {
    initialise(IntegrationType.TOMTOM, "test-api-key");

    try {
      await fuzzySearchAddress("1 George St, Sydney", [
        "INVALID_COUNTRY" as CountryType,
      ]);
    } catch (error) {
      expect(error).toEqual(new Error("Country type is not supported."));
    }
  });

  it("should throw an error if integration is not initialized", async () => {
    try {
      await fuzzySearchAddress("1 George St, Sydney");
    } catch (error) {
      expect(error).toEqual(new Error("Country type is not supported."));
    }
  });
});
