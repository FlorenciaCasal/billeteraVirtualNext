import httpInternalApi from "../common/http.java.service";
import { ResponseAccountType } from "@/types/auth.types";
import { FormRegisterData } from "@/types/FormRegisterData";


class UserAPI {

    // getMeInternal = async (token: string): Promise<UserType> => httpInternalApi.httpGet(`/account`, undefined, token)
    getMeInternal = async (token: string): Promise<ResponseAccountType> => httpInternalApi.httpGet(`/account`, undefined, token)

    // getUserData = async (user_id: number): Promise<UserTypeConId> => httpInternalApi.httpGetPublic(`/users/${user_id}`)
    getUserData = async (user_id: number, token: string): Promise<FormRegisterData> => httpInternalApi.httpGet(`/users/${user_id}`, undefined, token)

}

const userApi = new UserAPI();
export default userApi;