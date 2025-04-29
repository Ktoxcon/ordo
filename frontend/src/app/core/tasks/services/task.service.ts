import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import type { Task } from "../../../shared/types/task.types";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private http = inject(HttpClient);

  createTask(task: Omit<Task, "id">) {
    return this.http.post<Task>("/api/tasks", task);
  }

  getTask(id: string) {
    return this.http.get<{ data: Task }>(`/api/tasks/${id}`);
  }

  listTasks() {
    return this.http.get<{ data: Task[] }>("/api/tasks");
  }

  updateTask(id: string, updates: Partial<Task>) {
    return this.http.patch<Task>(`/api/tasks/${id}`, updates);
  }

  deleteTask(id: string) {
    return this.http.delete<{ success: boolean }>(`/api/tasks/${id}`);
  }
}
