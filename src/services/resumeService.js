import api from './api'

/**
 * POST /api/resume/analyze
 * Sends the resume as multipart/form-data.
 * @param {File} file — PDF or DOCX file
 * @param {string} jobDescription — The target job description
 * @returns {{ atsScore, skills: { gaps, strengths }, education, experience }}
 */
export async function analyzeResume(file, jobDescription) {
  const formData = new FormData()
  formData.append('resume', file)
  if (jobDescription) {
    formData.append('jobDescription', jobDescription)
  }

  const { data } = await api.post('/resume/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data.data || data
}
