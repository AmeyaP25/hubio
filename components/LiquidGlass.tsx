'use client'

import { motion } from 'framer-motion'

interface LiquidGlassProps {
  children: React.ReactNode
  className?: string
  intensity?: 'light' | 'medium' | 'strong'
}

export default function LiquidGlass({ children, className = '', intensity = 'medium' }: LiquidGlassProps) {
  const blurIntensity = {
    light: 'blur(20px)',
    medium: 'blur(30px)',
    strong: 'blur(40px)',
  }

  return (
    <div className={`relative ${className}`}>
      {/* Minimal background - clean and simple */}
<<<<<<< HEAD
      <div className="absolute inset-0 overflow-hidden rounded-xl bg-white dark:bg-[#1F1B28] border border-[#E8E0D6] dark:border-[#2c2c3e]">
=======
      <div className="absolute inset-0 overflow-hidden rounded-xl bg-white dark:bg-[#2a2a2a] border border-[#e0e0e0] dark:border-[#404040]">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
      </div>

      {/* Content */}
      <div className="relative z-10 rounded-xl">
        {children}
      </div>
    </div>
  )
}

