import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { environment } from "@/environments/environment";
import axios from "axios";



axios.defaults.baseURL = environment.apiUrl;




const profileService =()=> {
    const { showError, showSuccess } = useToast();
    const { authToken } = useAuth();

    const getProfile = async() =>{
        if(!authToken) {
            showError("No hay sesión activa");
        }
    }


    const method = "GET";
    const url = `/profile`;
}