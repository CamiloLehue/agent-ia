/**
 * Módulo de integración con ElevenLabs
 * 
 * Este módulo proporciona funcionalidades para trabajar con la API de ElevenLabs,
 * incluyendo diseño de voces, reproducción de audio y guardado de voces.
 */

// Exportar funcionalidades de diseño de voz
export { 
  designVoice, 
  playVoicePreview,
  type VoiceDesignParams,
  type VoicePreview 
} from './Voice';

// Exportar funcionalidades de guardado de voz
export {
  saveDesignedVoice,
  type SaveVoiceParams
} from './SaveVoice';

// Exportar componente de diseño de voz
export { default as VoiceDesigner } from './VoiceDesigner';

// Re-exportar funcionalidades básicas de ElevenLabs
export { ElevenLabsClient, play } from '@elevenlabs/elevenlabs-js';