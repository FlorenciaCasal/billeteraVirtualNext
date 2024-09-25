import httpInternalApi from "../common/http.java.service";
import { ResponseAccountType } from "@/types/auth.types";
import { FormRegisterData } from "@/types/FormRegisterData";

class UserAPI {

    // getMeInternal = async (token: string): Promise<UserType> => httpInternalApi.httpGet(`/account`, undefined, token)
    getMeInternal = async (token: string): Promise<ResponseAccountType> => httpInternalApi.httpGet(`/account`, undefined, token)

    getUserData = async (user_id: number): Promise<FormRegisterData> => httpInternalApi.httpGetPublic(`/users/${user_id}`)

}

const userApi = new UserAPI();
export default userApi;