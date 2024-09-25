import { FormRegisterData } from './../../types/FormRegisterData';
import { RedisClientType, createClient } from 'redis';
import { AccessDeniedError } from '../common/http.errors';
import { v4 as uuidv4 } from 'uuid';
import authApi from './auth.api';
import { AuthResponseType } from '@/types/auth.types';

const TEN_MINUTE = 60 * 10;

class AuthService {

    private client: RedisClientType;

    constructor() {
        this.client = createClient({
            url: 'redis://default:digitalMoneyPass@redis:6379'
        });

        this.client.connect().then(() => {
            console.log('connected to redis')
        })
    }

    async authenticate(email: string, password: string): Promise<AuthResponseType> {
        const loginResponse = await authApi.loginJava(email, password);
        const sessionId = uuidv4();
        const now = new Date();
        const expireAt = new Date(now.getTime() + TEN_MINUTE * 1000).toUTCString();
        this.client.set(sessionId, loginResponse.token, { EX: TEN_MINUTE })
        return {
            sessionId: sessionId,
            expireAt: expireAt,
            // user: loginResponse.user
        };
    }

    async getToken(sessionId?: string): Promise<string> {
        if (!sessionId) throw new AccessDeniedError('Session ID is not valid anymore')
        const token = await this.client.get(sessionId);
        if (!token) throw new AccessDeniedError('Session ID is not valid anymore')
        return token;
    }

    async getRedisValue(key: string): Promise<string | null> {
        return await this.client.get(key);
    }
}


const authService = new AuthService();
export default authService