export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export interface UserCreateInput {
  email: string;
  password: string;
}

export interface UserUpdateInput {
  email?: string;
  password?: string;
}
