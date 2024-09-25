import { LoginResponseType, RedisResponseType } from "@/types/auth.types";
import httpNextApi from "../common/http.next.service";
import httpJavaApi from "../common/http.java.service";

class AuthAPI {
    getRedisValue = async (key: string): Promise<RedisResponseType> =>
        httpNextApi.httpGet(`/redis`, new URLSearchParams({key: key}), process.env.REDIS_API_TOKEN)

    login = async (email: string, password: string): Promise<LoginResponseType> =>
        httpNextApi.httpPost(`/auth/login`, { email, password })
    // {        return await httpNextApi.httpPost<LoginResponseType>(`/auth/login`, { email, password });

    loginJava = async (email: string, password: string): Promise<LoginResponseType> =>
        httpJavaApi.httpPostPublic(`/login`, { email, password })


}

const authApi = new AuthAPI();
export default authApi