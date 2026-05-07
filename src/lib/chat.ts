import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const travelChat = async (message: string, history: any[]) => {
  const model = "gemini-3-flash-preview";
  try {
    const chat = ai.chats.create({
      model,
      history: history,
      config: {
          systemInstruction: `You are "Discovery AI", the elite travel concierge for Discovery Travel. 
          Your mission is to craft breathtaking, personalized travel experiences.
          
          Key instructions:
          - Be sophisticated, inspiring, and concise.
          - Promote our core categories: Destination Tours, Premium Hotels, and Elite Vehicle Rentals.
          - Mention our flagship destinations: Bali (Serenity), Swiss Alps (Expedition), Kyoto (Culture), and Amalfi Coast (Luxury).
          - If a user mentions a budget, offer smart alternatives.
          - Use bullet points for itineraries and **bold text** for emphasis.
          - Never say "as an AI model", stay in character as a luxury travel expert.`,
          temperature: 0.8,
      }
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "I'm currently polishing some luxury itineraries. Please give me a second and try again!";
  }
};
