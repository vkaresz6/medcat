import { test, expect } from '../fixtures'

test.describe('AI API routes', () => {
  test.describe('POST /api/ai/translate', () => {
    test('returns 401 without auth', async ({ request, baseURL }) => {
      const res = await request.post(`${baseURL}/api/ai/translate`, {
        data: { source_text: 'Hello', source_language: 'en', target_language: 'hu' },
      })
      expect(res.status()).toBe(401)
    })

    test('returns 400 on empty source_text', async ({ authRequest, baseURL }) => {
      const res = await authRequest.post(`${baseURL}/api/ai/translate`, {
        data: { source_text: '', source_language: 'en', target_language: 'hu' },
      })
      expect(res.status()).toBe(400)
    })

    test('returns 400 when languages missing', async ({ authRequest, baseURL }) => {
      const res = await authRequest.post(`${baseURL}/api/ai/translate`, {
        data: { source_text: 'Hello' },
      })
      expect(res.status()).toBe(400)
    })

    test('returns translated text', async ({ authRequest, baseURL }) => {
      const res = await authRequest.post(`${baseURL}/api/ai/translate`, {
        data: {
          source_text: 'Hello, world!',
          source_language: 'en',
          target_language: 'hu',
          domain: 'general',
        },
      })
      expect(res.ok()).toBeTruthy()
      const body = await res.json()
      expect(typeof body.translated_text).toBe('string')
      expect(body.translated_text.length).toBeGreaterThan(0)
      expect(typeof body.confidence).toBe('number')
      expect(typeof body.cached).toBe('boolean')
    })
  })

  test.describe('POST /api/ai/evaluate', () => {
    test('returns evaluation score', async ({ authRequest, baseURL }) => {
      const res = await authRequest.post(`${baseURL}/api/ai/evaluate`, {
        data: {
          source_text: 'The patient has a fever.',
          target_text: 'A betegnek láza van.',
          source_language: 'en',
          target_language: 'hu',
          domain: 'medical',
        },
      })
      expect(res.ok()).toBeTruthy()
      const body = await res.json()
      expect(typeof body.score).toBe('number')
      expect(body.score).toBeGreaterThanOrEqual(0)
      expect(body.score).toBeLessThanOrEqual(100)
      expect(typeof body.feedback).toBe('string')
    })
  })

  test.describe('POST /api/ai/segment', () => {
    test('splits text into segments', async ({ authRequest, baseURL }) => {
      const res = await authRequest.post(`${baseURL}/api/ai/segment`, {
        data: {
          text: 'First sentence. Second sentence. Third sentence.',
          language: 'en',
        },
      })
      expect(res.ok()).toBeTruthy()
      const body = await res.json()
      expect(Array.isArray(body.segments)).toBeTruthy()
      expect(body.segments.length).toBeGreaterThan(0)
      const s = body.segments[0]
      expect(typeof s.text).toBe('string')
      expect(typeof s.index).toBe('number')
      expect(typeof s.word_count).toBe('number')
    })

    test('returns 400 for text over 50k chars', async ({ authRequest, baseURL }) => {
      const res = await authRequest.post(`${baseURL}/api/ai/segment`, {
        data: { text: 'x'.repeat(50001), language: 'en' },
      })
      expect(res.status()).toBe(400)
    })
  })

  test.describe('POST /api/ai/quality', () => {
    test('returns quality scores for segment pairs', async ({ authRequest, baseURL }) => {
      const res = await authRequest.post(`${baseURL}/api/ai/quality`, {
        data: {
          segments: [
            { source_text: 'Take two tablets daily.', target_text: 'Napi két tablettát vegyen be.' },
          ],
          source_language: 'en',
          target_language: 'hu',
        },
      })
      expect(res.ok()).toBeTruthy()
      const body = await res.json()
      expect(Array.isArray(body.scores)).toBeTruthy()
      expect(typeof body.overall_score).toBe('number')
    })

    test('returns 400 for empty segments array', async ({ authRequest, baseURL }) => {
      const res = await authRequest.post(`${baseURL}/api/ai/quality`, {
        data: { segments: [], source_language: 'en', target_language: 'hu' },
      })
      expect(res.status()).toBe(400)
    })
  })

  test.describe('POST /api/ai/termbase', () => {
    test('detects medical terms', async ({ authRequest, baseURL }) => {
      const res = await authRequest.post(`${baseURL}/api/ai/termbase`, {
        data: {
          text: 'The patient was diagnosed with hypertension and prescribed beta-blockers.',
          language: 'en',
          domain: 'medical',
          detect_medical: true,
        },
      })
      expect(res.ok()).toBeTruthy()
      const body = await res.json()
      expect(Array.isArray(body.terms)).toBeTruthy()
      if (body.terms.length > 0) {
        const t = body.terms[0]
        expect(typeof t.term).toBe('string')
        expect(typeof t.is_medical).toBe('boolean')
        expect(typeof t.confidence).toBe('number')
      }
    })
  })

  test.describe('POST /api/ai/chat', () => {
    test('returns assistant response', async ({ authRequest, baseURL }) => {
      const res = await authRequest.post(`${baseURL}/api/ai/chat`, {
        data: {
          messages: [{ role: 'user', content: 'What does "hypertension" mean in Hungarian?' }],
          context: { source_language: 'en', target_language: 'hu', domain: 'medical' },
        },
      })
      expect(res.ok()).toBeTruthy()
      const body = await res.json()
      expect(typeof body.message).toBe('string')
      expect(body.message.length).toBeGreaterThan(0)
    })

    test('returns 400 when last message is not from user', async ({ authRequest, baseURL }) => {
      const res = await authRequest.post(`${baseURL}/api/ai/chat`, {
        data: {
          messages: [{ role: 'assistant', content: 'Hello' }],
        },
      })
      expect(res.status()).toBe(400)
    })

    test('returns 400 when messages array is empty', async ({ authRequest, baseURL }) => {
      const res = await authRequest.post(`${baseURL}/api/ai/chat`, {
        data: { messages: [] },
      })
      expect(res.status()).toBe(400)
    })
  })
})
