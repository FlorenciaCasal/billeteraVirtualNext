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

  export type ResponseRegisterType= {
        user_id: number;
        account_id: number;
        email: string;
  }

  export type ResponseActivityType= {
    account_id: number;
    amount: number; 
    dated: string;
    description: string;
    destination: string;
    id: number;
    origin: string;
    type: string
  }