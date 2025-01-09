'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Logo from '../../../components/Logo'

export default function PickupSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-purple-50 text-blue-900">
      <header className="bg-blue-100 py-4 px-6 flex justify-between items-center">
        <Link href="/pickup" className="text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold">Pickup Scheduled</h1>
        <Logo />
      </header>
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
        </motion.div>
        <motion.h2
          className="text-3xl font-bold mb-4 text-blue-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Pickup Successfully Scheduled!
        </motion.h2>
        <motion.p
          className="text-xl text-center mb-8 text-blue-700"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Your pickup request has been confirmed and processed.
        </motion.p>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-blue-600">You will receive a confirmation email shortly with the details of your pickup.</p>
          <p className="text-blue-600">If you need to make any changes, please contact our customer support.</p>
        </motion.div>
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/"
            className="bg-blue-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </main>
    </div>
  )
}

