import { Address } from "../types/addressTypes";

export abstract class BaseIntegrationParser {
  abstract parseFuzzySearchAddressResponse(response: unknown): Address[];
}
