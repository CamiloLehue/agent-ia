import type { LoginType } from "../types/LoginType";

const API_URL = import.meta.env.VITE_API_URL;


export const loginUser = async (
  credentials: { username: string; password: string }
): Promise<LoginType> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(credentials),
  });

  const json = await response.json();
  
  if (!response.ok) {
    // Si la respuesta contiene un campo 'detail', lo incluimos en el error
    if (json && json.detail) {
      const error = new Error(json.detail) as Error & { detail?: string };
      error.detail = json.detail;
      throw error;
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return json as LoginType;
};