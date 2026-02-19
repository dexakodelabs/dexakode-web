
import { GoogleGenAI, Type } from "@google/genai";

const getApiKey = () => {
  try {
    return (window as any).process?.env?.API_KEY || "";
  } catch (e) {
    return "";
  }
};

export const startConsultation = async (userPrompt: string) => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: userPrompt,
    config: {
      systemInstruction: `You are DexaAI, the Creative Director and Product Strategist at DEXACODE. 
      Your goal is to help businesses build stunning, high-performance web presences. 
      Be visionary, design-conscious, and focused on user experience. 
      You analyze business goals, suggest UI/UX patterns, and plan digital launch strategies.
      Think like a mix of a high-end designer and a lead frontend engineer. 
      Prioritize aesthetics, performance, and conversion.
      Keep responses concise, inspiring, and professional.`,
      temperature: 0.7,
      topK: 40,
      topP: 0.9,
    }
  });
  return response.text;
};

export const generateStructuredEstimate = async (chatHistory: string) => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the following creative consultation, provide a digital product roadmap summary:
    ---
    ${chatHistory}
    ---`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          complexity: { type: Type.STRING, description: "Scale: Portfolio, Business Platform, or Full SaaS Ecosystem" },
          estimatedTimeline: { type: Type.STRING, description: "Phased design and dev timeline" },
          techStack: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Recommended tech (e.g. Next.js, Framer Motion, Three.js)"
          },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Creative and strategic launch insights"
          }
        },
        required: ["complexity", "estimatedTimeline", "techStack", "recommendations"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};
