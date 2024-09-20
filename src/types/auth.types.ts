import { UserType } from "./user.types";

export type LoginResponseType = {
    token: string;
    user: UserType;
    sessionId: string;
    status: number
}

export type AuthResponseType = {
    sessionId: string;
    expireAt: number;
    user: UserType
}

export type RedisResponseType = {
    value: string;
}