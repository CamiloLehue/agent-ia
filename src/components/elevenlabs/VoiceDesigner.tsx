import React, { useState } from 'react';
import { designVoice, playVoicePreview,type VoicePreview } from './Voice';

/**
 * Componente para diseñar voces utilizando la API de ElevenLabs
 */
const VoiceDesigner: React.FC = () => {
  // Estado para los campos del formulario
  const [voiceDescription, setVoiceDescriptioFn] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [modelId, setModelId] = useState('eleven_multilingual_ttv_v2');
  
  // Estado para las vistas previas generadas
  const [previews, setPreviews] = useState<VoicePreview[]>([]);
  
  // Estado para el proceso de generación
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  /**
   * Maneja la generación de vistas previas de voz
   */
  const handleGenerateVoice = async () => {
    if (!voiceDescription || !previewText) {
      setError('Por favor, completa todos los campos requeridos.');
      return;
    }
    
    try {
      setIsGenerating(true);
      setError(null);
      
      const generatedPreviews = await designVoice({
        modelId,
        voiceDescription,
        text: previewText,
      });
      
      setPreviews(generatedPreviews);
    } catch (err) {
      setError(`Error al generar las vistas previas: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsGenerating(false);
    }
  };
  
  /**
   * Reproduce una vista previa de voz
   */
  const handlePlayPreview = async (preview: VoicePreview) => {
    try {
      await playVoicePreview(preview);
    } catch (err) {
      setError(`Error al reproducir la vista previa: ${err instanceof Error ? err.message : String(err)}`);
    }
  };
  
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Diseñador de Voces ElevenLabs</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Modelo
        </label>
        <select
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="eleven_multilingual_ttv_v2">Eleven Multilingual v2</option>
          <option value="eleven_turbo_v2">Eleven Turbo v2</option>
          <option value="eleven_monolingual_v1">Eleven Monolingual v1</option>
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción de la Voz *
        </label>
        <textarea
          value={voiceDescription}
          onChange={(e) => setVoiceDescriptioFn(e.target.value)}
          placeholder="Ej: Una voz masculina profunda con acento británico, perfecta para narración de documentales. Habla lenta y claramente."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          rows={4}
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          Describe las características de la voz que deseas generar (género, edad, acento, tono, etc.)
        </p>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Texto para Vista Previa *
        </label>
        <textarea
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          placeholder="Ingresa el texto que se utilizará para generar las vistas previas de voz."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          rows={3}
          required
        />
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <button
        onClick={handleGenerateVoice}
        disabled={isGenerating}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
      >
        {isGenerating ? 'Generando...' : 'Generar Vistas Previas'}
      </button>
      
      {previews.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Vistas Previas Generadas</h3>
          <div className="space-y-4">
            {previews.map((preview, index) => (
              <div key={preview.generatedVoiceId} className="p-4 border rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Vista Previa {index + 1}</span>
                  <button
                    onClick={() => handlePlayPreview(preview)}
                    className="py-1 px-3 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Reproducir
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  ID: {preview.generatedVoiceId}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceDesigner;