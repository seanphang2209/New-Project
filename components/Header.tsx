import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">CarbonAtlas</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link href="/calculator" className="text-gray-700 hover:text-primary-600 transition-colors">
              Calculator
            </Link>
            <Link href="/methodology" className="text-gray-700 hover:text-primary-600 transition-colors">
              Methodology
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
