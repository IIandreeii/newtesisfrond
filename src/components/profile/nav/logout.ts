import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { environment } from "@/environments/environment";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; 

// Definimos la interfaz para la respuesta del logout
interface LogoutResponse {
  message?: string;
  success?: boolean;
  [key: string]: unknown; // Para cualquier propiedad adicional
}

// Interfaz para el estado del loader
interface LoaderState {
  loading: boolean;
  action: string;
}

axios.defaults.baseURL = environment.apiUrl;

export const useLogout = () => {
  const storedToken = Cookies.get('authToken');
  const [getResponse, setGetResponse] = useState<LogoutResponse | null>(null);
  const [loader, setLoader] = useState<LoaderState>({ loading: false, action: "loader" });
  const { logout } = useAuth();
  const { showError, showSuccess } = useToast();
  const router = useRouter(); // Inicializa el router
  
  const postLogout = async () => {
    if (!storedToken) {
      showError("No hay sesión activa");
      return;
    }

    const method = "POST";
    // URL con el token como parámetro de consulta
    const url = `/logout?secret_token=${storedToken}`;

    setLoader({ loading: true, action: "logout" });

    try {
      const response = await axios.request<LogoutResponse>({
        method,
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        }
      });

      
      if (response.status === 200 || response.status === 201 || response.data?.success) {
        showSuccess(response.data?.message || "Sesión cerrada correctamente");
        setGetResponse(response.data);
        logout();
        router.push("/logind");
      } else {
        console.error("Invalid response data:", response.data);
        showError("Error al cerrar sesión");
        setGetResponse(response.data);
      }

      
    } catch (error: unknown) {
      // Verificar si es un error de Axios y tratarlo adecuadamente
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{message?: string}>;
        showError(
          axiosError.response?.data?.message || "Ocurrió un error al cerrar sesión"
        );
      } else {
        showError("Ocurrió un error inesperado al cerrar sesión");
      }
      console.error("Logout error:", error);
      return error;
    } finally {
      setLoader({ loading: false, action: "" });
    }
  };

  return {
    postLogout,
    getResponse,
    loader,
  };
};