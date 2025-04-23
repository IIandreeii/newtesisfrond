import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { environment } from "@/environments/environment";
import axios from "axios";
import { useState } from "react";





axios.defaults.baseURL = environment.apiUrl;



export const useLogin = () =>{
    const login = useAuth();
    const [getResponse, setGetResponse] = useState<any>(null);
    const [loader, setLoader] = useState({ loading: false, action: '' });

    const {showError} = useToast()

    const postLogin = async (email: string, password: string) => {
        const method = 'POST';
        const url = '/signin';

        setLoader({ loading: true, action: 'login' });

        try{
            interface LoginResponse {
                token: string;
            }

            const data = { email, password }; // Define the data object with email and password
             
            const response = await axios.request<LoginResponse>({
                method,
                url,
                data,
              });
        }catch{

        }
    }
}