import { FormRegisterData } from "./FormRegisterData";


export type LoginResponseType = {
    token: string;
    status: number
    email: string;
}

export type AuthResponseType = {
    sessionId: string;
    expireAt: number;
}

export type RedisResponseType = {
    value: string;
}

export type RegisterResponseType = {
    user: FormRegisterData;
    status: number
}

export type ResponseAccountType= {
    alias: string;
    available_amount: number;
    cvu: string;
    id: number;
    user_id: number;
  }