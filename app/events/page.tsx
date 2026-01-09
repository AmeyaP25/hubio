'use client'

/**
 * Events Page
 * 
 * Comprehensive events calendar and listing page with advanced filtering,
 * calendar view, and event management features.
 */

<<<<<<< HEAD
import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
=======
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
import { Calendar, MapPin, Clock, Users, Filter, Grid, List, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import TabNavigation from '@/components/TabNavigation'
import LiquidGlass from '@/components/LiquidGlass'
import { Event } from '@/lib/types'
<<<<<<< HEAD
import { events as staticEvents } from '@/data/events'

const categories = ['All', 'Community', 'Business', 'Youth', 'Education', 'Health', 'Arts', 'Sports', 'Health & Wellness', 'Volunteering', 'Employment', 'Environment']

export default function EventsPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'calendar'>('grid')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('upcoming')

  useEffect(() => {
    loadEvents()
  }, [activeTab, selectedCategory])

  const loadEvents = async () => {
    setLoading(true)
    
    // Filter static events based on selected tab and category
    let filteredEvents = [...staticEvents]
    
    // Filter by status (upcoming/past)
    if (activeTab === 'upcoming') {
      filteredEvents = filteredEvents.filter(e => e.status === 'upcoming' || e.status === 'ongoing')
    } else if (activeTab === 'past') {
      filteredEvents = filteredEvents.filter(e => e.status === 'completed' || e.status === 'cancelled')
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filteredEvents = filteredEvents.filter(e => e.category === selectedCategory)
    }
    
    setEvents(filteredEvents)
    setLoading(false)
  }

  const [rsvping, setRsvping] = useState<string | null>(null)

  const handleRSVP = async (event: Event) => {
    // UI showcase - just show a success message
    setRsvping(event.id)
    
    setTimeout(() => {
      alert(`Successfully registered for: ${event.name}!\n\nThis is a UI showcase, so no actual registration was performed.`)
      setRsvping(null)
    }, 1000)
  }

  const filteredEvents = useMemo(() => {
    return events.sort((a, b) => a.date.getTime() - b.date.getTime())
  }, [events])
=======

// Mock events data
const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Community Food Drive',
    description: 'Annual community food drive to support local families. Bring non-perishable items.',
    category: 'Community',
    date: new Date('2026-02-15'),
    time: '10:00 AM - 2:00 PM',
    location: {
      lat: 47.6097,
      lng: -122.3331,
      address: '123 Main Street',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
    },
    organizer: 'Community Food Bank',
    organizerId: 'org_1',
    registered: 45,
    rsvpRequired: true,
    tags: ['Food', 'Community', 'Volunteer'],
    status: 'upcoming',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: '2',
    name: 'Small Business Networking',
    description: 'Monthly networking event for local business owners. Connect, share resources, and grow together.',
    category: 'Business',
    date: new Date('2026-02-20'),
    time: '6:00 PM - 8:00 PM',
    location: {
      lat: 47.6145,
      lng: -122.3415,
      address: '456 Business Center',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98102',
    },
    organizer: 'Local Business Association',
    organizerId: 'org_2',
    registered: 23,
    rsvpRequired: true,
    ticketPrice: 15,
    tags: ['Business', 'Networking', 'Professional'],
    status: 'upcoming',
    createdAt: new Date('2026-01-05'),
    updatedAt: new Date('2026-01-05'),
  },
  {
    id: '3',
    name: 'Youth Art Workshop',
    description: 'Free art workshop for youth ages 12-18. All materials provided. No experience necessary.',
    category: 'Youth',
    date: new Date('2026-02-18'),
    time: '3:00 PM - 5:00 PM',
    location: {
      lat: 47.6062,
      lng: -122.3321,
      address: '789 Community Center',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98103',
    },
    organizer: 'Youth Empowerment Center',
    organizerId: 'org_3',
    registered: 18,
    capacity: 25,
    rsvpRequired: true,
    tags: ['Youth', 'Arts', 'Education'],
    status: 'upcoming',
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-10'),
  },
]

const categories = ['All', 'Community', 'Business', 'Youth', 'Education', 'Health', 'Arts', 'Sports']

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'calendar'>('grid')
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const filteredEvents = useMemo(() => {
    let filtered = mockEvents

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(e => e.category === selectedCategory)
    }

    return filtered.sort((a, b) => a.date.getTime() - b.date.getTime())
  }, [selectedCategory])
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const tabs = [
<<<<<<< HEAD
    { id: 'upcoming', label: 'Upcoming', icon: Calendar, count: activeTab === 'upcoming' ? filteredEvents.length : undefined },
    { id: 'past', label: 'Past Events', icon: CalendarIcon, count: activeTab === 'past' ? filteredEvents.length : undefined },
    { id: 'my-events', label: 'My Events', icon: Users },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading events...</p>
        </div>
      </div>
    )
  }

=======
    { id: 'upcoming', label: 'Upcoming', icon: Calendar, count: filteredEvents.length },
    { id: 'past', label: 'Past Events', icon: CalendarIcon },
    { id: 'my-events', label: 'My Events', icon: Users },
  ]

>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 
                    dark:from-gray-900 dark:via-gray-800 dark:to-primary-900/10 pt-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Community Events
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover and join community events, workshops, and gatherings happening near you.
          </p>
        </motion.div>

        {/* Filters and View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
<<<<<<< HEAD
          <div className="bg-white/80 dark:bg-[#1F1B28]/80 backdrop-blur-xl rounded-3xl p-4 md:p-6 border border-white/30 dark:border-[#2c2c3e]/50 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Category Filter */}
              <div className="w-full overflow-x-auto no-scrollbar -mx-2 px-2 flex md:flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-bold transition-all active:scale-95 ${
                      selectedCategory === cat
                        ? 'bg-[#8B6F47] dark:bg-[#D4A574] text-white dark:text-[#1C1B18] shadow-lg'
                        : 'bg-white dark:bg-[#2A2824] text-[#6B5D47] dark:text-[#B8A584] border border-[#E8E0D6] dark:border-[#4A4844] hover:shadow-md'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2 bg-[#FAF9F6] dark:bg-[#16141D] rounded-2xl p-1 border border-[#E8E0D6] dark:border-[#2c2c3e]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-xl transition-all active:scale-90 ${
                    viewMode === 'grid' ? 'bg-[#8B6F47] dark:bg-[#D4A574] text-white dark:text-[#1C1B18] shadow-md' : 'text-[#6B5D47] dark:text-[#B8A584]'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-xl transition-all active:scale-90 ${
                    viewMode === 'list' ? 'bg-[#8B6F47] dark:bg-[#D4A574] text-white dark:text-[#1C1B18] shadow-md' : 'text-[#6B5D47] dark:text-[#B8A584]'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`p-2.5 rounded-xl transition-all active:scale-90 ${
                    viewMode === 'calendar' ? 'bg-[#8B6F47] dark:bg-[#D4A574] text-white dark:text-[#1C1B18] shadow-md' : 'text-[#6B5D47] dark:text-[#B8A584]'
                  }`}
                >
                  <CalendarIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} defaultTab="upcoming" onTabChange={(tab) => {
          setActiveTab(tab)
        }}>
          {(tab) => (
            <div>
              {viewMode === 'calendar' ? (
                <CalendarView events={filteredEvents} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} onRSVP={handleRSVP} rsvping={rsvping} />
              ) : viewMode === 'list' ? (
                <ListView events={filteredEvents} onRSVP={handleRSVP} rsvping={rsvping} />
              ) : (
                <GridView events={filteredEvents} onRSVP={handleRSVP} rsvping={rsvping} />
=======
          <LiquidGlass intensity="light">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                          : 'bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:shadow-lg'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-2 bg-white/80 dark:bg-gray-700/80 rounded-2xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-xl transition-all ${
                      viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-xl transition-all ${
                      viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`p-2 rounded-xl transition-all ${
                      viewMode === 'calendar' ? 'bg-primary-600 text-white' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <CalendarIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </LiquidGlass>
        </motion.div>

        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} defaultTab="upcoming">
          {(activeTab) => (
            <div>
              {viewMode === 'calendar' ? (
                <CalendarView events={filteredEvents} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
              ) : viewMode === 'list' ? (
                <ListView events={filteredEvents} />
              ) : (
                <GridView events={filteredEvents} />
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
              )}
            </div>
          )}
        </TabNavigation>
      </div>
    </div>
  )
}

<<<<<<< HEAD
function CalendarView({ events, currentMonth, setCurrentMonth, onRSVP, rsvping }: any) {
=======
function CalendarView({ events, currentMonth, setCurrentMonth }: any) {
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const getEventsForDay = (day: number) => {
    return events.filter((e: Event) => {
      const eventDate = new Date(e.date)
      return eventDate.getDate() === day && 
             eventDate.getMonth() === currentMonth.getMonth() &&
             eventDate.getFullYear() === currentMonth.getFullYear()
    })
  }

  return (
    <LiquidGlass intensity="medium">
      <div className="p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-400 py-2">
              {day}
            </div>
          ))}
          {emptyDays.map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {days.map((day) => {
            const dayEvents = getEventsForDay(day)
            return (
              <motion.div
                key={day}
                whileHover={{ scale: 1.05 }}
                className={`aspect-square rounded-xl p-2 border-2 transition-all ${
                  dayEvents.length > 0
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 cursor-pointer'
                    : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                }`}
              >
                <div className="font-semibold text-gray-900 dark:text-white mb-1">{day}</div>
                {dayEvents.slice(0, 2).map((event: Event) => (
                  <div
                    key={event.id}
                    className="text-xs bg-primary-600 text-white rounded px-1 mb-1 truncate"
                  >
                    {event.name}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-primary-600 dark:text-primary-400">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </LiquidGlass>
  )
}

<<<<<<< HEAD
function GridView({ events, onRSVP, rsvping }: { events: Event[]; onRSVP: (event: Event) => void; rsvping: string | null }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
=======
function GridView({ events }: { events: Event[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
<<<<<<< HEAD
          className="bg-white dark:bg-[#1F1B28] rounded-[2rem] border border-[#E8E0D6] dark:border-[#2c2c3e] overflow-hidden shadow-lg"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-4">
              <span className="px-3 py-1 bg-[#8B6F47]/10 text-[#8B6F47] dark:text-[#D4A574] text-[10px] font-black uppercase tracking-widest rounded-full border border-[#8B6F47]/10">
                {event.category}
              </span>
              {event.ticketPrice ? (
                <span className="text-xl font-bold text-[#2C2416] dark:text-white">
                  ${event.ticketPrice}
                </span>
              ) : (
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Free</span>
              )}
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-[#2C2416] dark:text-white mb-2">{event.name}</h3>
            <p className="text-[#6B5D47] dark:text-[#B8A584] text-sm mb-6 line-clamp-2">{event.description}</p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-[#2C2416] dark:text-[#F5F3F0] font-medium">
                <Calendar className="w-5 h-5 text-[#8B6F47]" />
                <span suppressHydrationWarning>
                  {event.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#2C2416] dark:text-[#F5F3F0] font-medium">
                <Clock className="w-5 h-5 text-[#8B6F47]" />
                {event.time}
              </div>
              <div className="flex items-center gap-3 text-sm text-[#2C2416] dark:text-[#F5F3F0] font-medium">
                <MapPin className="w-5 h-5 text-[#8B6F47]" />
                <span className="truncate">{event.location.address}</span>
              </div>
              {event.capacity && (
                <div className="flex items-center gap-3 text-sm text-[#2C2416] dark:text-[#F5F3F0] font-medium">
                  <Users className="w-5 h-5 text-[#8B6F47]" />
                  {event.registered} / {event.capacity} registered
                </div>
              )}
            </div>

            <button 
              onClick={() => onRSVP(event)}
              disabled={rsvping === event.id}
              className="w-full bg-[#8B6F47] dark:bg-[#D4A574] text-white dark:text-[#1C1B18] py-4 rounded-2xl font-bold hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {rsvping === event.id ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                event.rsvpRequired ? 'RSVP Now' : 'Register Now'
              )}
            </button>
          </div>
=======
        >
          <LiquidGlass intensity="medium">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full">
                  {event.category}
                </span>
                {event.ticketPrice ? (
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${event.ticketPrice}
                  </span>
                ) : (
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">Free</span>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Calendar className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  {event.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  {event.location.address}
                </div>
                {event.capacity && (
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <Users className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    {event.registered} / {event.capacity} registered
                  </div>
                )}
              </div>

              <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 rounded-2xl font-semibold hover:shadow-lg transition-all">
                {event.rsvpRequired ? 'RSVP Now' : 'Learn More'}
              </button>
            </div>
          </LiquidGlass>
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
        </motion.div>
      ))}
    </div>
  )
}

<<<<<<< HEAD
function ListView({ events, onRSVP, rsvping }: { events: Event[]; onRSVP: (event: Event) => void; rsvping: string | null }) {
=======
function ListView({ events }: { events: Event[] }) {
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ x: 5 }}
        >
          <LiquidGlass intensity="light">
            <div className="p-6 flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{event.name}</h3>
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full">
                    {event.category}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{event.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary-600" />
<<<<<<< HEAD
                    <span suppressHydrationWarning>{event.date.toLocaleDateString()}</span>
=======
                    <span>{event.date.toLocaleDateString()}</span>
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary-600" />
                    <span className="truncate">{event.location.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary-600" />
                    <span>{event.registered} registered</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
<<<<<<< HEAD
                <button 
                  onClick={() => onRSVP(event)}
                  disabled={rsvping === event.id}
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {rsvping === event.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {event.rsvpRequired ? 'RSVPing...' : 'Registering...'}
                    </>
                  ) : (
                    event.rsvpRequired ? 'RSVP Now' : 'Register Now'
                  )}
=======
                <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all">
                  {event.rsvpRequired ? 'RSVP' : 'View'}
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                </button>
              </div>
            </div>
          </LiquidGlass>
        </motion.div>
      ))}
    </div>
  )
}

function getDaysInMonth(date: Date): number {
  const year = date.getFullYear()
  const month = date.getMonth()
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(date: Date): number {
  const year = date.getFullYear()
  const month = date.getMonth()
  return new Date(year, month, 1).getDay()
}

