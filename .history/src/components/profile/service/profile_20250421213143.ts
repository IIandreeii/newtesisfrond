import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { environment } from "@/environments/environment";
import axios from "axios";
import { useState } from "react";



axios.defaults.baseURL = environment.apiUrl;




const profileService =()=> {
    const { showError, showSuccess } = useToast();
    const { authToken } = useAuth();
    const [loader, setLoader] = useState({ loading: false, action: "" });
    
    const getProfile = async() =>{
        if(!authToken) {
            showError("No hay sesión activa");
        }
    }


    const method = "GET";
    const url = `/profile?secret_token=${authToken}`;

    setLoader({ loading: true, action: "profile" });

    try




}