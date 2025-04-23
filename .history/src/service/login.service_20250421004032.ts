import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { environment } from "@/environments/environment";
import axios from "axios";
import { useState } from "react";

axios.defaults.baseURL = environment.apiUrl;

export const useLogin = () => {
  const login = useAuth();
  const [getResponse, setGetResponse] = useState<any>(null);
  const [loader, setLoader] = useState({ loading: false, action: "" });

  const { showError } = useToast();

  const postLogin = async (data: { email: string; password: string }) => {
    const method = "POST";
    const url = "/signin";

    setLoader({ loading: true, action: "login" });

    try {
      interface LoginResponse {
        token: string;
      }

      const response = await axios.request<LoginResponse>({
        method,
        url,
        data,
      });

      if (response.data && response.data.token) {
        console.log("Login successful:", response.data.token);
        login(response.data.token);
        setGetResponse(response.data);
      } else {
        console.error("Invalid response data:", response.data);
        setGetResponse(response.data);
      }
    } catch (error: any) {
      showError(
        error.response?.data?.message || "An unexpected error occurred"
      );

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
