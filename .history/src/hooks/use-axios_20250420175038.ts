import { useState } from "react";

import axios from "axios";


interface UseAxiosProps<T> {
    url: string;
    method: "get" | "post" | "put" | "delete";
    data?: T;
}


export const UseAxios = <T>()=>{

    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    
}