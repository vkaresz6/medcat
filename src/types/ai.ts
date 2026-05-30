// Shared request/response types for all AI API routes

// ── Shared primitives ──────────────────────────────────────

export type SupportedLanguage = string   // ISO 639-1, e.g. 'en', 'hu'

export type AiOperation =
  | 'translate'
  | 'evaluate'
  | 'segment'
  | 'quality'
  | 'termbase'
  | 'chat'
  | 'analyze'

// ── /api/ai/translate ──────────────────────────────────────

export interface TranslateRequest {
  source_text: string
  source_language: SupportedLanguage
  target_language: SupportedLanguage
  domain?: string                // e.g. 'medical', 'pharmaceutical'
  project_context?: string       // brief description of the doc
  glossary_hints?: GlossaryHint[]
  tm_matches?: TmMatch[]
}

export interface TranslateResponse {
  translated_text: string
  confidence: number             // 0-100
  alternatives?: string[]        // up to 2 alternatives
  cached: boolean
}

// ── /api/ai/evaluate ──────────────────────────────────────

export interface EvaluateRequest {
  source_text: string
  target_text: string
  source_language: SupportedLanguage
  target_language: SupportedLanguage
  domain?: string
}

export interface EvaluateResponse {
  score: number                  // 0-100
  feedback: string
  error_categories: {
    accuracy?: number
    fluency?: number
    terminology?: number
    style?: number
    punctuation?: number
  }
  cached: boolean
}

// ── /api/ai/segment ───────────────────────────────────────

export interface SegmentRequest {
  text: string
  language: SupportedLanguage
  preserve_formatting?: boolean
}

export interface SegmentResponse {
  segments: Array<{
    text: string
    index: number
    word_count: number
  }>
}

// ── /api/ai/quality ───────────────────────────────────────

export interface QualityRequest {
  segments: Array<{
    source_text: string
    target_text: string
  }>
  source_language: SupportedLanguage
  target_language: SupportedLanguage
}

export interface QualityResponse {
  scores: Array<{
    index: number
    score: number
    issues: string[]
  }>
  overall_score: number
}

// ── /api/ai/termbase ──────────────────────────────────────

export interface TermbaseRequest {
  text: string
  language: SupportedLanguage
  domain?: string
  detect_medical?: boolean
}

export interface TermbaseResponse {
  terms: Array<{
    term: string
    definition?: string
    domain: string
    is_medical: boolean
    confidence: number
  }>
}

// ── /api/ai/chat ──────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatRequest {
  messages: ChatMessage[]
  context?: {
    source_text?: string
    target_text?: string
    source_language?: SupportedLanguage
    target_language?: SupportedLanguage
    domain?: string
  }
}

export interface ChatResponse {
  message: string
  suggestions?: string[]
}

// ── Shared supporting types ────────────────────────────────

export interface GlossaryHint {
  source_term: string
  target_term: string
  is_forbidden?: boolean
}

export interface TmMatch {
  source_text: string
  target_text: string
  similarity: number             // 0-100
  quality: number
}

// ── Generic API error ──────────────────────────────────────

export interface AiApiError {
  error: string
  operation?: AiOperation
  retryable?: boolean
}
