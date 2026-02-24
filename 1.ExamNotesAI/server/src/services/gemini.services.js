const { GoogleGenAI } = require("@google/genai");
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateGeminiResponse(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
    });
    const result = response.text
    return JSON.parse(result);
}
module.exports = generateGeminiResponse;