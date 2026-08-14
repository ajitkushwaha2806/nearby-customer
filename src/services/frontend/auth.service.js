import api from "@/lib/api/axiosInstance";
import { API_ENDPOINTS } from "../api-endpoints";

export class AuthService {
    static async login({ phone, password }, slug = "barbeque-nation") {
        try {
            const response = await api.post(API_ENDPOINTS.AUTH.LOGIN(slug), { phone, password });
            return response.data;
        } catch (error) {
            console.error("Login error:", error);
            throw new Error(error.response?.data?.message || "Failed to login");
        }
    }

    static async register({ name, phone, password }, slug = "barbeque-nation") {
        try {
            const response = await api.post(API_ENDPOINTS.AUTH.REGISTER(slug), { name, phone, password });
            return response.data;
        } catch (error) {
            console.error("Registration error:", error);
            throw new Error(error.response?.data?.message || "Failed to register");
        }
    }

    static async me(slug = "barbeque-nation") {
        try {
            const response = await api.get(API_ENDPOINTS.AUTH.ME(slug));
            return response.data;
        } catch (error) {
            console.error("Fetch user error:", error);
            throw new Error(error.response?.data?.message || "Failed to fetch user");
        }
    }

    static async logout(slug = "barbeque-nation") {
        try {
            const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT(slug));
            return response.data;
        } catch (error) {
            console.error("Logout error:", error);
            throw new Error(error.response?.data?.message || "Failed to logout");
        }
    }

    static async updateProfile(data, slug = "barbeque-nation") {
        try {
            const response = await api.put(API_ENDPOINTS.AUTH.PROFILE(slug), data);
            return response.data;
        } catch (error) {
            console.error("Update profile error:", error);
            throw new Error(error.response?.data?.message || "Failed to update profile");
        }
    }
}
