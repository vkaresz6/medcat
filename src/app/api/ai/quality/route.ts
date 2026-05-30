import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { withAuth, badRequest, serverError } from '@/lib/api/auth'
import type { AuthContext } from '@/lib/api/auth'
import { checkQuality } from '@/lib/ai/service'

const schema = z.object({
  segments: z.array(z.object({
    source_text: z.string().min(1),
    target_text: z.string().min(1),
  })).min(1).max(200),
  source_language: z.string().min(2).max(10),
  target_language: z.string().min(2).max(10),
})

export const POST = withAuth(async (req: NextRequest, _ctx: AuthContext) => {
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return badRequest(parsed.error.issues[0]?.message ?? 'Invalid input')
  }

  try {
    const result = await checkQuality(parsed.data)
    return NextResponse.json(result)
  } catch (err) {
    return serverError(err)
  }
})
