import { getModel, getCreativeModel } from './gemini'
import { getCached, setCached } from './cache'
import {
  buildTranslatePrompt,
  buildEvaluatePrompt,
  buildSegmentPrompt,
  buildQualityPrompt,
  buildTermbasePrompt,
} from './prompts'
import type {
  TranslateRequest, TranslateResponse,
  EvaluateRequest, EvaluateResponse,
  SegmentRequest, SegmentResponse,
  QualityRequest, QualityResponse,
  TermbaseRequest, TermbaseResponse,
  ChatRequest, ChatResponse,
} from '@/types/ai'

// Extracts JSON from model response (handles markdown code blocks)
function parseJsonResponse<T>(text: string): T {
  const cleaned = text
    .replace(/^```(?:json)?\s*/m, '')
    .replace(/\s*```\s*$/m, '')
    .trim()
  return JSON.parse(cleaned) as T
}

async function callModel(prompt: string, creative = false): Promise<string> {
  const model = creative ? getCreativeModel() : getModel()
  const result = await model.generateContent(prompt)
  return result.response.text()
}

// ── translate ──────────────────────────────────────────────

export async function translate(req: TranslateRequest): Promise<TranslateResponse> {
  const cacheInput = {
    source_text: req.source_text,
    source_language: req.source_language,
    target_language: req.target_language,
    domain: req.domain,
    glossary_hints: req.glossary_hints,
  }

  const cached = await getCached<TranslateResponse>('translate', cacheInput)
  if (cached) return { ...cached, cached: true }

  const prompt = buildTranslatePrompt(req)
  const raw = await callModel(prompt)
  const parsed = parseJsonResponse<Omit<TranslateResponse, 'cached'>>(raw)
  const result: TranslateResponse = { ...parsed, cached: false }

  await setCached('translate', cacheInput, result)
  return result
}

// ── evaluate ───────────────────────────────────────────────

export async function evaluate(req: EvaluateRequest): Promise<EvaluateResponse> {
  const cached = await getCached<EvaluateResponse>('evaluate', req)
  if (cached) return { ...cached, cached: true }

  const prompt = buildEvaluatePrompt(req)
  const raw = await callModel(prompt)
  const parsed = parseJsonResponse<Omit<EvaluateResponse, 'cached'>>(raw)
  const result: EvaluateResponse = { ...parsed, cached: false }

  await setCached('evaluate', req, result)
  return result
}

// ── segment ────────────────────────────────────────────────

export async function segment(req: SegmentRequest): Promise<SegmentResponse> {
  const cached = await getCached<SegmentResponse>('segment', req)
  if (cached) return cached

  const prompt = buildSegmentPrompt(req)
  const raw = await callModel(prompt)
  const result = parseJsonResponse<SegmentResponse>(raw)

  // Enrich with word counts
  result.segments = result.segments.map(s => ({
    ...s,
    word_count: s.text.trim().split(/\s+/).filter(Boolean).length,
  }))

  await setCached('segment', req, result)
  return result
}

// ── quality ────────────────────────────────────────────────

export async function checkQuality(req: QualityRequest): Promise<QualityResponse> {
  const cached = await getCached<QualityResponse>('quality', req)
  if (cached) return cached

  const prompt = buildQualityPrompt(req)
  const raw = await callModel(prompt)
  const result = parseJsonResponse<QualityResponse>(raw)

  await setCached('quality', req, result)
  return result
}

// ── termbase ───────────────────────────────────────────────

export async function detectTerms(req: TermbaseRequest): Promise<TermbaseResponse> {
  const cached = await getCached<TermbaseResponse>('termbase', req)
  if (cached) return cached

  const prompt = buildTermbasePrompt(req)
  const raw = await callModel(prompt)
  const result = parseJsonResponse<TermbaseResponse>(raw)

  await setCached('termbase', req, result)
  return result
}

// ── chat ───────────────────────────────────────────────────

export async function chat(req: ChatRequest): Promise<ChatResponse> {
  // Chat is never cached -- always fresh
  const model = getCreativeModel()
  const geminiChat = model.startChat()

  // Inject context as system-like first message if provided
  if (req.context && Object.keys(req.context).length > 0) {
    const ctx = req.context
    const contextMsg = [
      'You are a translation assistant helping with a CAT (Computer-Assisted Translation) tool.',
      ctx.source_language && ctx.target_language
        ? `Working language pair: ${ctx.source_language} -> ${ctx.target_language}.`
        : '',
      ctx.domain ? `Domain: ${ctx.domain}.` : '',
      ctx.source_text ? `Current source segment:\n"""\n${ctx.source_text}\n"""` : '',
      ctx.target_text ? `Current translation:\n"""\n${ctx.target_text}\n"""` : '',
    ].filter(Boolean).join('\n')

    await geminiChat.sendMessage(contextMsg)
  }

  // Replay history (skip last user message -- sent separately)
  const history = req.messages.slice(0, -1)
  for (const msg of history) {
    if (msg.role === 'user') {
      await geminiChat.sendMessage(msg.content)
    }
  }

  const lastMessage = req.messages[req.messages.length - 1]
  const result = await geminiChat.sendMessage(lastMessage.content)
  const text = result.response.text()

  return { message: text }
}
