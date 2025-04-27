import { db } from "@ordo/config/firestore.config";
import type { Task } from "@ordo/domain/task";
import type { TaskRepository } from "@ordo/domain/task/task.repository";
import { injectable } from "inversify";

@injectable()
export class FirestoreTaskRepository implements TaskRepository {
  private collection;

  constructor() {
    this.collection = db.collection("tasks");
  }

  async create(task: Omit<Task, "id">): Promise<Task> {
    const newTask = await this.collection.add(task);

    return { ...task, id: newTask.id };
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.collection.doc(id).get();

    if (!task.exists) return null;

    return { ...task.data() } as Task;
  }

  async findByUserId(userId: string): Promise<Task[]> {
    const snapshot = await this.collection.where("userId", "==", userId).get();

    const tasks = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Task)
    );

    return tasks;
  }

  async update(id: string, task: Partial<Task>) {
    await this.collection.doc(id).update(task);
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
