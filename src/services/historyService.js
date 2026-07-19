import api from './api'

// TODO: replace mock — remove MOCK_MODE and call real endpoints
const MOCK_MODE = true

const MOCK_HISTORY = [
  {
    id: 'hist_001',
    date: '2026-07-18T10:32:00Z',
    filename: 'satyam_resume_v3.pdf',
    atsScore: 82,
    creditsUsed: 4,
  },
  {
    id: 'hist_002',
    date: '2026-07-15T14:18:00Z',
    filename: 'resume_frontend_role.pdf',
    atsScore: 67,
    creditsUsed: 4,
  },
  {
    id: 'hist_003',
    date: '2026-07-10T09:05:00Z',
    filename: 'resume_fullstack_2026.docx',
    atsScore: 55,
    creditsUsed: 4,
  },
]

const MOCK_DETAIL = {
  id: 'hist_001',
  date: '2026-07-18T10:32:00Z',
  filename: 'satyam_resume_v3.pdf',
  atsScore: 82,
  creditsUsed: 4,
  skills: {
    gaps: ['Kubernetes', 'GraphQL', 'System Design'],
    strengths: ['React', 'Node.js', 'TypeScript', 'REST APIs', 'Git'],
  },
  education: [
    'Consider adding AWS or GCP certification.',
    'GPA not listed — include if above 3.5.',
  ],
  experience: [
    '8-month gap (Jan–Aug 2023) unexplained.',
    'Most recent role lacks quantified metrics.',
  ],
}

/**
 * GET /api/history
 * @returns {Array<{ id, date, filename, atsScore, creditsUsed }>}
 */
export async function getHistory() {
  if (MOCK_MODE) {
    await delay(500)
    return MOCK_HISTORY
  }
  const { data } = await api.get('/history')
  return data
}

/**
 * GET /api/history/:id
 * Returns full analysis result for a past item.
 * @param {string} id
 * @returns {{ id, date, filename, atsScore, creditsUsed, skills, education, experience }}
 */
export async function getHistoryItem(id) {
  if (MOCK_MODE) {
    await delay(400)
    return { ...MOCK_DETAIL, id }
  }
  const { data } = await api.get(`/history/${id}`)
  return data
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
