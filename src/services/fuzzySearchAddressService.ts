import { CountryType } from "../types/countryTypes";
import { getIntegration } from "./integrationService";

export const fuzzySearchAddress = async (
  query: string,
  countries: CountryType[] = [CountryType.AUSTRALIA]
) => {
  if (typeof query !== "string") {
    throw new Error("Query must be a string.");
  }

  const Integration = getIntegration();

  countries.forEach((country) => {
    if (!Object.values(CountryType).includes(country)) {
      throw new Error("This country type is not supported by this library.");
    }

    if (!Integration.isCountrySupported(country)) {
      throw new Error(
        "This country type is not supported by this integration."
      );
    }
  });

  return await Integration.fuzzySearchAddress(query, countries);
};
