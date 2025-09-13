export interface Task {
    id: string;
    title: string;
    descripcion?: string;
    completed: boolean;
    userId: string;
}