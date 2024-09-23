import { UserType } from "@/types/user.types";
import httpInternalApi from "../common/http.java.service";
import httpExternalApi from "../common/http.next.service";

class UserAPI {

    getMeInternal = async (token: string): Promise<UserType> => httpInternalApi.httpGet(`/me`, undefined, token)
    getUserData = async (id: number): Promise<UserType> => httpInternalApi.httpGetPublic(`/users/${id}`)
  
}

const userApi = new UserAPI();
export default userApi;