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
  const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv, API_KEY: 'test-key' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should initialize GoogleGenAI with the provided key', () => {
    process.env.API_KEY = 'test-api-key';
    
    // We trigger a new session by changing language to ensure logic runs
    // Note: geminiService implements a singleton pattern which makes testing initialization tricky
    // without exposing a reset method. We rely on the language switch to trigger new creation.
    getChatSession('en');
    
    expect(GoogleGenAI).toHaveBeenCalledWith({ apiKey: 'test-api-key' });
  });

  it('should create a chat session successfully', () => {
     const chat = getChatSession('en');
     expect(chat).toBeDefined();
  });

  it('should warn if API key is missing but still attempt to create session (defensive coding)', () => {
    delete process.env.API_KEY;
    
    // Trigger logic
    getChatSession('es'); // Use different lang to force re-eval
    
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('API Key is missing'));
  });
});