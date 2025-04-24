import { useToast } from "@/context/ToastContext";
import { environment } from "@/environments/environment";
import axios from "axios"; // Importar AxiosError

import { useState } from "react";
import Cookies from "js-cookie";

axios.defaults.baseURL = environment.apiUrl;

interface BaseProfile {
  id: string;
  email: string;
  userType: "donor" | "charity";
  nombre?: string;
  avatar?: string;
}

interface UserProfile extends BaseProfile {
  dni: string;
  apellido: string;
  role: string;
}

interface CharityProfile extends BaseProfile {
  descripcion: string;
  direccion: string;
  telefono: string;
  accessToken: string;
}

export type ProfileData = UserProfile | CharityProfile;

interface ProfileResponse {
  message?: string;
  success?: boolean;
  data?: ProfileData;
}

export const useProfileService = () => {
  const { showError } = useToast();
  const storedToken = Cookies.get('authToken');
  const [loader, setLoader] = useState({ loading: false, action: "" });
  const [getResponse, setGetResponse] = useState<ProfileResponse | null>(null);

  const getProfile = async () => {
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
    } catch (error: unknown) { // Cambiar el tipo de error a unknown
      if (axios.isAxiosError(error)) { // Verificar si es un error de Axios
        showError(error.response?.data?.message || "Ocurrió un error ");
        console.error("ERROR PROFILE", error);
      } else {
        showError("Ocurrió un error desconocido");
        console.error("ERROR DESCONOCIDO", error);
      }
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