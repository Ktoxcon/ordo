import { TaskService } from "@ordo/application/task/task.service";
import { UserService } from "@ordo/application/user/user.service";
import { FirestoreTaskRepository } from "@ordo/infrastructure/firestore/task.repository";
import { FirestoreUserRepository } from "@ordo/infrastructure/firestore/user.repository";
import { AuthController } from "@ordo/interfaces/http/controllers/auth.controller";
import { TaskController } from "@ordo/interfaces/http/controllers/task.controller";
import { UserController } from "@ordo/interfaces/http/controllers/user.controller";
import { Container } from "inversify";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TaskService).toSelf();
container.bind(UserService).toSelf();

container.bind(TaskController).toSelf();
container.bind(UserController).toSelf();
container.bind(AuthController).toSelf();

container.bind(FirestoreTaskRepository).toSelf();
container.bind(FirestoreUserRepository).toSelf();
