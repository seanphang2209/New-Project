export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">CarbonAtlas</h3>
            <p className="text-sm">
              Helping businesses understand and reduce their carbon footprint through simple, actionable insights.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/calculator" className="hover:text-white transition-colors">
                  Carbon Calculator
                </a>
              </li>
              <li>
                <a href="/methodology" className="hover:text-white transition-colors">
                  Methodology
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
            <p className="text-xs text-gray-400 italic">
              Decision-support estimates only. Not legal advice, certification, or assurance.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} CarbonAtlas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
