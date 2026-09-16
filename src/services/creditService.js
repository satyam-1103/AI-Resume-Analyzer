import api from './api'

/**
 * POST /api/credits/admin/self
 * The backend independently enforces the admin role for this action.
 */
export async function addCreditsToSelf(amount, reason) {
  const { data } = await api.post('/credits/admin/self', { amount, reason })
  return data.data || data
}
