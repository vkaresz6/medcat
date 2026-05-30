import type {
  TranslateRequest,
  EvaluateRequest,
  SegmentRequest,
  QualityRequest,
  TermbaseRequest,
  GlossaryHint,
  TmMatch,
} from '@/types/ai'

function glossarySection(hints: GlossaryHint[]): string {
  if (!hints.length) return ''
  const lines = hints.map(h =>
    `  - "${h.source_term}" -> "${h.target_term}"${h.is_forbidden ? ' [FORBIDDEN - do not use]' : ''}`
  )
  return `\nGlossary terms to apply:\n${lines.join('\n')}`
}

function tmSection(matches: TmMatch[]): string {
  if (!matches.length) return ''
  const top = matches.slice(0, 3).map(m =>
    `  - [${m.similarity}% match] "${m.source_text}" -> "${m.target_text}"`
  )
  return `\nTranslation memory suggestions (use as reference, not verbatim):\n${top.join('\n')}`
}

export function buildTranslatePrompt(req: TranslateRequest): string {
  return `You are a professional translator specializing in ${req.domain ?? 'general'} content.

Translate the following text from ${req.source_language} to ${req.target_language}.
${req.project_context ? `\nProject context: ${req.project_context}` : ''}
${req.glossary_hints?.length ? glossarySection(req.glossary_hints) : ''}
${req.tm_matches?.length ? tmSection(req.tm_matches) : ''}

Source text:
"""
${req.source_text}
"""

Respond with a JSON object:
{
  "translated_text": "...",
  "confidence": <0-100>,
  "alternatives": ["...", "..."]  // up to 2 alternative translations, omit if none
}

Rules:
- Preserve formatting, line breaks, and special characters
- Apply glossary terms exactly as specified
- Forbidden terms must never appear in the translation
- Confidence: 95+ means certain, 70-94 means some ambiguity, below 70 means significant uncertainty`
}

export function buildEvaluatePrompt(req: EvaluateRequest): string {
  return `You are a professional translation quality assessor for ${req.domain ?? 'general'} content.

Evaluate this translation from ${req.source_language} to ${req.target_language}.

Source:
"""
${req.source_text}
"""

Translation:
"""
${req.target_text}
"""

Respond with a JSON object:
{
  "score": <0-100>,
  "feedback": "...",
  "error_categories": {
    "accuracy": <0-100 penalty points>,
    "fluency": <0-100 penalty points>,
    "terminology": <0-100 penalty points>,
    "style": <0-100 penalty points>,
    "punctuation": <0-100 penalty points>
  }
}

Scoring guide: 95-100 = excellent, 85-94 = good, 70-84 = acceptable, 50-69 = needs revision, 0-49 = poor.
Error categories: 0 = no errors, higher = more severe errors. Sum of categories can exceed 100.`
}

export function buildSegmentPrompt(req: SegmentRequest): string {
  return `Split the following ${req.language} text into translation segments.

Each segment should be a complete, translatable unit (sentence or logical phrase).
${req.preserve_formatting ? 'Preserve all whitespace and formatting markers.' : ''}

Text:
"""
${req.text}
"""

Respond with a JSON object:
{
  "segments": [
    { "text": "...", "index": 0 },
    { "text": "...", "index": 1 }
  ]
}

Rules:
- Do not merge or split sentences arbitrarily
- Keep list items as separate segments
- Keep headings as separate segments
- Empty lines are not segments`
}

export function buildQualityPrompt(req: QualityRequest): string {
  const pairs = req.segments.map((s, i) =>
    `Segment ${i}: Source: "${s.source_text}" | Target: "${s.target_text}"`
  ).join('\n')

  return `Evaluate translation quality for these ${req.source_language} -> ${req.target_language} segment pairs.

${pairs}

Respond with a JSON object:
{
  "scores": [
    { "index": 0, "score": <0-100>, "issues": ["..."] }
  ],
  "overall_score": <0-100>
}

Be concise in issues -- one short phrase per issue.`
}

export function buildTermbasePrompt(req: TermbaseRequest): string {
  return `Extract terminology from the following ${req.language} text.
${req.domain ? `Domain: ${req.domain}` : ''}
${req.detect_medical ? 'Flag medical and pharmaceutical terms.' : ''}

Text:
"""
${req.text}
"""

Respond with a JSON object:
{
  "terms": [
    {
      "term": "...",
      "definition": "...",
      "domain": "...",
      "is_medical": true|false,
      "confidence": <0-100>
    }
  ]
}

Only include domain-specific terms, not common words. Minimum confidence: 60.`
}
