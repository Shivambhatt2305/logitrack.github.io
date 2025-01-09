'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plane, Train, Ship, Truck, ArrowRight, ArrowLeft } from 'lucide-react'
import TransportModeCard from '../../components/TransportModeCard'
import Logo from '../../components/Logo'

interface TransportMode {
  icon: any;
  name: string;
  description: string;
  details: string;
  model: string;
  color: string;
}

const transportModes: TransportMode[] = [
  { 
    icon: Plane, 
    name: 'Air Transport', 
    description: 'Lightning-fast international shipping',
    details: 'Our air freight services offer the quickest transit times for urgent shipments. We partner with major airlines to ensure global coverage and reliable schedules.',
    model: '/assets/3d/duck.glb',
    color: 'from-blue-100 to-blue-200'
  },
  { 
    icon: Train, 
    name: 'Rail Transport', 
    description: 'Eco-friendly continental shipping',
    details: 'Rail transport is perfect for heavy or bulky items. It\'s a cost-effective and environmentally friendly option for continental shipments.',
    model: '/assets/3d/duck.glb',
    color: 'from-purple-100 to-purple-200'
  },
  { 
    icon: Ship, 
    name: 'Sea Transport', 
    description: 'Cost-effective bulk shipping',
    details: 'Sea freight is the most economical option for large volume international shipments. We offer both FCL (Full Container Load) and LCL (Less than Container Load) services.',
    model: '/assets/3d/duck.glb',
    color: 'from-indigo-100 to-indigo-200'
  },
  { 
    icon: Truck, 
    name: 'Road Transport', 
    description: 'Flexible door-to-door delivery',
    details: 'Our road freight services offer door-to-door delivery with flexible scheduling. It\'s ideal for local and regional shipments with multiple stops.',
    model: '/assets/3d/duck.glb',
    color: 'from-pink-100 to-pink-200'
  },
];

const InformationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-purple-100/20 to-transparent"
      />

      <header className="relative bg-blue-100 text-blue py-4 sm:py-6 px-4 sm:px-6 flex justify-between items-center z-10">
        <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <motion.h1 
          className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-500"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Given Transport Options
        </motion.h1>
        <div className="scale-75 sm:scale-100">
          <Logo />
        </div>
      </header>

      <main className="relative container mx-auto px-4 py-6 sm:py-8 z-10 min-h-[calc(100vh-88px)] flex flex-col justify-center">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {transportModes.map((mode, index) => (
            <motion.div
              key={mode.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full"
            >
              <TransportModeCard {...mode} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-8 sm:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link 
            href="/options" 
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 
              rounded-full font-semibold text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 
              shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 text-sm sm:text-base"
          >
            Continue
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </motion.div>
          </Link>
        </motion.div>
      </main>
    </div>
  )
}

export default InformationPage