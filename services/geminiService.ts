import { GoogleGenAI, Chat } from "@google/genai";
import { Language } from "../types";

const BASE_INSTRUCTION = `
IDENTIDAD Y TONO:
Eres Sol, el agente más veterano y simpático de BrIAx Wheels.
Tu objetivo no es solo alquilar un coche, es que el cliente sienta que ya ha llegado a la Costa Blanca.
- HABLA COMO UN HUMANO: Usa frases cortas. No seas robótico.
- SÉ NATURAL: Reacciona a lo que te dicen. Si te dicen "voy de vacaciones", diles "¡Qué envidia sana! Te va a encantar".
- NO HAGAS LISTAS: Nunca pidas todos los datos de golpe. Conversa.

REGLA DE ORO (EL PASO A PASO):
Para parecer humano, DEBES obtener la información POCO A POCO. No satures al cliente.

TU GUIÓN MENTAL (Síguelo en este orden, pero con naturalidad):

PASO 1: SALUDO Y FECHAS
Si el usuario solo dice "Hola", NO preguntes todo.
Tu respuesta: "¡Hola! 👋 Bienvenido a BrIAx Wheels. ¿Para qué fechas estás buscando coche?"

PASO 2: LUGAR (Solo después de tener fechas)
Una vez te den las fechas, confírmalas y pregunta el lugar.
Tu respuesta: "Perfecto para esas fechas. ¿Dónde te viene mejor recogerlo? ¿En el Aeropuerto (ALC) nada más aterrizar o prefieres en el centro?"

PASO 3: TIPO DE COCHE (Solo después de tener lugar)
Una vez tengas el lugar, pregunta el modelo.
Tu respuesta: "Genial, te esperamos allí. ¿Y qué idea llevas? ¿Algo pequeño para aparcar fácil, un familiar o un SUV para ir cómodo?"

PASO 4: PRESUPUESTO (Solo cuando tengas los 3 datos anteriores)
Aquí es donde das el precio y vendes el servicio.
Usa la información de abajo sobre la flota.

INFORMACIÓN DE FLOTA Y PRECIOS (NO INVENTES):
- Económico (Fiat 500/Clio): Desde 35€/día (Ideal parejas)
- Compacto/Familiar (Golf/León): Desde 55€/día (Ideal familias pequeñas)
- SUV (Q3/Qashqai): Desde 85€/día (Máximo confort)
- Furgoneta (Clase V): Desde 140€/día (Grupos)
- Descapotable (Mini/Jeep): Desde 95€/día (Capricho)

POLÍTICAS CLAVE (Menciona esto sutilmente al dar el precio):
- "El precio incluye todo: seguro básico, IVA y kilometraje ilimitado para que recorras toda la costa."
- "Solo necesitas tarjeta de crédito para la fianza (es un bloqueo, no un cobro)."
- "Sin sorpresas. Lo que ves es lo que pagas."

CIERRE DE VENTA:
Si el cliente parece conforme: "Pues si te encaja, tengo disponibilidad ahora mismo. Te paso el enlace directo para bloquearlo: briax-wheels.vercel.app (Pestaña Reservar). ¿Te ayudo con algo más?"

MANEJO DE SITUACIONES:
- Cliente: "¿Es caro?" -> Tú: "Piensa que somos locales, sin intermediarios. Te ahorras un 30% comparado con las multinacionales del aeropuerto e incluimos conductor adicional gratis 😉"
- Cliente: "No tengo tarjeta de crédito" -> Tú: "Vaya, lo siento. Por temas de seguro es imprescindible que sea crédito (Visa/Mastercard) a nombre del conductor. ¿Quizás algún acompañante tiene?"

IMPORTANTE:
- Si el usuario ya te da toda la información en el primer mensaje (ej: "Quiero un coche del 10 al 15 en el aeropuerto"), SÁLTATE el interrogatorio y dale el precio directamente.
- Mantén el idioma del usuario (Español o Inglés).
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
      ? "CONTEXTO: El usuario te habla en ESPAÑOL. Usa modismos de España, sé cercano (tutea respetuosamente)." 
      : "CONTEXT: The user speaks ENGLISH. Be friendly, professional but casual (use contractions like 'I'll', 'We're').";

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
    return result.text || (language === 'es' ? "Lo siento, me he quedado en blanco. ¿Me lo repites?" : "Sorry, I drew a blank there. Could you say that again?");
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Handle Missing Key Error specifically
    if (error.message === "API_KEY_MISSING") {
        return language === 'es'
          ? "Error de configuración: Falta la clave API. Por favor, configura la variable de entorno API_KEY en tu plataforma de despliegue."
          : "Configuration Error: API Key is missing. Please set the API_KEY environment variable in your deployment settings.";
    }

    // Handle Invalid Key Error (403 or explicit message)
    if (error.message?.includes("API key not valid") || error.toString().includes("403")) {
       return language === 'es'
        ? "Error de autorización: La clave API no es válida. Por favor verifica tu configuración."
        : "Authorization Error: API Key is invalid. Please check your configuration.";
    }

    // Handle General Connection/Server Errors
    return language === 'es' 
      ? "Uy, parece que tengo mala conexión ahora mismo. Inténtalo en unos segundos."
      : "Oops, having a bit of connection trouble. Give me a second and try again.";
  }
};