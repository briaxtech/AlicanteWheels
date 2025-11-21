import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock the Chatbot and Fleet to simplify integration test
vi.mock('./components/Chatbot', () => ({
  Chatbot: () => <div data-testid="chatbot-mock">Chatbot</div>
}));

// Mock scroll behavior
window.scrollTo = vi.fn();

describe('App Integration', () => {
  it('renders the default view (Home) in English', () => {
    render(<App />);
    
    // Check for Hero title part
    expect(screen.getByText(/Explore the/i)).toBeInTheDocument();
    expect(screen.getByText(/Costa Blanca/i)).toBeInTheDocument();
    
    // Check Navbar
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('switches language to Spanish when toggle is clicked', () => {
    render(<App />);
    
    // Initial state check
    expect(screen.getByText('Our Fleet')).toBeInTheDocument();
    
    // Find and click ES button
    const esButton = screen.getByText('ES');
    fireEvent.click(esButton);
    
    // Check if text changed
    expect(screen.getByText('Nuestra Flota')).toBeInTheDocument();
    expect(screen.getByText('Explora la')).toBeInTheDocument();
  });

  it('navigates between views', () => {
    render(<App />);
    
    // Ensure we are on Home
    expect(screen.getByText(/Why Choose BrIAx Wheels/i)).toBeInTheDocument();
    
    // Click Contact
    const contactLink = screen.getByText('Contact & Location');
    fireEvent.click(contactLink);
    
    // Check Contact view content
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Main Office')).toBeInTheDocument();
    
    // Home content should be gone
    expect(screen.queryByText(/Why Choose BrIAx Wheels/i)).not.toBeInTheDocument();
  });
});