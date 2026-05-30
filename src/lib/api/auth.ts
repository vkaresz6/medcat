import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'
import type { MemberRole } from '@/types/database'

export type AuthContext = {
  user: User
  supabase: ReturnType<typeof createClient>
}

type RouteHandler = (req: NextRequest, ctx: AuthContext, ...args: unknown[]) => Promise<NextResponse>

// Wraps an API route handler with auth check
export function withAuth(handler: RouteHandler) {
  return async (req: NextRequest, ...args: unknown[]) => {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return handler(req, { user, supabase }, ...args)
  }
}

// Checks that the caller is a member of the project with required role(s)
export async function requireProjectRole(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  projectId: string,
  allowedRoles: MemberRole[]
): Promise<{ allowed: boolean; role: MemberRole | null }> {
  // Project owner always has full access
  const { data: project } = await supabase
    .from('projects')
    .select('owner_id')
    .eq('id', projectId)
    .single()

  if (project?.owner_id === userId) {
    return { allowed: true, role: 'owner' }
  }

  const { data: membership } = await supabase
    .from('project_members')
    .select('role')
    .eq('project_id', projectId)
    .eq('user_id', userId)
    .single()

  if (!membership) {
    return { allowed: false, role: null }
  }

  const allowed = allowedRoles.includes(membership.role as MemberRole)
  return { allowed, role: membership.role as MemberRole }
}

export function unauthorized(message = 'Forbidden') {
  return NextResponse.json({ error: message }, { status: 403 })
}

export function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

export function notFound(resource = 'Resource') {
  return NextResponse.json({ error: `${resource} not found` }, { status: 404 })
}

export function serverError(error: unknown) {
  console.error('[API Error]', error)
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
