import { ConfigurationError } from "../errors";
import { BaseIntegrationManager } from "../integration-managers/baseIntegrationManager";
import { TomTomIntegrationManager } from "../integration-managers/tomtomIntegrationManager";
import { IntegrationType } from "../types/integrationTypes";

const integrationTypeToIntegrationClassMap = {
  [IntegrationType.TOMTOM]: TomTomIntegrationManager,
};

let Integration: BaseIntegrationManager | null = null;

export const initialise = (
  integrationType: IntegrationType,
  apiKey: string
) => {
  if (!integrationType) {
    throw new ConfigurationError("Integration type is required");
  }

  if (!Object.keys(IntegrationType).includes(integrationType)) {
    throw new ConfigurationError("Integration type is not valid");
  }

  if (!integrationTypeToIntegrationClassMap[integrationType]) {
    throw new ConfigurationError("Integration does not exist");
  }

  const IntegrationClass =
    integrationTypeToIntegrationClassMap[integrationType];

  if (!Integration) {
    Integration = new IntegrationClass(apiKey);
  }
};

export const deinitialise = () => {
  Integration = null;
};

export const getIntegration = (): BaseIntegrationManager => {
  if (!Integration) {
    throw new ConfigurationError(
      "Integration is not initialised. Call initialise(integrationType, apiKey) first."
    );
  }

  return Integration;
};
