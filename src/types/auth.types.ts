import { FormRegister } from "./formData/formDataRegister.types";
import { FormRegisterData } from "./FormRegisterData";


export type LoginResponseType = {
    token: string;
    // user: FormRegister;
    status: number
}

export type AuthResponseType = {
    sessionId: string;
    expireAt: number;
    // user: FormRegister
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
    user_id: number
  }