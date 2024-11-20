import { RedisClientType, createClient } from 'redis';
import { AccessDeniedError } from '../common/http.errors';
import { v4 as uuidv4 } from 'uuid';
import authApi from './auth.api';
import { AuthResponseType } from '@/types/auth.types';
import { UserTypeConId } from '@/types/user.types';

const TEN_MINUTE = 60 * 10;

class AuthService {

    private client: RedisClientType;

    constructor() {
        this.client = createClient({
            url: 'redis://default:digitalMoneyPass@digital-money-redis-1:6379'
        });

        this.client.connect().then(() => {
            console.log('connected to redis')
        })
    }

    async authenticate(email: string, password: string): Promise<AuthResponseType> {
        const loginResponse = await authApi.loginJava(email, password);
        const sessionId = uuidv4();
        const now = new Date();
        const expireAt = new Date(now.getTime() + TEN_MINUTE * 1000).getTime();
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

    async register(firstname: string, lastname: string, dni: number, email: string, password: string, confirmPassword: string, phone: string): Promise<UserTypeConId> {
        const registerResponse = await authApi.registerJava(firstname, lastname, dni, email, password, confirmPassword, phone);
        console.log('Respuesta de registerJava:', registerResponse);

        return {
             
                account_id: registerResponse.account_id,
                user_id: registerResponse.user_id,
                email,
            
        }
    }

    async logout(sessionId: string): Promise<void> {
        await this.client.del(sessionId);
    }

    async setRedisValue(key: string, value: string): Promise<void> {
        await this.client.set(key, value);
    }

}


const authService = new AuthService();
export default authService