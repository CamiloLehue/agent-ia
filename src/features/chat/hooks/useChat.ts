import { useState } from "react";
import type { ChatMessage, SendMessageRequest } from "../types/chatTypes";
import { sendChatMessage } from "../services/chatService";

export const useChat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [isConnected, setIsConnected] = useState(true);

    const sendMessage = async (messageData: SendMessageRequest) => {
        setLoading(true);
        setError("");
        setIsConnected(true);

        // Agregar mensaje del usuario inmediatamente
        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            content: messageData.prompt,
            role: 'user',
            timestamp: new Date(),
            selectedItem: messageData.selectedItem
        };

        setMessages(prev => [...prev, userMessage]);

        try {
            // Enviar mensaje al servicio
            const response = await sendChatMessage(messageData);

            if (response.success !== false) {
                // Agregar respuesta del asistente
                const assistantMessage: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    content: response.respuesta,
                    role: 'assistant',
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, assistantMessage]);
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

    return {
        messages,
        loading,
        error,
        isConnected,
        sendMessage,
        clearMessages,
        retryConnection
    };
};