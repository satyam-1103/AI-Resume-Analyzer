import React, {useState, useEffect} from 'react'
import axios from 'axios';

const Home = () => {
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        try {
            setLoading(true);
            const apiURL = import.meta.env.VITE_API_URL
            const response = await axios.post(`${apiURL}analysis/analyze`, {
                resumeText: resumeText,
                jobDescription: jobDescription
            });
            setAnalysisResult(response.data);
        } catch (error) {
            console.error('Error analyzing resume:', error);
            alert('Failed to analyze resume. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    
  return (
    <div>
        <h1>AI Resume Analyzer</h1>

        <div>
            <textarea 
                placeholder="Paste your resume text here..." 
                rows={10}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
            />
        </div>

        <div>
            <textarea 
                placeholder="Paste the job description here..." 
                rows={10}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
            />
        </div>

        <button onClick={handleAnalyze} >
            {loading ? 'Analyzing...' : 'Analyze Resume'}
            
        </button>

        {/* Result  */}

        {analysisResult && (
  <div>
    <h3>Match Score: {analysisResult.data.matchScore || 0} / 100</h3>

    <h4>Missing Skills:</h4>
    <ul>
      {(analysisResult.data.missingSkills || []).map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>

    <h4>Suggested Improvements</h4>
    <ul>
      {(analysisResult.data.improvements || []).map((improvement, index) => (
        <li key={index}>{improvement}</li>
      ))}
    </ul>
  </div>
)}

    </div>
  )
}

export default Home