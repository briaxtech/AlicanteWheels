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
  it('renders correctly and is accessible', () => {
    render(<Chatbot language="en" />);
    
    // Test visibility of the launcher using accessible role
    // The launcher div has role="button" and aria-label="Chat with Sol"
    const launcher = screen.getByRole('button', { name: /Chat with Sol/i });
    expect(launcher).toBeInTheDocument();
    
    // The chat window content should not be visible yet
    const welcomeMsg = screen.queryByText(/I'm Sol/i);
    expect(welcomeMsg).not.toBeVisible();
  });

  it('opens and closes correctly', async () => {
    render(<Chatbot language="en" />);
    
    // Open chat
    const launcher = screen.getByRole('button', { name: /Chat with Sol/i });
    fireEvent.click(launcher);
    
    // Verify it opened
    await waitFor(() => {
      expect(screen.getByText(/I'm Sol/i)).toBeVisible();
    });

    // Close chat using the close button with aria-label
    const closeButton = screen.getByRole('button', { name: /Close chat/i });
    fireEvent.click(closeButton);

    // Verify it closed (or rather, content is no longer visible/interactable)
    // Note: The component uses opacity/scale for visibility, so the text is still in DOM but visually hidden.
    // We check if the container has the closed classes.
    const chatWindow = screen.getByText(/I'm Sol/i).closest('.fixed');
    expect(chatWindow).toHaveClass('opacity-0');
  });

  it('sends a message and displays the response', async () => {
    // Mock the service response
    const mockResponse = "I can help you with that.";
    vi.spyOn(geminiService, 'sendMessageToGemini').mockResolvedValue(mockResponse);

    render(<Chatbot language="en" />);
    
    // Open chat
    fireEvent.click(screen.getByRole('button', { name: /Chat with Sol/i }));
    
    // Find input and type
    const input = screen.getByPlaceholderText(/Ask about cars/i);
    fireEvent.change(input, { target: { value: 'Do you have SUVs?' } });
    
    // Click send using accessible name
    const sendBtn = screen.getByRole('button', { name: /Send message/i });
    fireEvent.click(sendBtn);
    
    // Check if user message is displayed
    expect(screen.getByText('Do you have SUVs?')).toBeInTheDocument();
    
    // Wait for AI response
    await waitFor(() => {
      expect(screen.getByText(mockResponse)).toBeInTheDocument();
    });
  });

  it('updates launcher text when language changes', () => {
    const { rerender } = render(<Chatbot language="en" />);
    expect(screen.getByText(/Chat with Sol/i)).toBeInTheDocument();

    // Change prop to Spanish
    rerender(<Chatbot language="es" />);
    // Should now see Spanish text
    expect(screen.getByText(/Hablar con Sol/i)).toBeInTheDocument();
  });
});