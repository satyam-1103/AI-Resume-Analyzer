import { useState } from "react";
import { analyzeResume } from "../api/analysis.api.js";

export const useResumeAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalysis = async (payload) => {
    try {
      const { resumeText, resumeFile, jobDescription } = payload;
      setLoading(true);
      setError(null);

      const data = await analyzeResume(payload);
      setAnalysis(data);
      return data;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }

    return { loading, analysis, error, handleAnalysis };
  };
};
