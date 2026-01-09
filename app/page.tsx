'use client'

<<<<<<< HEAD
import { useState, useEffect } from 'react'
=======
import { useState } from 'react'
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, Heart, Users, Calendar, ArrowRight, Sparkles, Map, BarChart3, Star, Zap } from 'lucide-react'
import Link from 'next/link'
import AdvancedSearch from '@/components/AdvancedSearch'
import ResourceInsights from '@/components/ResourceInsights'
<<<<<<< HEAD
import dynamic from 'next/dynamic'

const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-[#FAF9F6] dark:bg-[#1C1B18] rounded-3xl animate-pulse flex items-center justify-center">
      <Map className="w-12 h-12 text-[#8B6F47]/20" />
    </div>
  )
})

import Testimonials from '@/components/Testimonials'
import { useData } from '@/contexts/DataContext'
=======
import InteractiveMap from '@/components/InteractiveMap'
import Testimonials from '@/components/Testimonials'
import Gallery from '@/components/Gallery'
import Fundraising from '@/components/Fundraising'
import CommunityBoard from '@/components/CommunityBoard'
import VolunteerOpportunities from '@/components/VolunteerOpportunities'
import AIAssistant from '@/components/AIAssistant'
import { allResources as resources } from '@/data/resources'
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b

export default function Home() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
<<<<<<< HEAD
  
  // Use pre-loaded data from context - INSTANT
  const { resources, events, campaigns, volunteers } = useData()

  // Calculate stats from pre-loaded data - INSTANT
  const stats = [
    { value: `${resources.length}+`, label: 'Resources', icon: Heart, color: 'text-primary-600' },
    { value: `${events.length}+`, label: 'Events', icon: Calendar, color: 'text-green-600' },
    { value: `${campaigns.length}+`, label: 'Campaigns', icon: Users, color: 'text-secondary-600' },
=======

  const stats = [
    { value: '250+', label: 'Resources', icon: Heart, color: 'text-primary-600' },
    { value: '50+', label: 'Non-Profits', icon: Users, color: 'text-secondary-600' },
    { value: '30+', label: 'Events Monthly', icon: Calendar, color: 'text-green-600' },
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
    { value: '4.8', label: 'Avg Rating', icon: Star, color: 'text-yellow-600' },
  ]

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#1C1B18]">
      {/* Hero Section - Minimal Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden 
                          bg-[#FAF9F6] dark:bg-[#1C1B18]">
<<<<<<< HEAD
        <motion.div style={{ opacity: opacity || 1 }} className="container-custom section-padding relative z-10">
=======
        <motion.div style={{ opacity }} className="container-custom section-padding relative z-10">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
<<<<<<< HEAD
                className="text-4xl md:text-7xl font-display font-bold text-[#2C2416] dark:text-[#F5F3F0] mb-4 md:mb-6"
              >
                Communify
=======
                className="text-5xl md:text-7xl font-display font-bold text-[#333333] dark:text-[#f5f5f5] mb-6"
              >
                HubIO
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
<<<<<<< HEAD
                className="text-lg md:text-2xl text-[#6B5D47] dark:text-[#B8A584] mb-4 font-light"
              >
                /kəˈmjuː.nə.faɪ/
=======
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4 font-light"
              >
                /ˈhəb aɪ oʊ/
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
              </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
<<<<<<< HEAD
                    className="text-base md:text-xl text-[#6B5D47] dark:text-[#B8A584] mb-8"
                  >
                    Your gateway to community resources in <span className="font-semibold text-[#8B6F47] dark:text-[#D4A574]">South Fayette & Pittsburgh</span>.
                    <br className="hidden md:block" />
                    <span className="font-medium text-[#8B6F47] dark:text-[#D4A574]">Connect. Discover. Thrive Together.</span>
=======
                    className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8"
                  >
                    Your gateway to community resources in <span className="font-semibold text-primary-700 dark:text-primary-400">South Fayette & Pittsburgh</span>.
                    <br />
                    <span className="font-medium text-primary-700 dark:text-primary-400">Connect. Discover. Thrive Together.</span>
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                  </motion.p>
            </motion.div>

            {/* Advanced Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <AdvancedSearch />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
<<<<<<< HEAD
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/directory">
                <button className="btn-primary text-lg px-8 py-4 flex items-center gap-2 justify-center w-full sm:w-auto">
=======
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/directory">
                <button className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                  Explore Resources
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/highlights">
<<<<<<< HEAD
                <button className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                  Featured Resources
                </button>
              </Link>
              <Link href="/signup">
                <button className="btn-secondary text-lg px-8 py-4 bg-[#8B6F47] dark:bg-[#D4A574] 
                                 text-white dark:text-[#1C1B18] hover:bg-[#7A5F3A] dark:hover:bg-[#C49564] w-full sm:w-auto">
                  Get Started
                </button>
              </Link>
=======
                <button className="btn-secondary text-lg px-8 py-4">
                  Featured Resources
                </button>
              </Link>
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
            </motion.div>

            {/* Stats with enhanced design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
<<<<<<< HEAD
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto px-4"
=======
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
<<<<<<< HEAD
                    className="text-center p-6 bg-white/80 dark:bg-[#2A2824]/80 backdrop-blur-xl 
                               rounded-3xl shadow-xl border border-[#E8E0D6]/50 dark:border-[#4A4844]/50
=======
                    className="text-center p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl 
                               rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                               hover:shadow-2xl transition-all duration-300"
                    style={{
                      backdropFilter: 'saturate(180%) blur(20px)',
                      WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                    }}
                  >
<<<<<<< HEAD
                    <Icon className={`w-8 h-8 text-[#8B6F47] dark:text-[#D4A574] mx-auto mb-2`} />
                    <div className="text-3xl font-bold text-[#2C2416] dark:text-[#F5F3F0]">{stat.value}</div>
                    <div className="text-sm text-[#6B5D47] dark:text-[#B8A584]">{stat.label}</div>
=======
                    <Icon className={`w-8 h-8 text-[#666666] dark:text-[#999999] mx-auto mb-2`} />
                    <div className="text-3xl font-bold text-[#333333] dark:text-[#f5f5f5]">{stat.value}</div>
                    <div className="text-sm text-[#666666] dark:text-[#999999]">{stat.label}</div>
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator with animation */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-3 bg-white dark:bg-[#2A2824] rounded-full shadow-sm border border-[#E8E0D6] dark:border-[#4A4844]"
          >
            <ArrowRight className="w-6 h-6 text-[#8B6F47] dark:text-[#D4A574] rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Interactive Map Section */}
<<<<<<< HEAD
      <section id="map" className="section-padding bg-gradient-to-br from-[#FAF9F6] via-white to-primary-50/30 dark:from-[#1C1B18] dark:via-gray-800 dark:to-primary-900/10">
=======
      <section id="map" className="section-padding bg-gray-50 dark:bg-gray-800">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-4">
              <Map className="w-12 h-12 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Explore Resources on Map
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover community resources geographically. Click on markers to learn more about each organization.
            </p>
          </motion.div>
<<<<<<< HEAD
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <InteractiveMap resources={resources} />
          </motion.div>
=======
          <InteractiveMap resources={resources.slice(0, 6)} />
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
        </div>
      </section>

      {/* Resource Insights Section */}
<<<<<<< HEAD
      <section className="section-padding bg-gradient-to-br from-[#FAF9F6] via-white to-primary-50/30 dark:from-[#1C1B18] dark:via-gray-900 dark:to-primary-900/10">
=======
      <section className="section-padding bg-white dark:bg-gray-900">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
        <div className="container-custom">
          <ResourceInsights />
        </div>
      </section>

      {/* Features Section with 3D effects */}
      <section id="features" className="section-padding bg-[#FAF9F6] dark:bg-[#1C1B18]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
<<<<<<< HEAD
              Communify is your comprehensive community resource platform with advanced features designed to connect residents
=======
              HubIO is your comprehensive community resource platform with advanced features designed to connect residents
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
              with essential services, support organizations, and local programs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Advanced Search',
<<<<<<< HEAD
                description: 'Intelligent search with autocomplete and recent searches to help you find exactly what you need.',
=======
                description: 'Intelligent search with autocomplete, recent searches, and popular suggestions to help you find exactly what you need.',
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                color: 'bg-[#D4A574]',
              },
              {
                icon: Map,
                title: 'Interactive Map',
                description: 'Visualize resources on an interactive map. Explore locations, get directions, and discover nearby services.',
                color: 'bg-[#8B6F47]',
              },
              {
                icon: BarChart3,
                title: 'Resource Insights',
                description: 'Get comprehensive analytics and insights about community resources, categories, and trends.',
                color: 'bg-[#D4A574]',
              },
              {
                icon: Star,
                title: 'Favorites & Ratings',
                description: 'Save your favorite resources and rate organizations to help others make informed decisions.',
                color: 'bg-[#8B6F47]',
              },
              {
<<<<<<< HEAD
=======
                icon: Sparkles,
                title: 'Smart Recommendations',
                description: 'AI-powered recommendations based on your interests and browsing history to discover new resources.',
                color: 'bg-[#D4A574]',
              },
              {
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                icon: Heart,
                title: 'Community First',
                description: 'We prioritize the needs of our community, ensuring every resident has access to vital resources and support services.',
                color: 'bg-[#8B6F47]',
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, rotateY: 5 }}
                  style={{ perspective: 1000 }}
                  className="relative group"
                >
                      <div className="relative bg-white dark:bg-[#2A2824] backdrop-blur-xl rounded-3xl p-6 
                                      shadow-xl hover:shadow-2xl transition-all duration-300 
                                      border border-[#E8E0D6] dark:border-[#4A4844] h-full
                                      hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]"
                            style={{
                              backdropFilter: 'saturate(180%) blur(20px)',
                              WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                            }}
                      >
                    <motion.div 
                      className={`inline-flex p-3 rounded-2xl ${feature.color} mb-4 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
<<<<<<< HEAD
      <section className="section-padding bg-gradient-to-br from-[#FAF9F6] via-white to-primary-50/30 dark:from-[#1C1B18] dark:via-gray-800 dark:to-primary-900/10">
=======
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Explore Our Platform
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Discover resources, learn about featured organizations, and contribute to our growing community hub.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/directory">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-200 dark:border-gray-700"
              >
                <Search className="w-12 h-12 text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Resource Directory</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Browse our comprehensive directory of community resources, services, and organizations.
                </p>
                <span className="text-primary-600 dark:text-primary-400 font-medium flex items-center gap-2 group-hover:gap-4 transition-all">
                  Explore Directory
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.div>
            </Link>

            <Link href="/highlights">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-200 dark:border-gray-700"
              >
                <Sparkles className="w-12 h-12 text-secondary-600 dark:text-secondary-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Featured Resources</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Learn about standout organizations making a difference in our community.
                </p>
                <span className="text-secondary-600 dark:text-secondary-400 font-medium flex items-center gap-2 group-hover:gap-4 transition-all">
                  View Highlights
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.div>
            </Link>

            <Link href="/submit">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-200 dark:border-gray-700"
              >
                <Heart className="w-12 h-12 text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Submit Resource</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Help us grow! Submit a new resource or organization to add to our community hub.
                </p>
                <span className="text-primary-600 dark:text-primary-400 font-medium flex items-center gap-2 group-hover:gap-4 transition-all">
                  Submit Now
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

<<<<<<< HEAD
=======
      {/* Fundraising Section */}
      <section id="fundraising">
        <Fundraising />
      </section>

      {/* Volunteer Opportunities Section */}
      <section id="volunteer">
        <VolunteerOpportunities />
      </section>

      {/* Community Board Section */}
      <section id="community">
        <CommunityBoard />
      </section>
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b

      {/* Testimonials Section */}
      <Testimonials />

<<<<<<< HEAD
=======
      {/* Gallery Section */}
      <Gallery />

      {/* AI Assistant - Floating */}
      <AIAssistant />
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
    </div>
  )
}

