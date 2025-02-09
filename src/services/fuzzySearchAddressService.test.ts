import { fuzzySearchAddress } from "./fuzzySearchAddressService";
import { CountryType } from "../types/countryTypes";
import { getIntegration } from "./integrationService";
import { BadRequestError, ConfigurationError } from "../errors";

jest.mock("./integrationService");

describe("fuzzySearchAddressService", () => {
  const mockIntegration = {
    isCountrySupported: jest.fn(),
    fuzzySearchAddress: jest.fn(),
  };

  beforeEach(() => {
    (getIntegration as jest.Mock).mockReturnValue(mockIntegration);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if query is not a string", async () => {
    await expect(fuzzySearchAddress(123 as any)).rejects.toThrow(
      new BadRequestError("Query must be a string.")
    );
  });

  it("should throw an error if country type is not supported by the library", async () => {
    await expect(
      fuzzySearchAddress("test query", ["INVALID_COUNTRY" as any])
    ).rejects.toThrow(
      new ConfigurationError("Country type not supported by this library")
    );
  });

  it("should throw an error if country type is not supported by the integration", async () => {
    mockIntegration.isCountrySupported.mockReturnValue(false);

    await expect(
      fuzzySearchAddress("test query", [CountryType.AUSTRALIA])
    ).rejects.toThrow(
      new ConfigurationError("Country type not supported by this integration")
    );
  });

  it("should call fuzzySearchAddress on the integration with the correct parameters", async () => {
    mockIntegration.isCountrySupported.mockReturnValue(true);
    mockIntegration.fuzzySearchAddress.mockResolvedValue("result");

    const result = await fuzzySearchAddress("test query", [
      CountryType.AUSTRALIA,
    ]);

    expect(mockIntegration.isCountrySupported).toHaveBeenCalledWith(
      CountryType.AUSTRALIA
    );
    expect(mockIntegration.fuzzySearchAddress).toHaveBeenCalledWith(
      "test query",
      [CountryType.AUSTRALIA]
    );
    expect(result).toBe("result");
  });

  it("should default to Australia if no countries are provided", async () => {
    mockIntegration.isCountrySupported.mockReturnValue(true);
    mockIntegration.fuzzySearchAddress.mockResolvedValue("result");

    const result = await fuzzySearchAddress("test query");

    expect(mockIntegration.isCountrySupported).toHaveBeenCalledWith(
      CountryType.AUSTRALIA
    );
    expect(mockIntegration.fuzzySearchAddress).toHaveBeenCalledWith(
      "test query",
      [CountryType.AUSTRALIA]
    );
    expect(result).toBe("result");
  });
});
