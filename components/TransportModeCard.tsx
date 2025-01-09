'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TypeIcon as type, type LucideIcon } from 'lucide-react'

interface TransportModeCardProps {
  icon: LucideIcon
  name: string
  description: string
  details: string
  model: string
  color: string
  children?: React.ReactNode
}

export default function TransportModeCard({ 
  icon: Icon, 
  name, 
  description, 
  details, 
  color,
  children 
}: TransportModeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div 
      className={`relative bg-gradient-to-br ${color} rounded-xl shadow-md overflow-hidden
        hover:shadow-lg transition-all duration-300`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <motion.div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent"
        animate={{ opacity: isExpanded ? 1 : 0.3 }}
      />

      <div className="relative p-6 flex flex-col items-center text-center cursor-pointer">
        <motion.div
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            rotateY: isHovered ? 180 : 0
          }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Icon className="h-12 w-12 text-blue-600" />
        </motion.div>
        
        <h2 className="text-xl font-bold text-blue-800 mb-2">{name}</h2>
        <p className="text-blue-700">{description}</p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <p className="text-sm text-blue-600">{details}</p>
              {children}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-blue-400"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  )
}

