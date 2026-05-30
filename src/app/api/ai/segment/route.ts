import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { withAuth, badRequest, serverError } from '@/lib/api/auth'
import type { AuthContext } from '@/lib/api/auth'
import { segment } from '@/lib/ai/service'

const schema = z.object({
  text: z.string().min(1).max(50000),
  language: z.string().min(2).max(10),
  preserve_formatting: z.boolean().optional(),
})

export const POST = withAuth(async (req: NextRequest, _ctx: AuthContext) => {
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return badRequest(parsed.error.issues[0]?.message ?? 'Invalid input')
  }

  try {
    const result = await segment(parsed.data)
    return NextResponse.json(result)
  } catch (err) {
    return serverError(err)
  }
})
