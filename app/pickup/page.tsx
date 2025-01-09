'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import PickupForm from '../../components/PickupForm'
import Logo from '../../components/Logo'
import Link from 'next/link'

export default function PickupPage() {
  const [fastDelivery, setFastDelivery] = useState(true)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-purple-50 text-blue-900">
      <header className="bg-blue-100 text-blue-900 py-3 sm:py-4 px-4 sm:px-6 flex justify-between items-center">
        <Link href="/options" className="text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold">Schedule a Pickup</h1>
        <div className="scale-90 sm:scale-100">
          <Logo />
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
        <div className="bg-gray-100/90 backdrop-blur-sm rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-blue-800">Fast Delivery</h2>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={fastDelivery}
                onChange={(e) => setFastDelivery(e.target.checked)}
                className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm sm:text-base text-blue-700">
                {fastDelivery ? 'YES' : 'NO'}
              </span>
            </label>
          </div>
        </div>
        <div className="w-full max-w-4xl mx-auto">
          <PickupForm fastDelivery={fastDelivery} />
        </div>
      </main>
    </div>
  )
}
