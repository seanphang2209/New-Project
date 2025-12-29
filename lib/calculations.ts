import { Assessment } from './types';

// Grid emission factors (kg CO2e per kWh) - simplified defaults
const GRID_FACTORS: Record<string, number> = {
  SG: 0.4058, // Singapore
  AU: 0.83,   // Australia
  US: 0.429,  // United States average
  EU: 0.276,  // European Union average
  DEFAULT: 0.429,
};

// Fuel emission factors (kg CO2e per liter)
const FUEL_FACTORS: Record<string, number> = {
  diesel: 2.68,
  gasoline: 2.31,
  natural_gas: 1.96, // per cubic meter (simplified)
  DEFAULT: 2.5,
};

// Scope 3 spend-based factor (kg CO2e per USD) - simplified proxy
const SCOPE3_FACTOR = 0.5; // kg CO2e per USD spent

export function calculateScope1(assessment: Assessment): number {
  if (!assessment.fuelConsumption || !assessment.fuelType) {
    return 0;
  }
  const factor = FUEL_FACTORS[assessment.fuelType] || FUEL_FACTORS.DEFAULT;
  // Convert kg to tonnes
  return (assessment.fuelConsumption * factor) / 1000;
}

export function calculateScope2(assessment: Assessment): number {
  if (!assessment.electricityUsage) {
    return 0;
  }
  // Default to US grid factor, could be enhanced to use country
  const factor = GRID_FACTORS[assessment.companyId] || GRID_FACTORS.DEFAULT;
  // Convert kg to tonnes
  return (assessment.electricityUsage * factor) / 1000;
}

export function calculateScope3(assessment: Assessment): number {
  if (!assessment.annualSpend) {
    return 0;
  }
  // Simplified spend-based proxy
  // Convert kg to tonnes
  return (assessment.annualSpend * SCOPE3_FACTOR) / 1000;
}

export function calculateTotalEmissions(assessment: Assessment): number {
  const scope1 = calculateScope1(assessment);
  const scope2 = calculateScope2(assessment);
  const scope3 = calculateScope3(assessment);
  return scope1 + scope2 + scope3;
}

export function calculateConfidenceScore(assessment: Assessment): 'low' | 'medium' | 'high' {
  let score = 0;
  
  if (assessment.electricityUsage) score += 1;
  if (assessment.fuelConsumption) score += 1;
  if (assessment.annualSpend) score += 1;
  if (assessment.employeeCount) score += 1;
  
  if (score >= 3) return 'high';
  if (score >= 2) return 'medium';
  return 'low';
}

export function calculateMaturityLevel(
  assessment: Assessment,
  benchmark?: { averageEmissions: number; bestPracticeEmissions: number }
): number {
  if (!assessment.totalEmissions || !benchmark) {
    return 1;
  }
  
  const ratio = assessment.totalEmissions / benchmark.averageEmissions;
  
  if (ratio <= 0.7) return 5; // Best practice
  if (ratio <= 0.85) return 4; // Above average
  if (ratio <= 1.0) return 3; // Average
  if (ratio <= 1.3) return 2; // Below average
  return 1; // Needs improvement
}
