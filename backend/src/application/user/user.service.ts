import type { User } from "@ordo/domain/user";
import { FirestoreUserRepository } from "@ordo/infrastructure/firestore/user.repository";
import { inject, injectable } from "inversify";

@injectable()
export class UserService {
  constructor(
    @inject(FirestoreUserRepository)
    private userRepository: FirestoreUserRepository
  ) {}

  async createUser(userData: Omit<User, "id">) {
    return this.userRepository.create(userData);
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
