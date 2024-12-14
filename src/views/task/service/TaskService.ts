import apiClient from "@/axiosConfig";
import AuthService from "@/views/auth/service/AuthService";

export default class TaskService {
    // Crear una nueva tarea
    static async create(data: any): Promise<any> {
        const token = AuthService.getToken(); // Obtener el token desde el localStorage

        try {
            const response = await apiClient.post("/tasks", data, {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluir el token en la cabecera
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al crear tarea:", error);
            throw error;
        }
    }

    // Actualizar una tarea existente
    static async update(id: number, data: any): Promise<any> {
        const token = AuthService.getToken(); // Obtener el token desde el localStorage

        try {
            const response = await apiClient.put(`/tasks/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluir el token en la cabecera
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al actualizar tarea:", error);
            throw error;
        }
    }

    // Eliminar una tarea
    static async delete(id: number): Promise<any> {
        const token = AuthService.getToken(); // Obtener el token desde el localStorage

        try {
            const response = await apiClient.delete(`/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluir el token en la cabecera
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al eliminar tarea:", error);
            throw error;
        }
    }

    // Obtener todas las tareas (si es necesario)
    static async getTasks(page: number, perPage: number): Promise<any> {
        const token = AuthService.getToken(); // Obtener el token desde el localStorage

        try {
            const response = await apiClient.get("/tasks", {
                params: {
                    page,
                    perPage,
                },
                headers: {
                    Authorization: `Bearer ${token}`, // Incluir el token en la cabecera
                },
            });
            return response;
        } catch (error) {
            console.error("Error al obtener tareas:", error);
            throw error;
        }
    }
}
