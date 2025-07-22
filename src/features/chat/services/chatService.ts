import type { ChatItemType, ChatResponse, SendMessageRequest } from "../types/chatTypes";

// En React con Vite, las variables de entorno del cliente deben tener el prefijo VITE_
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const getChatItems = async (): Promise<ChatItemType[]> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token no encontrado. El usuario no está autenticado.");
    }

    const response = await fetch(`${API_URL}/iaprompt`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            // "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error HTTP: ${response.status} - ${errorText}`);
    }

    const data: ChatItemType[] = await response.json();

    return data;
};

// Función auxiliar para manejar la respuesta de chat
const handleChatResponse = async (response: Response): Promise<ChatResponse> => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error HTTP: ${response.status} - ${errorText}`);
    }

    const data: ChatResponse = await response.json();

    return data;
};

// Función para convertir un archivo a base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Extraer solo la parte base64 (eliminar el prefijo data:application/pdf;base64,)
            const base64String = reader.result as string;
            const base64Content = base64String.split(',')[1];
            resolve(base64Content);
        };
        reader.onerror = error => reject(error);
    });
};

export const sendChatMessage = async (messageData: SendMessageRequest): Promise<ChatResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token no encontrado. El usuario no está autenticado.");
    }

    // Si hay un archivo adjunto, usar el endpoint /procesar-pdf
    if (messageData.file) {
        const formData = new FormData();
        
        // Convertir el archivo a base64
        // const fileBase64 = await fileToBase64(messageData.file);
        
        formData.append('prompt', messageData.prompt);
        formData.append('base64_pdf', messageData.file);
        formData.append('fileName', messageData.file.name);
        formData.append('typeSearch', '4');
        
        if (messageData.selectedItem) {
            formData.append('selectedItem', JSON.stringify(messageData.selectedItem));
        }
        
        const response = await fetch(`${API_URL}/procesar-pdf`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                // No establecer Content-Type, el navegador lo hará automáticamente con el boundary correcto
            },
            body: formData
        });
        
        return handleChatResponse(response);
    }
    
    // Si hay un pdfId, usar el endpoint /preguntar-pdf
    if (messageData.pdfId) {
        const response = await fetch(`${API_URL}/preguntar-pdf`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: messageData.pdfId,
                prompt: messageData.prompt
            })
        });
        
        return handleChatResponse(response);
    }
    
    // Si no hay archivo ni pdfId, usar el endpoint normal
    const response = await fetch(`${API_URL}/iaprompt`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: messageData.prompt,
            selectedItem: messageData.selectedItem,
            typeSearch: 4,
            // timestamp: new Date().toISOString()
        })
    });
    
    return handleChatResponse(response);
};