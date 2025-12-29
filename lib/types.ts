export interface Company {
  id: string;
  name: string;
  industry: string;
  size: 'small' | 'medium' | 'large' | 'enterprise';
  country: string;
  createdAt: string;
}

export interface Assessment {
  id: string;
  companyId: string;
  // Scope 1 (Direct emissions)
  fuelConsumption?: number; // liters or equivalent
  fuelType?: string;
  // Scope 2 (Indirect - purchased energy)
  electricityUsage?: number; // kWh
  // Scope 3 (Other indirect - simplified)
  annualSpend?: number; // USD or equivalent
  employeeCount?: number;
  // Results
  scope1Emissions?: number; // tCO2e
  scope2Emissions?: number; // tCO2e
  scope3Emissions?: number; // tCO2e
  totalEmissions?: number; // tCO2e
  confidenceScore?: 'low' | 'medium' | 'high';
  maturityLevel?: number; // 1-5
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  criteria: (assessment: Assessment) => boolean;
}

export interface CompanyAchievement {
  id: string;
  companyId: string;
  achievementId: string;
  unlockedAt: string;
}

export interface BenchmarkData {
  industry: string;
  size: string;
  averageEmissions: number; // tCO2e per year
  bestPracticeEmissions: number; // tCO2e per year
  maturityLevel: number; // 1-5
}
