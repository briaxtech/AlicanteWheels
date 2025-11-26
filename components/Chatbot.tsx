import React, { useEffect } from 'react';
import { Language } from '../types';

interface ChatbotProps {
  language: Language;
}

export const Chatbot: React.FC<ChatbotProps> = ({ language }) => {
  useEffect(() => {
    // Append the ElevenLabs widget script to the document body
    const script = document.createElement('script');
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  return React.createElement('elevenlabs-convai', {
    'agent-id': "agent_2701kb02tqnbeyjrxp3rz99z330g"
  });
};