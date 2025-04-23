import { useState } from "react";

import axios from "axios";


interface UseAxiosProps<T> {
    url: string;
    method: "get" | "post" | "put" | "delete";
    data?: T;
}


export const UseAxios = <T>()=>{
    

    const execute = async (axiosParams: UseAxiosProps ): Promise<any> => {
        const { url, method, data } = axiosParams;
        try {
            const response = await axios({
                url,
                method,
                data,
            });
            return response.data;
        } catch (error) {
            console.error("Error executing Axios request:", error);
            throw error;
        }
    }
}