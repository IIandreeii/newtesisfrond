import { useState } from "react";

import axios from "axios";


interface UseAxiosProps {
    url: string;
    method: "get" | "post" | "put" | "delete";
    data?: T;
}


export const UseAxios = <T>()=>{
    

    const execute = async (axiosParams: IAxiosParams ): Promise<any> => {

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