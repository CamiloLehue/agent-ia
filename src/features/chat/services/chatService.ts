import type { ChatItemType } from "../types/chatTypes";

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