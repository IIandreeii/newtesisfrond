import { useAuth } from "@/context/AuthContext";
import { environment } from "@/environments/environment";
import axios from "axios";
import { useState } from "react";





axios.defaults.baseURL = environment.apiUrl;



export const useLogin = () =>{
    const login = useAuth();
    const [getResponse, setGetResponse] = useStatee<any>(null);
}