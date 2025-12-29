import { BenchmarkData } from './types';

// Simplified benchmark data - in production, this would come from a database
export const BENCHMARKS: BenchmarkData[] = [
  {
    industry: 'manufacturing',
    size: 'small',
    averageEmissions: 150,
    bestPracticeEmissions: 100,
    maturityLevel: 3,
  },
  {
    industry: 'manufacturing',
    size: 'medium',
    averageEmissions: 500,
    bestPracticeEmissions: 350,
    maturityLevel: 3,
  },
  {
    industry: 'manufacturing',
    size: 'large',
    averageEmissions: 2000,
    bestPracticeEmissions: 1400,
    maturityLevel: 3,
  },
  {
    industry: 'retail',
    size: 'small',
    averageEmissions: 50,
    bestPracticeEmissions: 30,
    maturityLevel: 3,
  },
  {
    industry: 'retail',
    size: 'medium',
    averageEmissions: 200,
    bestPracticeEmissions: 120,
    maturityLevel: 3,
  },
  {
    industry: 'retail',
    size: 'large',
    averageEmissions: 1000,
    bestPracticeEmissions: 600,
    maturityLevel: 3,
  },
  {
    industry: 'services',
    size: 'small',
    averageEmissions: 20,
    bestPracticeEmissions: 10,
    maturityLevel: 3,
  },
  {
    industry: 'services',
    size: 'medium',
    averageEmissions: 100,
    bestPracticeEmissions: 50,
    maturityLevel: 3,
  },
  {
    industry: 'services',
    size: 'large',
    averageEmissions: 500,
    bestPracticeEmissions: 250,
    maturityLevel: 3,
  },
  {
    industry: 'hospitality',
    size: 'small',
    averageEmissions: 80,
    bestPracticeEmissions: 50,
    maturityLevel: 3,
  },
  {
    industry: 'hospitality',
    size: 'medium',
    averageEmissions: 300,
    bestPracticeEmissions: 180,
    maturityLevel: 3,
  },
  {
    industry: 'hospitality',
    size: 'large',
    averageEmissions: 1500,
    bestPracticeEmissions: 900,
    maturityLevel: 3,
  },
];

export function getBenchmark(industry: string, size: string): BenchmarkData | null {
  return BENCHMARKS.find(
    (b) => b.industry === industry.toLowerCase() && b.size === size.toLowerCase()
  ) || BENCHMARKS[0] || null;
}
