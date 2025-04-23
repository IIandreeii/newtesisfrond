import { useAuth } from "@/context/AuthContext";
import { environment } from "@/environments/environment";
import axios from "axios";





axios.defaults.baseURL = environment.apiUrl;



export const useLogin = () =>{
    const login = useAuth();
    const [getR]
}