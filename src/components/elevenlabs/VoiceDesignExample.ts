import { designVoice, playVoicePreview } from './Voice';

/**
 * Ejemplo de uso de la API de diseño de voces de ElevenLabs
 */
async function voiceDesignExample() {
  try {
    console.log('Iniciando ejemplo de diseño de voz...');
    
    // Ejemplo 1: Voz de ogro malvado
    const ogreVoicePreviews = await designVoice({
      voiceDescription: "A massive evil ogre speaking at a quick pace. He has a silly and resonant tone.",
      text: "Your weapons are but toothpicks to me. Surrender now and I may grant you a swift end. I've toppled kingdoms and devoured armies. What hope do you have against me?",
    });
    
    console.log(`Se generaron ${ogreVoicePreviews.length} vistas previas para la voz de ogro`);
    
    // Reproducir las vistas previas de la voz de ogro
    for (const preview of ogreVoicePreviews) {
      await playVoicePreview(preview);
    }
    
    // Ejemplo 2: Voz femenina amigable
    const femaleVoicePreviews = await designVoice({
      voiceDescription: "A young female voice with a Spanish accent and friendly tone. She speaks clearly and warmly.",
      text: "Hello! I'm so happy to meet you. I hope you're having a wonderful day. Let me know if there's anything I can help you with!",
    });
    
    console.log(`Se generaron ${femaleVoicePreviews.length} vistas previas para la voz femenina`);
    
    // Reproducir las vistas previas de la voz femenina
    for (const preview of femaleVoicePreviews) {
      await playVoicePreview(preview);
    }
    
    // Ejemplo 3: Voz de narrador de documentales
    const narratorVoicePreviews = await designVoice({
      modelId: "eleven_multilingual_ttv_v2", // Especificar modelo explícitamente
      voiceDescription: "A deep, authoritative male voice with a British accent, perfect for documentary narration. Speaks slowly and clearly.",
      text: "In the depths of the Amazon rainforest, life thrives in countless forms. Each species has evolved unique adaptations to survive in this complex ecosystem.",
    });
    
    console.log(`Se generaron ${narratorVoicePreviews.length} vistas previas para la voz de narrador`);
    
    // Reproducir las vistas previas de la voz de narrador
    for (const preview of narratorVoicePreviews) {
      await playVoicePreview(preview);
    }
    
    console.log('Ejemplo de diseño de voz completado con éxito');
  } catch (error) {
    console.error('Error en el ejemplo de diseño de voz:', error);
  }
}

// Ejecutar el ejemplo
voiceDesignExample();