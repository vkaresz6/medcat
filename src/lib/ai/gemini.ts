import { GoogleGenerativeAI, GenerativeModel, GenerationConfig } from '@google/generative-ai'

const MODEL_ID = 'gemini-2.5-flash'

const DEFAULT_CONFIG: GenerationConfig = {
  temperature: 0.1,    // low temp for deterministic translation/evaluation
  topP: 0.95,
  maxOutputTokens: 8192,
}

let _client: GoogleGenerativeAI | null = null

function getClient(): GoogleGenerativeAI {
  if (!_client) {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) throw new Error('GEMINI_API_KEY is not set')
    _client = new GoogleGenerativeAI(apiKey)
  }
  return _client
}

export function getModel(config?: Partial<GenerationConfig>): GenerativeModel {
  return getClient().getGenerativeModel({
    model: MODEL_ID,
    generationConfig: { ...DEFAULT_CONFIG, ...config },
  })
}

// Higher temp variant for creative tasks (chat, suggestions)
export function getCreativeModel(): GenerativeModel {
  return getModel({ temperature: 0.7 })
}

export type { GenerativeModel }
