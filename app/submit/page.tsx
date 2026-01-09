'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Heart, FileText, Mail, Phone, Globe, MapPin, Tag } from 'lucide-react'
import { categories } from '@/data/resources'
<<<<<<< HEAD
import AuthRequired from '@/components/auth/AuthRequired'
import { useTheme } from '@/contexts/ThemeContext'
import { supabase } from '@/lib/supabase/client'

function SubmitPageContent() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    customCategory: '',
=======

export default function SubmitResourcePage() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    tags: '',
    contactName: '',
    contactEmail: '',
<<<<<<< HEAD
    hours: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const inputBaseClass = `w-full px-4 py-3 rounded-2xl border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white/90 dark:bg-[#0B0A17] dark:text-white backdrop-blur-xl placeholder:text-gray-500 dark:placeholder:text-gray-400`
  const getInputClass = (hasError?: boolean) =>
    `${inputBaseClass} ${hasError ? 'border-red-500' : 'border-gray-200/50 dark:border-[#2c2c3e]'}`
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const labelClass = `block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'} mb-2`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      // Clear customCategory when a regular category is selected
      if (name === 'category' && value !== 'Other') {
        updated.customCategory = ''
      }
      return updated
    })
=======
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Organization name is required'
    }
    if (!formData.category) {
      newErrors.category = 'Category is required'
<<<<<<< HEAD
    } else if (formData.category === 'Other' && !formData.customCategory.trim()) {
      newErrors.customCategory = 'Please specify the category'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'Description must be at least 50 characters'
    }
    // Address is now optional
=======
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required'
    }
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

<<<<<<< HEAD
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      // Helper to generate random coordinates around South Fayette Township
      const getRandomSouthFayetteCoords = () => {
        const minLat = 40.3200
        const maxLat = 40.3800
        const minLng = -80.1800
        const maxLng = -80.1200
        
        return {
          lat: minLat + Math.random() * (maxLat - minLat),
          lng: minLng + Math.random() * (maxLng - minLng)
        }
      }

      // Use customCategory if "Other" is selected
      const submissionData = {
        name: formData.name,
        category: formData.category === 'Other' ? formData.customCategory : formData.category,
        description: formData.description,
        address: formData.address || '',
        phone: formData.phone,
        email: formData.email,
        website: formData.website || '',
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [],
        hours: formData.hours || '',
        // Only add coordinates if address is provided
        ...(formData.address.trim() ? { location: getRandomSouthFayetteCoords() } : {})
      }

      // Submit to API
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()
      console.log('Submission response:', result)

      if (!response.ok || !result.success) {
        // If there are specific validation errors, display them
        if (result.errors && typeof result.errors === 'object') {
          setErrors(result.errors)
          throw new Error('Please fix the errors below')
        }
        throw new Error(result.error || result.message || 'Failed to submit resource')
      }

      console.log('Resource submitted successfully:', result.data)
      setSubmitted(true)
      // Reset form after 5 seconds
=======
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      // In a real application, this would submit to a backend API
      console.log('Form submitted:', formData)
      setSubmitted(true)
      // Reset form after 3 seconds
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: '',
          category: '',
<<<<<<< HEAD
          customCategory: '',
=======
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
          description: '',
          address: '',
          phone: '',
          email: '',
          website: '',
          tags: '',
          contactName: '',
          contactEmail: '',
<<<<<<< HEAD
          hours: '',
        })
      }, 5000)
    } catch (error: any) {
      console.error('Error submitting resource:', error)
      setErrors({ submit: error.message || 'Failed to submit resource. Please try again.' })
    } finally {
      setIsSubmitting(false)
=======
        })
      }, 5000)
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
    }
  }

  if (submitted) {
    return (
<<<<<<< HEAD
      <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-white to-primary-50/30 dark:from-[#1C1B18] dark:via-gray-900 dark:to-primary-900/10 pt-20 flex items-center justify-center">
=======
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 max-w-md 
                     text-center border border-white/30 dark:border-gray-700/30"
          style={{
            backdropFilter: 'saturate(180%) blur(40px)',
            WebkitBackdropFilter: 'saturate(180%) blur(40px)',
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
<<<<<<< HEAD
            Your request has been submitted. If approved, you should see your resource up shortly.
=======
            Your resource submission has been received. We'll review it and add it to our directory soon.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            You will receive a confirmation email shortly.
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
          </p>
        </motion.div>
      </div>
    )
  }

<<<<<<< HEAD
  const backgroundClass = isDark ? 'bg-[#0B0A0F]' : 'bg-[#FAF9F6]'
  const heroTextClass = isDark ? 'text-white' : 'text-[#2C2416]'
  const heroSubTextClass = isDark ? 'text-white/75' : 'text-gray-600'
  const formCardClass = isDark
    ? 'bg-[#1f1b28] bg-opacity-95 border border-[#2c2c3e]'
    : 'bg-white/90 border border-white/30'
  const sectionTitleClass = isDark ? 'text-white' : 'text-[#2C2416]'
  const borderColorClass = isDark ? 'border-[#2c2c3e]' : 'border-gray-200'

  return (
    <div className={`min-h-screen ${backgroundClass} pt-20 ${isDark ? 'text-white' : 'text-[#2C2416]'}`}>
      {/* Hero Section */}
      <section className={`section-padding ${backgroundClass}`}>
=======
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50 
                          dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
<<<<<<< HEAD
            className={`text-center max-w-3xl mx-auto mb-12 ${heroSubTextClass}`}
=======
            className="text-center max-w-3xl mx-auto mb-12"
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Heart className="w-12 h-12 text-primary-600 dark:text-primary-400" />
            </motion.div>
<<<<<<< HEAD
            <h1 className={`text-4xl md:text-5xl font-display font-bold ${heroTextClass} mb-4`}>
              Submit a Resource
            </h1>
            <p className={`text-lg ${heroSubTextClass}`}>
=======
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Submit a Resource
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
              Help us grow our community resource hub! Submit a new resource, organization, or service
              to make it accessible to everyone in our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
<<<<<<< HEAD
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`${formCardClass} backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12`}
=======
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 
                        border border-white/30 dark:border-gray-700/30"
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
            style={{
              backdropFilter: 'saturate(180%) blur(20px)',
              WebkitBackdropFilter: 'saturate(180%) blur(20px)',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Organization Information */}
              <div>
<<<<<<< HEAD
                <h2 className={`text-2xl font-semibold ${sectionTitleClass} mb-6 flex items-center gap-2`}>
                  <FileText className="w-6 h-6 text-[#D4A574]" />
=======
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary-600" />
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                  Organization Information
                </h2>
                <div className="space-y-4">
                  <div>
<<<<<<< HEAD
                    <label htmlFor="name" className={labelClass}>
=======
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                      Organization Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
<<<<<<< HEAD
                      className={getInputClass(errors.name)}
=======
                      className={`w-full px-4 py-3 rounded-2xl border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 
                                 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl transition-all ${
                        errors.name ? 'border-red-500' : 'border-gray-200/50 dark:border-gray-700/50'
                      }`}
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                      placeholder="Enter organization name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
<<<<<<< HEAD
                    <label htmlFor="category" className={labelClass}>
=======
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
<<<<<<< HEAD
                      className={getInputClass(errors.category)}
=======
                      className={`w-full px-4 py-3 rounded-2xl border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 
                                 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl transition-all ${
                        errors.category ? 'border-red-500' : 'border-gray-200/50 dark:border-gray-700/50'
                      }`}
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                    >
                      <option value="">Select a category</option>
                      {categories.filter((c) => c !== 'All Categories').map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
<<<<<<< HEAD
                      <option value="Other">Other</option>
=======
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.category}
                      </p>
                    )}
<<<<<<< HEAD
                    {formData.category === 'Other' && (
                      <div className="mt-4">
                        <label htmlFor="customCategory" className={labelClass}>
                          Specify Category <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="customCategory"
                          name="customCategory"
                          value={formData.customCategory}
                          onChange={handleChange}
                          className={getInputClass(errors.customCategory)}
                          placeholder="Enter your custom category"
                        />
                        {errors.customCategory && (
                          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.customCategory}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="description" className={labelClass}>
                      Description <span className="text-red-500">*</span>
                      <span className="text-xs text-gray-500 ml-2">(Minimum 50 characters)</span>
=======
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
<<<<<<< HEAD
                      className={getInputClass(errors.description)}
                      placeholder="Describe the services, programs, and support offered by this organization"
                    />
                    <div className="mt-1 flex items-center justify-between">
                      <div>
                        {errors.description && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.description}
                          </p>
                        )}
                      </div>
                      <p className={`text-xs ${
                        formData.description.length < 50 
                          ? 'text-gray-500' 
                          : 'text-green-600 dark:text-green-400'
                      }`}>
                        {formData.description.length}/50 characters
                      </p>
                    </div>
=======
                      className={`w-full px-4 py-3 rounded-2xl border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 
                                 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl transition-all ${
                        errors.description ? 'border-red-500' : 'border-gray-200/50 dark:border-gray-700/50'
                      }`}
                      placeholder="Describe the services, programs, and support offered by this organization"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.description}
                      </p>
                    )}
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                  </div>
                </div>
              </div>

              {/* Contact Information */}
<<<<<<< HEAD
              <div className={`pt-6 border-t ${borderColorClass}`}>
                  <h2 className={`text-2xl font-semibold ${sectionTitleClass} mb-6 flex items-center gap-2`}>
                    <Mail className="w-6 h-6 text-[#D4A574]" />
=======
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Mail className="w-6 h-6 text-primary-600" />
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                  Contact Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
<<<<<<< HEAD
                    <label htmlFor="address" className={labelClass}>
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Address (optional)
=======
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Address <span className="text-red-500">*</span>
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
<<<<<<< HEAD
                      className={getInputClass(errors.address)}
                      placeholder="Street address, City, State ZIP"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      If provided, this resource will be shown on the community map.
                    </p>
=======
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.address ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Street address, City, State ZIP"
                    />
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
<<<<<<< HEAD
                    <label htmlFor="phone" className={labelClass}>
=======
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
<<<<<<< HEAD
                      className={getInputClass(errors.phone)}
=======
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.phone ? 'border-red-500' : 'border-gray-200'
                      }`}
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
<<<<<<< HEAD
                    <label htmlFor="email" className={labelClass}>
=======
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                      <Mail className="w-4 h-4 inline mr-1" />
                      Organization Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
<<<<<<< HEAD
                      className={getInputClass(errors.email)}
=======
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                      placeholder="info@organization.org"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
<<<<<<< HEAD
                    <label htmlFor="website" className={labelClass}>
=======
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                      <Globe className="w-4 h-4 inline mr-1" />
                      Website (optional)
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
<<<<<<< HEAD
                      className={getInputClass()}
=======
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200/50 dark:border-gray-700/50 
                                 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl focus:outline-none 
                                 focus:ring-2 focus:ring-primary-500 transition-all"
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                      placeholder="https://organization.org"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
<<<<<<< HEAD
              <div className={`pt-6 border-t ${borderColorClass}`}>
                <h2 className={`text-2xl font-semibold ${sectionTitleClass} mb-6 flex items-center gap-2`}>
                  <Tag className="w-6 h-6 text-[#D4A574]" />
                  Additional Information
                </h2>
          <div className="space-y-4">
                  <div>
                    <label htmlFor="tags" className={labelClass}>
=======
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Tag className="w-6 h-6 text-primary-600" />
                  Additional Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                      Tags (optional)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
<<<<<<< HEAD
                      className={getInputClass()}
=======
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200/50 dark:border-gray-700/50 
                                 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl focus:outline-none 
                                 focus:ring-2 focus:ring-primary-500 transition-all"
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                      placeholder="Separate tags with commas (e.g., Food, Nutrition, Emergency Assistance)"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Help users find this resource by adding relevant tags
                    </p>
                  </div>
<<<<<<< HEAD
            <div>
              <label htmlFor="hours" className={labelClass}>
                Hours / Availability (optional)
              </label>
              <input
                type="text"
                id="hours"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                className={getInputClass()}
                placeholder="e.g., Mon-Fri 9am-5pm or First Saturdays, 1-4pm"
              />
              <p className="mt-1 text-sm text-gray-500">
                List the regular operating hours or special access dates for this resource.
              </p>
            </div>
=======
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                </div>
              </div>

              {/* Submitter Information */}
<<<<<<< HEAD
              <div className={`pt-6 border-t ${borderColorClass}`}>
                <h2 className={`text-2xl font-semibold ${sectionTitleClass} mb-6`}>Your Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactName" className={labelClass}>
=======
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
<<<<<<< HEAD
                      className={getInputClass(errors.contactName)}
=======
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.contactName ? 'border-red-500' : 'border-gray-200'
                      }`}
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                      placeholder="John Doe"
                    />
                    {errors.contactName && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.contactName}
                      </p>
                    )}
                  </div>

                  <div>
<<<<<<< HEAD
                    <label htmlFor="contactEmail" className={labelClass}>
=======
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
<<<<<<< HEAD
                      className={getInputClass(errors.contactEmail)}
=======
                      className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.contactEmail ? 'border-red-500' : 'border-gray-200'
                      }`}
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                      placeholder="you@example.com"
                    />
                    {errors.contactEmail && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.contactEmail}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
<<<<<<< HEAD
                {errors.submit && (
                  <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.submit}
                    </p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary text-lg py-4 flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Resource
                    </>
                  )}
=======
                <button
                  type="submit"
                  className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Submit Resource
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                </button>
                <p className="mt-4 text-sm text-gray-500 text-center">
                  By submitting this form, you agree to our terms and conditions. We will review your
                  submission and contact you if we need any additional information.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

<<<<<<< HEAD
export default function SubmitResourcePage() {
  return (
    <SubmitPageContent />
  )
}
=======
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
