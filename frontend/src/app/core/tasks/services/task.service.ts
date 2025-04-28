import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  description: string;
  creationDate: string;
}

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private http = inject(HttpClient);

  createTask(task: Omit<Task, "id">) {
    return this.http.post<Task>("/api/tasks", task, { withCredentials: true });
  }

  getTask(id: string) {
    return this.http.get<{ data: Task }>(`/api/tasks/${id}`, {
      withCredentials: true,
    });
  }

  listTasks() {
    return this.http.get<{ data: Task[] }>("/api/tasks", {
      withCredentials: true,
    });
  }

  updateTask(id: string, updates: Partial<Task>) {
    return this.http.patch<Task>(`/api/tasks/${id}`, updates, {
      withCredentials: true,
    });
  }

  deleteTask(id: string) {
    return this.http.delete<{ success: boolean }>(`/api/tasks/${id}`, {
      withCredentials: true,
    });
  }
}
