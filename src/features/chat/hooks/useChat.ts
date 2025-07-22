import { useState } from "react";
import type { ChatMessage, SendMessageRequest } from "../types/chatTypes";
import { sendChatMessage } from "../services/chatService";

export const useChat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [isConnected, setIsConnected] = useState(true);
    const [activePdfId, setActivePdfId] = useState<number | null>(null);
    const [activePdfName, setActivePdfName] = useState<string | null>(null);

    const sendMessage = async (messageData: SendMessageRequest) => {
        setLoading(true);
        setError("");
        setIsConnected(true);
        
        // Si hay un archivo PDF activo, añadirlo a la solicitud
        if (activePdfId && !messageData.file) {
            messageData.pdfId = activePdfId;
        }

        // Agregar mensaje del usuario inmediatamente
        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            content: messageData.file 
                ? `${messageData.prompt} [Archivo adjunto: ${messageData.file.name}]` 
                : messageData.prompt,
            role: 'user',
            timestamp: new Date(),
            selectedItem: messageData.selectedItem
        };

        setMessages(prev => [...prev, userMessage]);

        try {
            // Enviar mensaje al servicio
            const response = await sendChatMessage(messageData);

            if (response.success !== false) {
                // Si la respuesta contiene un ID de archivo PDF, guardarlo
                if (response.id && messageData.file) {
                    setActivePdfId(response.id);
                    setActivePdfName(messageData.file.name);
                    
                    // Agregar mensaje de confirmación
                    const confirmationMessage: ChatMessage = {
                        id: (Date.now() + 1).toString(),
                        content: `✅ ${response.mensaje || 'Archivo PDF procesado correctamente. Ahora puedes hacer preguntas sobre él.'}`,
                        role: 'assistant',
                        timestamp: new Date()
                    };
                    
                    setMessages(prev => [...prev, confirmationMessage]);
                } else {
                    // Agregar respuesta normal del asistente
                    const assistantMessage: ChatMessage = {
                        id: (Date.now() + 1).toString(),
                        content: response.respuesta,
                        role: 'assistant',
                        timestamp: new Date()
                    };

                    setMessages(prev => [...prev, assistantMessage]);
                }
                
                setIsConnected(true);
            } else {
                throw new Error(response.error || "Error desconocido en la respuesta");
            }
        } catch (err) {
            let errorMessage = "Error al enviar el mensaje";
            
            if (err instanceof Error) {
                if (err.message.includes('fetch')) {
                    errorMessage = "Error de conexión con el servidor";
                    setIsConnected(false);
                } else if (err.message.includes('401')) {
                    errorMessage = "Error de autenticación. Por favor, inicia sesión nuevamente.";
                } else if (err.message.includes('403')) {
                    errorMessage = "No tienes permisos para realizar esta acción.";
                } else if (err.message.includes('500')) {
                    errorMessage = "Error interno del servidor. Intenta nuevamente.";
                } else {
                    errorMessage = err.message;
                }
            }
            
            setError(errorMessage);
            
            // Agregar mensaje de error
            const errorChatMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                content: `❌ ${errorMessage}`,
                role: 'assistant',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, errorChatMessage]);
        } finally {
            setLoading(false);
        }
    };

    const clearMessages = () => {
        setMessages([]);
        setError("");
        setIsConnected(true);
    };

    const retryConnection = async () => {
        setIsConnected(true);
        setError("");
    };

    const clearActivePdf = () => {
        setActivePdfId(null);
        setActivePdfName(null);
    };

    return {
        messages,
        loading,
        error,
        isConnected,
        activePdfId,
        activePdfName,
        sendMessage,
        clearMessages,
        retryConnection,
        clearActivePdf
    };
};