import type { TaskStatus } from "@ordo/shared/constants/task-status";

export interface Task {
  id: string;
  title: string;
  userId: string;
  description: string;
  status: keyof typeof TaskStatus;
}
