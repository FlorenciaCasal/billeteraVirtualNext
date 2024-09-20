import { UserType } from "@/types/user.types";
import httpInternalApi from "../common/http.java.service";

class UserAPI {

    getMeInternal = async (accessToken: string): Promise<UserType> => httpInternalApi.httpGet(`/me`, undefined, accessToken)
    getUserData = async (id: number): Promise<UserType> => httpInternalApi.httpGetPublic(`/users/${id}`)
  
}

const userApi = new UserAPI();
export default userApi;