'use client'

/**
 * Dashboard Page
 * 
 * Personalized dashboard for authenticated users.
<<<<<<< HEAD
 * Shows quick actions and community stats.
 */

import Dashboard from '@/components/Dashboard'
import AuthRequired from '@/components/auth/AuthRequired'

export default function DashboardPage() {
  return (
    <AuthRequired featureName="your personalized dashboard" description="Track your activity, manage favorites, and access personalized community insights after creating an account.">
      <Dashboard />
    </AuthRequired>
  )
=======
 * Shows recommendations, quick actions, and community stats.
 */

import Dashboard from '@/components/Dashboard'

export default function DashboardPage() {
  return <Dashboard />
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
}

