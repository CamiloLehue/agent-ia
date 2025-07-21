import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";
import { Readable } from 'node:stream';
import { Buffer } from 'node:buffer';

/**
 * Interfaz para los parámetros de diseño de voz
 */
export interface VoiceDesignParams {
  /** ID del modelo a utilizar */
  modelId?: string;
  /** Descripción de la voz a generar */
  voiceDescription: string;
  /** Texto para generar la vista previa de la voz */
  text: string;
}

/**
 * Interfaz para la respuesta de la vista previa de voz
 */
export interface VoicePreview {
  /** ID de la voz generada */
  generatedVoiceId: string;
  /** Audio en formato base64 */
  audioBase64: string;
}

/**
 * Cliente de ElevenLabs
 */
const elevenlabs = new ElevenLabsClient();

/**
 * Diseña una voz utilizando la API de ElevenLabs
 * @param params Parámetros para el diseño de voz
 * @returns Promesa que resuelve a un array de vistas previas de voz
 */
export async function designVoice(params: VoiceDesignParams): Promise<VoicePreview[]> {
  const { modelId = "eleven_multilingual_ttv_v2", voiceDescription, text } = params;
  
  try {
    const { previews } = await elevenlabs.textToVoice.design({
      modelId,
      voiceDescription,
      text,
    });
    
    return previews;
  } catch (error) {
    console.error('Error al diseñar la voz:', error);
    throw error;
  }
}

/**
 * Reproduce una vista previa de voz
 * @param preview Vista previa de voz a reproducir
 */
export async function playVoicePreview(preview: VoicePreview): Promise<void> {
  try {
    // Convert base64 to buffer and create a Readable stream
    const audioStream = Readable.from(Buffer.from(preview.audioBase64, 'base64'));
    
    console.log(`Reproduciendo vista previa: ${preview.generatedVoiceId}`);
    
    // Play the audio using the stream
    await play(audioStream);
  } catch (error) {
    console.error('Error al reproducir la vista previa:', error);
    throw error;
  }
}

/**
 * Ejemplo de uso:
 * 
 * ```typescript
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
 * ```
 */
