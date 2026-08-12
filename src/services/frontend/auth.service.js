import api from "@/lib/api/axiosInstance";
import { API_ENDPOINTS } from "../api-endpoints";

export class AuthService {
    static async login({ email, password }) {
        try {
            const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
            return response.data;
        } catch (error) {
            console.error("Login error:", error); 
            throw new Error(error.response?.data?.message || "Failed to login");
        }
    }

    static async register({ name, email, password }) {
        try {
            const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, { name, email, password });
            return response.data;
        } catch (error) {
            console.error("Registration error:", error);
            throw new Error(error.response?.data?.message || "Failed to register");
        }
    }
}
