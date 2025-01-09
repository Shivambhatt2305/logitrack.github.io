'use client'

import { motion } from 'framer-motion'

export default function Logo() {
  return (
    <motion.div
      className="flex items-center space-x-3"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 shadow-lg shadow-blue-500/30"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src="/logo.png"
          alt="LogiTrack Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </motion.div>
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
        <motion.span
          className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Logi
        </motion.span>
        <motion.span
          className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-200"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Track
        </motion.span>
      </div>
    </motion.div>
  )
}