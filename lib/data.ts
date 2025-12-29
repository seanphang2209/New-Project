import { Company, Assessment, Achievement, CompanyAchievement } from './types';

// In-memory storage for MVP - data persists only during the session
// In production, replace with Cloudflare D1 or KV for persistent storage
// Note: Data resets on page refresh in current implementation
class DataStore {
  private companies: Map<string, Company> = new Map();
  private assessments: Map<string, Assessment> = new Map();
  private achievements: Achievement[] = [];
  private companyAchievements: Map<string, CompanyAchievement[]> = new Map();

  constructor() {
    this.initializeAchievements();
  }

  private initializeAchievements() {
    this.achievements = [
      {
        id: 'first-assessment',
        title: 'First Steps',
        description: 'Completed your first carbon footprint assessment',
        icon: '🌱',
        criteria: (assessment) => !!assessment.totalEmissions,
      },
      {
        id: 'scope-coverage',
        title: 'Full Picture',
        description: 'Included all three scopes in your assessment',
        icon: '📊',
        criteria: (assessment) =>
          !!assessment.scope1Emissions &&
          !!assessment.scope2Emissions &&
          !!assessment.scope3Emissions,
      },
      {
        id: 'below-average',
        title: 'Above Average',
        description: 'Emissions below industry average',
        icon: '⭐',
        criteria: (assessment) => (assessment.maturityLevel || 0) >= 3,
      },
      {
        id: 'best-practice',
        title: 'Best Practice',
        description: 'Emissions at best practice level',
        icon: '🏆',
        criteria: (assessment) => (assessment.maturityLevel || 0) >= 4,
      },
    ];
  }

  // Company methods
  createCompany(company: Omit<Company, 'id' | 'createdAt'>): Company {
    const id = `company-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    const newCompany: Company = {
      ...company,
      id,
      createdAt: new Date().toISOString(),
    };
    this.companies.set(id, newCompany);
    return newCompany;
  }

  getCompany(id: string): Company | undefined {
    return this.companies.get(id);
  }

  // Assessment methods
  createAssessment(assessment: Omit<Assessment, 'id' | 'createdAt'>): Assessment {
    const id = `assessment-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    const newAssessment: Assessment = {
      ...assessment,
      id,
      createdAt: new Date().toISOString(),
    };
    this.assessments.set(id, newAssessment);
    
    // Check and unlock achievements
    this.checkAchievements(newAssessment.companyId, newAssessment);
    
    return newAssessment;
  }

  getAssessment(id: string): Assessment | undefined {
    return this.assessments.get(id);
  }

  getLatestAssessment(companyId: string): Assessment | undefined {
    const allAssessments = Array.from(this.assessments.values())
      .filter((a) => a.companyId === companyId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return allAssessments[0];
  }

  updateAssessment(id: string, updates: Partial<Assessment>): Assessment | undefined {
    const assessment = this.assessments.get(id);
    if (!assessment) return undefined;
    
    const updated = { ...assessment, ...updates };
    this.assessments.set(id, updated);
    
    // Re-check achievements with updated data
    this.checkAchievements(updated.companyId, updated);
    
    return updated;
  }

  // Achievement methods
  getAchievements(): Achievement[] {
    return this.achievements;
  }

  getCompanyAchievements(companyId: string): CompanyAchievement[] {
    return this.companyAchievements.get(companyId) || [];
  }

  private checkAchievements(companyId: string, assessment: Assessment) {
    const unlocked = this.companyAchievements.get(companyId) || [];
    const unlockedIds = new Set(unlocked.map((ua) => ua.achievementId));

    for (const achievement of this.achievements) {
      if (!unlockedIds.has(achievement.id) && achievement.criteria(assessment)) {
        const companyAchievement: CompanyAchievement = {
          id: `ca-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
          companyId,
          achievementId: achievement.id,
          unlockedAt: new Date().toISOString(),
        };
        unlocked.push(companyAchievement);
        unlockedIds.add(achievement.id);
      }
    }

    this.companyAchievements.set(companyId, unlocked);
  }
}

// Singleton instance
export const dataStore = new DataStore();
