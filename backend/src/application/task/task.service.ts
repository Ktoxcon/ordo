import type { Task } from "@ordo/domain/task";
import { FirestoreTaskRepository } from "@ordo/infrastructure/firestore/task.repository";
import { inject, injectable } from "inversify";

@injectable()
export class TaskService {
  constructor(
    @inject(FirestoreTaskRepository)
    private taskRepository: FirestoreTaskRepository
  ) {}

  async createTask(taskData: Omit<Task, "id">) {
    return this.taskRepository.create(taskData);
  }

  async updateTask(id: string, taskData: Partial<Task>) {
    return this.taskRepository.update(id, taskData);
  }

  async deleteTask(id: string) {
    return this.taskRepository.delete(id);
  }

  async findTaskById(id: string): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }

  async listTasksByUserId(userId: string): Promise<Task[]> {
    return this.taskRepository.findByUserId(userId);
  }
}
