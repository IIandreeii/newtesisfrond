import { useState } from "react";

import axios from "axios";

interface UseAxiosParams {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: unknown;
}

export const UseAxios = <T>() => {
  const execute = async (axiosParams: UseAxiosParams): Promise<any> => {
    try {
    const response = await axios({
        url: axiosParams.url,
        method: axiosParams.method,
        data: axiosParams.data,
    });
    return response.data;
    } catch (error) {
    console.error("Error executing Axios request:", error);
    throw error;
    }
  };
};
