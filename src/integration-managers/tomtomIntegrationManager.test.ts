import { TomTomIntegrationManager } from "./tomtomIntegrationManager";
import { CountryType } from "../types/countryTypes";
import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
  ServiceUnavailableError,
  UnexpectedError,
} from "../errors";
import { TomTomFuzzySearchAddressResponse } from "../integration-types/tomtomIntegrationTypes";

describe("TomTomIntegrationManager", () => {
  const apiKey = "test-api-key";
  let manager: TomTomIntegrationManager;

  beforeEach(() => {
    manager = new TomTomIntegrationManager(apiKey);
  });

  describe("isCountrySupported", () => {
    it("should return true for supported country", () => {
      expect(manager.isCountrySupported(CountryType.AUSTRALIA)).toBe(true);
    });

    it("should return false for unsupported country", () => {
      expect(manager.isCountrySupported("US" as CountryType)).toBe(false);
    });
  });

  describe("fuzzySearchAddress", () => {
    const query = "test query";
    const countries = [CountryType.AUSTRALIA];
    const mockResponse: TomTomFuzzySearchAddressResponse = {
      results: [],
    };

    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValue({
        status: 200,
        json: jest.fn().mockResolvedValue(mockResponse),
      });
    });

    it("should return parsed addresses on successful response", async () => {
      const addresses = await manager.fuzzySearchAddress(query, countries);
      expect(addresses).toEqual([]);
    });

    it("should throw BadRequestError on 400 response", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({ status: 400 });
      await expect(
        manager.fuzzySearchAddress(query, countries)
      ).rejects.toThrow(new BadRequestError("Bad request"));
    });

    it("should throw UnauthorizedError on 401 response", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({ status: 401 });
      await expect(
        manager.fuzzySearchAddress(query, countries)
      ).rejects.toThrow(new UnauthorizedError("Unauthorized"));
    });

    it("should throw NotFoundError on 404 response", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({ status: 404 });
      await expect(
        manager.fuzzySearchAddress(query, countries)
      ).rejects.toThrow(new NotFoundError("Not found"));
    });

    it("should throw InternalServerError on 500 response", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({ status: 500 });
      await expect(
        manager.fuzzySearchAddress(query, countries)
      ).rejects.toThrow(new InternalServerError("Internal server error"));
    });

    it("should throw ServiceUnavailableError on 503 response", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({ status: 503 });
      await expect(
        manager.fuzzySearchAddress(query, countries)
      ).rejects.toThrow(new ServiceUnavailableError("Service unavailable"));
    });

    it("should throw UnexpectedError on unknown response status", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({ status: 418 });
      await expect(
        manager.fuzzySearchAddress(query, countries)
      ).rejects.toThrow(new UnexpectedError("Unknown error fetching data"));
    });

    it("should send correct request", async () => {
      await manager.fuzzySearchAddress(query, countries);
      expect(global.fetch).toHaveBeenCalledWith(
        `https://api.tomtom.com/search/2/search/${encodeURIComponent(
          query
        )}.json?key=${apiKey}&countrySet=${countries.join(",")}`
      );
    });

    it("should pass response to parser", async () => {
      const parseSpy = jest.spyOn(
        manager.IntegrationParser,
        "parseFuzzySearchAddressResponse"
      );
      await manager.fuzzySearchAddress(query, countries);
      expect(parseSpy).toHaveBeenCalledWith(mockResponse);
    });
  });
});
