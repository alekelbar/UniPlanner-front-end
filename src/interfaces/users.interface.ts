export interface UserLogin {
  identification: string;
  password: string;
}

export interface UserRegister {
  identification: string;
  fullname: string;
  email: string;
  password: string;
  careers: string[];
}

export interface UserToken {
  identification: string;
  id: string;
  fullname: string;
  email: string;
}

export interface UserState {
  token: string | null;
  user: UserToken | null;
  loading: boolean;
}

