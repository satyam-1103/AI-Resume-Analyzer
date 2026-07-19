import client from "./client.js";

export const analyzeResume = async (payload) => {
  try {
    const { resumeFile, resumeText, jobDescription } = payload;
    const formData = new FormData();
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    formData.append("resumeText", resumeText ?? "");
    formData.append("jobDescription", jobDescription ?? "");

    const response = await client.post(`analysis/analyze`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error analyzing resume:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
};
