import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { withAuth, badRequest, serverError } from '@/lib/api/auth'
import type { AuthContext } from '@/lib/api/auth'
import { detectTerms } from '@/lib/ai/service'

const schema = z.object({
  text: z.string().min(1).max(20000),
  language: z.string().min(2).max(10),
  domain: z.string().optional(),
  detect_medical: z.boolean().optional(),
})

export const POST = withAuth(async (req: NextRequest, _ctx: AuthContext) => {
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return badRequest(parsed.error.issues[0]?.message ?? 'Invalid input')
  }

  try {
    const result = await detectTerms(parsed.data)
    return NextResponse.json(result)
  } catch (err) {
    return serverError(err)
  }
})
