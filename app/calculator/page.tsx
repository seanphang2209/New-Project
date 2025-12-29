'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Tooltip from '@/components/Tooltip'
import { dataStore } from '@/lib/data'
import {
  calculateScope1,
  calculateScope2,
  calculateScope3,
  calculateTotalEmissions,
  calculateConfidenceScore,
  calculateMaturityLevel,
} from '@/lib/calculations'
import { getBenchmark } from '@/lib/benchmarks'

export default function CalculatorPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    size: '' as 'small' | 'medium' | 'large' | 'enterprise' | '',
    country: 'US',
    electricityUsage: '',
    fuelConsumption: '',
    fuelType: 'diesel',
    annualSpend: '',
    employeeCount: '',
  })
  const [results, setResults] = useState<any>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSampleData = () => {
    setFormData({
      companyName: 'Example Manufacturing Co.',
      industry: 'manufacturing',
      size: 'medium',
      country: 'US',
      electricityUsage: '500000',
      fuelConsumption: '10000',
      fuelType: 'diesel',
      annualSpend: '2000000',
      employeeCount: '150',
    })
  }

  const handleSubmit = async () => {
    // Create company
    const company = dataStore.createCompany({
      name: formData.companyName,
      industry: formData.industry,
      size: formData.size as any,
      country: formData.country,
    })

    // Create assessment
    const assessment = dataStore.createAssessment({
      companyId: company.id,
      electricityUsage: formData.electricityUsage ? parseFloat(formData.electricityUsage) : undefined,
      fuelConsumption: formData.fuelConsumption ? parseFloat(formData.fuelConsumption) : undefined,
      fuelType: formData.fuelType,
      annualSpend: formData.annualSpend ? parseFloat(formData.annualSpend) : undefined,
      employeeCount: formData.employeeCount ? parseInt(formData.employeeCount) : undefined,
    })

    // Calculate emissions
    const scope1 = calculateScope1(assessment)
    const scope2 = calculateScope2(assessment)
    const scope3 = calculateScope3(assessment)
    const total = scope1 + scope2 + scope3
    const confidence = calculateConfidenceScore(assessment)

    // Get benchmark
    const benchmark = getBenchmark(formData.industry, formData.size)
    const maturity = benchmark
      ? calculateMaturityLevel({ ...assessment, totalEmissions: total }, benchmark)
      : 3

    // Update assessment with results
    const updatedAssessment = dataStore.updateAssessment(assessment.id, {
      scope1Emissions: scope1,
      scope2Emissions: scope2,
      scope3Emissions: scope3,
      totalEmissions: total,
      confidenceScore: confidence,
      maturityLevel: maturity,
    }) || assessment

    setResults({
      assessment: updatedAssessment,
      company,
      benchmark,
      scope1,
      scope2,
      scope3,
      total,
      confidence,
      maturity,
    })

    setStep(3)
  }

  const nextStep = () => {
    if (step === 1) {
      if (formData.companyName && formData.industry && formData.size) {
        setStep(2)
      }
    } else if (step === 2) {
      if (formData.electricityUsage || formData.fuelConsumption || formData.annualSpend) {
        handleSubmit()
      }
    }
  }

  const getTopActions = () => {
    const actions = []
    if (!formData.electricityUsage) {
      actions.push('Track electricity usage for more accurate Scope 2 emissions')
    }
    if (results?.scope2Emissions > (results?.scope1Emissions || 0) + (results?.scope3Emissions || 0)) {
      actions.push('Consider switching to renewable energy sources to reduce Scope 2 emissions')
    }
    if (results?.scope3Emissions > results?.scope2Emissions) {
      actions.push('Review supply chain and procurement practices to reduce Scope 3 emissions')
    }
    if (actions.length === 0) {
      actions.push('Review energy efficiency opportunities')
      actions.push('Consider carbon offset options for remaining emissions')
      actions.push('Set targets based on industry best practices')
    }
    return actions.slice(0, 3)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card">
          <h1 className="text-3xl font-bold mb-8">Carbon Footprint Calculator</h1>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="ml-2 font-medium">Company Profile</span>
              </div>
              <div className="flex-1 h-1 mx-4 bg-gray-200">
                <div className={`h-full ${step >= 2 ? 'bg-primary-600' : ''}`} style={{ width: step >= 2 ? '100%' : '0%' }}></div>
              </div>
              <div className={`flex items-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="ml-2 font-medium">Energy & Activity</span>
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select industry</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="services">Services</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Tooltip content="Company size based on annual revenue or employee count">
                    Company Size *
                  </Tooltip>
                </label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select size</option>
                  <option value="small">Small (less than $10M revenue)</option>
                  <option value="medium">Medium ($10M - $50M revenue)</option>
                  <option value="large">Large ($50M - $500M revenue)</option>
                  <option value="enterprise">Enterprise ($500M+ revenue)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="US">United States</option>
                  <option value="SG">Singapore</option>
                  <option value="AU">Australia</option>
                  <option value="EU">European Union</option>
                </select>
              </div>

              <button onClick={nextStep} className="btn-primary w-full">
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> You don&apos;#39;#39;#39;#39;#39;#39;#39;t need all fields—enter what you know. More data means higher confidence scores.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Tooltip content="Annual electricity consumption in kilowatt-hours (kWh). Check your utility bills or energy statements.">
                    Electricity Usage (kWh/year) *
                  </Tooltip>
                </label>
                <input
                  type="number"
                  name="electricityUsage"
                  value={formData.electricityUsage}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., 500000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Tooltip content="Total fuel consumption for vehicles, generators, or heating (in liters or equivalent)">
                    Fuel Consumption (liters/year)
                  </Tooltip>
                </label>
                <input
                  type="number"
                  name="fuelConsumption"
                  value={formData.fuelConsumption}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., 10000"
                />
                {formData.fuelConsumption && (
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    className="input-field mt-2"
                  >
                    <option value="diesel">Diesel</option>
                    <option value="gasoline">Gasoline</option>
                    <option value="natural_gas">Natural Gas</option>
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Tooltip content="Annual business spending (USD or equivalent). Used for simplified Scope 3 emissions calculation.">
                    Annual Business Spending (USD)
                  </Tooltip>
                </label>
                <input
                  type="number"
                  name="annualSpend"
                  value={formData.annualSpend}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., 2000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Count
                </label>
                <input
                  type="number"
                  name="employeeCount"
                  value={formData.employeeCount}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., 150"
                />
              </div>

              <div className="flex space-x-4">
                <button onClick={() => setStep(1)} className="btn-secondary flex-1">
                  Back
                </button>
                <button onClick={nextStep} className="btn-primary flex-1">
                  Calculate Emissions
                </button>
              </div>

              <button onClick={handleSampleData} className="text-primary-600 hover:text-primary-700 text-sm font-medium w-full">
                Try with sample data
              </button>
            </div>
          )}

          {step === 3 && results && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Your Carbon Footprint Results</h2>
                <p className="text-gray-600">for {results.company.name}</p>
              </div>

              {/* Total Emissions */}
              <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Total Annual Emissions</p>
                <p className="text-5xl font-bold text-primary-700 mb-2">
                  {results.total.toFixed(1)}
                </p>
                <p className="text-lg text-gray-700">tonnes CO₂e</p>
              </div>

              {/* Scope Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card">
                  <h3 className="font-semibold mb-2">Scope 1</h3>
                  <p className="text-2xl font-bold text-gray-900">{results.scope1.toFixed(1)}</p>
                  <p className="text-sm text-gray-600 mt-1">tCO₂e</p>
                  <p className="text-xs text-gray-500 mt-2">Direct emissions</p>
                </div>
                <div className="card">
                  <h3 className="font-semibold mb-2">Scope 2</h3>
                  <p className="text-2xl font-bold text-gray-900">{results.scope2.toFixed(1)}</p>
                  <p className="text-sm text-gray-600 mt-1">tCO₂e</p>
                  <p className="text-xs text-gray-500 mt-2">Purchased energy</p>
                </div>
                <div className="card">
                  <h3 className="font-semibold mb-2">Scope 3</h3>
                  <p className="text-2xl font-bold text-gray-900">{results.scope3.toFixed(1)}</p>
                  <p className="text-sm text-gray-600 mt-1">tCO₂e</p>
                  <p className="text-xs text-gray-500 mt-2">Other indirect</p>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="card">
                <h3 className="font-semibold mb-2">Confidence Score</h3>
                <div className="flex items-center space-x-4">
                  <div className={`px-4 py-2 rounded-lg ${
                    results.confidence === 'high' ? 'bg-green-100 text-green-800' :
                    results.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {results.confidence.charAt(0).toUpperCase() + results.confidence.slice(1)}
                  </div>
                  <p className="text-sm text-gray-600">
                    {results.confidence === 'high' ? 'High confidence based on comprehensive data' :
                     results.confidence === 'medium' ? 'Medium confidence - consider adding more data' :
                     'Low confidence - add more data for better estimates'}
                  </p>
                </div>
              </div>

              {/* Maturity Level */}
              {results.benchmark && (
                <div className="card">
                  <h3 className="font-semibold mb-4">Carbon Maturity Level: {results.maturity}/5</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Your emissions</span>
                      <span className="font-semibold">{results.total.toFixed(1)} tCO₂e</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Industry average</span>
                      <span>{results.benchmark.averageEmissions.toFixed(1)} tCO₂e</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Best practice</span>
                      <span>{results.benchmark.bestPracticeEmissions.toFixed(1)} tCO₂e</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Top Actions */}
              <div className="card bg-blue-50 border border-blue-200">
                <h3 className="font-semibold mb-4">Top 3 Next Actions</h3>
                <ul className="space-y-2">
                  {getTopActions().map((action, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-600 mr-2">{index + 1}.</span>
                      <span className="text-gray-700">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => router.push(`/dashboard?companyId=${results.company.id}`)}
                  className="btn-primary flex-1"
                >
                  View Dashboard
                </button>
                <button
                  onClick={() => {
                    setStep(1)
                    setResults(null)
                    setFormData({
                      companyName: '',
                      industry: '',
                      size: '' as any,
                      country: 'US',
                      electricityUsage: '',
                      fuelConsumption: '',
                      fuelType: 'diesel',
                      annualSpend: '',
                      employeeCount: '',
                    })
                  }}
                  className="btn-secondary flex-1"
                >
                  New Calculation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
