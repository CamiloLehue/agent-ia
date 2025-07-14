import { useEffect, useState } from "react";
import type { ChatItemType } from "../types/chatTypes";
import { getChatItems } from "../services/chatService";

export const useChatItems = () => {
    const [chatItems, setChatItems] = useState<ChatItemType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const data = await getChatItems();
                setChatItems(data);
                setError("");
            } catch {
                setError("Fallo la conexión con la API");
                setChatItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchChat();
    }, []);

    return { chatItems, loading, error };
};