
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { environment } from "@/environments/environment";
import axios from "axios";
import { useState } from "react";

axios.defaults.baseURL = environment.apiUrl;

export const useLogout = () => {
  const { authToken, logout } = useAuth();
  const [getResponse, setGetResponse] = useState<any>(null);
  const [loader, setLoader] = useState({ loading: false, action: "" });

  const { showError, showSuccess } = useToast();

  const postLogout = async () => {
    if (!authToken) {
      showError("No hay sesión activa");
      return;
    }

    const method = "GET";
    const url = "/logout";

    setLoader({ loading: true, action: "logout" });

    try {
      interface LogoutResponse {
        message: string;
        success: boolean;
      }

      const response = await axios.request<LogoutResponse>({
        method,
        url,
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (response.data && response.data.success) {
        console.log("Logout successful:", response.data.message);
        showSuccess(response.data.message || "Sesión cerrada correctamente");
        setGetResponse(response.data);
        logout();
      } else {
        console.error("Invalid response data:", response.data);
        setGetResponse(response.data);
        logout();
      }
    } catch (error: any) {
      showError(
        error.response?.data?.message || "Ocurrió un error al cerrar sesión"
      );
      console.error("Logout error:", error);
      
      // Logout de todas formas por seguridad, incluso si falla la API
      logout();
      
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