import type { User } from ".";

export interface UserRepository {
  delete: (id: string) => Promise<void>;
  create: (user: User) => Promise<User>;
  findById: (id: string) => Promise<User | null>;
  findByEmail: (id: string) => Promise<User | null>;
  update: (id: string, user: Partial<User>) => Promise<void>;
}
