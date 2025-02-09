import { initialise, deinitialise, getIntegration } from "./integrationService";
import { IntegrationType } from "../types/integrationTypes";
import { TomTomIntegrationManager } from "../integration-managers/tomtomIntegrationManager";
import { ConfigurationError } from "../errors";

describe("integrationService", () => {
  const apiKey = "test-api-key";

  afterEach(() => {
    deinitialise();
  });

  it("should initialise the integration with valid type and apiKey", () => {
    initialise(IntegrationType.TOMTOM, apiKey);
    const integration = getIntegration();
    expect(integration).toBeInstanceOf(TomTomIntegrationManager);
  });

  it("should throw an error if integration type is not provided", () => {
    expect(() => initialise(null as any, apiKey)).toThrow(
      new ConfigurationError("Integration type is required")
    );
  });

  it("should throw an error if integration type is invalid", () => {
    expect(() => initialise("INVALID_TYPE" as any, apiKey)).toThrow(
      new ConfigurationError("Integration type is not valid")
    );
  });

  it("should throw an error if getIntegration is called before initialise", () => {
    expect(() => getIntegration()).toThrow(
      new ConfigurationError(
        "Integration is not initialised. Call initialise(integrationType, apiKey) first."
      )
    );
  });
});
