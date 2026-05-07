import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export async function getRecommendations(preferences: any) {
  const model = "gemini-3-flash-preview";
  const prompt = `Based on these travel preferences: ${JSON.stringify(preferences)}, recommend 3 travel packages. Return them as a JSON array of objects with fields: title, description, price (estimated), and location.`;
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return [];
  }
}

export async function generateTripPlan(input: string) {
  const model = "gemini-3-flash-preview";
  const prompt = `Create a 3-day travel itinerary for: ${input}. 
  Return as JSON with fields: destination (string), days (array of objects with day (number), title (string), and activities (array of strings)).`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    return JSON.parse(response.text || "null");
  } catch (error) {
    console.error("AI Trip Planning Error:", error);
    return null;
  }
}
