import { GoogleGenAI, Chat } from "@google/genai";
import { Language } from "../types";

// Ensure process is defined for TypeScript compilation (defensive)
declare const process: { env: { [key: string]: string | undefined } };

const BASE_INSTRUCTION = `
IDENTIDAD:
Eres Cristian, asesor experto de BrIAx Wheels en la Costa Blanca.
Tu tono es PROFESIONAL, CÁLIDO y EFICIENTE.
No eres un robot, eres una persona real gestionando reservas por chat.

REGLAS DE COMUNICACIÓN:
1. BREVEDAD ABSOLUTA: Máximo 20 palabras por mensaje. La gente no lee textos largos en el móvil.
2. NATURALIDAD: Usa un lenguaje educado pero directo. Evita formalismos excesivos como "Estimado cliente".
3. ESTRUCTURA: No pidas todos los datos de golpe. Conversa paso a paso.
4. OBJETIVO: Cerrar la reserva guiando al cliente suavemente.

GUIÓN DE INTERACCIÓN (Sigue este flujo natural):
1. Si te saludan, responde y pregunta FECHAS.
   - "¡Hola! Bienvenido a BrIAx. ¿Para qué fechas necesitas el vehículo?"
2. Una vez tengas fechas, pregunta LUGAR.
   - "Perfecto. ¿Prefieres recogerlo en el Aeropuerto (ALC) o en la estación de tren?"
3. Una vez tengas lugar, ofrece CATEGORÍA según necesidad.
   - "Genial. ¿Buscas algo pequeño para ciudad o un SUV para ir más cómodo?"
4. Finalmente, da PRECIO y CIERRE.
   - "El SUV sale a 85€/día con todo incluido. ¿Te lo reservo?"

INFORMACIÓN DE FLOTA (Precios reales):
- Económico (Fiat 500): 35€/día
- Compacto (Golf): 55€/día
- SUV (Audi Q3): 85€/día
- Furgoneta (Clase V): 140€/día
- Descapotable (Mini): 95€/día

ENLACE DE RESERVA: briax-wheels.vercel.app

IMPORTANTE:
- Si el cliente da un dato, confírmalo implícitamente y pasa al siguiente.
- Si te hablan por voz, tu respuesta será leída, así que sé muy clara y evita símbolos raros.
- Actúa como una conserje de hotel de lujo: servicial, rápida y resolutiva.
`;

let chatSession: Chat | null = null;
let currentLanguage: Language = 'en';

export const getChatSession = (language: Language): Chat => {
  // Create new session if language changes or none exists
  if (!chatSession || currentLanguage !== language) {
    currentLanguage = language;
    
    // Use process.env.API_KEY which is now polyfilled by vite.config.ts
    // This will be an empty string if not set in production/build
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      console.warn("Gemini Service: API Key is missing.");
    }

    const ai = new GoogleGenAI({ apiKey: apiKey || '' });
    
    const languageInstruction = language === 'es' 
      ? "IDIOMA: ESPAÑOL DE ESPAÑA. Tono profesional y cercano." 
      : "LANGUAGE: ENGLISH. Professional, warm, and concise.";

    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `${BASE_INSTRUCTION}\n\n${languageInstruction}`,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string, language: Language): Promise<string> => {
  try {
    // Strict check for API Key existence and non-empty value
    const apiKey = process.env.API_KEY;
    if (!apiKey || apiKey.trim() === '') {
      throw new Error("API_KEY_MISSING");
    }

    const chat = getChatSession(language);
    const result = await chat.sendMessage({ message });
    return result.text || (language === 'es' ? "Disculpa, no te he entendido bien. ¿Puedes repetir?" : "I didn't quite catch that. Could you repeat?");
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Handle Missing Key Error specifically
    if (error.message === "API_KEY_MISSING") {
        return language === 'es'
          ? "Error de configuración: Falta la clave API. Por favor, configura la variable de entorno API_KEY en tu despliegue."
          : "Configuration Error: API Key is missing. Please set the API_KEY environment variable in your deployment settings.";
    }

    // Handle Invalid Key Error (403 or explicit message)
    if (error.message?.includes("API key not valid") || error.toString().includes("403")) {
       return language === 'es'
        ? "Error de autorización: La clave API no es válida."
        : "Authorization Error: API Key is invalid.";
    }

    // Handle General Connection/Server Errors
    return language === 'es' 
      ? "Tengo problemas de conexión. ¿Me lo repites?"
      : "Connection issue. Could you say that again?";
  }
};