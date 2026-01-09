<<<<<<< HEAD
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient({ headers: request.headers })
    const adminClient = createAdminClient()

    // Get user from session (optional for anyone to submit)
    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id || null

    // Get user's current role if they exist
    let userRole = 'volunteer'
    if (userId) {
      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single()
      userRole = userData?.role || 'volunteer'
    }

    const {
      name,
      category,
      description,
      address,
      phone,
      email,
      website,
      tags,
      hours,
      services,
      languages,
      accessibility,
      location,
    } = await request.json()

    if (!name || !category || !description || !phone || !email) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert into resource_submissions
    // Note: We use the server-side supabase client to respect the session if possible
    const { data, error } = await supabase
      .from('resource_submissions')
      .insert({
        name,
        category,
        description,
        address: address || null,
        phone,
        email,
        website: website || null,
        tags: tags || [],
        hours: hours || null,
        services: services || [],
        languages: languages || [],
        accessibility: accessibility || [],
        location: location || null,
        submitted_by: userId,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('Resource submission database error:', error)
      return NextResponse.json(
        { success: false, error: `Database error: ${error.message}` },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Failed to create submission record' },
        { status: 500 }
      )
    }

    // Upgrade volunteer to organizer (but keep admin as admin)
    if (userId && userRole === 'volunteer') {
      try {
        await adminClient
          .from('users')
          .update({ role: 'organizer' })
          .eq('id', userId)
      } catch (roleErr) {
        console.warn('Failed to upgrade user role:', roleErr)
        // We don't fail the whole request just because role upgrade failed
      }
    }

    return NextResponse.json({
      success: true,
      data: { submission: data },
      message: 'Resource submitted successfully and is awaiting admin approval.',
    })
  } catch (error) {
    console.error('Resource submission error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
=======
/**
 * Resources API Route
 * 
 * Handles CRUD operations for community resources.
 * 
 * Endpoints:
 * - GET /api/resources - Get all resources (with filtering)
 * - POST /api/resources - Create new resource
 * - GET /api/resources/[id] - Get specific resource
 * - PUT /api/resources/[id] - Update resource
 * - DELETE /api/resources/[id] - Delete resource
 */

import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db/schema'
import { getAuthService, requireAuth } from '@/lib/auth'
import { validateResource } from '@/lib/utils/validation'
import { ApiResponse, Resource, PaginatedResponse } from '@/lib/types'

const db = getDatabase()

/**
 * GET /api/resources
 * 
 * Get all resources with optional filtering and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const featured = searchParams.get('featured') === 'true'

    let resources: Resource[] = []

    // Get resources by category
    if (category && category !== 'All Categories') {
      resources = db.getResourcesByCategory(category)
    } else {
      // Get all resources
      resources = db.getAllResources()
    }

    // Apply search filter
    if (search) {
      resources = db.searchResources(search)
    }

    // Filter featured
    if (featured) {
      resources = resources.filter(r => r.featured)
    }

    // Pagination
    const total = resources.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (page - 1) * pageSize
    const paginatedResources = resources.slice(startIndex, startIndex + pageSize)

    const response: ApiResponse<PaginatedResponse<Resource>> = {
      success: true,
      data: {
        items: paginatedResources,
        total,
        page,
        pageSize,
        totalPages,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching resources:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resources' },
>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
      { status: 500 }
    )
  }
}
<<<<<<< HEAD
=======

/**
 * POST /api/resources
 * 
 * Create a new resource (requires authentication)
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = requireAuth()
    
    const body = await request.json()
    
    // Validate resource data
    const validation = validateResource(body)
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      )
    }

    // Create resource
    const resource: Resource = {
      id: `resource_${Date.now()}`,
      name: body.name,
      category: body.category,
      description: body.description,
      address: body.address,
      location: body.location || {
        lat: 0,
        lng: 0,
        address: body.address,
        city: body.city || '',
        state: body.state || '',
        zipCode: body.zipCode || '',
      },
      phone: body.phone,
      email: body.email,
      website: body.website || '',
      tags: body.tags || [],
      featured: false,
      verified: false, // Requires admin verification
      submittedBy: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const created = db.createResource(resource)

    const response: ApiResponse<Resource> = {
      success: true,
      data: created,
      message: 'Resource submitted successfully. It will be reviewed by our team.',
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error: any) {
    console.error('Error creating resource:', error)
    
    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create resource' },
      { status: 500 }
    )
  }
}

>>>>>>> cf332b3929eae5f9e2ac22ca73c0b281aaf9c43b
