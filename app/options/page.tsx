'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, Search, ArrowLeft } from 'lucide-react'
import Logo from '../../components/Logo'

export default function OptionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-purple-50 text-blue-900">
      <header className="bg-blue-100 py-3 sm:py-4 px-4 sm:px-6 flex justify-between items-center">
        <Link href="/information" className="text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold">Select Your Choice</h1>
        <div className="scale-90 sm:scale-100">
          <Logo />
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 gap-4 sm:gap-8 max-w-4xl mx-auto">
          <Link href="/pickup" className="block">
            <motion.div
              className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shadow-md p-6 sm:p-8 flex flex-col items-center text-center hover:shadow-lg transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Package className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 mb-3 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-blue-800">Schedule Pickup</h2>
              <p className="text-blue-700 text-sm sm:text-base">Arrange for your package to be collected</p>
            </motion.div>
          </Link>
          <Link href="/track" className="block">
            <motion.div
              className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg shadow-md p-6 sm:p-8 flex flex-col items-center text-center hover:shadow-lg transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="h-12 w-12 sm:h-16 sm:w-16 text-purple-600 mb-3 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-purple-800">Track Package</h2>
              <p className="text-purple-700 text-sm sm:text-base">Check the status of your shipment</p>
            </motion.div>
          </Link>
        </div>
      </main>
    </div>
  )
}