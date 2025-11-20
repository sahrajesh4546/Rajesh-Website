export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  price?: string;
  features: string[];
  iconType: 'web' | 'data' | 'software' | 'presentation' | 'form' | 'design';
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'AI Tools' | 'Image Tools' | 'Calculators' | 'Utilities';
  icon: string;
  componentType: 'ai-text' | 'ai-image' | 'ai-video' | 'ai-audio' | 'image' | 'calculator' | 'utility';
  featureId: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface CurrencyRate {
  code: string;
  name: string;
  rate: number; // Relative to USD
  flag: string;
}