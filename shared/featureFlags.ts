// Feature flags for the application

export const FEATURE_FLAGS = {
  // Negotiation module feature flags
  fitOutMilestonesNew: true,
  contractsFeesNew: true,
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS;

export const isFeatureEnabled = (flag: FeatureFlag): boolean => {
  return FEATURE_FLAGS[flag] ?? false;
};
