'use client'

<<<<<<< HEAD
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthRequired from '@/components/auth/AuthRequired'
import { supabase } from '@/lib/supabase/client'
import { RefreshCw, Check } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface PendingSubmission {
  id: string
  name: string
  category: string
  description: string
  address: string
  phone: string
  email: string
  website: string | null
  tags: string[]
  hours: string | null
  services: string[]
  languages: string[]
  accessibility: string[]
  status: string
  created_at: string
  updated_at: string
  submitted_by: {
    id: string
    name: string
    email: string
    role: string
  } | null
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState<PendingSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [featuredSelections, setFeaturedSelections] = useState<Record<string, boolean>>({})
  const [publishedResources, setPublishedResources] = useState<any[]>([])
  const [resourcesLoading, setResourcesLoading] = useState(true)
  const [resourceError, setResourceError] = useState<string | null>(null)
  const [resourceActionLoading, setResourceActionLoading] = useState<string | null>(null)
  const { theme } = useTheme()
  const themeMode = theme === 'dark' ? 'dark' : 'light'
  const [isAdminVerified, setIsAdminVerified] = useState(false)
  const [adminCheckLoading, setAdminCheckLoading] = useState(true)

  const backgroundClasses = useMemo(() => {
    return themeMode === 'light'
      ? 'bg-[#FAF9F6] text-[#1C1B18]'
      : 'bg-[#1C1B18] text-white'
  }, [themeMode])

  const cardClasses = useMemo(() => {
    return themeMode === 'light'
      ? 'bg-white/90 text-[#2C2416] border border-[#E8E0D6] shadow-xl'
      : 'bg-[#1F1B26]/70 text-white border border-white/10 shadow-lg'
  }, [themeMode])

  const accentColor = themeMode === 'dark' ? '#94f9ff' : '#8B6F47'
  const headerTextColor = themeMode === 'dark' ? 'text-white/80' : 'text-[#6B5D47]'

  const fetchSubmissions = async () => {
    setLoading(true)
    setErrorMessage(null)
    try {
      const session = await supabase.auth.getSession()
      const token = session?.data?.session?.access_token
      const response = await fetch('/api/admin/resource-submissions', {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to load submissions')
      }

      setSubmissions(data.data.submissions || [])
    } catch (error: any) {
      console.error('Failed to load admin submissions', error)
      setErrorMessage(error.message || 'Unable to load submissions right now')
=======
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Database, 
  DollarSign, 
  Calendar, 
  Users, 
  MapPin,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  TrendingUp,
  BarChart3,
  FileText
} from 'lucide-react'
import { getSupabaseDatabase } from '@/lib/supabase/database'
import { Resource, Event, FundraisingCampaign, VolunteerOpportunity } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [resources, setResources] = useState<Resource[]>([])
  const [campaigns, setCampaigns] = useState<FundraisingCampaign[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [volunteers, setVolunteers] = useState<VolunteerOpportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [editingData, setEditingData] = useState<any>(null)

  const db = getSupabaseDatabase()

  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    setLoading(true)
    try {
      const [resData, campData, evtData, volData] = await Promise.all([
        db.getAllResources(),
        db.getAllCampaigns(),
        db.getAllEvents(),
        db.getAllVolunteerOpportunities(),
      ])
      setResources(resData)
      setCampaigns(campData)
      setEvents(evtData)
      setVolunteers(volData)
    } catch (error) {
      console.error('Error loading data:', error)
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
    } finally {
      setLoading(false)
    }
  }

<<<<<<< HEAD
  const fetchPublishedResources = async () => {
    setResourcesLoading(true)
    setResourceError(null)

    try {
      const session = await supabase.auth.getSession()
      const token = session?.data?.session?.access_token
      const response = await fetch('/api/admin/resources', {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to load resources')
      }

      setPublishedResources(data.data.resources || [])
    } catch (error: any) {
      console.error('Failed to load published resources', error)
      setResourceError(error.message || 'Unable to load resources right now')
    } finally {
      setResourcesLoading(false)
    }
  }

  const handlePublishedToggle = async (
    resourceId: string,
    updates: { featured?: boolean; verified?: boolean; status?: string }
  ) => {
    setResourceActionLoading(resourceId)
    try {
      const session = await supabase.auth.getSession()
      const token = session?.data?.session?.access_token
      const response = await fetch(`/api/admin/resources/${resourceId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(updates),
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to update resource')
      }

      setPublishedResources((prev) =>
        prev.map((resource) => (resource.id === resourceId ? data.data.resource : resource))
      )
    } catch (error: any) {
      console.error('Failed to update resource', error)
      setResourceError(error.message || 'Unable to update resource right now')
    } finally {
      setResourceActionLoading(null)
    }
  }

  const handleDeleteResource = async (resourceId: string) => {
    if (!confirm('Delete this resource permanently?')) {
      return
    }

    setResourceActionLoading(resourceId)
    try {
      const session = await supabase.auth.getSession()
      const token = session?.data?.session?.access_token
      const response = await fetch(`/api/admin/resources/${resourceId}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete resource')
      }

      setPublishedResources((prev) => prev.filter((resource) => resource.id !== resourceId))
    } catch (error: any) {
      console.error('Failed to delete resource', error)
      setResourceError(error.message || 'Unable to delete resource right now')
    } finally {
      setResourceActionLoading(null)
    }
  }

  const toggleFeaturedSelection = (submissionId: string) => {
    setFeaturedSelections((prev) => ({
      ...prev,
      [submissionId]: !prev[submissionId],
    }))
  }

  useEffect(() => {
    let mounted = true

    const checkAdmin = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()

        if (!mounted) return

        if (error || !data.user) {
          router.replace('/')
          return
        }

        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single()

        if (profileError || !profile || profile.role !== 'admin') {
          router.replace('/')
          return
        }

        setIsAdminVerified(true)
      } catch (error) {
        console.error('Admin verification failed', error)
        router.replace('/')
      } finally {
        if (mounted) {
          setAdminCheckLoading(false)
        }
      }
    }

    checkAdmin()

    return () => {
      mounted = false
    }
  }, [router])

  useEffect(() => {
    if (!isAdminVerified) {
      return
    }

    fetchSubmissions()
    fetchPublishedResources()

    // Subscribe to realtime changes for submissions and resources
    const submissionsChannel = supabase
      .channel('admin-submissions-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'resource_submissions',
        },
        () => {
          console.log('Submission change detected')
          fetchSubmissions()
        }
      )
      .subscribe()

    const resourcesChannel = supabase
      .channel('admin-resources-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'resources',
        },
        () => {
          console.log('Resource change detected')
          fetchPublishedResources()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(submissionsChannel)
      supabase.removeChannel(resourcesChannel)
    }
  }, [isAdminVerified])

  const handleApprove = async (id: string, options?: { featured?: boolean }) => {
    setErrorMessage(null)
    setActionLoading(id)
    try {
      const session = await supabase.auth.getSession()
      const token = session?.data?.session?.access_token
      const response = await fetch(`/api/admin/resource-submissions/${id}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          featured: Boolean(options?.featured),
        }),
      })
      const payload = await response.json()

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || 'Approval failed')
      }

      setSubmissions((prev) => prev.filter((submission) => submission.id !== id))
      setFeaturedSelections((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
      fetchPublishedResources()
      fetchSubmissions()
    } catch (error: any) {
      console.error('Approve error', error)
      setErrorMessage(error.message || 'Could not approve submission')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (id: string) => {
    const reason = prompt('Why are you rejecting this submission?')
    if (!reason) return
    setErrorMessage(null)
    setActionLoading(id)
    try {
      const session = await supabase.auth.getSession()
      const token = session?.data?.session?.access_token
      const response = await fetch(`/api/admin/resource-submissions/${id}/reject`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ reason }),
      })
      const payload = await response.json()

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || 'Rejection failed')
      }

      setSubmissions((prev) => prev.filter((submission) => submission.id !== id))
    } catch (error: any) {
      console.error('Reject error', error)
      setErrorMessage(error.message || 'Could not reject submission')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <AuthRequired featureName="Admin Dashboard">
      <div className={`min-h-screen ${backgroundClasses} pt-[6.5rem] pb-10 px-4`}>
        {adminCheckLoading ? (
          <div className="max-w-2xl mx-auto py-32 text-center space-y-3">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-transparent" />
            <p className="text-xl font-semibold">
              Verifying admin access...
            </p>
            <p className="text-sm opacity-80">
              We are checking your permissions before showing the resource queue.
            </p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-8">
            <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className={`text-sm uppercase tracking-[0.3em] ${themeMode === 'dark' ? 'text-white/70' : 'text-[#6B5D47]/70'}`}>
                  Communify Admin
                </p>
                <h1 className="text-4xl font-bold tracking-tight">
                  Resource Approvals
                </h1>
              <p className={`text-base ${headerTextColor} max-w-2xl`}>
                  Every submission lands here first. Approve the trustworthy resources so they land
                  in the public directory—or reject them if they need more work.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm opacity-80">
                  
                </span>
                <button
                  onClick={fetchSubmissions}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20 transition"
                >
                  <RefreshCw size={18} />
                  Refresh
                </button>
              </div>
            </header>

            {errorMessage && (
              <div className="p-4 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-600">
                <strong>Error:</strong> {errorMessage}
              </div>
            )}

            {loading ? (
              <div className="grid gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className={`${cardClasses} animate-pulse h-40 rounded-3xl`}
                  />
                ))}
              </div>
            ) : submissions.length === 0 ? (
              <div className={`${cardClasses} rounded-3xl p-10 text-center`}>
                <Check size={48} className="mx-auto text-emerald-400" />
                <p className="text-xl font-semibold mt-4">All caught up</p>
                <p className="text-sm opacity-80">
                  There are no pending submissions right now. Sit back and relax.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {submissions.map((submission) => (
                  <article
                    key={submission.id}
                    className={`${cardClasses} rounded-[30px] p-7 space-y-6`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.4em]" style={{ color: accentColor }}>
                          Pending
                        </p>
                        <h2 className="text-2xl font-bold">{submission.name}</h2>
                        <p className="text-sm opacity-80">{submission.category}</p>
                      </div>
                  <div className="flex items-center justify-end">
                        <span className="px-3 py-1 rounded-full border border-white/30 text-xs uppercase tracking-[0.2em]">
                          Submitted {new Date(submission.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <p className="text-sm opacity-70">Description</p>
                        <p className="text-base leading-relaxed">
                          {submission.description}
                        </p>
                      </div>
                      <div className="space-y-3 text-sm opacity-90">
                        <p>
                          <strong>Contact:</strong> {submission.phone} · {submission.email}
                        </p>
                        {submission.website && (
                          <p>
                            <strong>Website:</strong>{' '}
                            <a
                              href={submission.website}
                              target="_blank"
                              rel="noreferrer"
                              className="underline"
                            >
                              {submission.website}
                            </a>
                          </p>
                        )}
                        <p>
                          <strong>Address:</strong> {submission.address}
                        </p>
                      </div>
                    </div>

                    {submission.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 text-sm">
                        {submission.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-white/10 border border-white/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] opacity-70">
                            Submitted By
                          </p>
                          <p className="text-sm opacity-90">
                            {submission.submitted_by?.name || 'Community Member'} ·{' '}
                            {submission.submitted_by?.email || 'No email'}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <button
                            onClick={() => toggleFeaturedSelection(submission.id)}
                            className={`px-3 py-1 rounded-full border text-sm transition ${
                              featuredSelections[submission.id]
                                ? 'bg-[#8B6F47] dark:bg-[#8B6F47] text-white border-transparent'
                                : 'bg-transparent dark:bg-transparent text-[#6B5D47] dark:text-white border-[#8B6F47]/40 dark:border-white/40 hover:border-[#8B6F47] dark:hover:border-white'
                            }`}
                          >
                            {featuredSelections[submission.id]
                              ? 'Featured in Highlights'
                              : 'Feature in Highlights'}
                          </button>
                          <span className="text-xs text-[#6B5D47] dark:text-[#B8A584]">
                            Will publish to All Resources once approved.
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          disabled={actionLoading === submission.id}
                          onClick={() => handleReject(submission.id)}
                          className="px-5 py-2 rounded-full bg-red-500/90 text-white disabled:opacity-40 transition"
                        >
                          {actionLoading === submission.id ? 'Rejecting...' : 'Reject'}
                        </button>
                        <button
                          disabled={actionLoading === submission.id}
                          onClick={() =>
                            handleApprove(submission.id, {
                              featured: !!featuredSelections[submission.id],
                            })
                          }
                          className="px-5 py-2 rounded-full bg-emerald-500/90 text-white disabled:opacity-40 transition"
                        >
                          {actionLoading === submission.id ? 'Approving...' : 'Approve'}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <section className="space-y-6 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.4em] text-[#6B5D47] dark:text-[#B8A584]"
                    style={{ letterSpacing: '0.4em' }}
                  >
                    Live Inventory
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight text-[#2C2416] dark:text-white">
                    Published Resources
                  </h2>
                </div>
                <button
                  onClick={fetchPublishedResources}
                  disabled={resourcesLoading}
                  className="px-4 py-2 rounded-full border border-white/30 bg-white/10 text-sm font-semibold text-white hover:bg-white/20 transition disabled:opacity-50"
                >
                  Refresh list
                </button>
              </div>

              {resourcesLoading ? (
                <div className="grid gap-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={`resource-skeleton-${index}`}
                      className={`${cardClasses} h-40 rounded-3xl animate-pulse`}
                    />
                  ))}
                </div>
              ) : resourceError ? (
                <div className={`${cardClasses} rounded-3xl p-6 text-sm text-red-500`}>
                  {resourceError}
                </div>
              ) : publishedResources.length === 0 ? (
                <div className={`${cardClasses} rounded-3xl p-6 text-center`}>
                  <p className="text-lg font-semibold text-[#2C2416] dark:text-white">No published resources yet</p>
                  <p className="text-sm text-[#6B5D47] dark:text-[#B8A584]">
                    Approve submissions to grow the directory.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {publishedResources.map((resource) => (
                    <div key={resource.id} className={`${cardClasses} rounded-3xl p-6 space-y-3`}>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-[#6B5D47] dark:text-[#B8A584]">
                            {resource.category || 'Uncategorized'}
                          </p>
                          <h3 className="text-2xl font-semibold text-[#2C2416] dark:text-white">
                            {resource.name}
                          </h3>
                        </div>
                        <span className="text-xs uppercase tracking-[0.3em] text-[#4E4E4E] dark:text-[#B8A584]">
                          {resource.status || (resource.verified ? 'approved' : 'draft')}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-[#6B5D47] dark:text-[#B8A584]">
                        {resource.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          disabled={resourceActionLoading === resource.id}
                          onClick={() =>
                            handlePublishedToggle(resource.id, { featured: !resource.featured })
                          }
                          className={`px-4 py-2 rounded-full border transition text-sm font-semibold ${
                            resource.featured
                              ? 'bg-[#8B6F47] dark:bg-[#8B6F47] border-transparent text-white'
                              : 'bg-transparent dark:bg-transparent border-[#8B6F47]/30 dark:border-white/30 text-[#6B5D47] dark:text-white hover:border-[#8B6F47] dark:hover:border-white'
                          } ${resourceActionLoading === resource.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {resource.featured ? 'Featured in Highlights' : 'Mark as Featured'}
                        </button>
                        <button
                          disabled={resourceActionLoading === resource.id}
                          onClick={() =>
                            handlePublishedToggle(resource.id, { verified: !resource.verified })
                          }
                          className={`px-4 py-2 rounded-full border transition text-sm font-semibold ${
                            resource.verified
                              ? 'bg-emerald-500/90 border-transparent text-white'
                              : 'bg-transparent border-white/30 text-white hover:border-white'
                          } ${resourceActionLoading === resource.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {resource.verified ? 'Verified' : 'Set Verified'}
                        </button>
                        <button
                          disabled={resourceActionLoading === resource.id}
                          onClick={() => handleDeleteResource(resource.id)}
                          className={`px-4 py-2 rounded-full border transition text-sm font-semibold text-red-500 ${
                            resourceActionLoading === resource.id ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          Delete Resource
                        </button>
=======
  const handleUpdateCampaign = async (id: string, updates: Partial<FundraisingCampaign>) => {
    try {
      const updated = await db.updateCampaign(id, updates)
      if (updated) {
        setCampaigns(prev => prev.map(c => c.id === id ? updated : c))
        setEditing(null)
      }
    } catch (error) {
      console.error('Error updating campaign:', error)
      alert('Failed to update campaign')
    }
  }

  const handleUpdateResource = async (id: string, updates: Partial<Resource>) => {
    try {
      const updated = await db.updateResource(id, updates)
      if (updated) {
        setResources(prev => prev.map(r => r.id === id ? updated : r))
        setEditing(null)
      }
    } catch (error) {
      console.error('Error updating resource:', error)
      alert('Failed to update resource')
    }
  }

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      let success = false
      switch (type) {
        case 'campaign':
          success = await db.deleteCampaign(id)
          if (success) setCampaigns(prev => prev.filter(c => c.id !== id))
          break
        case 'resource':
          success = await db.deleteResource(id)
          if (success) setResources(prev => prev.filter(r => r.id !== id))
          break
        case 'event':
          success = await db.deleteEvent(id)
          if (success) setEvents(prev => prev.filter(e => e.id !== id))
          break
        case 'volunteer':
          success = await db.deleteVolunteerOpportunity(id)
          if (success) setVolunteers(prev => prev.filter(v => v.id !== id))
          break
      }
      if (!success) alert('Failed to delete item')
    } catch (error) {
      console.error('Error deleting:', error)
      alert('Failed to delete item')
    }
  }

  const stats = {
    totalResources: resources.length,
    totalCampaigns: campaigns.length,
    totalEvents: events.length,
    totalVolunteers: volunteers.length,
    totalRaised: campaigns.reduce((sum, c) => sum + c.raised, 0),
    totalGoal: campaigns.reduce((sum, c) => sum + c.goal, 0),
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#1C1B18] pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B6F47] dark:border-[#D4A574] mx-auto mb-4"></div>
          <p className="text-[#6B5D47] dark:text-[#B8A584]">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#1C1B18] pt-20">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-[#2C2416] dark:text-[#F5F3F0] mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-[#6B5D47] dark:text-[#B8A584]">
            Manage all resources, campaigns, events, and volunteer opportunities
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white dark:bg-[#2A2824] border-[#E8E0D6] dark:border-[#4A4844]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B5D47] dark:text-[#B8A584]">Resources</p>
                  <p className="text-2xl font-bold text-[#2C2416] dark:text-[#F5F3F0]">{stats.totalResources}</p>
                </div>
                <Database className="w-8 h-8 text-[#8B6F47] dark:text-[#D4A574]" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#2A2824] border-[#E8E0D6] dark:border-[#4A4844]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B5D47] dark:text-[#B8A584]">Campaigns</p>
                  <p className="text-2xl font-bold text-[#2C2416] dark:text-[#F5F3F0]">{stats.totalCampaigns}</p>
                </div>
                <DollarSign className="w-8 h-8 text-[#8B6F47] dark:text-[#D4A574]" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#2A2824] border-[#E8E0D6] dark:border-[#4A4844]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B5D47] dark:text-[#B8A584]">Events</p>
                  <p className="text-2xl font-bold text-[#2C2416] dark:text-[#F5F3F0]">{stats.totalEvents}</p>
                </div>
                <Calendar className="w-8 h-8 text-[#8B6F47] dark:text-[#D4A574]" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#2A2824] border-[#E8E0D6] dark:border-[#4A4844]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6B5D47] dark:text-[#B8A584]">Volunteers</p>
                  <p className="text-2xl font-bold text-[#2C2416] dark:text-[#F5F3F0]">{stats.totalVolunteers}</p>
                </div>
                <Users className="w-8 h-8 text-[#8B6F47] dark:text-[#D4A574]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fundraising Stats */}
        <Card className="mb-8 bg-white dark:bg-[#2A2824] border-[#E8E0D6] dark:border-[#4A4844]">
          <CardHeader>
            <CardTitle className="text-[#2C2416] dark:text-[#F5F3F0] flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Fundraising Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-[#6B5D47] dark:text-[#B8A584]">Total Raised</p>
                <p className="text-2xl font-bold text-[#2C2416] dark:text-[#F5F3F0]">
                  ${stats.totalRaised.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#6B5D47] dark:text-[#B8A584]">Total Goal</p>
                <p className="text-2xl font-bold text-[#2C2416] dark:text-[#F5F3F0]">
                  ${stats.totalGoal.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#6B5D47] dark:text-[#B8A584]">Progress</p>
                <p className="text-2xl font-bold text-[#2C2416] dark:text-[#F5F3F0]">
                  {stats.totalGoal > 0 ? Math.round((stats.totalRaised / stats.totalGoal) * 100) : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white dark:bg-[#2A2824] border-[#E8E0D6] dark:border-[#4A4844]">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
          </TabsList>

          {/* Fundraising Campaigns */}
          <TabsContent value="campaigns" className="mt-6">
            <Card className="bg-white dark:bg-[#2A2824] border-[#E8E0D6] dark:border-[#4A4844]">
              <CardHeader>
                <CardTitle className="text-[#2C2416] dark:text-[#F5F3F0]">Fundraising Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="p-4 border border-[#E8E0D6] dark:border-[#4A4844] rounded-lg bg-[#FAF9F6] dark:bg-[#1C1B18]"
                    >
                      {editing === campaign.id ? (
                        <CampaignEditForm
                          campaign={campaign}
                          onSave={(updates) => handleUpdateCampaign(campaign.id, updates)}
                          onCancel={() => setEditing(null)}
                        />
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-[#2C2416] dark:text-[#F5F3F0]">
                                {campaign.title}
                              </h3>
                              <p className="text-sm text-[#6B5D47] dark:text-[#B8A584] mt-1">
                                {campaign.description}
                              </p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditing(campaign.id)
                                  setEditingData(campaign)
                                }}
                                className="border-[#E8E0D6] dark:border-[#4A4844]"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete('campaign', campaign.id)}
                                className="border-red-200 dark:border-red-900 text-red-600 dark:text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div>
                              <p className="text-xs text-[#6B5D47] dark:text-[#B8A584]">Raised</p>
                              <p className="text-lg font-bold text-[#2C2416] dark:text-[#F5F3F0]">
                                ${campaign.raised.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-[#6B5D47] dark:text-[#B8A584]">Goal</p>
                              <p className="text-lg font-bold text-[#2C2416] dark:text-[#F5F3F0]">
                                ${campaign.goal.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-[#6B5D47] dark:text-[#B8A584]">Donors</p>
                              <p className="text-lg font-bold text-[#2C2416] dark:text-[#F5F3F0]">
                                {campaign.donors}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-[#6B5D47] dark:text-[#B8A584]">Progress</p>
                              <p className="text-lg font-bold text-[#2C2416] dark:text-[#F5F3F0]">
                                {Math.round((campaign.raised / campaign.goal) * 100)}%
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <div className="w-full bg-[#E8E0D6] dark:bg-[#4A4844] rounded-full h-2">
                              <div
                                className="bg-[#8B6F47] dark:bg-[#D4A574] h-2 rounded-full transition-all"
                                style={{ width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources */}
          <TabsContent value="resources" className="mt-6">
            <Card className="bg-white dark:bg-[#2A2824] border-[#E8E0D6] dark:border-[#4A4844]">
              <CardHeader>
                <CardTitle className="text-[#2C2416] dark:text-[#F5F3F0]">Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="p-4 border border-[#E8E0D6] dark:border-[#4A4844] rounded-lg bg-[#FAF9F6] dark:bg-[#1C1B18]"
                    >
                      {editing === resource.id ? (
                        <ResourceEditForm
                          resource={resource}
                          onSave={(updates) => handleUpdateResource(resource.id, updates)}
                          onCancel={() => setEditing(null)}
                        />
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg text-[#2C2416] dark:text-[#F5F3F0]">
                                  {resource.name}
                                </h3>
                                {resource.featured && (
                                  <Badge className="bg-[#8B6F47] dark:bg-[#D4A574] text-white dark:text-[#1C1B18]">
                                    Featured
                                  </Badge>
                                )}
                                {resource.verified && (
                                  <Badge variant="outline" className="border-green-500 text-green-600 dark:text-green-400">
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-[#6B5D47] dark:text-[#B8A584]">{resource.description}</p>
                              <p className="text-xs text-[#6B5D47] dark:text-[#B8A584] mt-1">
                                {resource.category} • {resource.address}
                              </p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditing(resource.id)
                                  setEditingData(resource)
                                }}
                                className="border-[#E8E0D6] dark:border-[#4A4844]"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete('resource', resource.id)}
                                className="border-red-200 dark:border-red-900 text-red-600 dark:text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events */}
          <TabsContent value="events" className="mt-6">
            <Card className="bg-white dark:bg-[#2A2824] border-[#E8E0D6] dark:border-[#4A4844]">
              <CardHeader>
                <CardTitle className="text-[#2C2416] dark:text-[#F5F3F0]">Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 border border-[#E8E0D6] dark:border-[#4A4844] rounded-lg bg-[#FAF9F6] dark:bg-[#1C1B18]"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-[#2C2416] dark:text-[#F5F3F0]">
                            {event.name}
                          </h3>
                          <p className="text-sm text-[#6B5D47] dark:text-[#B8A584] mt-1">{event.description}</p>
                          <p className="text-xs text-[#6B5D47] dark:text-[#B8A584] mt-1">
                            {new Date(event.date).toLocaleDateString()} at {event.time} • {event.organizer}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete('event', event.id)}
                          className="border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 ml-4"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
                      </div>
                    </div>
                  ))}
                </div>
<<<<<<< HEAD
              )}
            </section>
          </div>
        )}
      </div>
    </AuthRequired>
=======
              </CardContent>
            </Card>
          </TabsContent>

          {/* Volunteers */}
          <TabsContent value="volunteers" className="mt-6">
            <Card className="bg-white dark:bg-[#2A2824] border-[#E8E0D6] dark:border-[#4A4844]">
              <CardHeader>
                <CardTitle className="text-[#2C2416] dark:text-[#F5F3F0]">Volunteer Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {volunteers.map((volunteer) => (
                    <div
                      key={volunteer.id}
                      className="p-4 border border-[#E8E0D6] dark:border-[#4A4844] rounded-lg bg-[#FAF9F6] dark:bg-[#1C1B18]"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-[#2C2416] dark:text-[#F5F3F0]">
                            {volunteer.title}
                          </h3>
                          <p className="text-sm text-[#6B5D47] dark:text-[#B8A584] mt-1">{volunteer.description}</p>
                          <p className="text-xs text-[#6B5D47] dark:text-[#B8A584] mt-1">
                            {volunteer.organization} • {volunteer.category}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete('volunteer', volunteer.id)}
                          className="border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 ml-4"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Campaign Edit Form Component
function CampaignEditForm({ 
  campaign, 
  onSave, 
  onCancel 
}: { 
  campaign: FundraisingCampaign
  onSave: (updates: Partial<FundraisingCampaign>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: campaign.title,
    description: campaign.description,
    goal: campaign.goal,
    raised: campaign.raised,
    donors: campaign.donors,
    status: campaign.status,
  })

  return (
    <div className="space-y-4">
      <Input
        label="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="bg-white dark:bg-[#2A2824] border-[#E8E0D6] dark:border-[#4A4844]"
      />
      <Textarea
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="bg-white dark:bg-[#2A2824] border-[#E8E0D6] dark:border-[#4A4844]"
      />
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          label="Goal"
          value={formData.goal}
          onChange={(e) => setFormData({ ...formData, goal: Number(e.target.value) })}
          className="bg-white dark:bg-[#2A2824] border-[#E8E0D6] dark:border-[#4A4844]"
        />
        <Input
          type="number"
          label="Raised"
          value={formData.raised}
          onChange={(e) => setFormData({ ...formData, raised: Number(e.target.value) })}
          className="bg-white dark:bg-[#2A2824] border-[#E8E0D6] dark:border-[#4A4844]"
        />
        <Input
          type="number"
          label="Donors"
          value={formData.donors}
          onChange={(e) => setFormData({ ...formData, donors: Number(e.target.value) })}
          className="bg-white dark:bg-[#2A2824] border-[#E8E0D6] dark:border-[#4A4844]"
        />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => onSave(formData)}
          className="bg-[#8B6F47] dark:bg-[#D4A574] text-white dark:text-[#1C1B18]"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-[#E8E0D6] dark:border-[#4A4844]"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  )
}

// Resource Edit Form Component
function ResourceEditForm({ 
  resource, 
  onSave, 
  onCancel 
}: { 
  resource: Resource
  onSave: (updates: Partial<Resource>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: resource.name,
    description: resource.description,
    featured: resource.featured,
    verified: resource.verified,
  })

  return (
    <div className="space-y-4">
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="bg-white dark:bg-[#2A2824] border-[#E8E0D6] dark:border-[#4A4844]"
      />
      <Textarea
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="bg-white dark:bg-[#2A2824] border-[#E8E0D6] dark:border-[#4A4844]"
      />
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="rounded"
          />
          <span className="text-sm text-[#2C2416] dark:text-[#F5F3F0]">Featured</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.verified}
            onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
            className="rounded"
          />
          <span className="text-sm text-[#2C2416] dark:text-[#F5F3F0]">Verified</span>
        </label>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => onSave(formData)}
          className="bg-[#8B6F47] dark:bg-[#D4A574] text-white dark:text-[#1C1B18]"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-[#E8E0D6] dark:border-[#4A4844]"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
  )
}

