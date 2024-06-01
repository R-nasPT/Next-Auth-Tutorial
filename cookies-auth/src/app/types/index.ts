export interface IUser {
  _id: string;
  email: string;
  name: string;
}

export interface SignUpFromInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface InputError {
  [key: string]: string;
}
