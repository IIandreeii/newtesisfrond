import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { environment } from "@/environments/environment";
import axios from "axios";

import { useState } from "react";
import Cookies from "js-cookie";

axios.defaults.baseURL = environment.apiUrl;
export const profileService = () => {
  const { showError, showSuccess } = useToast();
  const storedToken = Cookies.get('authToken');
  const [loader, setLoader] = useState({ loading: false, action: "" });
  const [getResponse, setGetResponse] = useState<any>(null);
  const getProfile = async () => {
    if (!storedToken) {
      showError("No hay sesión activa");
    }

    const method = "GET";
    const url = `/profile?secret_token=${storedToken}`;

    setLoader({ loading: true, action: "profile" });

    try {
      interface ProfileResponse {
        message?: string;
        success?: boolean;
      }

      const response = await axios.request<ProfileResponse>({
        method,
        url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.data?.success
      ) {
        
        setLoader({ loading: false, action: "" });
        setGetResponse(response.data);
      } else {
        console.error("Invalid response data:", response.data);
        showError("Error al cargar el perfil");
        setLoader({ loading: false, action: "" });
        setGetResponse(response.data);
      }
    } catch (error: any) {
      showError(error.response?.data?.message || "Ocurrió un error ");
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