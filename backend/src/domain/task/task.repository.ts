import type { Task } from ".";

export interface TaskRepository {
  delete: (id: string) => Promise<void>;
  create: (user: Task) => Promise<Task>;
  findByUserId(userId: string): Promise<Task[]>;
  findById: (id: string) => Promise<Task | null>;
  update: (id: string, user: Partial<Task>) => Promise<void>;
}
