import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { withAuth, badRequest, serverError } from '@/lib/api/auth'
import type { AuthContext } from '@/lib/api/auth'
import { chat } from '@/lib/ai/service'

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(10000),
})

const schema = z.object({
  messages: z.array(messageSchema).min(1).max(50),
  context: z.object({
    source_text: z.string().optional(),
    target_text: z.string().optional(),
    source_language: z.string().min(2).max(10).optional(),
    target_language: z.string().min(2).max(10).optional(),
    domain: z.string().optional(),
  }).optional(),
})

export const POST = withAuth(async (req: NextRequest, _ctx: AuthContext) => {
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return badRequest(parsed.error.issues[0]?.message ?? 'Invalid input')
  }

  // Last message must be from user
  const messages = parsed.data.messages
  if (messages[messages.length - 1].role !== 'user') {
    return badRequest('Last message must be from user')
  }

  try {
    const result = await chat(parsed.data)
    return NextResponse.json(result)
  } catch (err) {
    return serverError(err)
  }
})
