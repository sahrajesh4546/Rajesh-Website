
import { GoogleGenAI } from "@google/genai";

// Accessing aistudio via generic window access to avoid type conflicts with global declarations
// that might already define aistudio with a specific 'AIStudio' type.
const getAIStudio = () => (window as any).aistudio;

const getClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const checkApiKey = async () => {
  const aistudio = getAIStudio();
  if (aistudio?.hasSelectedApiKey && aistudio?.openSelectKey) {
    const hasKey = await aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await aistudio.openSelectKey();
    }
  }
};

// Fast AI Chat (Flash Lite)
export const generateFastContent = async (prompt: string) => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: 'gemini-flash-lite-latest',
    contents: prompt,
  });
  return response.text;
};

// Thinking AI (Pro 3)
export const generateThinkingContent = async (prompt: string) => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 32768 }
    }
  });
  return response.text;
};

// Chat Bot (Pro 3)
export const createChatSession = async () => {
    await checkApiKey();
    const ai = getClient();
    return ai.chats.create({
        model: 'gemini-3-pro-preview',
    });
};

// Generate Image (Pro 3 Image)
export const generateProImage = async (prompt: string, size: '1K' | '2K' | '4K') => {
  await checkApiKey();
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: { parts: [{ text: prompt }] },
    config: {
      imageConfig: {
        imageSize: size,
        aspectRatio: '1:1'
      }
    }
  });
  
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

// Edit Image (Flash Image)
export const editAIImage = async (base64Image: string, prompt: string) => {
  const ai = getClient();
  const cleanBase64 = base64Image.split(',')[1] || base64Image;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: cleanBase64,
            mimeType: 'image/png'
          }
        },
        { text: prompt }
      ]
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image generated");
};

// Analyze Image (Pro 3)
export const analyzeImageContent = async (base64Image: string, prompt: string) => {
  const ai = getClient();
  const cleanBase64 = base64Image.split(',')[1] || base64Image;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        {
          inlineData: {
            data: cleanBase64,
            mimeType: 'image/jpeg' // Generic fallback, API is flexible
          }
        },
        { text: prompt || "Analyze this image in detail." }
      ]
    }
  });
  return response.text;
};

// Generate Video (Veo)
export const generateVeoVideo = async (base64Image: string) => {
  await checkApiKey();
  const ai = getClient();
  const cleanBase64 = base64Image.split(',')[1] || base64Image;

  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    image: {
      imageBytes: cleanBase64,
      mimeType: 'image/png'
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (videoUri) {
    const response = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }
  return null;
};