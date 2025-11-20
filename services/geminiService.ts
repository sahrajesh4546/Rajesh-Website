import { GoogleGenAI, Chat, Modality } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

// Ensure client is initialized with current key
export const getClient = (forceNew = false) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key is missing");
    throw new Error("API Key is missing");
  }
  if (!genAI || forceNew) {
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
}

export const getChatSession = async (model = 'gemini-3-pro-preview'): Promise<Chat> => {
  // Reset session if model changes or doesn't exist
  if (!chatSession) {
    const ai = getClient();
    chatSession = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = await getChatSession();
    const result = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error:", error);
    return "I'm having trouble connecting. Please try again.";
  }
};

// --- Text & General Generation ---

export const generateSpecializedContent = async (
  prompt: string, 
  type: 'chat' | 'search' | 'maps' | 'think' | 'fast'
): Promise<{text: string, chunks?: any[]}> => {
  const ai = getClient();
  let model = 'gemini-2.5-flash';
  let config: any = {};

  if (type === 'chat') model = 'gemini-3-pro-preview';
  if (type === 'search') {
    model = 'gemini-2.5-flash';
    config.tools = [{googleSearch: {}}];
  }
  if (type === 'maps') {
    model = 'gemini-2.5-flash';
    config.tools = [{googleMaps: {}}];
  }
  if (type === 'think') {
    model = 'gemini-3-pro-preview';
    config.thinkingConfig = { thinkingBudget: 1024 }; // Using moderate budget for demo
  }
  if (type === 'fast') {
    model = 'gemini-2.5-flash-lite';
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config
    });
    
    return {
      text: response.text || "No response generated.",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks
    };
  } catch (error) {
    console.error("Content gen error:", error);
    throw error;
  }
};

// --- Image Tools ---

export const generateAIImage = async (prompt: string, aspectRatio = '1:1'): Promise<string | null> => {
  const ai = getClient();
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: aspectRatio,
    },
  });
  const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
  return base64ImageBytes ? `data:image/jpeg;base64,${base64ImageBytes}` : null;
};

export const editAIImage = async (base64Image: string, prompt: string): Promise<string | null> => {
  const ai = getClient();
  const data = base64Image.split(',')[1] || base64Image;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data } },
        { text: prompt }
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
     if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
     }
  }
  return null;
};

export const analyzeImage = async (base64Image: string, prompt: string): Promise<string> => {
  const ai = getClient();
  const data = base64Image.split(',')[1] || base64Image;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data } },
        { text: prompt }
      ]
    }
  });
  return response.text || "No analysis produced.";
};

// --- Video Tools ---

export const generateVideo = async (prompt: string, imageBase64?: string): Promise<any> => {
  const ai = getClient(true); // Force new client for Veo key check
  
  const config: any = {
    numberOfVideos: 1,
    resolution: '720p',
    aspectRatio: '16:9'
  };
  
  let operation;
  if (imageBase64) {
    const data = imageBase64.split(',')[1] || imageBase64;
    operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      image: { imageBytes: data, mimeType: 'image/png' }, // Assuming PNG/JPEG
      config
    });
  } else {
    operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config
    });
  }
  return operation;
};

export const pollVideoOperation = async (operationName: string): Promise<any> => {
  const ai = getClient();
  // reconstruct operation object minimally for SDK
  const op = await ai.operations.getVideosOperation({
    operation: { name: operationName } as any
  });
  return op;
};

export const analyzeVideo = async (base64Data: string, mimeType: string, prompt: string): Promise<string> => {
    const ai = getClient();
    const data = base64Data.split(',')[1] || base64Data;
    
    // Note: For very large videos, file API is preferred, but for this demo we use inline
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: {
            parts: [
                { inlineData: { mimeType, data } },
                { text: prompt }
            ]
        }
    });
    return response.text || "No analysis.";
};


// --- Audio Tools ---

export const generateSpeech = async (text: string): Promise<string | null> => {
    const ai = getClient();
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Kore' },
                },
            },
        },
    });
    
    const base64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64 || null;
};

export const transcribeAudio = async (base64Data: string, mimeType: string): Promise<string> => {
    const ai = getClient();
    const data = base64Data.split(',')[1] || base64Data;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
            parts: [
                { inlineData: { mimeType, data } },
                { text: "Transcribe this audio accurately." }
            ]
        }
    });
    return response.text || "Transcription failed.";
};

export const getLiveClient = () => getClient();
