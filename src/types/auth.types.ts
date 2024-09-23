import { UserType } from "./user.types";

export type LoginResponseType = {
    token: string;
    user: UserType;
    status: number
}

export type AuthResponseType = {
    sessionId: string;
    expireAt: string;
    user: UserType
}

export type RedisResponseType = {
    value: string;
}