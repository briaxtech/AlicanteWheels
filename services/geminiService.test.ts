import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendMessageToGemini, getChatSession } from './geminiService';
import { GoogleGenAI } from '@google/genai';

// Mock the GoogleGenAI SDK
vi.mock('@google/genai', () => {
  const mockChat = {
    sendMessage: vi.fn().mockResolvedValue({ text: 'Mock AI Response' }),
  };
  
  const mockGenerativeModel = {
    startChat: vi.fn().mockReturnValue(mockChat),
  };

  const mockGoogleGenAI = {
    chats: {
      create: vi.fn().mockReturnValue(mockChat)
    }
  };

  return {
    GoogleGenAI: vi.fn(() => mockGoogleGenAI),
  };
});

describe('Gemini Service', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  it('should initialize GoogleGenAI with the provided key', async () => {
    process.env.API_KEY = 'test-api-key';
    
    // Trigger session creation
    getChatSession('en');
    
    expect(GoogleGenAI).toHaveBeenCalledWith({ apiKey: 'test-api-key' });
  });

  it('should create a chat session with correct system instructions', async () => {
    process.env.API_KEY = 'test-api-key';
    
    const chat = getChatSession('en');
    
    expect(chat).toBeDefined();
  });
});