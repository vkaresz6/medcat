import { test, expect } from '../fixtures'

test.describe('Auth API', () => {
  test.describe('POST /api/auth/signup', () => {
    test('returns 400 on missing fields', async ({ request, baseURL }) => {
      const res = await request.post(`${baseURL}/api/auth/signup`, {
        data: { email: 'bad' },
      })
      expect(res.status()).toBe(400)
    })

    test('returns 400 on short password', async ({ request, baseURL }) => {
      const res = await request.post(`${baseURL}/api/auth/signup`, {
        data: { email: 'test@example.com', password: 'short', full_name: 'Test' },
      })
      expect(res.status()).toBe(400)
    })

    test('creates user and returns 201', async ({ request, baseURL }) => {
      const unique = `e2e-${Date.now()}@medcat.test`
      const res = await request.post(`${baseURL}/api/auth/signup`, {
        data: { email: unique, password: 'StrongPass1!', full_name: 'E2E Test' },
      })
      expect(res.status()).toBe(201)
      const body = await res.json()
      expect(body.user).toBeTruthy()
      expect(body.user.email).toBe(unique)
    })
  })

  test.describe('POST /api/auth/login', () => {
    test('returns 401 on wrong password', async ({ request, baseURL, testEmail }) => {
      const res = await request.post(`${baseURL}/api/auth/login`, {
        data: { email: testEmail, password: 'wrong-password' },
      })
      expect(res.status()).toBe(401)
    })

    test('returns 400 on invalid email format', async ({ request, baseURL }) => {
      const res = await request.post(`${baseURL}/api/auth/login`, {
        data: { email: 'not-an-email', password: 'anything' },
      })
      expect(res.status()).toBe(400)
    })

    test('returns user on valid credentials', async ({ authRequest, baseURL, testEmail }) => {
      const res = await authRequest.post(`${baseURL}/api/auth/login`, {
        data: { email: testEmail, password: 'Test1234!' },
      })
      expect(res.ok()).toBeTruthy()
      const body = await res.json()
      expect(body.user.email).toBe(testEmail)
    })
  })

  test.describe('POST /api/auth/logout', () => {
    test('clears session', async ({ authRequest, baseURL }) => {
      const logoutRes = await authRequest.post(`${baseURL}/api/auth/logout`)
      expect(logoutRes.ok()).toBeTruthy()

      // Subsequent protected request should be rejected
      const protectedRes = await authRequest.post(`${baseURL}/api/ai/translate`, {
        data: {
          source_text: 'test',
          source_language: 'en',
          target_language: 'hu',
        },
      })
      expect(protectedRes.status()).toBe(401)
    })
  })

  test.describe('Protected routes redirect unauthenticated', () => {
    test('/api/ai/translate returns 401 without auth', async ({ request, baseURL }) => {
      const res = await request.post(`${baseURL}/api/ai/translate`, {
        data: { source_text: 'hello', source_language: 'en', target_language: 'hu' },
      })
      expect(res.status()).toBe(401)
    })
  })
})
