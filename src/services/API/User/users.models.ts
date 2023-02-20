export interface UserLogin {
  identification: string;
  password: string;
}

export interface UserRegister {
  identification: string;
  fullname: string;
  email: string;
  password: string;
  career: string;
}

export interface UserCredentials {
  token: string | null;
  user: PublicUser | null;
  error: null | string;
}

export interface PublicUser {
  identification: string;
  id: string;
  name: string;
  email: string;
}
