export type User = {
  id: string;
  email: string;
};

export type UserCredentials = Omit<User, "id">;
