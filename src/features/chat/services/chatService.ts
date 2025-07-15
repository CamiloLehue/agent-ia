import type { ChatItemType, ChatResponse, SendMessageRequest } from "../types/chatTypes";

const API_URL = import.meta.env.VITE_API_URL;


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

export const sendChatMessage = async (messageData: SendMessageRequest): Promise<ChatResponse> => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token no encontrado. El usuario no está autenticado.");
    }

    const response = await fetch(`${API_URL}/iaprompt`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: messageData.prompt,
            // selectedItem: messageData.selectedItem,
            typeSearch:  2,
            // timestamp: new Date().toISOString()
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error HTTP: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    console.log("Mi servicio de data es:", data);
    console.log("respuesta:", data.respuesta);
    
    // Crear la respuesta en el formato esperado
    const chatResponse: ChatResponse = {
        respuesta: data.respuesta || data.message || "Sin respuesta",
        success: true,
        error: undefined
    };
    
    return chatResponse;
};