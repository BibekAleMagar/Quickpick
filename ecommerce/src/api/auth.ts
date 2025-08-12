
import { LoginResponse} from "@/types/auth/loginResponse";
import { LoginCredentials } from "@/types/auth/loginCredentials";
import axios from "axios";


export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const response = await axios.post <LoginResponse> ('https://dummyjson.com/auth/login', credentials)
        return response.data
}