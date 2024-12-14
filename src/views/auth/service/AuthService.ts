import apiClient from "@/axiosConfig";

export default class AuthService {
    static async login(data: any): Promise<any> {
        try {
            const response = await apiClient.post("/login", data);
            // Almacenar el token JWT en el localStorage
            if (response.data.token) {
                localStorage.setItem("authToken", response.data.token);
            }
            return response;
        } catch (error) {
            console.error("Error en login:", error);
            throw error;
        }
    }

    static async register(data: any): Promise<any> {
        try {
            const response = await apiClient.post("/register", data);
            if (response.data.token) {
                localStorage.setItem("authToken", response.data.token);
            }
            return response;
            return response;
        } catch (error) {
            console.error("Error en register:", error);
            throw error;
        }
    }

    static getToken(): string | null {
        return localStorage.getItem("authToken");
    }

    static isAuthenticated(): boolean {
        return !!localStorage.getItem("authToken");
    }

    static logout(): void {
        localStorage.removeItem("authToken");
    }
}
