import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Measure Your Business Carbon Footprint
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Free carbon footprint calculator for business. Understand your emissions, benchmark against industry standards, and discover practical steps to reduce your impact.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/calculator" className="btn-primary text-lg px-8">
                Calculate Your Carbon Footprint
              </Link>
              <Link href="/methodology" className="btn-secondary text-lg px-8">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Your Data</h3>
              <p className="text-gray-600">
                Use our carbon emissions calculator for business to input your energy usage, fuel consumption, and business spending. Our business carbon calculator makes it simple.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Your Results</h3>
              <p className="text-gray-600">
                Receive instant estimates for Scope 1, 2, and simplified Scope 3 emissions. See how your company carbon footprint compares to industry benchmarks.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Take Action</h3>
              <p className="text-gray-600">
                Understand your carbon footprint calculation results and get personalized recommendations to reduce emissions and unlock business benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-2xl font-semibold mb-4">Comprehensive Emissions Analysis</h3>
              <p className="text-gray-700 mb-4">
                Our carbon footprint calculator for business provides detailed breakdowns across all three scopes. Calculate your company carbon footprint with confidence using our carbon emission calculator.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Scope 1: Direct emissions from fuel and energy</li>
                <li>Scope 2: Indirect emissions from purchased electricity</li>
                <li>Scope 3: Simplified indirect emissions from business activities</li>
              </ul>
            </div>
            <div className="card">
              <h3 className="text-2xl font-semibold mb-4">Industry Benchmarking</h3>
              <p className="text-gray-700 mb-4">
                Compare your carbon footprint calculator business results against industry standards. See where you stand and identify opportunities for improvement.
              </p>
              <p className="text-gray-600">
                Whether you&apos;#39;#39;#39;#39;#39;#39;re a small business carbon footprint calculator user or managing enterprise emissions, we provide relevant benchmarks for your industry and size.
              </p>
            </div>
            <div className="card">
              <h3 className="text-2xl font-semibold mb-4">Maturity Assessment</h3>
              <p className="text-gray-700 mb-4">
                Get a clear carbon maturity level (1-5) that helps you understand your current state and plan your journey toward better carbon management.
              </p>
              <p className="text-gray-600">
                Our carbon footprint calculator for companies helps you measure business carbon footprint effectively and track progress over time.
              </p>
            </div>
            <div className="card">
              <h3 className="text-2xl font-semibold mb-4">Achievements & Insights</h3>
              <p className="text-gray-700 mb-4">
                Unlock achievements as you improve, and discover practical business upsides from carbon reduction efforts—from cost savings to brand reputation.
              </p>
              <p className="text-gray-600">
                Track your progress with our carbon footprint quiz and see how measuring your company&apos;#39;#39;#39;#39;#39;#39;s carbon footprint leads to real business value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benchmarks */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Industry Benchmarks</h2>
          <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
            Our corporate carbon footprint calculator compares your results against industry averages and best practices. Whether you&apos;#39;#39;#39;#39;#39;#39;re using a carbon footprint calculator for manufacturing, a hotel carbon footprint calculator, or a farm carbon footprint calculator, we provide relevant benchmarks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card text-center">
              <h4 className="font-semibold text-lg mb-2">Manufacturing</h4>
              <p className="text-sm text-gray-600">Carbon footprint calculator for manufacturing businesses</p>
            </div>
            <div className="card text-center">
              <h4 className="font-semibold text-lg mb-2">Retail</h4>
              <p className="text-sm text-gray-600">Company carbon calculator for retail operations</p>
            </div>
            <div className="card text-center">
              <h4 className="font-semibold text-lg mb-2">Services</h4>
              <p className="text-sm text-gray-600">Business carbon footprint calculator for service companies</p>
            </div>
            <div className="card text-center">
              <h4 className="font-semibold text-lg mb-2">Hospitality</h4>
              <p className="text-sm text-gray-600">Hotel carbon footprint calculator and more</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Track Your Progress</h2>
          <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
            As you measure carbon footprint business activities and improve your results, unlock achievements that recognize your progress. Companies that measure carbon footprint consistently see better outcomes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="text-4xl mb-2">🌱</div>
              <h4 className="font-semibold mb-2">First Steps</h4>
              <p className="text-sm text-gray-600">Complete your first assessment</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-2">📊</div>
              <h4 className="font-semibold mb-2">Full Picture</h4>
              <p className="text-sm text-gray-600">Include all three scopes</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-2">⭐</div>
              <h4 className="font-semibold mb-2">Above Average</h4>
              <p className="text-sm text-gray-600">Beat industry averages</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-2">🏆</div>
              <h4 className="font-semibold mb-2">Best Practice</h4>
              <p className="text-sm text-gray-600">Achieve best practice levels</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Guardrails */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Trust & Transparency</h2>
          <div className="max-w-4xl mx-auto">
            <div className="card mb-6">
              <h3 className="text-xl font-semibold mb-4">Our Approach</h3>
              <p className="text-gray-700 mb-4">
                CarbonAtlas provides decision-support estimates to help you understand and measure your company&apos;#39;#39;#39;#39;#39;#39;s carbon footprint. Our carbon footprint calculator for business is designed to be simple, clear, and actionable.
              </p>
              <p className="text-gray-700 mb-4">
                We align with global frameworks including the GHG Protocol, but our tool is not a certification or compliance system. Think of us as your first step in understanding how to calculate carbon footprint for a business.
              </p>
              <p className="text-gray-700">
                Our free carbon footprint calculator for business gives you instant insights into your carbon emissions calculator results, helping you make informed decisions about reducing your business carbon footprint.
              </p>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-gray-800 font-semibold mb-2">Important Disclaimer</p>
              <p className="text-sm text-gray-700">
                Decision-support estimates only. Not legal advice, certification, or assurance. Results should be verified with qualified professionals for compliance purposes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">What is a carbon footprint calculator?</h3>
              <p className="text-gray-700">
                A carbon footprint calculator helps you measure carbon footprint by estimating the greenhouse gas emissions from your activities. Our carbon footprint calculator for business focuses on business operations across Scope 1, 2, and simplified Scope 3 emissions.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">How do I calculate my business carbon footprint?</h3>
              <p className="text-gray-700">
                Use our business carbon calculator by entering your energy usage, fuel consumption, and business spending. Our carbon footprint calculator for companies guides you through each step. You can also use the &quot;Try with sample data&quot; option to see how it works.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">Is this carbon footprint calculator for business free?</h3>
              <p className="text-gray-700">
                Yes, our free carbon footprint calculator for business is completely free to use. Calculate company carbon footprint as many times as you need to track your progress.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">What makes this the best carbon footprint calculator for business?</h3>
              <p className="text-gray-700">
                CarbonAtlas combines easy-to-use carbon footprint calculation with industry benchmarking, maturity assessment, and practical insights. Our carbon footprint calculator business tool is designed specifically for businesses, not just individuals.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">How accurate is the carbon footprint calculator?</h3>
              <p className="text-gray-700">
                Our carbon emission calculator uses standard emission factors aligned with global frameworks. Results include confidence scores (low, medium, high) based on data completeness. More detailed inputs lead to higher confidence estimates.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">Can I use this for small business carbon footprint calculation?</h3>
              <p className="text-gray-700">
                Absolutely. Our SME carbon footprint calculator works for businesses of all sizes, from small business carbon footprint calculator needs to enterprise-level corporate carbon footprint calculator requirements. The carbon footprint calculator small business option is perfect for startups and SMEs.
              </p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold mb-2">What about Scope 3 emissions calculator features?</h3>
              <p className="text-gray-700">
                Our scope 3 emissions calculator uses a simplified spend-based approach suitable for MVP assessment. For comprehensive Scope 3 analysis, we recommend working with specialized consultants as your program matures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO & Glossary Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Understanding Carbon Footprints</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">
              Whether you&apos;#39;#39;#39;#39;#39;#39;re looking for a carbon footprint calculator, a carbon emissions calculator, a carbon emission calculator, a GHG emissions calculator, a carbon calculator, a footprint calculator, a scope 3 calculator, or a carbon offset calculator, understanding how to measure carbon footprint is essential for modern businesses.
            </p>
            <p className="text-gray-700 mb-4">
              Learning how to calculate carbon footprint and how to measure carbon footprint starts with understanding your business activities. Our carbon footprint test helps you identify where emissions come from, and our carbon footprint quiz provides educational insights into carbon footprint calculation.
            </p>
            <p className="text-gray-700 mb-4">
              Many businesses ask: &quot;How do I calculate carbon footprint of a company?&quot; or &quot;How do I calculate carbon footprint for a business?&quot; The answer begins with measuring your energy use, transportation, and business operations. Our carbon footprint calculator for industry supports various sectors, making it easier to calculate carbon footprint business activities.
            </p>
            <p className="text-gray-700 mb-4">
              From the EPA carbon footprint calculator for business methodology to industry-specific tools like carbon footprint calculator for manufacturing, there are many approaches. CarbonAtlas combines the best practices from these frameworks into one simple, accessible tool for companies that measure carbon footprint regularly.
            </p>
            <p className="text-gray-700">
              Whether you&apos;#39;#39;#39;#39;#39;#39;re calculating your business carbon footprint for the first time or looking to improve your existing carbon footprint calculator business program, CarbonAtlas provides the insights you need to measure business carbon footprint effectively and take meaningful action.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Calculate Your Carbon Footprint?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Join companies that measure carbon footprint to drive business value and environmental impact. Start your free assessment today.
          </p>
          <Link href="/calculator" className="inline-block bg-white text-primary-600 font-semibold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  )
}
