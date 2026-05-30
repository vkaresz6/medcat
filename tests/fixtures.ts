import { test as base, APIRequestContext } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'

const TEST_USER = {
  email: `test-${Date.now()}@medcat.test`,
  password: 'Test1234!',
  full_name: 'Test User',
}

type AuthFixtures = {
  authRequest: APIRequestContext
  testEmail: string
}

export const test = base.extend<AuthFixtures>({
  testEmail: async ({}, use) => {
    await use(TEST_USER.email)
  },

  authRequest: async ({ request, baseURL }, use) => {
    // Sign up
    const signupRes = await request.post(`${baseURL}/api/auth/signup`, {
      data: TEST_USER,
    })

    // If user already exists (409), just log in
    if (!signupRes.ok() && signupRes.status() !== 400) {
      throw new Error(`Signup failed: ${signupRes.status()}`)
    }

    // Log in to get session cookie
    const loginRes = await request.post(`${baseURL}/api/auth/login`, {
      data: { email: TEST_USER.email, password: TEST_USER.password },
    })

    if (!loginRes.ok()) {
      throw new Error(`Login failed: ${loginRes.status()} ${await loginRes.text()}`)
    }

    await use(request)

    // Cleanup: delete test user via Supabase admin
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (url && key) {
      const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
      const { data } = await admin.auth.admin.listUsers()
      const user = data.users.find(u => u.email === TEST_USER.email)
      if (user) await admin.auth.admin.deleteUser(user.id)
    }
  },
})

export { expect } from '@playwright/test'
