import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Chatbot } from './Chatbot';
import * as geminiService from '../services/geminiService';

// Mock the service to prevent actual API calls during component testing
vi.mock('../services/geminiService', () => ({
  sendMessageToGemini: vi.fn(),
}));

// Mock scrollIntoView as it's not implemented in jsdom
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('Chatbot Component', () => {
  it('renders correctly but starts closed', () => {
    render(<Chatbot language="en" />);
    
    // The toggle button should be visible
    const toggleBtn = screen.getAllByRole('button')[0]; // Assuming first button is toggle
    expect(toggleBtn).toBeInTheDocument();
    
    // The chat window content should not be visible (or have scale-0/opacity-0 classes)
    const welcomeMsg = screen.queryByText(/I'm Sol/i);
    expect(welcomeMsg).not.toBeVisible();
  });

  it('opens when the toggle button is clicked', async () => {
    render(<Chatbot language="en" />);
    
    // Click toggle
    const toggleBtn = screen.getByRole('button', { name: '' }); // Icons usually don't have accessible names unless aria-label is set
    fireEvent.click(toggleBtn);
    
    // Welcome message should appear
    await waitFor(() => {
      expect(screen.getByText(/I'm Sol/i)).toBeVisible();
    });
  });

  it('sends a message and displays the response', async () => {
    // Mock the service response
    const mockResponse = "I can help you with that.";
    vi.spyOn(geminiService, 'sendMessageToGemini').mockResolvedValue(mockResponse);

    render(<Chatbot language="en" />);
    
    // Open chat
    fireEvent.click(screen.getAllByRole('button')[0]);
    
    // Find input and type
    const input = screen.getByPlaceholderText(/Ask about cars/i);
    fireEvent.change(input, { target: { value: 'Do you have SUVs?' } });
    
    // Click send
    const sendBtn = screen.getByRole('button', { name: '' }); // The submit button inside form
    fireEvent.submit(sendBtn.closest('form')!);
    
    // Check if user message is displayed
    expect(screen.getByText('Do you have SUVs?')).toBeInTheDocument();
    
    // Wait for AI response
    await waitFor(() => {
      expect(screen.getByText(mockResponse)).toBeInTheDocument();
    });
  });

  it('updates welcome message when language changes', () => {
    const { rerender } = render(<Chatbot language="en" />);
    fireEvent.click(screen.getAllByRole('button')[0]); // Open chat
    expect(screen.getByText(/I'm Sol/i)).toBeInTheDocument();

    // Change prop
    rerender(<Chatbot language="es" />);
    expect(screen.getByText(/Soy Sol/i)).toBeInTheDocument();
  });
});