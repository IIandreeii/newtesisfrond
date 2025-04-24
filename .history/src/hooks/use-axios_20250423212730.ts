import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { environment } from "@/environments/environment";
import { useToast } from "../context/ToastContext";

axios.defaults.baseURL = environment.apiUrl;

interface UseAxiosParams {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: unknown;
  baseUrl?: string;
}

// Interfaz para error de respuesta de API
interface ApiErrorResponse {
  message: string | { message: string };
  status?: number;
}

export const useAXIOS = <T>() => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { showError } = useToast();

  const execute = async (
    axiosParams: UseAxiosParams
  ): Promise<T | undefined> => {
    // Usamos AxiosRequestConfig en lugar de any
    const axiosRequestConfig: AxiosRequestConfig = {
      url: axiosParams.url,
      method: axiosParams.method,
      data: axiosParams.data,
    };

    if (axiosParams.baseUrl) {
      axiosRequestConfig.baseURL = axiosParams.baseUrl;
    }

    setLoading(true);
    setError(null);

    try {
      const responseFetch: AxiosResponse<T> = await axios.request(axiosRequestConfig);
      if (responseFetch.status === 200 || responseFetch.status === 201) {
        setResponse(responseFetch.data);
        return responseFetch.data;
      } else {
        const errorMessage = responseFetch.data && typeof responseFetch.data === 'object' && 
          'message' in responseFetch.data ? 
          String((responseFetch.data as unknown as ApiErrorResponse).message) : 
          'Error desconocido';
        showError(errorMessage);
        return undefined;
      }
    } catch (error: unknown) {
      // Verificamos si es un error de Axios
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        
        // Extraer mensaje de error con comprobaciones de seguridad
        let errorMessage = 'Error desconocido';
        
        if (axiosError.response?.data) {
          const errorData = axiosError.response.data;
          if (typeof errorData.message === 'object' && errorData.message !== null) {
            errorMessage = errorData.message.message || 'Error en la respuesta';
          } else if (typeof errorData.message === 'string') {
            errorMessage = errorData.message;
          }
        } else if (axiosError.message) {
          errorMessage = axiosError.message;
        }
        
        showError(errorMessage);
        if (axiosError.response?.data) {
          setResponse(axiosError.response.data as unknown as T);
          return axiosError.response.data as unknown as T;
        }
      } else {
        showError('Ocurrió un error inesperado');
      }
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return {
    execute,
    response,
    error,
    loading,
  };
};