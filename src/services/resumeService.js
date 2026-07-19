import api from './api'

// TODO: replace mock — remove MOCK_MODE and call real endpoints
const MOCK_MODE = true

const MOCK_RESULT = {
  atsScore: 78,
  skills: {
    gaps: [
      'Kubernetes',
      'GraphQL',
      'System Design',
      'Apache Kafka',
    ],
    strengths: [
      'React',
      'Node.js',
      'TypeScript',
      'REST APIs',
      'Git',
      'PostgreSQL',
    ],
  },
  education: [
    'Consider adding relevant certifications (AWS, GCP) to strengthen technical credibility.',
    'GPA is not listed — if above 3.5, include it.',
    'No mention of coursework relevant to the target role (distributed systems, cloud architecture).',
  ],
  experience: [
    'Gap of 8 months (Jan 2023 – Aug 2023) not explained in resume.',
    'Most recent role lacks quantified impact (numbers, percentages, scale).',
    'Leadership or team-lead experience is not highlighted despite 4+ years in industry.',
  ],
}

/**
 * POST /api/resume/analyze
 * Sends the resume as multipart/form-data.
 * @param {File} file — PDF or DOCX file
 * @returns {{ atsScore, skills: { gaps, strengths }, education, experience }}
 */
export async function analyzeResume(file) {
  if (MOCK_MODE) {
    await delay(3500) // simulate backend latency
    return MOCK_RESULT
  }

  const formData = new FormData()
  formData.append('resume', file)

  const { data } = await api.post('/resume/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
