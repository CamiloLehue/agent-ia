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

    const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: messageData.prompt,
            selectedItems: messageData.selectedItems,
            timestamp: new Date().toISOString()
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error HTTP: ${response.status} - ${errorText}`);
    }

    const data: ChatResponse = await response.json();
    return data;
};