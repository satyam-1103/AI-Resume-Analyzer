import api from './api'

/**
 * POST /api/auth/signup
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {{ user: object, token: string }}
 */
export async function signup(name, email, password) {
  const { data } = await api.post('/auth/signup', { name, email, password })
  // Assuming backend returns { user, token } directly or wrapped in { success, data: { user, token } }
  // We'll return data.data if it exists, otherwise data
  return data.data || data
}

/**
 * POST /api/auth/login
 * @param {string} email
 * @param {string} password
 * @returns {{ user: object, token: string }}
 */
export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password })
  return data.data || data
}

/**
 * POST /api/auth/logout
 */
export async function logout() {
  try {
    await api.post('/auth/logout')
  } catch (error) {
    console.error('Logout failed on server, proceeding with local logout', error)
  }
}
