export type UserState = 'Active' | 'Archived' | 'Confirmed';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  state: UserState;
}

export interface UserDetail {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  state: UserState;
}

export interface CreateOrUpdateUser {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}
