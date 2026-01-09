'use client'

/**
 * Login Page
 * 
 * User authentication page with OAuth and email/password options.
 * Supports multiple authentication providers.
 */

<<<<<<< HEAD
import { useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail, Lock, Chrome, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import LiquidGlass from '@/components/LiquidGlass'
import Link from 'next/link'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
=======
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Github, Chrome, Building2, ArrowRight } from 'lucide-react'
import { getAuthService } from '@/lib/auth'
import LiquidGlass from '@/components/LiquidGlass'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
<<<<<<< HEAD
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
=======

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
    setError('')
    setIsLoading(true)

    try {
<<<<<<< HEAD
      console.log('Attempting login...')
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Provide more helpful error messages
        if (error.message?.includes('fetch') || error.message?.includes('network')) {
          setError('Network error: Unable to connect to the server. Please check your internet connection and try again.')
        } else if (error.message?.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials and try again.')
        } else if (error.message?.includes('Email not confirmed')) {
          setError('Please verify your email address before signing in. Check your inbox for a confirmation email.')
        } else {
          setError(error.message || 'Failed to sign in. Please try again.')
        }
        setIsLoading(false)
        return
      }

      // Determine redirect URL
      const urlParams = new URLSearchParams(window.location.search)
      const redirectParam = urlParams.get('redirect')
      const redirectUrl = redirectParam || sessionStorage.getItem('redirectAfterLogin')
      
      if (rememberMe) {
        localStorage.setItem('remember_me', 'true')
      } else {
        localStorage.removeItem('remember_me')
      }

      let finalRedirect = '/'

      if (redirectUrl) {
        sessionStorage.removeItem('redirectAfterLogin')
        sessionStorage.removeItem('pendingAction')
        finalRedirect = redirectUrl
      }

      setIsLoading(false)
      router.push(finalRedirect)
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || 'An unexpected error occurred')
=======
      const auth = getAuthService()
      await auth.signInWithEmail(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Failed to sign in')
    } finally {
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
      setIsLoading(false)
    }
  }

<<<<<<< HEAD
  const handleGoogleLogin = async () => {
    setError('')
    setIsLoading(true)
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      console.error('Google OAuth error:', error)
      // Check if provider is not enabled
      if (error.message?.includes('not enabled') || error.message?.includes('Unsupported provider')) {
        setError('Google OAuth is not enabled. Please enable it in your Supabase dashboard under Authentication > Providers.')
      } else {
        setError(error.message || 'Failed to sign in with Google')
      }
      setIsLoading(false)
    }
    // OAuth will redirect on success, so we don't need to handle it here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-white to-[#f5ede1]/30 
                    dark:from-[#0B0A0F] dark:via-[#1F1B28] dark:to-[#0B0A0F] flex items-center justify-center p-4">
=======
  const handleOAuthLogin = async (provider: 'google' | 'microsoft' | 'github') => {
    try {
      const auth = getAuthService()
      await auth.signInWithOAuth(provider)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Failed to sign in')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <LiquidGlass intensity="strong">
          <div className="p-8">
            <div className="text-center mb-8">
<<<<<<< HEAD
              <h1 className="text-3xl font-display font-bold text-[#2C2416] dark:text-[#F5F3F0] mb-2">
                Welcome Back
              </h1>
              <p className="text-[#6B5D47] dark:text-[#B8A584]">
                Sign in to access your community hub
              </p>
              {message && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 
                              rounded-2xl text-blue-600 dark:text-blue-400 text-sm">
                  {message}
                </div>
              )}
            </div>

            {/* Google OAuth Button */}
            <div className="mb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl 
                         bg-white dark:bg-[#1F1B28] border-2 border-gray-200 dark:border-[#2c2c3e] 
                         text-[#6B5D47] dark:text-[#B8A584] hover:border-[#8B6F47] dark:hover:border-[#D4A574] 
                         transition-all font-medium disabled:opacity-50"
=======
              <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to access your community hub
              </p>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOAuthLogin('google')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl 
                         bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 
                         text-gray-700 dark:text-gray-300 hover:border-primary-500 dark:hover:border-primary-400 
                         transition-all font-medium"
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
              >
                <Chrome className="w-5 h-5" />
                Continue with Google
              </motion.button>
<<<<<<< HEAD
=======

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOAuthLogin('microsoft')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl 
                         bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 
                         text-gray-700 dark:text-gray-300 hover:border-primary-500 dark:hover:border-primary-400 
                         transition-all font-medium"
              >
                <Building2 className="w-5 h-5" />
                Continue with Microsoft
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOAuthLogin('github')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl 
                         bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 
                         text-gray-700 dark:text-gray-300 hover:border-primary-500 dark:hover:border-primary-400 
                         transition-all font-medium"
              >
                <Github className="w-5 h-5" />
                Continue with GitHub
              </motion.button>
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
<<<<<<< HEAD
                <div className="w-full border-t border-gray-200 dark:border-[#2c2c3e]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-[#1F1B28] text-[#6B5D47] dark:text-[#B8A584]">Or continue with email</span>
=======
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with email</span>
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
                              rounded-2xl text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
<<<<<<< HEAD
                <label className="block text-sm font-medium text-[#6B5D47] dark:text-[#B8A584] mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B8A584]" />
=======
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
<<<<<<< HEAD
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-[#2c2c3e] 
                             bg-white dark:bg-[#1F1B28] text-[#2C2416] dark:text-[#F5F3F0] 
                             focus:border-[#8B6F47] dark:focus:border-[#D4A574] focus:outline-none"
=======
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                             focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none"
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
<<<<<<< HEAD
                <label className="block text-sm font-medium text-[#6B5D47] dark:text-[#B8A584] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B8A584]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-12 py-3 rounded-2xl border-2 border-gray-200 dark:border-[#2c2c3e] 
                             bg-white dark:bg-[#1F1B28] text-[#2C2416] dark:text-[#F5F3F0] 
                             focus:border-[#8B6F47] dark:focus:border-[#D4A574] focus:outline-none"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B8A584] hover:text-[#8B6F47] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
=======
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                             focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none"
                    placeholder="••••••••"
                  />
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
<<<<<<< HEAD
                  <input
                    type="checkbox"
                    className="rounded border-[#D4A574] text-[#8B6F47] focus:ring-[#D4A574]"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                  <span className="ml-2 text-sm text-[#6B5D47] dark:text-[#B8A584]">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-[#8B6F47] dark:text-[#D4A574] hover:underline">
=======
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                  Forgot password?
                </Link>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
<<<<<<< HEAD
                className="w-full bg-gradient-to-r from-[#8B6F47] to-[#D4A574] text-white py-3 rounded-2xl 
=======
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-2xl 
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                         font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl 
                         transition-all disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>

<<<<<<< HEAD
            <p className="mt-6 text-center text-sm text-[#6B5D47] dark:text-[#B8A584]">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#8B6F47] dark:text-[#D4A574] font-medium hover:underline">
=======
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/signup" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                Sign up
              </Link>
            </p>
          </div>
        </LiquidGlass>
      </motion.div>
    </div>
  )
}

<<<<<<< HEAD
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] dark:bg-[#1C1B18]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400 mx-auto mb-4"></div>
          <div className="text-gray-600 dark:text-gray-400">Loading...</div>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}

=======
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
