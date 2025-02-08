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
    throw new Error("Integration type is required");
  }

  if (!Object.keys(IntegrationType).includes(integrationType)) {
    throw new Error("Integration type is not valid");
  }

  if (!integrationTypeToIntegrationClassMap[integrationType]) {
    throw new Error("Integration does not exist");
  }

  const IntegrationClass =
    integrationTypeToIntegrationClassMap[integrationType];

  if (!Integration) {
    Integration = new IntegrationClass(apiKey);
  }
};

export const getIntegration = (): BaseIntegrationManager => {
  if (!Integration) {
    throw new Error(
      "Integration is not initialised. Call initialise(integrationType, apiKey) first."
    );
  }

  return Integration;
};
