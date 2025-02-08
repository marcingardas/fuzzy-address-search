import { BaseIntegrationParser } from "../integration-parsers/baseIntegrationParser";
import { Address } from "../types/addressTypes";
import { CountryType } from "../types/countryTypes";

export abstract class BaseIntegrationManager {
  abstract IntegrationParser: BaseIntegrationParser;

  abstract isCountrySupported(country: CountryType): boolean;

  abstract fuzzySearchAddress(
    query: string,
    countries: CountryType[]
  ): Promise<Address[]>;
}
