import api from './api'

/**
 * GET /api/history
 * @returns {Array<{ id, date, filename, atsScore, creditsUsed }>}
 */
export async function getHistory() {
  const { data } = await api.get('/history')
  return data.data || data
}

/**
 * GET /api/history/:id
 * Returns full analysis result for a past item.
 * @param {string} id
 * @returns {{ id, date, filename, atsScore, creditsUsed, skills, education, experience }}
 */
export async function getHistoryItem(id) {
  const { data } = await api.get(`/history/${id}`)
  return data.data || data
}
