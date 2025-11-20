import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getChatSession } from './geminiService';
import { GoogleGenAI } from '@google/genai';

// Mock the GoogleGenAI SDK class structure
vi.mock('@google/genai', () => {
  const mockChat = {
    sendMessage: vi.fn().mockResolvedValue({ text: 'Mock AI Response' }),
  };
  
  // Helper to simulate GoogleGenAI instance
  const MockGoogleGenAI = vi.fn().mockImplementation(() => ({
     chats: {
       create: vi.fn().mockReturnValue(mockChat)
     }
  }));

  return {
    GoogleGenAI: MockGoogleGenAI,
  };
});

describe('Gemini Service', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv, API_KEY: 'test-key' }; // Ensure key exists for tests
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should initialize GoogleGenAI with the provided key', () => {
    process.env.API_KEY = 'test-api-key';
    
    getChatSession('en');
    
    expect(GoogleGenAI).toHaveBeenCalledWith({ apiKey: 'test-api-key' });
  });

  it('should create a chat session successfully', () => {
     const chat = getChatSession('en');
     expect(chat).toBeDefined();
  });
});