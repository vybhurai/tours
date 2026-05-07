import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const travelChat = async (message: string, history: any[]) => {
  const model = "gemini-3-flash-preview";
  const chat = ai.chats.create({
    model,
    history: history,
    config: {
        systemInstruction: "You are a helpful travel assistant for Smart Tours & Travel. Help users find tours, hotels, and plan their trips."
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};
