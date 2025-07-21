import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import type { VoicePreview } from "./Voice"; 

/**
 * Interfaz para los parámetros de guardado de voz
 */
export interface SaveVoiceParams {
  /** Vista previa de la voz a guardar */
  preview: VoicePreview;
  /** Nombre para la voz guardada */
  name: string;
  /** Descripción opcional para la voz */
  description?: string;
  /** Etiquetas opcionales para la voz */
  labels?: Record<string, string>;
}

/**
 * Cliente de ElevenLabs
 */
const elevenlabs = new ElevenLabsClient();

/**
 * Guarda una voz diseñada en la cuenta de ElevenLabs
 * @param params Parámetros para guardar la voz
 * @returns Promesa que resuelve al ID de la voz guardada
 */
export async function saveDesignedVoice(params: SaveVoiceParams): Promise<string> {
  const { preview, name, description = '', labels = {} } = params;
  
  try {
    // Añadir la voz a la cuenta del usuario
    const response = await elevenlabs.voices.addVoice({
      name,
      description,
      generatedVoiceId: preview.generatedVoiceId,
      labels,
    });
    
    console.log(`Voz guardada con éxito. ID: ${response.voiceId}`);
    return response.voiceId;
  } catch (error) {
    console.error('Error al guardar la voz:', error);
    throw error;
  }
}

/**
 * Ejemplo de uso:
 * 
 * ```typescript
 * import { designVoice, playVoicePreview } from './Voice';
 * import { saveDesignedVoice } from './SaveVoice';
 * 
 * // Diseñar una voz
 * const previews = await designVoice({
 *   voiceDescription: "Una voz femenina joven con acento español y tono amigable",
 *   text: "Hola, ¿cómo estás? Espero que estés teniendo un día maravilloso."
 * });
 * 
 * // Reproducir las vistas previas
 * for (const preview of previews) {
 *   await playVoicePreview(preview);
 * }
 * 
 * // Seleccionar la vista previa que queremos guardar (por ejemplo, la primera)
 * const selectedPreview = previews[0];
 * 
 * // Guardar la voz seleccionada
 * const voiceId = await saveDesignedVoice({
 *   preview: selectedPreview,
 *   name: "Mi Voz Española",
 *   description: "Voz femenina joven con acento español",
 *   labels: {
 *     accent: "spanish",
 *     age: "young",
 *     gender: "female"
 *   }
 * });
 * 
 * console.log(`La voz ha sido guardada con el ID: ${voiceId}`);
 * ```
 */