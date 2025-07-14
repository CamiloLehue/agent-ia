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

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json: LoginType = await response.json();
  return json;
};