import { LoginResponseType, RedisResponseType } from "@/types/auth.types";
import httpNextApi from "../common/http.next.service";
import httpJavaApi from "../common/http.java.service";
import { UserTypeConId } from "@/types/user.types";

class AuthAPI {
    getRedisValue = async (key: string): Promise<RedisResponseType> =>
        httpNextApi.httpGet(`/api/redis`, new URLSearchParams({ key: key }), process.env.REDIS_API_TOKEN)

    login = async (email: string, password: string): Promise<LoginResponseType> =>
        httpNextApi.httpPost(`/api/auth/login`, { email, password })

    loginJava = async (email: string, password: string): Promise<LoginResponseType> =>
        httpJavaApi.httpPostPublic(`/login`, { email, password })

    registerJava = async (firstname: string, lastname: string, dni: number, email: string, password: string, confirmPassword: string, phone: string): Promise<UserTypeConId> =>
        httpJavaApi.httpPostPublic(`/users`, { firstname, lastname, dni, email, password, confirmPassword, phone })

    async register(firstname: string, lastname: string, dni: number, email: string, password: string, confirmPassword: string, phone: string): Promise<UserTypeConId> {
        const registerResponse = await authApi.registerJava(firstname, lastname, dni, email, password, confirmPassword, phone);
        console.log('Respuesta de registerJava:', registerResponse);

        return {

            account_id: registerResponse.account_id,
            user_id: registerResponse.user_id,
            email,

        }
    }

    logout = async (): Promise<LoginResponseType> =>
        httpNextApi.httpPost(`/api/auth/logout`, {})

}

const authApi = new AuthAPI();
export default authApi