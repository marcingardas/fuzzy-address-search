import { initialise, fuzzySearchAddress } from "../index";
import { IntegrationType } from "../types/integrationTypes";
import { deinitialise } from "../services/integrationService";

global.fetch = jest.fn();

describe("Tom Tom Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    deinitialise();
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
});
