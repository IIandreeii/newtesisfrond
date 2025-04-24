import { useToast } from "@/context/ToastContext";
import { environment } from "@/environments/environment";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

// Declaramos las interfaces para tipar correctamente
interface ProfileResponse {
  message?: string;
  success?: boolean;
  // Añadir otros campos que pueda devolver el perfil
  [key: string]: unknown;
}

interface LoaderState {
  loading: boolean;
  action: string;
}

// Cambiamos a un custom hook que comienza con "use"
export const useProfileService = () => {
  const { showError, showSuccess } = useToast();
  const [loader, setLoader] = useState<LoaderState>({ loading: false, action: "" });
  const [getResponse, setGetResponse] = useState<ProfileResponse | null>(null);
  
  const getProfile = async () => {
    const storedToken = Cookies.get('authToken');
    
    if (!storedToken) {
      showError("No hay sesión activa");
      return;
    }

    const method = "GET";
    const url = `/profile?secret_token=${storedToken}`;

    setLoader({ loading: true, action: "profile" });

    try {
      const response = await axios.request<ProfileResponse>({
        method,
        url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        baseURL: environment.apiUrl
      });

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.data?.success
      ) {
        setGetResponse(response.data);
        // Si necesitas mostrar un mensaje de éxito, descomentar:
        // showSuccess("Perfil cargado correctamente");
      } else {
        console.error("Invalid response data:", response.data);
        showError("Error al cargar el perfil");
        setGetResponse(response.data);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{message?: string}>;
        showError(axiosError.response?.data?.message || "Ocurrió un error");
      } else {
        showError("Ocurrió un error inesperado");
      }
      console.error("ERROR PROFILE", error);
      return error;
    } finally {
      setLoader({ loading: false, action: "" });
    }
  };

  return {
    getProfile,
    loader,
    getResponse,
  };
};