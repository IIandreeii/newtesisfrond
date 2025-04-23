import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { environment } from "@/environments/environment";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import {logout} from "@/context/AuthContext";
axios.defaults.baseURL = environment.apiUrl;

export const useLogout = () => {
  const storedToken = Cookies.get('authToken');
  const [getResponse, setGetResponse] = useState<any>(null);
  const [loader, setLoader] = useState({ loading: false, action: "loader" });
  const { logout } = useAuth();
  const { showError, showSuccess } = useToast();

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
      interface LogoutResponse {
        message?: string;
        success?: boolean;
      }

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
      } else {
        console.error("Invalid response data:", response.data);
        showError("Error al cerrar sesión");
        setGetResponse(response.data);
      }

      
    } catch (error: any) {
      showError(
        error.response?.data?.message || "Ocurrió un error al cerrar sesión"
      );
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