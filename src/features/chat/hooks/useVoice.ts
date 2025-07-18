import { useState, useEffect, useRef, useCallback } from 'react';

// Tipos locales para evitar problemas de reconocimiento
type SpeechRecognitionType = any;
type SpeechSynthesisType = SpeechSynthesis;

interface UseVoiceReturn {
  // Speech Recognition
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  isSupported: boolean;
  error: string | null;
  
  // Speech Synthesis
  isSpeaking: boolean;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  speechSupported: boolean;
}

export const useVoice = (): UseVoiceReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);
  const synthRef = useRef<SpeechSynthesisType | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Verificar soporte para Speech Recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setIsSupported(true);
        recognitionRef.current = new SpeechRecognition();
        
        const recognition = recognitionRef.current;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'es-ES';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          setTranscript(finalTranscript + interimTranscript);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          
          // Manejar diferentes tipos de errores
          let errorMessage = '';
          switch (event.error) {
            case 'network':
              errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
              break;
            case 'not-allowed':
              errorMessage = 'Permiso denegado. Permite el acceso al micrófono.';
              break;
            case 'no-speech':
              errorMessage = 'No se detectó voz. Intenta hablar más cerca del micrófono.';
              break;
            case 'audio-capture':
              errorMessage = 'Error de captura de audio. Verifica tu micrófono.';
              break;
            case 'service-not-allowed':
              errorMessage = 'Servicio no disponible. Intenta más tarde.';
              break;
            default:
              errorMessage = `Error de reconocimiento de voz: ${event.error}`;
          }
          
          setError(errorMessage);
          
          // Limpiar error después de 5 segundos
          setTimeout(() => {
            setError(null);
          }, 5000);
        };
      }

      // Verificar soporte para Speech Synthesis
      if (window.speechSynthesis) {
        setSpeechSupported(true);
        synthRef.current = window.speechSynthesis;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        setTranscript('');
        setError(null);
        
        // Limpiar cualquier timeout de reintento anterior
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current);
          retryTimeoutRef.current = null;
        }
        
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setError('Error al iniciar el reconocimiento de voz. Intenta de nuevo.');
        setIsListening(false);
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
        setError(null);
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
        setIsListening(false);
      }
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  const speak = useCallback((text: string) => {
    if (synthRef.current && speechSupported) {
      // Cancelar cualquier síntesis en curso
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      synthRef.current.speak(utterance);
    }
  }, [speechSupported]);

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
    error,
    isSpeaking,
    speak,
    stopSpeaking,
    speechSupported,
  };
};