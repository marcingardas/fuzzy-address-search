import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  ServiceUnavailableError,
  UnauthorizedError,
  UnexpectedError,
} from "../errors";
import { BaseIntegrationParser } from "../integration-parsers/baseIntegrationParser";
import { TomTomIntegrationParser } from "../integration-parsers/tomtomIntegrationParser";
import { TomTomFuzzySearchAddressResponse } from "../integration-types/tomtomIntegrationTypes";
import { Address } from "../types/addressTypes";
import { CountryType } from "../types/countryTypes";
import { BaseIntegrationManager } from "./baseIntegrationManager";

export class TomTomIntegrationManager extends BaseIntegrationManager {
  private apiKey: string;
  IntegrationParser: BaseIntegrationParser = new TomTomIntegrationParser();

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
  }

  isCountrySupported(country: CountryType): boolean {
    return [CountryType.AUSTRALIA.valueOf()].includes(country);
  }

  async fuzzySearchAddress(
    query: string,
    countries: CountryType[]
  ): Promise<Address[]> {
    const response = await fetch(
      `https://api.tomtom.com/search/2/search/${encodeURIComponent(
        query
      )}.json?key=${this.apiKey}&countrySet=${countries.join(",")}`
    );

    switch (response.status) {
      case 400:
        throw new BadRequestError("Bad request");
      case 401:
        throw new UnauthorizedError("Unauthorized");
      case 404:
        throw new NotFoundError("Not found");
      case 500:
        throw new InternalServerError("Internal server error");
      case 503:
        throw new ServiceUnavailableError("Service unavailable");
      default:
        if (response.status !== 200) {
          throw new UnexpectedError("Unknown error fetching data");
        }
    }

    const parsedResponse: TomTomFuzzySearchAddressResponse =
      await response.json();

    return this.IntegrationParser.parseFuzzySearchAddressResponse(
      parsedResponse
    );
  }
}
