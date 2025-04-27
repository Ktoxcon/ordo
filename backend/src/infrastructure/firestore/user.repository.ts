import { db } from "@ordo/config/firestore.config";
import type { User } from "@ordo/domain/user";
import type { UserRepository } from "@ordo/domain/user/user.repository";
import { injectable } from "inversify";

@injectable()
export class FirestoreUserRepository implements UserRepository {
  private collection;

  constructor() {
    this.collection = db.collection("users");
  }

  async create(user: Omit<User, "id">): Promise<User> {
    const newUser = await this.collection.add(user);

    return { ...user, id: newUser.id };
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.collection.doc(id).get();

    if (!user.exists) return null;

    return { ...user.data() } as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.collection
      .where("email", "==", email)
      .limit(1)
      .get();

    if (result.empty) {
      return null;
    }

    const [user] = result.docs;

    return { ...user.data() } as User;
  }

  async update(id: string, user: Partial<User>) {
    await this.collection.doc(id).update(user);
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
