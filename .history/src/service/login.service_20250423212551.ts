import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { environment } from "@/environments/environment";
import axios, { AxiosError } from "axios";
import { useState } from "react";

axios.defaults.baseURL = environment.apiUrl;

interface LoginResponse {
  statusCode: number;
  token: string;
  // Añade otros campos que pueda contener la respuesta
}



export const useLogin = () => {
  const { login } = useAuth();
  const [getResponse, setGetResponse] = useState<LoginResponse | null>(null);
  const [loader, setLoader] = useState({ loading: false, action: "" });

  const { showError } = useToast();

  const postLogin = async (data: { email: string; password: string }) => {
    const method = "POST";
    const url = "/signin";

    setLoader({ loading: true, action: "login" });

    try {
      const response = await axios.request<LoginResponse>({
        method,
        url,
        data,
      });

      if (response.data && response.data.token) {
        login(response.data.token);
        setGetResponse(response.data);
      } else {
        console.error("Invalid response data:", response.data);
        setGetResponse({
          ...response.data,
          statusCode: response.status
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>;
        showError(
          axiosError.response?.data?.message || "An unexpected error occurred"
        );
      } else {
        showError("An unexpected error occurred");
      }

      return error;
    } finally {
      setLoader({ loading: false, action: "" });
    }
  };

  return {
    postLogin,
    getResponse,
    loader,
  };
};
