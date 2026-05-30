import { createHash } from 'crypto'
import { createServiceClient } from '@/lib/supabase/server'
import type { AiOperation } from '@/types/ai'

const CACHE_TTL_HOURS: Record<AiOperation, number> = {
  translate:  168,   // 7 days -- translations are stable
  evaluate:    72,   // 3 days
  segment:    720,   // 30 days -- segmentation rarely changes
  quality:     24,
  termbase:   336,   // 14 days
  chat:         0,   // never cache chat
  analyze:     48,
}

export function buildCacheKey(operation: AiOperation, input: unknown): string {
  const hash = createHash('sha256')
    .update(JSON.stringify({ operation, input }))
    .digest('hex')
  return `${operation}:${hash}`
}

export async function getCached<T>(
  operation: AiOperation,
  input: unknown
): Promise<T | null> {
  if (CACHE_TTL_HOURS[operation] === 0) return null

  const cacheKey = buildCacheKey(operation, input)
  const supabase = createServiceClient()

  const { data } = await supabase
    .from('ai_cache')
    .select('response, expires_at, id, hit_count')
    .eq('cache_key', cacheKey)
    .single()

  if (!data) return null
  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    // Stale entry -- delete async, don't block
    supabase.from('ai_cache').delete().eq('id', data.id)
    return null
  }

  // Increment hit count async
  supabase.from('ai_cache')
    .update({ hit_count: data.hit_count + 1 })
    .eq('id', data.id)

  return data.response as T
}

export async function setCached(
  operation: AiOperation,
  input: unknown,
  response: unknown
): Promise<void> {
  const ttlHours = CACHE_TTL_HOURS[operation]
  if (ttlHours === 0) return

  const cacheKey = buildCacheKey(operation, input)
  const inputHash = createHash('md5').update(JSON.stringify(input)).digest('hex')
  const expiresAt = new Date(Date.now() + ttlHours * 3600 * 1000).toISOString()

  const supabase = createServiceClient()
  await supabase.from('ai_cache').upsert({
    cache_key: cacheKey,
    operation,
    input_hash: inputHash,
    response: response as Record<string, unknown>,
    expires_at: expiresAt,
  }, { onConflict: 'cache_key' })
}
