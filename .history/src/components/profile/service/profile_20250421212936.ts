import { useAuth } from "@/context/AuthContext";
import { environment } from "@/environments/environment";
import axios from "axios";



axios.defaults.baseURL = environment.apiUrl;




const profileService =()=> {

    const { authToken } = useAuth();

    const getProfile = async() =>{
        if(!authToken) {
            return null;
        }
    }
}