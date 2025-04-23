import { useState } from "react";

import axios from "axios";

interface UseAxiosParams {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: unknown;
    try {
        const response = await axios.request<T>({
            url: axiosParams.url,
            method: axiosParams.method,
            data: axiosParams.data,
    const execute = async (axiosParams: UseAxiosParams): Promise<T | undefined> => {
        return response.data;
    } catch (error) {
        console.error("Error executing axios request:", error);
        return undefined;
    }
}

export const UseAxios = <T>() => {


    const execute = async (axiosParams: UseAxiosParams):Promise<T>|undefined => {


        
    }


};
