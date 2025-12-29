'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { dataStore } from '@/lib/data'
import { getBenchmark } from '@/lib/benchmarks'
import type { Company, Assessment, Achievement } from '@/lib/types'

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const companyId = searchParams.get('companyId')
  const [company, setCompany] = useState<Company | null>(null)
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [unlockedAchievements, setUnlockedAchievements] = useState<any[]>([])

  useEffect(() => {
    if (companyId) {
      const comp = dataStore.getCompany(companyId)
      const assess = dataStore.getLatestAssessment(companyId)
      const allAchievements = dataStore.getAchievements()
      const unlocked = dataStore.getCompanyAchievements(companyId)

      setCompany(comp || null)
      setAssessment(assess || null)
      setAchievements(allAchievements)
      setUnlockedAchievements(unlocked || [])

      // For demo: if no company found, show sample data
      if (!comp && !assess) {
        // Redirect to calculator if no data
        window.location.href = '/calculator'
      }
    } else {
      window.location.href = '/calculator'
    }
  }, [companyId])

  if (!company || !assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No assessment data found.</p>
          <Link href="/calculator" className="btn-primary">
            Start New Assessment
          </Link>
        </div>
      </div>
    )
  }

  const benchmark = company ? getBenchmark(company.industry, company.size) : null
  const maturityLevel = assessment.maturityLevel || 1
  const maturityLabels = ['Needs Improvement', 'Below Average', 'Average', 'Above Average', 'Best Practice']
  const maturityColors = ['bg-red-100 text-red-800', 'bg-orange-100 text-orange-800', 'bg-yellow-100 text-yellow-800', 'bg-blue-100 text-blue-800', 'bg-green-100 text-green-800']
  
  const maturityMessages = {
    best: "Excellent! You\u2019re performing at best practice levels. Continue monitoring and look for innovation opportunities.",
    above: "You\u2019re at industry average. Consider implementing efficiency measures to move toward best practice.",
    below: "There\u2019s significant opportunity to improve. Focus on high-impact reduction strategies."
  }

  const getUnlockedAchievementIds = () => new Set(unlockedAchievements.map(ua => ua.achievementId))

  const businessUpsides = [
    {
      title: 'Cost Savings',
      description: 'Energy efficiency measures can reduce operational costs by 10-30%',
      icon: '💰',
    },
    {
      title: 'Brand Reputation',
      description: 'Sustainability leadership improves brand perception and customer loyalty',
      icon: '⭐',
    },
    {
      title: 'Risk Management',
      description: 'Proactive carbon management reduces regulatory and transition risks',
      icon: '🛡️',
    },
    {
      title: 'Access to Capital',
      description: 'Many investors and lenders prioritize companies with strong ESG practices',
      icon: '📈',
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">{company.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carbon Maturity Level */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Carbon Maturity Level</h2>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Level {maturityLevel} of 5</span>
                  <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${maturityColors[maturityLevel - 1]}`}>
                    {maturityLabels[maturityLevel - 1]}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all ${
                      maturityLevel >= 4 ? 'bg-green-500' :
                      maturityLevel >= 3 ? 'bg-blue-500' :
                      maturityLevel >= 2 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${(maturityLevel / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {maturityLevel >= 4
                  ? maturityMessages.best
                  : maturityLevel >= 3
                  ? maturityMessages.above
                  : maturityMessages.below}
              </p>
            </div>

            {/* Benchmark Status */}
            {benchmark && assessment.totalEmissions && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-4">Benchmark Status</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Your Emissions</span>
                      <span className="text-lg font-bold">{assessment.totalEmissions.toFixed(1)} tCO₂e</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-primary-600 h-3 rounded-full"
                        style={{ width: `${Math.min((assessment.totalEmissions / benchmark.averageEmissions) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Industry Average</span>
                      <span className="text-lg">{benchmark.averageEmissions.toFixed(1)} tCO₂e</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-yellow-500 h-3 rounded-full"
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-green-700">Best Practice Target</span>
                      <span className="text-lg text-green-700">{benchmark.bestPracticeEmissions.toFixed(1)} tCO₂e</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${(benchmark.bestPracticeEmissions / benchmark.averageEmissions) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  {assessment.totalEmissions < benchmark.bestPracticeEmissions && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                      <p className="text-sm text-green-800 font-semibold">
                        🎉 Congratulations! You&apos;#39;#39;#39;re already performing at best practice levels.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Emissions Breakdown */}
            {assessment.totalEmissions && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-4">Emissions Breakdown</h2>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{assessment.scope1Emissions?.toFixed(1) || '0.0'}</p>
                    <p className="text-sm text-gray-600 mt-1">Scope 1</p>
                    <p className="text-xs text-gray-500">Direct</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{assessment.scope2Emissions?.toFixed(1) || '0.0'}</p>
                    <p className="text-sm text-gray-600 mt-1">Scope 2</p>
                    <p className="text-xs text-gray-500">Energy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{assessment.scope3Emissions?.toFixed(1) || '0.0'}</p>
                    <p className="text-sm text-gray-600 mt-1">Scope 3</p>
                    <p className="text-xs text-gray-500">Indirect</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="text-2xl font-bold text-primary-600">{assessment.totalEmissions.toFixed(1)} tCO₂e</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Achievements</h2>
              <div className="space-y-3">
                {achievements.map((achievement) => {
                  const isUnlocked = getUnlockedAchievementIds().has(achievement.id)
                  return (
                    <div
                      key={achievement.id}
                      className={`p-3 rounded-lg border-2 ${
                        isUnlocked
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div className="flex-1">
                          <p className={`font-semibold ${isUnlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                            {achievement.title}
                          </p>
                          <p className={`text-sm ${isUnlocked ? 'text-gray-700' : 'text-gray-400'}`}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Business Upsides */}
            <div className="card bg-gradient-to-br from-primary-50 to-primary-100">
              <h2 className="text-xl font-bold mb-4">Business Upsides</h2>
              <div className="space-y-4">
                {businessUpsides.map((upside, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-2xl">{upside.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{upside.title}</p>
                      <p className="text-sm text-gray-700">{upside.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="card">
              <Link href="/calculator" className="btn-primary w-full block text-center">
                New Assessment
              </Link>
              <Link href="/methodology" className="btn-secondary w-full block text-center mt-3">
                Learn Methodology
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
