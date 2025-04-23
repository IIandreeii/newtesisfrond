import { useState } from "react";

import axios from "axios";
import { environment } from "@/environments/environment";

axios.defaults.baseURL = environment.apiUrl;

interface UseAxiosParams {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: unknown;
}



export const useAXIOS = <T> () => {
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);


    const execute = async (axiosParams: UseAxiosParams): 
    Promise<T| undefined> => { 
         const 
    }
}