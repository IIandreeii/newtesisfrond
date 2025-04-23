import { useState } from "react";

import axios from "axios";


interface UseAxiosProps<T> {
    url: string;
    method: "get" | "post" | "put" | "delete";
    data?: T;
}


export const UseAxios = <T>()=>{
    

    const executeRequest = async ({ url, method, data }: UseAxiosProps<T>) => {
        
}