import Link from 'next/link'

export default function MethodologyPage() {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Methodology</h1>
          <p className="text-xl text-gray-600">
            Understanding how we calculate your carbon footprint
          </p>
        </div>

        {/* Scope Explanation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Understanding Emission Scopes</h2>
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-semibold mb-3">Scope 1: Direct Emissions</h3>
              <p className="text-gray-700 mb-3">
                Direct greenhouse gas emissions from sources owned or controlled by your organization. This includes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Fuel combustion in company vehicles</li>
                <li>On-site fuel consumption for generators, boilers, or heating</li>
                <li>Fugitive emissions from refrigeration or air conditioning systems</li>
              </ul>
              <p className="text-gray-600 text-sm mt-4">
                <strong>How we calculate:</strong> We use standard emission factors for common fuel types (diesel, gasoline, natural gas) based on the volume consumed. These factors are aligned with IPCC guidelines and EPA standards.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-3">Scope 2: Indirect Emissions from Purchased Energy</h3>
              <p className="text-gray-700 mb-3">
                Indirect greenhouse gas emissions from the generation of purchased electricity, steam, heating, and cooling consumed by your organization.
              </p>
              <p className="text-gray-600 text-sm mt-4">
                <strong>How we calculate:</strong> We multiply your electricity consumption (kWh) by grid emission factors specific to your country or region. These factors reflect the average carbon intensity of the electricity grid in that location.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <p className="text-sm font-semibold mb-2">Grid Emission Factors Used:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• United States: 0.429 kg CO₂e/kWh</li>
                  <li>• Singapore: 0.406 kg CO₂e/kWh</li>
                  <li>• Australia: 0.830 kg CO₂e/kWh</li>
                  <li>• European Union: 0.276 kg CO₂e/kWh</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-3">Scope 3: Other Indirect Emissions</h3>
              <p className="text-gray-700 mb-3">
                All other indirect emissions that occur in your value chain, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Purchased goods and services</li>
                <li>Business travel</li>
                <li>Waste disposal</li>
                <li>Employee commuting</li>
                <li>Upstream and downstream transportation</li>
              </ul>
              <p className="text-gray-600 text-sm mt-4">
                <strong>How we calculate (simplified):</strong> For this MVP, we use a spend-based proxy method that estimates emissions based on your annual business spending. This provides a rough approximation suitable for initial assessments. For comprehensive Scope 3 analysis, we recommend working with specialized consultants as your carbon management program matures.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This is a simplified Scope 3 calculation. Full Scope 3 assessments can be complex and may require detailed supplier data and specialized methodologies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Assumptions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Key Assumptions</h2>
          <div className="card">
            <ul className="space-y-4 text-gray-700">
              <li>
                <strong>Emission Factors:</strong> We use standard emission factors from recognized sources including the IPCC, EPA, and national energy agencies. These factors are updated periodically as methodologies improve.
              </li>
              <li>
                <strong>Scope 3 Proxy:</strong> The spend-based Scope 3 factor (0.5 kg CO₂e per USD) is a simplified average that may not reflect your specific industry or supply chain characteristics.
              </li>
              <li>
                <strong>Time Period:</strong> Calculations are based on annual data. If you input monthly or quarterly data, please convert to annual figures for accurate results.
              </li>
              <li>
                <strong>Currency:</strong> Financial inputs should be in USD or converted to USD equivalents for consistency.
              </li>
              <li>
                <strong>Grid Factors:</strong> Grid emission factors are country-level averages and may not reflect your specific utility provider&#39;s energy mix.
              </li>
            </ul>
          </div>
        </section>

        {/* Frameworks */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Alignment with Global Frameworks</h2>
          <div className="card">
            <p className="text-gray-700 mb-4">
              CarbonAtlas methodologies are aligned with internationally recognized frameworks including:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>GHG Protocol Corporate Standard:</strong> Our scope definitions and calculation approaches align with the Greenhouse Gas Protocol, the most widely used international accounting tool for understanding, quantifying, and managing greenhouse gas emissions.
              </li>
              <li>
                <strong>ISO 14064:</strong> Our approach is aligned with ISO 14064 standards for greenhouse gas accounting and verification.
              </li>
              <li>
                <strong>National Standards:</strong> Our emission factors and methodologies consider national standards including EPA (United States) and similar agencies in other countries.
              </li>
            </ul>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> While our methodologies are aligned with these frameworks, CarbonAtlas provides decision-support estimates only. We are not a certification body, and our tool is not a substitute for formal verification or assurance services.
              </p>
            </div>
          </div>
        </section>

        {/* Confidence Scoring */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Confidence Scores</h2>
          <div className="card">
            <p className="text-gray-700 mb-4">
              Each assessment includes a confidence score (Low, Medium, High) that reflects the completeness and quality of the input data:
            </p>
            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-lg font-semibold">High</span>
                  <span className="text-gray-700">3-4 data points provided (electricity, fuel, spending, employees)</span>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg font-semibold">Medium</span>
                  <span className="text-gray-700">2 data points provided</span>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-lg font-semibold">Low</span>
                  <span className="text-gray-700">1 or fewer data points provided</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              Higher confidence scores indicate more reliable estimates. We recommend providing as much data as possible for the most accurate assessment.
            </p>
          </div>
        </section>

        {/* Benchmarking */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Benchmarking Methodology</h2>
          <div className="card">
            <p className="text-gray-700 mb-4">
              Our benchmarking compares your emissions against industry averages and best practice levels based on:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Industry sector (manufacturing, retail, services, hospitality)</li>
              <li>Company size (small, medium, large, enterprise)</li>
              <li>Published industry data and emission factor databases</li>
            </ul>
            <p className="text-gray-600 text-sm">
              Benchmark data is compiled from industry reports, government statistics, and academic research. It represents typical performance levels and should be used as general guidance rather than strict targets. Industry best practices may vary significantly based on specific business models, geographic location, and other factors.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mb-12">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-900 mb-4">Disclaimer</h2>
            <div className="space-y-3 text-red-800">
              <p>
                <strong>Decision-support estimates only.</strong> CarbonAtlas provides estimates to support business decision-making. These estimates are not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Legal advice or compliance guarantees</li>
                <li>Certification or verification of emissions</li>
                <li>Assurance services or third-party validation</li>
                <li>Substitutes for professional consulting or formal GHG inventories</li>
              </ul>
              <p className="mt-4">
                Results should be verified with qualified professionals for compliance, reporting, or certification purposes. CarbonAtlas makes no warranties or representations regarding the accuracy, completeness, or suitability of these estimates for any particular purpose.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <Link href="/calculator" className="btn-primary text-lg px-8">
            Calculate Your Carbon Footprint
          </Link>
        </section>
      </div>
    </div>
  )
}
