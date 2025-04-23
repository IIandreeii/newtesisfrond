import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { environment } from "@/environments/environment";
import axios from "axios";
import { useState } from "react";

axios.defaults.baseURL = environment.apiUrl;

export const profileService = () => {
    const { showError, showSuccess } = useToast();
    const { authToken } = useAuth();
    const [loader, setLoader] = useState({ loading: false, action: "" });
    const [getResponse, setGetResponse] = useState<any>(null);
    
    const getProfile = async() => {
        if(!authToken) {
            showError("No hay sesión activa");
            setLoader({ loading: false, action: "" });
            return;
        }

        const method = "GET";
        // Modificamos la URL para quitar el query param y usar solo los headers
        const url = `/profile?secret_token=${authToken}`;

        setLoader({ loading: true, action: "profile" });

        try {
            interface ProfileResponse {
                message?: string;
                success?: boolean;
                userType?: "donor" | "charity";
                // Otros campos que pueda devolver la API
            }

            const response = await axios.request<ProfileResponse>({
                method,
                url,
                headers: {
                    'Content-Type': 'application/json',
                    // Enviamos el token en el formato correcto
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if(response.status === 200 || response.status === 201 || response.data?.success) {
                showSuccess(response.data?.message || "Perfil cargado correctamente");
                setGetResponse(response.data);
            } else {
                console.error("Invalid response data:", response.data);
                showError("Error al cargar el perfil");
                setGetResponse(null);
            }

        } catch(error: any) {
            console.error("ERROR PROFILE", error);
            
            // Mejorado el manejo de errores para mostrar mensajes más específicos
            if (error.response?.status === 401) {
                showError("Sesión expirada o no válida. Por favor inicia sesión nuevamente.");
            } else {
                showError(
                    error.response?.data?.message || "Ocurrió un error al cargar el perfil"
                );
            }
            
            return error;
        } finally {
            setLoader({ loading: false, action: "" });
        }
    }

    return {
        getProfile,
        loader,
        getResponse
    }
}