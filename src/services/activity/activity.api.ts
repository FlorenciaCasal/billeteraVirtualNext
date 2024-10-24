import httpJavaApi from "../common/http.java.service";
import { ResponseActivityType } from "@/types/auth.types";

class ActivityAPI {
    getActivity = async (account_id: number, token: string): Promise<ResponseActivityType[]> => {
        const endpoint = `/accounts/${account_id}/activity`;
        return httpJavaApi.httpGet(endpoint, undefined, token);
    }
}

const activityApi = new ActivityAPI();
export default activityApi;
