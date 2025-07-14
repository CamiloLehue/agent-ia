import { useState } from "react";
import type { LoginType } from "../types/LoginType";
import { loginUser } from "../services/LoginService";
import { useNavigate } from "react-router";

export function useLogin() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [userData, setUserData] = useState<LoginType | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const login = async (username: string, password: string) => {
        setLoading(true);
        setError("");
        setMessage("");
        try {
            const response = await loginUser({ username, password });
            console.log("Token recibido:", response.access_token);

            if (response.access_token) {
                setUserData(response);
                setMessage("Login exitoso.");
                localStorage.setItem("token", response.access_token);
                localStorage.setItem("username", username);
                navigate("/app");
            } else {
                setMessage("Credenciales incorrectas.");
            }
        } catch (err: unknown) {
            console.error("Error durante login:", err);
            if (err instanceof Error && 'detail' in err) {
                setError("Credenciales incorrectas.");
                setMessage("Credenciales incorrectas.");
            } else {
                setMessage("Error al conectar con el servidor.");
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        message,
        userData,
        loading,
        error,
    };
}