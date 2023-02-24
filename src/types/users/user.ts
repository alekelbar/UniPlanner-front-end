import { UserRegister } from "../../interfaces/users.interface";

export type User = Required<UserRegister> & { _id: string };
