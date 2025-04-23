import { useState } from "react";

import axios from "axios";
import { environment } from "@/environments/environment";

axios.defaults.baseURL = environment.apiUrl;

interface UseAxiosParams {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: unknown;
  baseUrl?: string;
}

export const useAXIOS = <T>() => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = async (
    axiosParams: UseAxiosParams
  ): Promise<T | undefined> => {
    const axiosResquestConfig : any = {
      url: axiosParams.url,
      method: axiosParams.method,
      data: axiosParams.data,
    };

    if (axiosParams.baseUrl){
        axiosResquestConfig.baseURL = axiosParams.baseUrl;
    }

    setLoading(true);
    setError(null);

    try{
        const responseFetch = await axios.request(axiosResquestConfig);
        if(responseFetch.status === 200 || responseFetch.status === 201){
            setResponse(responseFetch.data);
            return responseFetch.data;
        }else {
            showError(())
        }
    }catch (error) {


    }


  };
};
