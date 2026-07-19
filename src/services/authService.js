import api from './api'

// TODO: replace mock — remove MOCK_MODE and call real endpoints
const MOCK_MODE = true

const MOCK_USER = {
  id: 'usr_mock_001',
  name: 'Satyam Srivastava',
  email: 'satyam@example.com',
  avatarInitials: 'SS',
}

/**
 * POST /api/auth/signup
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {{ user: object, token: string }}
 */
export async function signup(name, email, password) {
  if (MOCK_MODE) {
    await delay(800)
    return { user: { ...MOCK_USER, name, email }, token: 'mock_jwt_token_signup' }
  }
  const { data } = await api.post('/auth/signup', { name, email, password })
  return data
}

/**
 * POST /api/auth/login
 * @param {string} email
 * @param {string} password
 * @returns {{ user: object, token: string }}
 */
export async function login(email, password) {
  if (MOCK_MODE) {
    await delay(800)
    if (email === 'wrong@example.com') throw new Error('Invalid credentials')
    return { user: { ...MOCK_USER, email }, token: 'mock_jwt_token_login' }
  }
  const { data } = await api.post('/auth/login', { email, password })
  return data
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
